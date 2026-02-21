---
sidebar_position: 6
title: Docker Deployment
---

# Docker Deployment

OpenRA-RL provides pre-built Docker images on GHCR for zero-build deployment. The CLI manages the container automatically, but you can also manage it directly.

## Quick Start

The simplest way — the CLI handles everything:

```bash
pip install openra-rl
openra-rl play
```

This pulls `ghcr.io/yxc20089/openra-rl:latest` automatically on first run.

## Server Management (CLI)

```bash
openra-rl server start              # Start game server container
openra-rl server start --port 9000  # Custom port
openra-rl server start --difficulty hard  # Hard AI opponent
openra-rl server status             # Check if running
openra-rl server logs --follow      # Tail logs
openra-rl server stop               # Stop container
```

The server exposes:
- **Port 8000** — HTTP/WebSocket (OpenEnv protocol)
- **Port 9999** — gRPC (direct bridge access)

## Pre-built Images

| Image | Description |
|-------|-------------|
| `ghcr.io/yxc20089/openra-rl:latest` | Latest release |
| `ghcr.io/yxc20089/openra-rl:0.3.0` | Specific version |

Pull manually:
```bash
docker pull ghcr.io/yxc20089/openra-rl:latest
```

## Docker Compose (Development)

For development with docker-compose, the compose file defaults to the GHCR image but can build locally:

```yaml
services:
  openra-rl:
    image: ${OPENRA_RL_IMAGE:-ghcr.io/yxc20089/openra-rl:latest}
    build:
      context: .
      dockerfile: Dockerfile
```

### Services

```bash
# Game server only
docker compose up openra-rl

# LLM agent (containerized)
OPENROUTER_API_KEY=sk-or-... docker compose up agent

# MCP bot (containerized)
docker compose run mcp-bot

# Build from source instead of pulling
OPENRA_RL_IMAGE=openra-rl docker compose build
docker compose up openra-rl
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
| `BOT_TYPE` | `normal` | AI difficulty: easy, normal, hard |
| `AI_SLOT` | — | AI player slot configuration |
| `RECORD_REPLAYS` | `true` | Save `.orarep` replay files |
| `DISPLAY` | `:99` | X11 display (ignored in Null Platform) |
| `DOTNET_ROLL_FORWARD` | `LatestMajor` | .NET runtime version policy |

## Building from Source

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/yxc20089/OpenRA-RL.git
cd OpenRA-RL

# Build for current platform
docker build -t openra-rl .

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -t openra-rl .
```

**Note**: On `arm64`, the Grpc.Tools `protoc` compiler crashes (SIGSEGV). The build uses pre-generated C# protobuf files with `SKIP_PROTOC=true` to work around this.

## Replays

After each game, replays are automatically copied to `~/.openra-rl/replays/`.

### Watch replays in your browser

The replay viewer runs inside Docker using the same engine that recorded the game, streamed to your browser via VNC:

```bash
openra-rl replay watch              # Watch the latest replay (opens browser)
openra-rl replay watch <file>       # Watch a specific .orarep file
openra-rl replay list               # List replays (Docker + local)
openra-rl replay copy               # Copy replays from Docker to local
openra-rl replay stop               # Stop the replay viewer
```

No local game install needed — the viewer uses noVNC so it works in any browser.

### Version tracking

Each replay records which Docker image version was used. When you upgrade `openra-rl`, old replays are still viewable because the viewer automatically uses the original engine version from the manifest at `~/.openra-rl/replays/manifest.json`.

### Manual extraction

You can also copy replay files directly from the container:
```bash
docker cp openra-rl-server:/root/.config/openra/Replays ./replays
```

## Health Check

Verify the server is running:
```bash
curl http://localhost:8000/health
# Or:
openra-rl server status
```
