---
sidebar_position: 8
title: Roadmap
---

# Roadmap

## Current Version: v0.2.0

OpenRA-RL has completed 8 development sprints with 418 tests passing.

### What's New in v0.2.0

- **One-line install**: `pip install openra-rl && openra-rl play`
- **Interactive CLI** with setup wizard, Docker management, and diagnostics
- **Pre-built Docker images** on GHCR (no more 20-min builds)
- **Standard MCP server** (stdio) for OpenClaw and Claude Desktop
- **Published on [PyPI](https://pypi.org/project/openra-rl/)**, [GHCR](https://ghcr.io/yxc20089/openra-rl), and [ClawHub](https://clawhub.ai/skill/openra-rl)
- **CI/CD**: GitHub Actions for testing, Docker publish, and PyPI publish

### Completed Features

| Feature | Status | Sprint |
|---------|--------|--------|
| Protobuf schema + gRPC bridge | Done | 1 |
| C# game engine integration (ExternalBotBridge) | Done | 1 |
| Python environment wrapper (OpenEnv) | Done | 1 |
| Unit tests + integration tests (80 tests) | Done | 2 |
| Live end-to-end verification | Done | 2 |
| Docker images + Compose deployment | Done | 3 |
| Null Platform (headless, 3% CPU) | Done | 3 |
| Enriched observations (spatial tensor, unit stats) | Done | 4 |
| 21 action types (guard, stance, transport, power) | Done | 4 |
| Real-time bridge (non-blocking, ~25 ticks/sec) | Done | 5 |
| Pre-game planning phase + knowledge tools | Done | 5 |
| Bulk knowledge tools (faction briefing, map analysis) | Done | 5 |
| Agent fixes (auto-placement, production validation) | Done | 6 |
| Unified YAML config + local model support | Done | 7 |
| CLI entry point (`openra-rl play`) | Done | 8 |
| MCP stdio server + OpenClaw skill | Done | 8 |
| Pre-built Docker images on GHCR | Done | 8 |
| PyPI package + CI/CD workflows | Done | 8 |

### Supported Game

| Property | Value |
|----------|-------|
| Game | Red Alert (OpenRA mod) |
| Map | Default RA maps |
| Players | 1v1 (agent vs built-in AI) |
| AI Difficulties | Easy, Normal, Hard |
| Factions | Allied, Soviet (auto-detected) |

---

## Upcoming Milestones

### v0.3 — OpenRA-Bench + Multi-Agent

- **OpenRA-Bench**: HuggingFace Space leaderboard for agent evaluation
  - Standardized evaluation protocol (maps, opponents, metrics)
  - Replay data collection and verification
  - Community submissions
- **Multi-agent support**: Agent vs Agent matches
- **Evaluation scripts**: Automated N-game benchmarking with metrics export

### v0.4 — RL Training Pipelines

- **PPO/SAC integration**: Training scripts with TRL and Stable Baselines3
- **Reward shaping**: Configurable multi-component reward functions
- **Curriculum learning**: Progressive difficulty (Easy → Normal → Hard)
- **Observation encoders**: CNN for spatial tensor, Transformer for entity lists

### v1.0 — Stable Release

- **Stable API**: Versioned Protobuf schema with backwards compatibility
- **Full documentation**: API docs, tutorials, research guides
- **Community benchmarks**: Published baseline results for common agents
- **Multi-mod support**: Beyond Red Alert (Tiberian Dawn, Dune 2000)
- **Replay viewer**: Web-based replay visualization for OpenRA-Bench

---

## Contributing

We welcome contributions! Areas where help is needed:

- **Agent implementations**: New bot architectures (MCTS, hierarchical RL, self-play)
- **Observation encoders**: Neural network architectures for processing game state
- **Documentation**: Tutorials, guides, and examples
- **Testing**: Edge cases, stress tests, multi-platform verification

See the [GitHub repository](https://github.com/yxc20089/OpenRA-RL) for open issues.
