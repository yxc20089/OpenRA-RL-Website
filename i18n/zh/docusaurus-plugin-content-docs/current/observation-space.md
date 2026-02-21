---
sidebar_position: 3
title: 观测空间
---

# 观测空间

每个 tick，智能体会收到一个包含结构化游戏状态的 `GameObservation`。

## 顶层字段

| Field | Type | 说明 |
|-------|------|------|
| `tick` | int | 当前游戏 tick |
| `episode_id` | string | 唯一回合标识符 |
| `done` | bool | 游戏是否已结束 |
| `reward` | float | 奖励信号 |
| `result` | string | `"win"`、`"lose"`、`"draw"` 或 `""` |
| `available_production` | string[] | 玩家当前可生产的项目 |

## 经济

| Field | Type | 说明 |
|-------|------|------|
| `cash` | int | 当前现金余额 |
| `ore` | int | 矿仓中的矿石 |
| `power_provided` | int | 总发电量 |
| `power_drained` | int | 总耗电量 |
| `resource_capacity` | int | 最大矿石存储容量 |
| `harvester_count` | int | 活跃矿车数量 |

## 军事

| Field | Type | 说明 |
|-------|------|------|
| `units_killed` | int | 击毁的敌方单位数 |
| `units_lost` | int | 损失的己方单位数 |
| `buildings_killed` | int | 摧毁的敌方建筑数 |
| `buildings_lost` | int | 损失的己方建筑数 |
| `army_value` | int | 现役部队总价值 |
| `active_unit_count` | int | 现役单位数量 |
| `kills_cost` | int | 击毁敌军的价值总计 |
| `deaths_cost` | int | 己方损失的价值总计 |
| `assets_value` | int | 总资产价值（单位 + 建筑） |
| `experience` | int | 玩家经验值 |
| `order_count` | int | 已下达的命令总数 |

## 单位（`units` 和 `visible_enemies`）

每个单位提供以下信息：

| Field | Type | 说明 |
|-------|------|------|
| `actor_id` | uint32 | 唯一 Actor 标识符 |
| `type` | string | 单位类型（如 `"e1"`、`"1tnk"`、`"harv"`） |
| `pos_x`, `pos_y` | int | 世界坐标（WPos） |
| `cell_x`, `cell_y` | int | 网格坐标（CPos） |
| `hp_percent` | float | 生命值 0.0–1.0 |
| `is_idle` | bool | 当前是否空闲 |
| `current_activity` | string | 当前活动名称 |
| `owner` | string | 玩家内部名称 |
| `can_attack` | bool | 是否具备攻击能力 |
| `facing` | int | 朝向（WAngle 0–1023） |
| `experience_level` | int | 老兵等级 |
| `stance` | int | 0=不开火, 1=还击, 2=防御, 3=主动攻击 |
| `speed` | int | 移动速度 |
| `attack_range` | int | 最大攻击范围（WDist） |
| `passenger_count` | int | 载员数（不适用时为 -1） |
| `ammo` | int | 弹药数（不适用时为 -1） |
| `is_building` | bool | 对于单位始终为 `false` |

## 建筑（`buildings` 和 `visible_enemy_buildings`）

| Field | Type | 说明 |
|-------|------|------|
| `actor_id` | uint32 | 唯一 Actor 标识符 |
| `type` | string | 建筑类型（如 `"powr"`、`"barr"`、`"weap"`） |
| `pos_x`, `pos_y` | int | 世界坐标 |
| `cell_x`, `cell_y` | int | 网格坐标 |
| `hp_percent` | float | 生命值 0.0–1.0 |
| `owner` | string | 玩家内部名称 |
| `is_producing` | bool | 当前是否在生产 |
| `production_progress` | float | 生产进度 0.0–1.0 |
| `producing_item` | string | 正在生产的项目 |
| `is_powered` | bool | 是否有电力供应 |
| `is_repairing` | bool | 是否正在维修 |
| `sell_value` | int | 出售退款金额 |
| `rally_x`, `rally_y` | int | 集结点坐标（无集结点时为 -1） |
| `power_amount` | int | 提供的电力（正值）或消耗的电力（负值） |
| `can_produce` | string[] | 该建筑可生产的项目列表 |

## 生产队列

| Field | Type | 说明 |
|-------|------|------|
| `queue_type` | string | `"Building"`、`"Infantry"`、`"Vehicle"`、`"Aircraft"` |
| `item` | string | 正在生产的 Actor 类型 |
| `progress` | float | 0.0–1.0 |
| `remaining_ticks` | int | 距完成剩余的 tick 数 |
| `remaining_cost` | int | 剩余费用 |
| `paused` | bool | 生产是否暂停 |

## 空间地图

一个 9 通道的空间张量，以二进制 float32 数据编码在 `spatial_map` 字段中。

| 通道 | 索引 | 说明 |
|------|------|------|
| Terrain | 0 | 地形类型 |
| Height | 1 | 海拔高度 |
| Resources | 2 | 矿石/宝石密度 |
| Passability | 3 | 移动通行性 |
| Fog of War | 4 | 可见度（战争迷雾） |
| Own Buildings | 5 | 己方建筑位置 |
| Own Units | 6 | 己方单位位置 |
| Enemy Buildings | 7 | 可见敌方建筑位置 |
| Enemy Units | 8 | 可见敌方单位位置 |

**维度**：`map_height x map_width x 9`（行优先，通道在最后）

**Python 解码方式**：
```python
import numpy as np
import base64

spatial_bytes = base64.b64decode(obs.spatial_map)
spatial = np.frombuffer(spatial_bytes, dtype=np.float32)
spatial = spatial.reshape(obs.map_info.height, obs.map_info.width, obs.spatial_channels)
```
