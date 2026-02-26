---
sidebar_position: 8
title: Roadmap
---

# Roadmap

## Current Version: v0.4.0

OpenRA-RL has completed 11 development sprints with 515+ tests passing across 4 repos.

### What's New in v0.4.0

- **OpenRA-Bench leaderboard**: Live on [HuggingFace Spaces](https://huggingface.co/spaces/openra-rl/OpenRA-Bench) — ranked agent comparison with filtering by type and difficulty
- **Auto-upload**: Game results automatically submitted to the leaderboard after `openra-rl play`
- **Custom agent identity**: Name your agent, declare its type, and link to your GitHub repo
- **Replay uploads & downloads**: Submit replays with results; download them from the leaderboard
- **CLI bench submit**: `openra-rl bench submit result.json --replay game.orarep`
- **Custom agent export**: `build_bench_export()` helper for RL, CNN, and multi-agent systems
- **5 opponent tiers**: Beginner, Easy, Medium, Normal, Hard

### What's New in v0.3.1

- **Multi-dimensional reward vector**: 8-dimensional reward signal (combat, economy, infrastructure, intelligence, composition, tempo, disruption, outcome) for richer RL training
- **Damage matrix**: Unit effectiveness lookup table derived from weapon YAML data — enables cost-aware combat evaluation
- **OpenRA-RL-Util**: New shared utility library ([openra-rl-util](https://github.com/yxc20089/OpenRA-RL-Util)) powering reward computation, scoring rubrics, and damage analysis across the ecosystem
- **OpenRA-Bench scoring fix**: Eliminated scoring formula duplication — single source of truth in openra-rl-util
- **OpenRA-Bench test suite**: 25 tests covering leaderboard app and evaluation harness

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
| Replay viewer (VNC-in-Docker, browser-based) | Done | 9 |
| Local server mode (`--local` flag) | Done | 9 |
| Engine version management + replay manifest | Done | 9 |
| Multi-dimensional reward vector (8 dimensions) | Done | 10 |
| Damage matrix (unit effectiveness data) | Done | 10 |
| Shared utility library (openra-rl-util) | Done | 10 |
| OpenRA-Bench scoring fix + test suite | Done | 10 |
| OpenRA-Bench HuggingFace Space deployment | Done | 11 |
| Auto-upload + CLI bench submit | Done | 11 |
| Custom agent identity (name, type, URL) | Done | 11 |
| Replay uploads and leaderboard downloads | Done | 11 |
| Custom agent export helper (`bench_export`) | Done | 11 |
| 5 opponent tiers (Beginner → Hard) | Done | 11 |

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

### v0.5 — Multi-Agent + Training

- **Multi-agent support**: Agent vs Agent matches
- **ScriptedBot extraction**: Move ScriptedBot from examples to library

### v0.6 — RL Training Pipelines

- **PPO/SAC integration**: Training scripts with TRL and Stable Baselines3
- **Reward vector training**: Use 8-dimensional reward for multi-objective RL
- **Curriculum learning**: Progressive difficulty (Easy → Normal → Hard)
- **Observation encoders**: CNN for spatial tensor, Transformer for entity lists

### v1.0 — Stable Release

- **Stable API**: Versioned Protobuf schema with backwards compatibility
- **Full documentation**: API docs, tutorials, research guides
- **Community benchmarks**: Published baseline results for common agents
- **Multi-mod support**: Beyond Red Alert (Tiberian Dawn, Dune 2000)
- **Replay analytics**: Post-game analysis and metrics from replay data

---

## Contributing

We welcome contributions! Areas where help is needed:

- **Agent implementations**: New bot architectures (MCTS, hierarchical RL, self-play)
- **Observation encoders**: Neural network architectures for processing game state
- **Documentation**: Tutorials, guides, and examples
- **Testing**: Edge cases, stress tests, multi-platform verification

See the [GitHub repository](https://github.com/yxc20089/OpenRA-RL) for open issues.
