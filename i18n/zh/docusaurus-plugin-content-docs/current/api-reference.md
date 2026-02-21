---
sidebar_position: 7
title: API 参考手册
---

# API 参考手册

## CLI 命令行工具

从 PyPI 安装：

```bash
pip install openra-rl
```

| 命令 | 说明 |
|------|------|
| `openra-rl play` | 运行 LLM 智能体（首次使用时启动交互式向导） |
| `openra-rl config` | 重新运行配置向导 |
| `openra-rl server start` | 启动 Docker 游戏服务器 |
| `openra-rl server stop` | 停止游戏服务器 |
| `openra-rl server status` | 检查服务器状态 |
| `openra-rl server logs [-f]` | 查看服务器日志 |
| `openra-rl mcp-server` | 启动 MCP stdio 服务器 |
| `openra-rl doctor` | 检查前置依赖 |
| `openra-rl version` | 显示版本号 |

### `openra-rl play` 参数

| 参数 | 说明 |
|------|------|
| `--provider` | LLM 提供商：`openrouter`、`ollama`、`lmstudio` |
| `--model` | 模型 ID（例如 `qwen3:32b`） |
| `--api-key` | 云端提供商的 API 密钥 |
| `--difficulty` | AI 对手难度：`easy`、`normal`、`hard` |
| `--port` | 游戏服务器端口（默认：8000） |
| `--server-url` | 连接到已有服务器（跳过 Docker 启动） |
| `--verbose` | 详细输出 |

## MCP 服务器

OpenRA-RL 通过标准 MCP 协议（stdio 传输）暴露全部 48 个游戏工具：

```bash
openra-rl mcp-server
```

MCP 客户端配置（OpenClaw、Claude Desktop 等）：
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

也可在 [ClawHub](https://clawhub.ai/skill/openra-rl) 上获取：`clawhub install openra-rl`

## Python 客户端

### `OpenRAEnv`

与 OpenRA-RL 游戏服务器交互的主客户端类。

```python
from openra_env.client import OpenRAEnv

async with OpenRAEnv(base_url="http://localhost:8000") as env:
    obs = await env.reset()
    obs = await env.step(action)
```

#### 方法

| 方法 | 返回类型 | 说明 |
|------|----------|------|
| `reset()` | `OpenRAObservation` | 开始新的游戏回合 |
| `step(action)` | `OpenRAObservation` | 发送指令并接收下一帧观测 |
| `state()` | `GameState` | 查询当前游戏状态（不执行操作） |

### `OpenRAObservation`

包含单个 tick 全部观测数据的 Pydantic 模型。

```python
obs.tick                    # int — 当前游戏 tick
obs.done                    # bool — 游戏是否结束？
obs.result                  # str — "win"、"lose"、"draw"、""
obs.economy.cash            # int — 当前资金
obs.military.army_value     # int — 总军队价值
obs.units                   # list[UnitInfoModel]
obs.buildings               # list[BuildingInfoModel]
obs.visible_enemies         # list[UnitInfoModel]
obs.visible_enemy_buildings # list[BuildingInfoModel]
obs.production              # list[ProductionInfoModel]
obs.available_production    # list[str]
obs.spatial_map             # str (base64 编码的空间张量)
obs.map_info                # MapInfoModel
```

### `OpenRAAction`

包含指令列表的操作模型。

```python
from openra_env.models import OpenRAAction, CommandModel, ActionType

action = OpenRAAction(commands=[
    CommandModel(action=ActionType.MOVE, actor_id=1, target_x=50, target_y=30),
    CommandModel(action=ActionType.TRAIN, item_type="e1"),
])
```

### `CommandModel`

| Field | Type | 说明 |
|-------|------|------|
| `action` | `ActionType` | 操作类型枚举 |
| `actor_id` | `int` | 执行操作的单位 ID |
| `target_actor_id` | `int` | 目标单位 ID |
| `target_x` | `int` | 目标格子 X 坐标 |
| `target_y` | `int` | 目标格子 Y 坐标 |
| `item_type` | `str` | 生产项目类型 |
| `queued` | `bool` | 是否排队到当前活动之后 |

## gRPC 接口

直接 gRPC 访问（端口 9999），服务定义在 `rl_bridge.proto` 中：

```protobuf
service RLBridge {
  // Bidirectional streaming: observations ↔ actions
  rpc GameSession(stream AgentAction) returns (stream GameObservation);

  // Unary: query game state on demand
  rpc GetState(StateRequest) returns (GameState);
}
```

### 直接使用 gRPC

```python
from openra_env.server.bridge_client import BridgeClient

async with BridgeClient("localhost:9999") as client:
    async for obs in client.game_session():
        action = agent.decide(obs)
        await client.send_action(action)
```

## OpenEnv 协议

OpenRA-RL 实现了 [OpenEnv](https://huggingface.co/openenv) 规范，可与任何 OpenEnv 客户端兼容：

```python
from openenv import Environment

env = Environment(base_url="http://localhost:8000")
result = await env.reset()
result = await env.step(action)
```

## MCP 工具（共 48 个）

所有工具均可通过 MCP 服务器、WebSocket 客户端和 LLM 智能体使用。

### 读取类（8 个工具）
| Tool | 说明 |
|------|------|
| `get_game_state()` | 完整游戏状态：经济、单位、建筑、敌军 |
| `get_economy()` | 资金、矿石、电力、采矿车 |
| `get_units()` | 己方单位及其位置、生命值、类型 |
| `get_buildings()` | 己方建筑及其生产状态、电力 |
| `get_enemies()` | 可见敌方单位和建筑 |
| `get_production()` | 当前生产队列和可用建造项 |
| `get_map_info()` | 地图尺寸和元数据 |
| `get_exploration_status()` | 战争迷雾：已探索百分比、象限信息 |

### 情报类（4 个工具）
| Tool | 说明 |
|------|------|
| `lookup_unit(unit_type)` | 查询单位数据（例如 `"3tnk"`） |
| `lookup_building(building_type)` | 查询建筑数据（例如 `"weap"`） |
| `lookup_tech_tree(faction)` | 查询 `"allied"` 或 `"soviet"` 的完整建造顺序 |
| `lookup_faction(faction)` | 查询某阵营的全部单位和建筑 |

### 批量情报类（3 个工具）
| Tool | 说明 |
|------|------|
| `get_faction_briefing()` | 获取己方阵营全部单位和建筑的完整数据 |
| `get_map_analysis()` | 战略地图分析：资源、地形、咽喉要道 |
| `batch_lookup(queries)` | 单次调用批量查询多项情报 |

### 规划类（4 个工具）
| Tool | 说明 |
|------|------|
| `get_opponent_intel()` | AI 对手行为分析及应对策略 |
| `start_planning_phase()` | 开始规划阶段，获取增强型游戏数据 |
| `end_planning_phase(strategy)` | 确认战略方案并开始作战 |
| `get_planning_status()` | 检查规划阶段状态 |

### 游戏控制类（1 个工具）
| Tool | 说明 |
|------|------|
| `advance(ticks)` | 推进游戏 N 个 tick（约 25 tick = 1 秒） |

### 移动类（4 个工具）
| Tool | 说明 |
|------|------|
| `move_units(unit_ids, target_x, target_y)` | 移动单位到指定位置 |
| `attack_move(unit_ids, target_x, target_y)` | 攻击移动，沿途交战 |
| `attack_target(unit_ids, target_actor_id)` | 攻击指定敌方目标 |
| `stop_units(unit_ids)` | 停止单位行动 |

### 生产类（3 个工具）
| Tool | 说明 |
|------|------|
| `build_unit(unit_type, count)` | 在生产建筑中训练单位 |
| `build_structure(building_type)` | 开始建造建筑 |
| `build_and_place(building_type)` | 建造并自动放置（最简方式） |

### 建筑操作类（11 个工具）
| Tool | 说明 |
|------|------|
| `place_building(building_type, cell_x, cell_y)` | 放置已完成的建筑 |
| `cancel_production(item_type)` | 取消单位/建筑生产 |
| `deploy_unit(unit_id)` | 部署单位（例如 MCV → 建造场） |
| `sell_building(building_id)` | 出售建筑获取部分退款 |
| `repair_building(building_id)` | 切换维修状态 |
| `set_rally_point(building_id, cell_x, cell_y)` | 设置集结点，新单位自动前往 |
| `guard_target(unit_ids, target_actor_id)` | 守卫指定目标 |
| `set_stance(unit_ids, stance)` | 设置姿态：holdfire、returnfire 等 |
| `harvest(unit_id, cell_x, cell_y)` | 派遣采矿车前往指定位置 |
| `power_down(building_id)` | 切换供电状态以节省电力 |
| `set_primary(building_id)` | 设为主要生产设施 |

### 放置类（1 个工具）
| Tool | 说明 |
|------|------|
| `get_valid_placements(building_type)` | 获取有效的建筑放置位置 |

### 单位编组类（4 个工具）
| Tool | 说明 |
|------|------|
| `assign_group(group_name, unit_ids)` | 创建命名编组 |
| `add_to_group(group_name, unit_ids)` | 添加单位到已有编组 |
| `get_groups()` | 列出所有编组 |
| `command_group(group_name, command_type, ...)` | 向编组下达指令 |

### 复合操作类（2 个工具）
| Tool | 说明 |
|------|------|
| `batch(actions)` | 在单个 tick 内执行多个操作 |
| `plan(steps)` | 按顺序执行步骤并刷新状态 |

### 实用工具类（2 个工具）
| Tool | 说明 |
|------|------|
| `get_replay_path()` | 获取当前回放文件路径 |
| `surrender()` | 投降 |

### 地形类（1 个工具）
| Tool | 说明 |
|------|------|
| `get_terrain_at(cell_x, cell_y)` | 查询指定格子的地形类型 |
