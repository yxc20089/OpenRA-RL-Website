---
sidebar_position: 5
title: Agent Types
---

# Agent Types

OpenRA-RL supports multiple agent architectures, from simple scripted bots to LLM-powered strategists.

## Quickest Path: `openra-rl play`

The CLI runs an LLM agent with zero setup:

```bash
pip install openra-rl
openra-rl play
```

It handles Docker, config, and the agent loop automatically. Everything below is for when you want more control.

## Scripted Bot

A hardcoded state-machine bot (`examples/scripted_bot.py`) that demonstrates all action types:

**Phases:**
1. **Deploy MCV** — Deploy the construction vehicle, set stances on starting units
2. **Build Base** — Power plant → Barracks → Ore Refinery → War Factory
3. **Train Army** — Infantry + APC, guard construction yard, load transport
4. **Attack** — Attack-move toward enemy buildings, unload APC
5. **Sustain** — Continuous production, repair, sell damaged buildings

```bash
openra-rl server start
python examples/scripted_bot.py --verbose
```

Best for: Testing the environment, understanding action types, baseline benchmarking.

## MCP Bot

A planning-aware bot (`examples/mcp_bot.py`) that uses knowledge tools before the game starts:

**Planning Phase:**
1. Queries opponent intelligence (difficulty, behavioral traits)
2. Looks up faction briefing (all available units and buildings)
3. Analyzes the map (resource locations, terrain, chokepoints)
4. Formulates a strategy based on findings

**Game Phase:**
- Executes the planned strategy using scripted logic
- Adapts build order based on opponent aggressiveness

```bash
python examples/mcp_bot.py --verbose
```

Best for: Demonstrating the planning phase, knowledge tool integration.

## LLM Agent

An AI agent powered by any OpenAI-compatible model (`examples/llm_agent.py`). Supports cloud APIs (OpenRouter, OpenAI) and local model servers (Ollama, LM Studio).

**Capabilities:**
- Reads observations and forms strategic assessments
- Uses MCP tools for unit lookups, tech tree queries, map analysis
- Issues commands through natural language → action translation
- Adapts strategy dynamically based on game events
- Pre-game planning phase with opponent intelligence

```bash
# Easiest — CLI handles everything:
openra-rl play --provider ollama --model qwen3:32b

# Or run the script directly:
python examples/llm_agent.py --config examples/config-openrouter.yaml --verbose
```

### Configuration

The LLM agent supports multiple config methods:

```bash
# Environment variable
OPENROUTER_API_KEY=sk-or-... python examples/llm_agent.py

# Config file
python examples/llm_agent.py --config examples/config-ollama.yaml

# CLI flags (override everything)
python examples/llm_agent.py --base-url http://localhost:11434/v1/chat/completions --model qwen3:32b
```

Example configs: `config-openrouter.yaml`, `config-ollama.yaml`, `config-lmstudio.yaml`, `config-minimal.yaml`.

Best for: Research into LLM-based game agents, agentic RL exploration.

## MCP Server (for OpenClaw / Claude Desktop)

OpenRA-RL exposes all 48 game tools as a standard MCP server, so any MCP client can play:

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

Or install from [ClawHub](https://clawhub.ai/skill/openra-rl):
```bash
clawhub install openra-rl
```

Then chat naturally: _"Start a game of Red Alert, build a base with defenses, and defeat the enemy."_

## Building Your Own Agent

Implement the standard `reset/step` loop:

```python
from openra_env.client import OpenRAEnv
from openra_env.models import ActionType, CommandModel, OpenRAAction

async def run_agent():
    async with OpenRAEnv("http://localhost:8000") as env:
        obs = await env.reset()

        while not obs.done:
            commands = []

            # Example: move idle units toward the center
            for unit in obs.units:
                if unit.is_idle and not unit.type == "harv":
                    commands.append(CommandModel(
                        action=ActionType.ATTACK_MOVE,
                        actor_id=unit.actor_id,
                        target_x=obs.map_info.width // 2,
                        target_y=obs.map_info.height // 2,
                    ))

            obs = await env.step(OpenRAAction(commands=commands))

        print(f"Result: {obs.result}")
```

Or use the MCP WebSocket client for tool-based interaction:

```python
from openra_env.mcp_ws_client import OpenRAMCPClient

async with OpenRAMCPClient("http://localhost:8000") as env:
    await env.reset()
    tools = await env.list_tools()     # 48 MCP tools
    state = await env.call_tool("get_game_state")
    await env.call_tool("build_and_place", building_type="powr")
    await env.call_tool("advance", ticks=500)
```

### Key Considerations

- **Real-time**: The game runs at ~25 ticks/sec regardless of agent speed. Slow agents miss ticks.
- **Faction detection**: Check `available_production` to determine if you're Allied or Soviet.
- **Tech tree**: War Factory requires Ore Refinery. Build order: `powr → barracks → proc → weap`.
- **Building placement**: Completed buildings must be placed with `PLACE_BUILDING`. Unplaced buildings block further production. Use `build_and_place` for automatic placement.
