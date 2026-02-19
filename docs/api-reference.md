---
sidebar_position: 7
title: API Reference
---

# API Reference

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

## Knowledge Tools (Planning Phase)

Available during the pre-game planning phase:

| Tool | Description |
|------|-------------|
| `get_opponent_intel(difficulty)` | AI behavioral profile and counters |
| `get_faction_briefing()` | All units and buildings for your faction |
| `get_map_analysis()` | Spatial tensor analysis: resources, terrain, chokepoints |
| `batch_lookup(queries)` | Batch multiple knowledge lookups |
| `start_planning_phase()` | Begin planning with enriched game data |
| `end_planning_phase(strategy)` | Commit strategy and start the game |
