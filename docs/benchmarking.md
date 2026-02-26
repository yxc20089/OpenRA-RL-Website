---
sidebar_position: 6
title: Benchmarking
---

# Benchmarking & Leaderboard

The [OpenRA-Bench leaderboard](https://huggingface.co/spaces/openra-rl/OpenRA-Bench) ranks AI agents by a composite score across win rate, military efficiency, and economy.

## Auto-Upload

After each game with `openra-rl play`, results are automatically submitted to the leaderboard. No extra setup required.

```bash
openra-rl play
# Game plays out → results uploaded automatically
```

Disable auto-upload:

```bash
BENCH_UPLOAD=false openra-rl play
```

Or in `config.yaml`:

```yaml
agent:
  bench_upload: false
```

## Agent Identity

Customize how your agent appears on the leaderboard:

```bash
AGENT_NAME="DeathBot-9000" AGENT_TYPE="RL" openra-rl play
```

Or in `config.yaml`:

```yaml
agent:
  agent_name: "DeathBot-9000"         # Display name (default: model name)
  agent_type: "RL"                     # Scripted / LLM / RL
  agent_url: "https://github.com/user/deathbot"  # Clickable link on leaderboard
```

| Variable | Config path | Description |
|----------|-------------|-------------|
| `AGENT_NAME` | `agent.agent_name` | Display name (default: model name) |
| `AGENT_TYPE` | `agent.agent_type` | Scripted / LLM / RL (default: auto-detect) |
| `AGENT_URL` | `agent.agent_url` | GitHub/project URL shown on leaderboard |
| `BENCH_UPLOAD` | `agent.bench_upload` | Auto-upload after each game (default: true) |
| `BENCH_URL` | `agent.bench_url` | Leaderboard URL |

## Manual Submission

Upload a saved result JSON (with optional replay):

```bash
openra-rl bench submit result.json
openra-rl bench submit result.json --replay game.orarep
openra-rl bench submit result.json --agent-name "MyBot" --agent-type RL --agent-url "https://github.com/user/mybot"
```

### CLI flags

| Flag | Description |
|------|-------------|
| `--agent-name` | Override agent name in the submission |
| `--agent-type` | Override agent type (Scripted / LLM / RL) |
| `--agent-url` | GitHub/project URL for the agent |
| `--replay` | Path to `.orarep` replay file to upload |
| `--bench-url` | Leaderboard URL (default: HF Space) |

## Custom Agent Export

If you're building your own agent (RL, CNN, multi-agent, etc.) that doesn't use the built-in LLM agent, use `build_bench_export()` to create a leaderboard submission from a final observation:

```python
from openra_env.bench_export import build_bench_export

# obs = final observation from env.step()
export = build_bench_export(
    obs,
    agent_name="DeathBot-9000",
    agent_type="RL",
    opponent="Normal",
    agent_url="https://github.com/user/deathbot",
    replay_path="/path/to/replay.orarep",
)
# Saves JSON to ~/.openra-rl/bench-exports/ and returns dict with "path" key
```

Then submit:

```bash
openra-rl bench submit ~/.openra-rl/bench-exports/bench-DeathBot-9000-*.json --replay game.orarep
```

The export helper accepts observations as dicts, Pydantic models, or objects with attributes — it normalizes automatically.

## Replay Downloads

Entries submitted with a `.orarep` replay file show a download link in the Replay column on the leaderboard. Replay files can be watched with:

```bash
openra-rl replay watch downloaded-replay.orarep
```

## Scoring

| Component | Weight | Description |
|-----------|--------|-------------|
| Win Rate | 50% | Games won / total games |
| Military Efficiency | 25% | Kill/death cost ratio (normalized) |
| Economy | 25% | Final asset value (normalized) |

Scoring is computed by [openra-rl-util](https://github.com/yxc20089/OpenRA-RL-Util) — a shared library used by both OpenRA-RL and OpenRA-Bench.

## Opponent Tiers

The leaderboard supports five difficulty levels:

| Tier | Description |
|------|-------------|
| Beginner | Easiest AI, minimal aggression |
| Easy | Light aggression, slow build-up |
| Medium | Balanced play |
| Normal | Standard AI with mixed strategies |
| Hard | Aggressive AI, fast expansion |

Filter the leaderboard by opponent tier to compare agents at the same difficulty.
