---
sidebar_position: 4
title: Action Space
---

# Action Space

Each step, the agent sends an `AgentAction` containing a list of `Command` messages.

## Command Structure

```protobuf
message Command {
  ActionType action = 1;
  uint32 actor_id = 2;        // Subject actor
  uint32 target_actor_id = 3; // Target actor
  int32 target_x = 4;         // Target cell X
  int32 target_y = 5;         // Target cell Y
  string item_type = 6;       // Item to build/train
  bool queued = 7;             // Queue after current activity
}
```

## Action Types

| ID | Action | Parameters | Description |
|----|--------|-----------|-------------|
| 0 | `NO_OP` | — | Do nothing |
| 1 | `MOVE` | `actor_id`, `target_x/y`, `queued` | Move unit to cell |
| 2 | `ATTACK_MOVE` | `actor_id`, `target_x/y`, `queued` | Move and attack enemies along the way |
| 3 | `ATTACK` | `actor_id`, `target_actor_id` | Attack a specific target |
| 4 | `STOP` | `actor_id` | Stop current activity |
| 5 | `HARVEST` | `actor_id`, `target_x/y` | Send harvester to resource field |
| 6 | `BUILD` | `item_type` | Start building production |
| 7 | `TRAIN` | `item_type` | Start unit production |
| 8 | `DEPLOY` | `actor_id` | Deploy MCV / unpack |
| 9 | `SELL` | `actor_id` | Sell building for refund |
| 10 | `REPAIR` | `actor_id` | Toggle building repair |
| 11 | `PLACE_BUILDING` | `target_x/y` | Place a completed building |
| 12 | `CANCEL_PRODUCTION` | `item_type` | Cancel queued production |
| 13 | `SET_RALLY_POINT` | `actor_id`, `target_x/y` | Set production rally point |
| 14 | `GUARD` | `actor_id`, `target_actor_id` | Guard another unit/building |
| 15 | `SET_STANCE` | `actor_id`, `target_x` | Set stance (0–3) |
| 16 | `ENTER_TRANSPORT` | `actor_id`, `target_actor_id` | Load into transport |
| 17 | `UNLOAD` | `actor_id` | Unload all passengers |
| 18 | `POWER_DOWN` | `actor_id` | Toggle building power |
| 19 | `SET_PRIMARY` | `actor_id` | Set primary production building |
| 20 | `SURRENDER` | — | Resign the game |

## Python Usage

```python
from openra_env.models import ActionType, CommandModel, OpenRAAction

# Move a unit
move_cmd = CommandModel(
    action=ActionType.MOVE,
    actor_id=unit.actor_id,
    target_x=50,
    target_y=30,
)

# Train infantry
train_cmd = CommandModel(
    action=ActionType.TRAIN,
    item_type="e1",
)

# Build a power plant
build_cmd = CommandModel(
    action=ActionType.BUILD,
    item_type="powr",
)

# Send multiple commands in one step
action = OpenRAAction(commands=[move_cmd, train_cmd, build_cmd])
obs = await env.step(action)
```

## Stance Values

| Value | Name | Behavior |
|-------|------|----------|
| 0 | HoldFire | Never auto-attack |
| 1 | ReturnFire | Only attack if attacked first |
| 2 | Defend | Attack enemies that enter range |
| 3 | AttackAnything | Aggressively pursue all enemies |

## Tips

- **Check `available_production`** before issuing BUILD or TRAIN commands — the server validates availability.
- **Building placement** requires a completed building in the production queue. Use `PLACE_BUILDING` with cell coordinates.
- **Queue commands** with `queued=true` to chain actions without interrupting the current activity.
- **Faction matters**: Allied barracks is `tent`, Soviet is `barr`. Check `available_production` to determine your faction's buildings.
