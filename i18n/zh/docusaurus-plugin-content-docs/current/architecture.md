---
sidebar_position: 2
title: 系统架构
---

# 系统架构

OpenRA-RL 通过 gRPC 桥接层连接三大组件：

![架构图](/img/architecture_diagram.png)

## 三仓库设计

| 仓库 | 语言 | 职责 |
|------|------|------|
| **OpenRA-RL** | Python | 环境封装、gRPC 客户端、智能体示例 |
| **OpenRA**（子模块） | C# | 内嵌 gRPC 服务器的改造版游戏引擎 |
| **OpenEnv** | Python | 提供标准化 Gymnasium 风格 API 的框架 |

## 数据流

```
Agent (Python)
  ↕ HTTP/WebSocket (OpenEnv protocol, port 8000)
Environment Wrapper (FastAPI)
  ↕ gRPC/Protobuf (bidirectional streaming, port 9999)
Game Engine (OpenRA + Kestrel)
  ↕ Native game logic
OpenRA World (C# actors, traits, orders)
```

## gRPC 桥接层

桥接层通过 ASP.NET Core Kestrel 嵌入 OpenRA 游戏引擎内部。关键设计决策：

- **静态 ActiveBridge 模式**：gRPC 服务器仅在 `Activate()` 时启动一次，而静态引用会在每次模组重载时更新。这避免了多个服务器实例导致的端口冲突。
- **DropOldest 通道策略**：游戏以约每秒 25 tick 的速度独立于智能体运行。观测通道采用"丢弃最旧"策略，确保较慢的智能体始终接收到最新状态。
- **非阻塞 tick**：游戏永远不会阻塞等待智能体。如果没有收到动作指令，游戏将以空操作继续推进。

### 关键 C# 文件

| 文件 | 用途 |
|------|------|
| `ExternalBotBridge.cs` | 主 trait（IBot、ITick），Kestrel gRPC 服务器 |
| `RLBridgeService.cs` | gRPC 服务实现 |
| `ObservationSerializer.cs` | World/Actor/Player 状态 → Protobuf 序列化 |
| `ActionHandler.cs` | Protobuf 命令 → OpenRA Orders 转换 |

### 关键 Python 文件

| 文件 | 用途 |
|------|------|
| `bridge_client.py` | 带后台观测读取器的异步 gRPC 客户端 |
| `openra_environment.py` | OpenEnv 环境（reset/step/state） |
| `openra_process.py` | 游戏引擎子进程管理器 |
| `models.py` | 观测与动作的 Pydantic 模型 |

## Protobuf 协议定义

标准协议定义位于 `proto/rl_bridge.proto`，包含：

- **`GameObservation`** — tick 级别状态：经济、军事、单位、建筑、空间地图、回合信号
- **`AgentAction`** — 待执行的命令列表
- **`GameState`** — 高层级游戏阶段查询

proto 文件同时编译为 Python（gRPC stubs）和 C#（为 Docker/CI 兼容性预生成）。

## 游戏生命周期

import GameStateDiagram from '@site/src/components/GameStateDiagram';

<GameStateDiagram />

1. **重置**：环境启动新地图，等待游戏初始化完成
2. **规划阶段**（可选）：智能体在采取行动前研究地图和对手情报
3. **游戏循环**：智能体每 tick 接收观测数据并发送动作指令
4. **游戏结束**：回合以胜利/失败/平局信号终结
