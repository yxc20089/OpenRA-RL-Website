---
sidebar_position: 4
title: 动作空间
---

# 动作空间

每一步，智能体发送一个包含 `Command` 消息列表的 `AgentAction`。

## 命令结构

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

## 动作类型

| ID | Action | 参数 | 说明 |
|----|--------|------|------|
| 0 | `NO_OP` | — | 无操作 |
| 1 | `MOVE` | `actor_id`, `target_x/y`, `queued` | 移动单位至指定格 |
| 2 | `ATTACK_MOVE` | `actor_id`, `target_x/y`, `queued` | 移动并沿途攻击敌军 |
| 3 | `ATTACK` | `actor_id`, `target_actor_id` | 攻击指定目标 |
| 4 | `STOP` | `actor_id` | 停止当前活动 |
| 5 | `HARVEST` | `actor_id`, `target_x/y` | 派遣矿车前往资源区 |
| 6 | `BUILD` | `item_type` | 开始建筑生产 |
| 7 | `TRAIN` | `item_type` | 开始训练单位 |
| 8 | `DEPLOY` | `actor_id` | 展开 MCV / 解包 |
| 9 | `SELL` | `actor_id` | 出售建筑获取退款 |
| 10 | `REPAIR` | `actor_id` | 切换建筑维修状态 |
| 11 | `PLACE_BUILDING` | `target_x/y` | 放置已完成的建筑 |
| 12 | `CANCEL_PRODUCTION` | `item_type` | 取消排队中的生产 |
| 13 | `SET_RALLY_POINT` | `actor_id`, `target_x/y` | 设置生产集结点 |
| 14 | `GUARD` | `actor_id`, `target_actor_id` | 护卫另一个单位/建筑 |
| 15 | `SET_STANCE` | `actor_id`, `target_x` | 设置姿态（0–3） |
| 16 | `ENTER_TRANSPORT` | `actor_id`, `target_actor_id` | 登入运输载具 |
| 17 | `UNLOAD` | `actor_id` | 卸下所有乘员 |
| 18 | `POWER_DOWN` | `actor_id` | 切换建筑电力开关 |
| 19 | `SET_PRIMARY` | `actor_id` | 设为主要生产建筑 |
| 20 | `SURRENDER` | — | 投降认输 |

## Python 用法

```python
from openra_env.models import ActionType, CommandModel, OpenRAAction

# 移动单位
move_cmd = CommandModel(
    action=ActionType.MOVE,
    actor_id=unit.actor_id,
    target_x=50,
    target_y=30,
)

# 训练步兵
train_cmd = CommandModel(
    action=ActionType.TRAIN,
    item_type="e1",
)

# 建造发电厂
build_cmd = CommandModel(
    action=ActionType.BUILD,
    item_type="powr",
)

# 在一步中发送多条命令
action = OpenRAAction(commands=[move_cmd, train_cmd, build_cmd])
obs = await env.step(action)
```

## 姿态值

| 值 | 名称 | 行为 |
|----|------|------|
| 0 | HoldFire | 永不自动开火 |
| 1 | ReturnFire | 仅在被攻击时还击 |
| 2 | Defend | 攻击进入射程内的敌人 |
| 3 | AttackAnything | 积极追击所有敌军 |

## 作战要诀

- **检查 `available_production`** 后再下达 BUILD 或 TRAIN 命令——服务器会验证可用性。
- **建筑放置**需要生产队列中有已完成的建筑。使用 `PLACE_BUILDING` 并指定格坐标。
- **队列命令**：设置 `queued=true` 可将动作排队执行，不会打断当前活动。
- **阵营有别**：盟军兵营是 `tent`，苏军兵营是 `barr`。通过 `available_production` 确认你所属阵营的建筑列表。
