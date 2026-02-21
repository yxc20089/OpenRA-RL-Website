---
sidebar_position: 7
title: API Reference
---

# API Reference

## CLI

Install from PyPI:

```bash
pip install openra-rl
```

| Command | Description |
|---------|-------------|
| `openra-rl play` | Run the LLM agent (interactive wizard on first use) |
| `openra-rl config` | Re-run the setup wizard |
| `openra-rl server start` | Start the Docker game server |
| `openra-rl server stop` | Stop the game server |
| `openra-rl server status` | Check server status |
| `openra-rl server logs [-f]` | View server logs |
| `openra-rl mcp-server` | Start MCP stdio server |
| `openra-rl doctor` | Check prerequisites |
| `openra-rl version` | Print version |

### `openra-rl play` flags

| Flag | Description |
|------|-------------|
| `--provider` | LLM provider: `openrouter`, `ollama`, `lmstudio` |
| `--model` | Model ID (e.g. `qwen3:32b`) |
| `--api-key` | API key for cloud providers |
| `--difficulty` | AI opponent: `easy`, `normal`, `hard` |
| `--port` | Game server port (default: 8000) |
| `--server-url` | Connect to existing server (skip Docker) |
| `--verbose` | Detailed output |

## MCP Server

OpenRA-RL exposes all 48 game tools over the standard MCP protocol (stdio transport):

```bash
openra-rl mcp-server
```

MCP client config (OpenClaw, Claude Desktop, etc.):
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

Also available on [ClawHub](https://clawhub.ai/skill/openra-rl): `clawhub install openra-rl`

## Python Client

### `OpenRAEnv`

The main client class for interacting with an OpenRA-RL game server.

```python
from openra_env.client import OpenRAEnv

async with OpenRAEnv(base_url="http://localhost:8000") as env:
    obs = await env.reset()
    obs = await env.step(action)
```

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `reset()` | `OpenRAObservation` | Start a new game episode |
| `step(action)` | `OpenRAObservation` | Send commands and receive next observation |
| `state()` | `GameState` | Query current game state without acting |

### `OpenRAObservation`

Pydantic model containing all observation data for a single tick.

```python
obs.tick                    # int — current game tick
obs.done                    # bool — game over?
obs.result                  # str — "win", "lose", "draw", ""
obs.economy.cash            # int — current funds
obs.military.army_value     # int — total army value
obs.units                   # list[UnitInfoModel]
obs.buildings               # list[BuildingInfoModel]
obs.visible_enemies         # list[UnitInfoModel]
obs.visible_enemy_buildings # list[BuildingInfoModel]
obs.production              # list[ProductionInfoModel]
obs.available_production    # list[str]
obs.spatial_map             # str (base64-encoded spatial tensor)
obs.map_info                # MapInfoModel
```

### `OpenRAAction`

Action model containing a list of commands.

```python
from openra_env.models import OpenRAAction, CommandModel, ActionType

action = OpenRAAction(commands=[
    CommandModel(action=ActionType.MOVE, actor_id=1, target_x=50, target_y=30),
    CommandModel(action=ActionType.TRAIN, item_type="e1"),
])
```

### `CommandModel`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `ActionType` | Action type enum |
| `actor_id` | `int` | Subject actor ID |
| `target_actor_id` | `int` | Target actor ID |
| `target_x` | `int` | Target cell X |
| `target_y` | `int` | Target cell Y |
| `item_type` | `str` | Item type for production |
| `queued` | `bool` | Queue after current activity |

## gRPC Interface

For direct gRPC access (port 9999), the service is defined in `rl_bridge.proto`:

```protobuf
service RLBridge {
  // Bidirectional streaming: observations ↔ actions
  rpc GameSession(stream AgentAction) returns (stream GameObservation);

  // Unary: query game state on demand
  rpc GetState(StateRequest) returns (GameState);
}
```

### Using gRPC Directly

```python
from openra_env.server.bridge_client import BridgeClient

async with BridgeClient("localhost:9999") as client:
    async for obs in client.game_session():
        action = agent.decide(obs)
        await client.send_action(action)
```

## OpenEnv Protocol

OpenRA-RL implements the [OpenEnv](https://huggingface.co/openenv) specification, making it compatible with any OpenEnv client:

```python
from openenv import Environment

env = Environment(base_url="http://localhost:8000")
result = await env.reset()
result = await env.step(action)
```

## MCP Tools (48 total)

All tools are available through the MCP server, the WebSocket client, and the LLM agent.

### Read (8 tools)
| Tool | Description |
|------|-------------|
| `get_game_state()` | Full game state: economy, units, buildings, enemies |
| `get_economy()` | Cash, ore, power, harvesters |
| `get_units()` | Your units with positions, health, type |
| `get_buildings()` | Your buildings with production, power |
| `get_enemies()` | Visible enemy units and buildings |
| `get_production()` | Current queue and available builds |
| `get_map_info()` | Map dimensions and metadata |
| `get_exploration_status()` | Fog-of-war: explored %, quadrants |

### Knowledge (4 tools)
| Tool | Description |
|------|-------------|
| `lookup_unit(unit_type)` | Stats for a unit (e.g. `"3tnk"`) |
| `lookup_building(building_type)` | Stats for a building (e.g. `"weap"`) |
| `lookup_tech_tree(faction)` | Full build order for `"allied"` or `"soviet"` |
| `lookup_faction(faction)` | All units and buildings for a faction |

### Bulk Knowledge (3 tools)
| Tool | Description |
|------|-------------|
| `get_faction_briefing()` | All units and buildings for your faction with full stats |
| `get_map_analysis()` | Strategic map: resources, terrain, chokepoints |
| `batch_lookup(queries)` | Batch multiple lookups in one call |

### Planning (4 tools)
| Tool | Description |
|------|-------------|
| `get_opponent_intel()` | AI behavioral profile and counters |
| `start_planning_phase()` | Begin planning with enriched game data |
| `end_planning_phase(strategy)` | Commit strategy and start gameplay |
| `get_planning_status()` | Check planning phase state |

### Game Control (1 tool)
| Tool | Description |
|------|-------------|
| `advance(ticks)` | Advance game by N ticks (~25 ticks = 1 second) |

### Movement (4 tools)
| Tool | Description |
|------|-------------|
| `move_units(unit_ids, target_x, target_y)` | Move units to position |
| `attack_move(unit_ids, target_x, target_y)` | Move, engaging enemies en route |
| `attack_target(unit_ids, target_actor_id)` | Attack a specific enemy |
| `stop_units(unit_ids)` | Stop units |

### Production (3 tools)
| Tool | Description |
|------|-------------|
| `build_unit(unit_type, count)` | Train units at production buildings |
| `build_structure(building_type)` | Start building construction |
| `build_and_place(building_type)` | Build and auto-place (easiest) |

### Building Actions (11 tools)
| Tool | Description |
|------|-------------|
| `place_building(building_type, cell_x, cell_y)` | Place a completed building |
| `cancel_production(item_type)` | Cancel unit/building production |
| `deploy_unit(unit_id)` | Deploy unit (e.g. MCV → CY) |
| `sell_building(building_id)` | Sell for partial refund |
| `repair_building(building_id)` | Toggle repair |
| `set_rally_point(building_id, cell_x, cell_y)` | Auto-send new units here |
| `guard_target(unit_ids, target_actor_id)` | Guard a specific actor |
| `set_stance(unit_ids, stance)` | Set stance: holdfire, returnfire, etc. |
| `harvest(unit_id, cell_x, cell_y)` | Send harvester to location |
| `power_down(building_id)` | Toggle power to save electricity |
| `set_primary(building_id)` | Set as primary production facility |

### Placement (1 tool)
| Tool | Description |
|------|-------------|
| `get_valid_placements(building_type)` | Valid placement locations |

### Unit Groups (4 tools)
| Tool | Description |
|------|-------------|
| `assign_group(group_name, unit_ids)` | Create a named group |
| `add_to_group(group_name, unit_ids)` | Add to existing group |
| `get_groups()` | List all groups |
| `command_group(group_name, command_type, ...)` | Command a group |

### Compound (2 tools)
| Tool | Description |
|------|-------------|
| `batch(actions)` | Execute multiple actions in one tick |
| `plan(steps)` | Execute steps sequentially with state refresh |

### Utility (2 tools)
| Tool | Description |
|------|-------------|
| `get_replay_path()` | Path to current replay file |
| `surrender()` | Surrender the game |

### Terrain (1 tool)
| Tool | Description |
|------|-------------|
| `get_terrain_at(cell_x, cell_y)` | Terrain type at a cell |
