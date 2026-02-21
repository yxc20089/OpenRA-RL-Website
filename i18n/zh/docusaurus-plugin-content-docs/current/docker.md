---
sidebar_position: 6
title: Docker 部署
---

# Docker 部署

OpenRA-RL 在 GHCR 上提供预构建的 Docker 镜像，实现零编译即时部署。CLI 会自动管理容器，你也可以手动直接管理。

## 快速开始

最简方式 — CLI 全自动处理：

```bash
pip install openra-rl
openra-rl play
```

首次运行时会自动拉取 `ghcr.io/yxc20089/openra-rl:latest` 镜像。

## 服务器管理（CLI）

```bash
openra-rl server start              # 启动游戏服务器容器
openra-rl server start --port 9000  # 自定义端口
openra-rl server start --difficulty hard  # 高难度 AI 对手
openra-rl server status             # 检查运行状态
openra-rl server logs --follow      # 实时查看日志
openra-rl server stop               # 停止容器
```

服务器暴露的端口：
- **端口 8000** — HTTP/WebSocket（OpenEnv 协议）
- **端口 9999** — gRPC（直接桥接访问）

## 预构建镜像

| 镜像 | 说明 |
|------|------|
| `ghcr.io/yxc20089/openra-rl:latest` | 最新发布版本 |
| `ghcr.io/yxc20089/openra-rl:0.2.0` | 指定版本 |

手动拉取：
```bash
docker pull ghcr.io/yxc20089/openra-rl:latest
```

## Docker Compose（开发环境）

开发环境使用 docker-compose，compose 文件默认使用 GHCR 镜像，也可本地构建：

```yaml
services:
  openra-rl:
    image: ${OPENRA_RL_IMAGE:-ghcr.io/yxc20089/openra-rl:latest}
    build:
      context: .
      dockerfile: Dockerfile
```

### 服务组件

```bash
# 仅启动游戏服务器
docker compose up openra-rl

# LLM 智能体（容器化运行）
OPENROUTER_API_KEY=sk-or-... docker compose up agent

# MCP 机器人（容器化运行）
docker compose run mcp-bot

# 从源码构建而非拉取镜像
OPENRA_RL_IMAGE=openra-rl docker compose build
docker compose up openra-rl
```

## 无头模式（Null Platform）

用于强化学习训练，Null Platform 无需任何 GPU、显示器或音频即可运行 OpenRA：

- **CPU 占用**：约 3%（对比 Mesa 软件渲染的 400%）
- **无原生依赖**：无需 SDL2、OpenAL 或显示服务器
- **Docker 原生**：无需 Xvfb 等变通方案

Docker 镜像中通过 `Game.Platform=Null` 自动启用 Null Platform。

## 资源限制

Docker Compose 默认资源限制：
```yaml
deploy:
  resources:
    limits:
      cpus: '4'
      memory: 4G
```

根据你的训练配置在 `docker-compose.yaml` 中进行调整。

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `BOT_TYPE` | `normal` | AI 难度：easy、normal、hard |
| `AI_SLOT` | — | AI 玩家槽位配置 |
| `RECORD_REPLAYS` | `false` | 保存 `.orarep` 回放文件 |
| `DISPLAY` | `:99` | X11 显示（Null Platform 下忽略） |
| `DOTNET_ROLL_FORWARD` | `LatestMajor` | .NET 运行时版本策略 |

## 从源码构建

```bash
# 克隆仓库（含子模块）
git clone --recurse-submodules https://github.com/yxc20089/OpenRA-RL.git
cd OpenRA-RL

# 为当前平台构建
docker build -t openra-rl .

# 多平台构建
docker buildx build --platform linux/amd64,linux/arm64 -t openra-rl .
```

**注意**：在 `arm64` 架构上，Grpc.Tools 的 `protoc` 编译器会崩溃（SIGSEGV）。构建过程使用 `SKIP_PROTOC=true` 加载预生成的 C# protobuf 文件来规避此问题。

## 回放文件

游戏会在容器内保存 `.orarep` 回放文件。提取方法：
```bash
docker cp openra-rl-server:/root/.config/openra/Replays ./replays
```

## 健康检查

验证服务器是否正常运行：
```bash
curl http://localhost:8000/health
# 或者：
openra-rl server status
```
