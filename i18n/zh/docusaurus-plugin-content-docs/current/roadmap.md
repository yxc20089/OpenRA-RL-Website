---
sidebar_position: 8
title: 发展路线图
---

# 发展路线图

## 当前版本：v0.2.0

OpenRA-RL 已完成 8 个开发冲刺，共 418 项测试全部通过。

### v0.2.0 新增内容

- **一行安装**：`pip install openra-rl && openra-rl play`
- **交互式 CLI**，内置配置向导、Docker 管理和诊断工具
- **预构建 Docker 镜像**，托管于 GHCR（告别 20 分钟的漫长编译）
- **标准 MCP 服务器**（stdio），支持 OpenClaw 和 Claude Desktop
- **已发布至 [PyPI](https://pypi.org/project/openra-rl/)**、[GHCR](https://ghcr.io/yxc20089/openra-rl) 和 [ClawHub](https://clawhub.ai/skill/openra-rl)
- **CI/CD**：GitHub Actions 自动化测试、Docker 发布和 PyPI 发布

### 已完成功能

| 功能 | 状态 | 冲刺 |
|------|------|------|
| Protobuf 协议 + gRPC 桥接 | 完成 | 1 |
| C# 游戏引擎集成（ExternalBotBridge） | 完成 | 1 |
| Python 环境封装（OpenEnv） | 完成 | 1 |
| 单元测试 + 集成测试（80 项） | 完成 | 2 |
| 端到端实战验证 | 完成 | 2 |
| Docker 镜像 + Compose 部署 | 完成 | 3 |
| Null Platform（无头模式，3% CPU） | 完成 | 3 |
| 增强型观测（空间张量、单位属性） | 完成 | 4 |
| 21 种操作类型（守卫、姿态、运输、电力） | 完成 | 4 |
| 实时桥接（非阻塞，约 25 tick/秒） | 完成 | 5 |
| 战前规划阶段 + 情报工具 | 完成 | 5 |
| 批量情报工具（阵营简报、地图分析） | 完成 | 5 |
| 智能体修复（自动放置、生产验证） | 完成 | 6 |
| 统一 YAML 配置 + 本地模型支持 | 完成 | 7 |
| CLI 入口（`openra-rl play`） | 完成 | 8 |
| MCP stdio 服务器 + OpenClaw 技能 | 完成 | 8 |
| 预构建 Docker 镜像（GHCR） | 完成 | 8 |
| PyPI 包 + CI/CD 工作流 | 完成 | 8 |

### 支持的游戏

| 属性 | 值 |
|------|-----|
| 游戏 | Red Alert（OpenRA mod） |
| 地图 | 默认 RA 地图 |
| 玩家 | 1v1（智能体 vs 内置 AI） |
| AI 难度 | Easy、Normal、Hard |
| 阵营 | 盟军、苏军（自动检测） |

---

## 未来里程碑

### v0.3 — OpenRA-Bench + 多智能体

- **OpenRA-Bench**：HuggingFace Space 排行榜，用于智能体评估
  - 标准化评估协议（地图、对手、指标）
  - 回放数据收集与验证
  - 社区提交
- **多智能体支持**：智能体对战
- **评估脚本**：自动化 N 局基准测试，带指标导出

### v0.4 — 强化学习训练管线

- **PPO/SAC 集成**：基于 TRL 和 Stable Baselines3 的训练脚本
- **奖励塑形**：可配置的多分量奖励函数
- **课程学习**：渐进式难度提升（Easy → Normal → Hard）
- **观测编码器**：CNN 处理空间张量、Transformer 处理实体列表

### v1.0 — 稳定发布版

- **稳定 API**：版本化 Protobuf 协议，向后兼容
- **完整文档**：API 文档、教程、研究指南
- **社区基准**：发布常用智能体的基线测试结果
- **多 mod 支持**：不止 Red Alert（Tiberian Dawn、Dune 2000）
- **回放查看器**：基于 Web 的 OpenRA-Bench 回放可视化

---

## 参与贡献

我们欢迎各位指挥官参与贡献！以下领域需要增援：

- **智能体实现**：新型机器人架构（MCTS、层次化 RL、自我博弈）
- **观测编码器**：处理游戏状态的神经网络架构
- **文档**：教程、指南和示例
- **测试**：边界情况、压力测试、多平台验证

请访问 [GitHub 仓库](https://github.com/yxc20089/OpenRA-RL) 查看待解决的 issue。
