---
sidebar_position: 1
title: 快速上手
---

# 快速上手

OpenRA-RL 让你指挥 AI 智能体征战红色警戒——经典即时战略游戏。LLM、脚本机器人或强化学习智能体可以通过简洁的 Python API 建造基地、训练部队并投入战斗。

## 快速开始（pip 安装）

最快的参战方式：

```bash
pip install openra-rl
openra-rl play
```

首次运行时，交互式向导会引导你选择 LLM 供应商：

```
Welcome to OpenRA-RL!
Let's set up your LLM provider.

Choose provider:
  [1] OpenRouter (cloud — Claude, GPT, Qwen, Mistral, etc.)
  [2] Ollama (local, free)
  [3] LM Studio (local, free)
```

CLI 会自动拉取游戏服务器 Docker 镜像并启动所有组件。

### 前置条件

- **Docker** — 游戏服务器运行在容器中（[安装指南](https://docs.docker.com/get-docker/)）
- **Python 3.10+**
- 一个 LLM 端点（云端 API 密钥或本地模型服务器）

### 跳过向导

直接传入参数即可跳过交互式配置：

```bash
# 云端（OpenRouter）
openra-rl play --provider openrouter --api-key sk-or-... --model anthropic/claude-sonnet-4-20250514

# 本地（Ollama — 免费，无需 API 密钥）
openra-rl play --provider ollama --model qwen3:32b

# 本地（LM Studio）
openra-rl play --provider lmstudio --model <model-name>
```

### 检查部署状态

```bash
openra-rl doctor
```

此命令会检验 Docker、Python、已保存的配置以及服务器状态。

## CLI 命令参考

```
openra-rl play         运行 LLM 智能体（首次使用时启动向导）
openra-rl config       重新运行配置向导
openra-rl server       start | stop | status | logs
openra-rl mcp-server   启动 MCP stdio 服务器（用于 OpenClaw / Claude Desktop）
openra-rl doctor       检查系统前置条件
openra-rl version      输出版本号
```

## MCP 服务器（OpenClaw / Claude Desktop）

OpenRA-RL 以标准 MCP 服务器的形式暴露全部 48 个游戏工具：

```bash
openra-rl mcp-server
```

将以下内容添加到你的 MCP 客户端配置中：

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

或从 ClawHub 安装：
```bash
clawhub install openra-rl
```

然后直接对话：_"开始一局简单难度的红色警戒，建造基地，消灭敌军。"_

## 运行示例

如需更精细的控制，可以直接在运行中的服务器上执行示例智能体：

### 脚本机器人
一个硬编码的状态机机器人，演示所有操作类型：

```bash
openra-rl server start
python examples/scripted_bot.py --verbose
```

### MCP 机器人
一个具备规划能力的机器人，利用知识工具制定作战策略：

```bash
python examples/mcp_bot.py --verbose
```

### LLM 智能体
由 Claude/GPT 驱动的智能体，能对战场态势进行推理分析：

```bash
python examples/llm_agent.py --config examples/config-ollama.yaml --verbose
```

## 本地开发（不使用 Docker）

如果你更倾向于原生运行游戏引擎：

### 1. 安装依赖

```bash
# Python 环境
pip install -e ".[dev]"

# .NET SDK（OpenRA 需要 .NET 8.0 — 或使用 DOTNET_ROLL_FORWARD=LatestMajor 搭配 .NET 10）
# macOS: brew install dotnet-sdk

# 原生库（macOS arm64）
brew install sdl2 openal-soft freetype luajit
```

### 2. 构建 OpenRA

```bash
cd OpenRA
make all
cd ..
```

### 3. 启动环境

```python
import asyncio
from openra_env.client import OpenRAEnv

async def main():
    async with OpenRAEnv("http://localhost:8000") as env:
        obs = await env.reset()
        print(f"Game started on {obs.map_info.map_name}")
        print(f"Cash: {obs.economy.cash}, Units: {len(obs.units)}")

        while not obs.done:
            # 在此编写你的智能体逻辑
            action = {"commands": []}
            obs = await env.step(action)

        print(f"Game over! Result: {obs.result}")

asyncio.run(main())
```

## 下一步

- [系统架构](/docs/architecture) — 了解三仓库设计方案
- [观测空间](/docs/observation-space) — 你的智能体能看到什么
- [动作空间](/docs/action-space) — 你的智能体能执行什么
- [智能体类型](/docs/agents) — 脚本、MCP 和 LLM 智能体架构
- [Docker 部署](/docs/docker) — 服务器管理与部署
