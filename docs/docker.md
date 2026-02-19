---
sidebar_position: 6
title: Docker Deployment
---

# Docker Deployment

OpenRA-RL provides Docker images for reproducible deployment and headless RL training.

## Quick Start

```bash
# Build the image
cd docker && bash build.sh && cd ..

# Start the game server
docker compose up openra-rl
```

The server exposes:
- **Port 8000** — HTTP/WebSocket (OpenEnv protocol)
- **Port 9999** — gRPC (direct bridge access)

## Docker Compose Services

```yaml
services:
  openra-rl:      # Game server
  agent:          # LLM agent (needs OPENROUTER_API_KEY)
  mcp-bot:        # MCP bot with planning tools
```

Run with an agent:
```bash
# Scripted bot (connect from host)
docker compose up openra-rl
python examples/scripted_bot.py

# LLM agent (containerized)
docker compose up openra-rl agent

# MCP bot (containerized)
docker compose up openra-rl mcp-bot
```

## Headless Mode (Null Platform)

For RL training, the Null Platform runs OpenRA without any GPU, display, or audio:

- **CPU usage**: ~3% (vs 400% with Mesa software rendering)
- **No native dependencies**: No SDL2, OpenAL, or display server needed
- **Docker-native**: No Xvfb workarounds required

The Null Platform is enabled automatically in the Docker image via `Game.Platform=Null`.

## Resource Limits

Default Docker Compose limits:
```yaml
deploy:
  resources:
    limits:
      cpus: '4'
      memory: 4G
```

Adjust in `docker-compose.yaml` based on your training setup.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AI_SLOT` | — | AI player slot configuration |
| `BOT_TYPE` | — | Built-in AI type |
| `RECORD_REPLAYS` | `false` | Save `.orarep` replay files |
| `DISPLAY` | `:99` | X11 display (ignored in Null Platform) |
| `DOTNET_ROLL_FORWARD` | `LatestMajor` | .NET runtime version policy |

## Building for Different Architectures

The Docker image supports both `amd64` and `arm64`:

```bash
# Build for current platform
docker build -f Dockerfile -t openra-rl .

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -t openra-rl .
```

**Note**: On `arm64`, the Grpc.Tools `protoc` compiler crashes (SIGSEGV). The build uses pre-generated C# protobuf files with `SKIP_PROTOC=true` to work around this.

## Health Check

Verify the server is running:
```bash
curl http://localhost:8000/health
```
