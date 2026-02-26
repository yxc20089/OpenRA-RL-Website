---
sidebar_position: 1
title: Getting Started
---

# Getting Started

OpenRA-RL lets you command AI agents to play Red Alert — the classic RTS game. LLMs, scripted bots, or RL agents build bases, train armies, and fight through a clean Python API.

## Quick Start (pip install)

The fastest way to get playing:

```bash
pip install openra-rl
openra-rl play
```

On first run, an interactive wizard helps you pick your LLM provider:

```
Welcome to OpenRA-RL!
Let's set up your LLM provider.

Choose provider:
  [1] OpenRouter (cloud — Claude, GPT, Qwen, Mistral, etc.)
  [2] Ollama (local, free)
  [3] LM Studio (local, free)
```

The CLI pulls the game server Docker image and starts everything automatically.

### Prerequisites

- **Docker** — the game server runs in a container ([install](https://docs.docker.com/get-docker/))
- **Python 3.10+**
- An LLM endpoint (cloud API key or local model server)

### Skip the wizard

Pass flags directly to skip interactive setup:

```bash
# Cloud (OpenRouter)
openra-rl play --provider openrouter --api-key sk-or-... --model anthropic/claude-sonnet-4-20250514

# Local (Ollama — free, no API key)
openra-rl play --provider ollama --model qwen3:32b

# Local (LM Studio)
openra-rl play --provider lmstudio --model <model-name>
```

### Check your setup

```bash
openra-rl doctor
```

This verifies Docker, Python, saved config, and server status.

## CLI Reference

```
openra-rl play         Run the LLM agent (wizard on first use)
openra-rl config       Re-run the setup wizard
openra-rl server       start | stop | status | logs
openra-rl replay       watch | list | copy | stop
openra-rl bench        submit   Upload results to the leaderboard
openra-rl mcp-server   Start MCP stdio server (for OpenClaw / Claude Desktop)
openra-rl doctor       Check system prerequisites
openra-rl version      Print version
```

## MCP Server (OpenClaw / Claude Desktop)

OpenRA-RL exposes all 48 game tools as a standard MCP server:

```bash
openra-rl mcp-server
```

Add to your MCP client config:

```json
{
  "mcpServers": {
    "openra-rl": {
      "command": "openra-rl",
      "args": ["mcp-server"]
    }
  }
}
```

Or install from ClawHub:
```bash
clawhub install openra-rl
```

Then chat: _"Start a game of Red Alert on easy difficulty, build a base, and defeat the enemy."_

## Running the Examples

For more control, run the example agents directly against a running server:

### Scripted Bot
A hardcoded state-machine bot that demonstrates all action types:

```bash
openra-rl server start
python examples/scripted_bot.py --verbose
```

### MCP Bot
A planning-aware bot that uses knowledge tools to formulate strategy:

```bash
python examples/mcp_bot.py --verbose
```

### LLM Agent
A Claude/GPT-powered agent that reasons about the game state:

```bash
python examples/llm_agent.py --config examples/config-ollama.yaml --verbose
```

## Local Development (without Docker)

If you prefer running the game engine natively:

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

## Next Steps

- [Architecture](/docs/architecture) — Understand the three-repo design
- [Observation Space](/docs/observation-space) — What your agent can see
- [Action Space](/docs/action-space) — What your agent can do
- [Agent Types](/docs/agents) — Scripted, MCP, and LLM agent architectures
- [Docker Deployment](/docs/docker) — Server management and deployment
- [Benchmarking](/docs/benchmarking) — Submit results to the leaderboard
