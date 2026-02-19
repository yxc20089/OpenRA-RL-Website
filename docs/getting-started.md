---
sidebar_position: 1
title: Getting Started
---

# Getting Started

OpenRA-RL is a Gymnasium-style reinforcement learning environment for the [OpenRA](https://www.openra.net/) real-time strategy engine. It lets you train AI agents that build bases, command armies, and play full Red Alert games.

## Prerequisites

- **Python 3.10+**
- **Docker** (recommended) or .NET 8.0 SDK + native dependencies
- **OpenEnv** framework (`pip install openenv-core`)

## Quick Start with Docker

The fastest way to get running:

```bash
# 1. Clone the repo
git clone --recursive https://github.com/yxc20089/OpenRA-RL.git
cd OpenRA-RL

# 2. Build the Docker image
cd docker && bash build.sh && cd ..

# 3. Start the game server
docker compose up openra-rl

# 4. Install the Python client
pip install -e .

# 5. Run the scripted bot example
python examples/scripted_bot.py --verbose
```

## Local Development Setup

If you prefer running without Docker:

### 1. Install Dependencies

```bash
# Python environment
pip install -e ".[dev]"

# .NET SDK (OpenRA needs .NET 8.0 — or .NET 10 with DOTNET_ROLL_FORWARD=LatestMajor)
# macOS: brew install dotnet-sdk

# Native libraries (macOS arm64)
brew install sdl2 openal-soft freetype luajit
```

### 2. Build OpenRA

```bash
cd OpenRA
make all
cd ..
```

### 3. Start the Environment

```python
import asyncio
from openra_env.client import OpenRAEnv

async def main():
    async with OpenRAEnv("http://localhost:8000") as env:
        obs = await env.reset()
        print(f"Game started on {obs.map_info.map_name}")
        print(f"Cash: {obs.economy.cash}, Units: {len(obs.units)}")

        while not obs.done:
            # Your agent logic here
            action = {"commands": []}
            obs = await env.step(action)

        print(f"Game over! Result: {obs.result}")

asyncio.run(main())
```

## Running the Examples

OpenRA-RL includes three example agents with increasing sophistication:

### Scripted Bot
A hardcoded state-machine bot that demonstrates all action types:

```bash
python examples/scripted_bot.py --verbose
```

### MCP Bot
A planning-aware bot that uses knowledge tools to formulate strategy:

```bash
python examples/mcp_bot.py
```

### LLM Agent
A Claude/GPT-powered agent that reasons about the game state:

```bash
export OPENROUTER_API_KEY=your-key
python examples/llm_agent.py
```

## Next Steps

- [Architecture](/docs/architecture) — Understand the three-repo design
- [Observation Space](/docs/observation-space) — What your agent can see
- [Action Space](/docs/action-space) — What your agent can do
- [Docker Deployment](/docs/docker) — Production deployment guide
