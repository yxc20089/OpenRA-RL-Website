---
sidebar_position: 5
title: 智能体类型
---

# 智能体类型

OpenRA-RL 支持多种智能体架构，从简单的脚本机器人到 LLM 驱动的战略指挥官。

## 最快上手：`openra-rl play`

CLI 命令可零配置运行 LLM 智能体：

```bash
pip install openra-rl
openra-rl play
```

它会自动处理 Docker、配置和智能体循环。以下内容适用于需要更精细控制的指挥官。

## 脚本机器人

一个硬编码的状态机机器人（`examples/scripted_bot.py`），演示所有操作类型：

**作战阶段：**
1. **部署 MCV** — 展开建造车辆，设置初始单位的作战姿态
2. **建设基地** — 发电厂 → 兵营 → 矿石精炼厂 → 战车工厂
3. **训练部队** — 步兵 + APC，守卫建造场，装载运输车
4. **发起进攻** — 向敌方建筑攻击移动，卸载 APC
5. **持续作战** — 持续生产、维修、出售受损建筑

```bash
openra-rl server start
python examples/scripted_bot.py --verbose
```

适用场景：测试环境、了解操作类型、基准性能测试。

## MCP 机器人

一个具备规划能力的机器人（`examples/mcp_bot.py`），在战斗开始前使用情报工具进行侦察：

**战前规划阶段：**
1. 查询敌方情报（难度、行为特征）
2. 获取阵营简报（所有可用单位和建筑）
3. 分析战场地图（资源位置、地形、咽喉要道）
4. 根据情报制定作战方案

**战斗阶段：**
- 使用脚本逻辑执行既定战略
- 根据敌方攻击性调整建造顺序

```bash
python examples/mcp_bot.py --verbose
```

适用场景：演示战前规划阶段、情报工具集成。

## LLM 智能体

由任何 OpenAI 兼容模型驱动的 AI 智能体（`examples/llm_agent.py`）。支持云端 API（OpenRouter、OpenAI）和本地模型服务器（Ollama、LM Studio）。

**作战能力：**
- 读取战场观测并形成战略评估
- 使用 MCP 工具进行单位查询、科技树查询、地图分析
- 通过自然语言到指令的转换下达作战命令
- 根据战场态势动态调整战略
- 战前规划阶段配合敌方情报收集

```bash
# 最简方式 — CLI 全自动处理：
openra-rl play --provider ollama --model qwen3:32b

# 或直接运行脚本：
python examples/llm_agent.py --config examples/config-openrouter.yaml --verbose
```

### 配置方式

LLM 智能体支持多种配置方式：

```bash
# 环境变量
OPENROUTER_API_KEY=sk-or-... python examples/llm_agent.py

# 配置文件
python examples/llm_agent.py --config examples/config-ollama.yaml

# CLI 参数（优先级最高，覆盖所有其他配置）
python examples/llm_agent.py --base-url http://localhost:11434/v1/chat/completions --model qwen3:32b
```

示例配置文件：`config-openrouter.yaml`、`config-ollama.yaml`、`config-lmstudio.yaml`、`config-minimal.yaml`。

适用场景：LLM 游戏智能体研究、智能体强化学习探索。

## MCP 服务器（用于 OpenClaw / Claude Desktop）

OpenRA-RL 将全部 48 个游戏工具以标准 MCP 服务器形式暴露，任何 MCP 客户端均可接入作战：

```bash
openra-rl mcp-server
```

添加到你的 MCP 客户端配置：
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

或从 [ClawHub](https://clawhub.ai/skill/openra-rl) 安装：
```bash
clawhub install openra-rl
```

然后用自然语言下达指令：_"开始一局红色警戒，建造带防御工事的基地，击败敌人。"_

## 构建你自己的智能体

实现标准的 `reset/step` 循环：

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

或使用 MCP WebSocket 客户端进行基于工具的交互：

```python
from openra_env.mcp_ws_client import OpenRAMCPClient

async with OpenRAMCPClient("http://localhost:8000") as env:
    await env.reset()
    tools = await env.list_tools()     # 48 MCP tools
    state = await env.call_tool("get_game_state")
    await env.call_tool("build_and_place", building_type="powr")
    await env.call_tool("advance", ticks=500)
```

### 关键注意事项

- **实时性**：游戏以约每秒 25 tick 的速度运行，不会等待智能体。反应迟缓的智能体将错失战机。
- **阵营检测**：检查 `available_production` 来判断你是盟军还是苏军。
- **科技树**：战车工厂需要矿石精炼厂前置。建造顺序：`powr → barracks → proc → weap`。
- **建筑放置**：已完成的建筑必须使用 `PLACE_BUILDING` 放置。未放置的建筑会阻塞后续生产。使用 `build_and_place` 可自动放置。
