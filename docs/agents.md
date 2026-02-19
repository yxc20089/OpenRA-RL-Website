---
sidebar_position: 5
title: Agent Types
---

# Agent Types

OpenRA-RL supports multiple agent architectures, from simple scripted bots to LLM-powered strategists.

## Scripted Bot

A hardcoded state-machine bot (`examples/scripted_bot.py`) that demonstrates all action types:

**Phases:**
1. **Deploy MCV** — Deploy the construction vehicle, set stances on starting units
2. **Build Base** — Power plant → Barracks → Ore Refinery → War Factory
3. **Train Army** — Infantry + APC, guard construction yard, load transport
4. **Attack** — Attack-move toward enemy buildings, unload APC
5. **Sustain** — Continuous production, repair, sell damaged buildings

```bash
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
python examples/mcp_bot.py
```

Best for: Demonstrating the planning phase, knowledge tool integration.

## LLM Agent

A Claude/GPT-powered agent (`examples/llm_agent.py`) that reasons about game state in natural language:

**Capabilities:**
- Reads observations and forms strategic assessments
- Uses MCP tools for unit lookups, tech tree queries, map analysis
- Issues commands through natural language → action translation
- Adapts strategy dynamically based on game events

```bash
export OPENROUTER_API_KEY=your-key
export OPENROUTER_MODEL=anthropic/claude-sonnet-4  # or any OpenRouter model
python examples/llm_agent.py
```

Best for: Research into LLM-based game agents, agentic RL exploration.

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

### Key Considerations

- **Real-time**: The game runs at ~25 ticks/sec regardless of agent speed. Slow agents miss ticks.
- **Faction detection**: Check `available_production` to determine if you're Allied or Soviet.
- **Tech tree**: War Factory requires Ore Refinery. Build order: `powr → barracks → proc → weap`.
- **Building placement**: Completed buildings must be placed with `PLACE_BUILDING`. Unplaced buildings block further production.
