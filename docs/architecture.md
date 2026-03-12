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
