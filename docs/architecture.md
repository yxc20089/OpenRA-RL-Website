---
sidebar_position: 2
title: Architecture
---

import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

# Architecture

OpenRA-RL connects three components through a gRPC bridge:

![Architecture Diagram](/img/architecture_diagram.png)

## Three-Repo Design

| Repository | Language | Role |
|-----------|----------|------|
| **OpenRA-RL** | Python | Environment wrapper, gRPC client, agent examples |
| **OpenRA** (submodule) | C# | Modified game engine with embedded gRPC server |
| **OpenEnv** | Python | Framework providing standardized Gymnasium-style APIs |

## Data Flow

```
Agent (Python)
  ↕ HTTP/WebSocket (OpenEnv protocol, port 8000)
Environment Wrapper (FastAPI)
  ↕ gRPC/Protobuf (bidirectional streaming, port 9999)
Game Engine (OpenRA + Kestrel)
  ↕ Native game logic
OpenRA World (C# actors, traits, orders)
```

## gRPC Bridge

The bridge is embedded inside the OpenRA game engine using ASP.NET Core Kestrel. Key design decisions:

- **Static ActiveBridge pattern**: The gRPC server starts once (in `Activate()`), while a static reference is updated each time the mod reloads. This avoids port conflicts from multiple server instances.
- **DropOldest channels**: The game ticks at ~25 ticks/sec independently of the agent. Observation channels use a "drop oldest" policy so slow agents always receive the latest state.
- **Non-blocking ticks**: The game never blocks waiting for the agent. If no action arrives, the game continues with a no-op.

### Key C# Files

| File | Purpose |
|------|---------|
| `ExternalBotBridge.cs` | Main trait (IBot, ITick), Kestrel gRPC server |
| `RLBridgeService.cs` | gRPC service implementation |
| `ObservationSerializer.cs` | World/Actor/Player state → Protobuf |
| `ActionHandler.cs` | Protobuf commands → OpenRA Orders |

### Key Python Files

| File | Purpose |
|------|---------|
| `bridge_client.py` | Async gRPC client with background observation reader |
| `openra_environment.py` | OpenEnv Environment (reset/step/state) |
| `openra_process.py` | Subprocess manager for game engine |
| `models.py` | Pydantic models for observations and actions |

## Protobuf Schema

The canonical schema lives at `proto/rl_bridge.proto` and defines:

- **`GameObservation`** — Tick-level state: economy, military, units, buildings, spatial map, episode signals
- **`AgentAction`** — List of commands to execute
- **`GameState`** — High-level game phase query

The proto is compiled to both Python (gRPC stubs) and C# (pre-generated for Docker/CI compatibility).

## Multi-Session Architecture

The training setup runs 64 game sessions inside a single .NET process, sharing JIT-compiled code and mod data. A gRPC server routes requests by `session_id` to a thread pool that ticks each game forward independently.

<ArchitectureDiagram />

This design replaced the original one-process-per-environment approach, cutting reset time from 5-15 seconds down to 256ms and reducing memory from ~40 GB to ~5-7 GB for 64 concurrent sessions.

## Game Lifecycle

![Game State Diagram](/img/game_state_diagram.png)

1. **Reset**: Environment starts a new game map, waits for the game to initialize
2. **Planning Phase** (optional): Agent studies the map and opponent before acting
3. **Game Loop**: Agent receives observations, sends actions each tick
4. **Game Over**: Episode ends with win/lose/draw signal

---

import LegacyArchitectureDiagram from '@site/src/components/LegacyArchitectureDiagram';

## Appendix: Architecture Evolution

This section traces the evolution from the original one-process-per-session design to the current multi-session worker pool. Understanding *why* each decision was made is as important as understanding the final design.

### A.1 Legacy Architecture (v1)

The original design was simple: each RL environment spawned a separate .NET game process.

<LegacyArchitectureDiagram />

**Why it worked at first:** For 1-4 concurrent sessions, this is the simplest correct design. Process isolation guarantees zero shared state bugs. Each process has its own gRPC server on a unique port. Reset means kill + respawn.

**Why it broke at 64 sessions:**

| Problem | Impact |
|---------|--------|
| **64x JIT compilation** | Each .NET process re-JITs the same code. 2-5s per process, serialized by a semaphore to avoid CPU saturation |
| **~40 GB RSS** | Each process loads ~600 MB of ModData + JIT cache. 64 copies = massive memory waste |
| **5-15s reset latency** | Kill process → spawn → JIT → load mod → load map → start gRPC. For RL training at 1000+ episodes, this dominates wall time |
| **Port pool exhaustion** | Each process needs a unique gRPC port. Managing 64 ports adds complexity and fragility |
| **File descriptor limits** | 64 processes × ~30 fds each approaches OS limits on some Linux configs |

### A.2 Key Architecture Decisions

#### Decision 1: Share ModData across sessions

**Problem:** ModData (game rules, sprites, traits) is ~600 MB per process and identical across all sessions.

**Options considered:**
- (a) Shared memory / memory-mapped files — complex, C# interop overhead
- (b) Single process, multiple threads sharing one ModData instance

**Chosen:** (b). ModData is read-only after initialization, so sharing is safe without locks. This alone saves ~35 GB for 64 sessions.

**Risk:** Any code that writes to ModData during gameplay would corrupt all sessions. Mitigated by the fact that OpenRA's ModData is immutable by design.

#### Decision 2: Worker pool instead of per-session threads

**Problem:** 64 dedicated threads (one per session) waste CPU when sessions are idle (waiting for agent input between FastAdvance calls).

**Options considered:**
- (a) Dedicated thread per session that sleeps when idle
- (b) .NET ThreadPool (`Task.Run`) for ticking
- (c) Fixed-size worker pool with `BlockingCollection`

**Chosen:** (c).

Why not (a): 64 threads that mostly sleep still consume stack memory and OS scheduler overhead. When all 64 wake simultaneously (batch training), they thrash the CPU.

Why not (b): `Task.Run` puts work on the .NET ThreadPool. gRPC's Kestrel server *also* uses the ThreadPool. If 64 game ticks are running on pool threads, gRPC can't accept new requests — **thread pool starvation**. We hit this in testing: 0/16 sessions completed because gRPC handlers couldn't execute.

Why (c): Dedicated background threads (not ThreadPool) with a bounded queue. Workers only consume CPU when there's actual work. The bounded queue provides **backpressure** — if all workers are busy, `FastAdvance` returns `RESOURCE_EXHAUSTED` and the client retries. This prevents the system from accepting more work than it can handle.

#### Decision 3: Tick on worker threads, not gRPC threads

**Problem:** The initial worker pool attempt ticked game state inline on the gRPC handler thread (using a `SemaphoreSlim` to limit concurrency). This starved the gRPC thread pool.

**Solution:** Worker threads are completely separate from the .NET ThreadPool. The gRPC handler submits a `WorkItem` to the queue and `await`s the `TaskCompletionSource` — this frees the gRPC thread to handle other requests while the worker ticks the game.

```
gRPC thread:   submit WorkItem → await tcs.Task → return observation
Worker thread:  dequeue WorkItem → tick game → tcs.TrySetResult(true)
```

#### Decision 4: Per-session tick lock

**Problem:** Two concurrent `FastAdvance` calls for the same session could tick the same `World` from two worker threads simultaneously. `World.Tick()` mutates actors, effects, and game state — none of this is thread-safe.

**Solution:** `SemaphoreSlim(1,1)` per `SessionState`. The worker acquires it before ticking. A second `FastAdvance` for the same session queues behind the first.

#### Decision 5: `SetLocalPauseState` vs `SetPauseState`

**Problem:** Games start paused (waiting for agent to connect). The original code called `world.SetPauseState(false)` to unpause, which queues a `PauseGame` **Order**. But in the multi-session tick loop, this Order gets processed during the *same* tick cycle and immediately *re-pauses* the game. The game never advances past tick 3.

**Solution:** `world.SetLocalPauseState(false)` sets the pause flag directly without queuing an order. In multi-session mode, there's no network peer to synchronize with, so the order-based approach is unnecessary.

#### Decision 6: `[ThreadStatic]` on `Sync.unsyncCount`

**Problem:** `Sync.RunUnsynced()` uses a static `unsyncCount` to track reentry. With multiple worker threads, thread A increments it, thread B reads a corrupted value, and the sync check throws false positives.

**Solution:** `[ThreadStatic]` gives each thread its own counter. Default value is 0 on new threads, which is the correct initial state.

#### Decision 7: `PerfHistory.Disabled` to avoid lock contention

**Problem:** `World.Tick()` wraps actor ticking in `new PerfSample("tick_actors")`, which calls `PerfHistory.Increment()` — protected by `lock (SyncRoot)`. With 64 sessions ticking concurrently, all workers contend on this single lock.

**Solution:** A `volatile bool Disabled` flag that short-circuits `Increment()` to a no-op. Set during `RLSessionManager.Initialize()`. PerfHistory is only useful for the UI performance overlay, which doesn't exist in headless mode.

### A.3 Comparison

| Metric | Legacy (v1) | Multi-Session (v2) | Improvement |
|--------|-------------|---------------------|-------------|
| Reset latency | 5-15s | 256ms | **~40x faster** |
| RSS (64 sessions) | ~40 GB | ~6 GB | **~7x less** |
| JIT compilation | 64x (once per process) | 1x (shared) | **64x less** |
| Threads | ~200 (3 per process) | ~20 (N workers + gRPC) | **~10x fewer** |
| Aggregate ticks/sec | ~8K (contention) | ~15K (worker pool) | **~2x faster** |
| Port management | Pool of 64 ports | Single port, session_id routing | **Simpler** |

### A.4 What We'd Do Differently

1. **Start with the multi-session design.** The per-process design was "correct by isolation" but hit scaling walls quickly. If you know you'll need 16+ concurrent sessions, design for shared state from day one.

2. **Use `[ThreadStatic]` sparingly.** It's a blunt instrument. We only needed it for `Sync.unsyncCount` because OpenRA's codebase assumes single-threaded access. A session-scoped context object would be cleaner.

3. **Don't trust the .NET ThreadPool for mixed workloads.** gRPC and game ticking both want ThreadPool threads. Dedicated threads for the compute-heavy path (game ticking) and ThreadPool for the I/O-heavy path (gRPC) is the right separation.

4. **Instrument first.** The `PerfHistory` lock contention was invisible until we benchmarked at 64 sessions. Adding timing to `TickSession` early would have surfaced it sooner.
