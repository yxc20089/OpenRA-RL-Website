---
sidebar_position: 3
title: Observation Space
---

# Observation Space

Each tick, the agent receives a `GameObservation` containing structured game state.

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `tick` | int | Current game tick |
| `episode_id` | string | Unique episode identifier |
| `done` | bool | Whether the game has ended |
| `reward` | float | Reward signal |
| `result` | string | `"win"`, `"lose"`, `"draw"`, or `""` |
| `available_production` | string[] | Items the player can currently produce |

## Economy

| Field | Type | Description |
|-------|------|-------------|
| `cash` | int | Current cash balance |
| `ore` | int | Ore in silos |
| `power_provided` | int | Total power generation |
| `power_drained` | int | Total power consumption |
| `resource_capacity` | int | Max ore storage |
| `harvester_count` | int | Number of active harvesters |

## Military

| Field | Type | Description |
|-------|------|-------------|
| `units_killed` | int | Enemy units destroyed |
| `units_lost` | int | Own units lost |
| `buildings_killed` | int | Enemy buildings destroyed |
| `buildings_lost` | int | Own buildings lost |
| `army_value` | int | Total value of active army |
| `active_unit_count` | int | Number of active units |
| `kills_cost` | int | Cost value of enemies killed |
| `deaths_cost` | int | Cost value of own losses |
| `assets_value` | int | Total asset value (units + buildings) |
| `experience` | int | Player experience points |
| `order_count` | int | Total orders issued |

## Units (`units` and `visible_enemies`)

Each unit provides:

| Field | Type | Description |
|-------|------|-------------|
| `actor_id` | uint32 | Unique actor identifier |
| `type` | string | Unit type (e.g., `"e1"`, `"1tnk"`, `"harv"`) |
| `pos_x`, `pos_y` | int | World position (WPos) |
| `cell_x`, `cell_y` | int | Grid cell position (CPos) |
| `hp_percent` | float | Health 0.0–1.0 |
| `is_idle` | bool | Currently idle |
| `current_activity` | string | Current activity name |
| `owner` | string | Player internal name |
| `can_attack` | bool | Has attack capability |
| `facing` | int | Direction (WAngle 0–1023) |
| `experience_level` | int | Veterancy level |
| `stance` | int | 0=HoldFire, 1=ReturnFire, 2=Defend, 3=AttackAnything |
| `speed` | int | Movement speed |
| `attack_range` | int | Max attack range (WDist) |
| `passenger_count` | int | Cargo count (-1 if N/A) |
| `ammo` | int | Ammo count (-1 if N/A) |
| `is_building` | bool | Always `false` for units |

## Buildings (`buildings` and `visible_enemy_buildings`)

| Field | Type | Description |
|-------|------|-------------|
| `actor_id` | uint32 | Unique actor identifier |
| `type` | string | Building type (e.g., `"powr"`, `"barr"`, `"weap"`) |
| `pos_x`, `pos_y` | int | World position |
| `cell_x`, `cell_y` | int | Grid cell position |
| `hp_percent` | float | Health 0.0–1.0 |
| `owner` | string | Player internal name |
| `is_producing` | bool | Currently producing |
| `production_progress` | float | Production progress 0.0–1.0 |
| `producing_item` | string | Item being produced |
| `is_powered` | bool | Has power |
| `is_repairing` | bool | Being repaired |
| `sell_value` | int | Refund if sold |
| `rally_x`, `rally_y` | int | Rally point cell (-1 if none) |
| `power_amount` | int | Power provided (positive) or consumed (negative) |
| `can_produce` | string[] | Items this building can produce |

## Production Queues

| Field | Type | Description |
|-------|------|-------------|
| `queue_type` | string | `"Building"`, `"Infantry"`, `"Vehicle"`, `"Aircraft"` |
| `item` | string | Actor type being produced |
| `progress` | float | 0.0–1.0 |
| `remaining_ticks` | int | Ticks until complete |
| `remaining_cost` | int | Remaining cost |
| `paused` | bool | Production paused |

## Spatial Map

A 9-channel spatial tensor encoded as binary float32 data in the `spatial_map` field.

| Channel | Index | Description |
|---------|-------|-------------|
| Terrain | 0 | Terrain type |
| Height | 1 | Elevation |
| Resources | 2 | Ore/gem density |
| Passability | 3 | Movement passability |
| Fog of War | 4 | Visibility |
| Own Buildings | 5 | Player building locations |
| Own Units | 6 | Player unit locations |
| Enemy Buildings | 7 | Visible enemy building locations |
| Enemy Units | 8 | Visible enemy unit locations |

**Shape**: `map_height x map_width x 9` (row-major, channels-last)

**Decoding in Python**:
```python
import numpy as np
import base64

spatial_bytes = base64.b64decode(obs.spatial_map)
spatial = np.frombuffer(spatial_bytes, dtype=np.float32)
spatial = spatial.reshape(obs.map_info.height, obs.map_info.width, obs.spatial_channels)
```
