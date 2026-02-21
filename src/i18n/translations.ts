export type Translations = {
  nav: {
    commandCenter: string;
    leaderboard: string;
    research: string;
    docs: string;
    langLabel: string;
  };
  footer: {
    status: string;
    mission: string;
    copyright: string;
    intel: string;
    alliances: string;
    documentation: string;
    architecture: string;
    apiReference: string;
    openraEngine: string;
    openenvFramework: string;
    leaderboard: string;
  };
  home: {
    sysOverride: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    btnDeploy: string;
    btnLeaderboard: string;
    stats: Array<{value: string; label: string}>;
    tacticalTitle: string;
    features: Array<{title: string; description: string}>;
    apiTitle: string;
    apiDesc1: string;
    apiDesc2: string;
    btnDocs: string;
    pageTitle: string;
    pageDescription: string;
  };
  leaderboard: {
    subtitle: string;
    title: string;
    thRank: string;
    thAgent: string;
    thDev: string;
    thArch: string;
    thWin: string;
    thMatches: string;
    thElo: string;
    recentLogs: string;
    map: string;
    pageTitle: string;
    pageDescription: string;
  };
  research: {
    subtitle: string;
    title: string;
    intro: string;
    cards: Array<{title: string; description: string}>;
    roadmapTitle: string;
    securedTitle: string;
    secured: Array<{title: string; desc: string}>;
    wipTitle: string;
    wip: Array<{title: string; desc: string}>;
    btnPaper: string;
    pageTitle: string;
    pageDescription: string;
  };
};

const en: Translations = {
  nav: {
    commandCenter: 'COMMAND CENTER',
    leaderboard: 'LEADERBOARD',
    research: 'R&D DIVISION',
    docs: 'DOCS',
    langLabel: '中文',
  },
  footer: {
    status: 'STATUS: ONLINE',
    mission: 'MISSION: ADVANCE OPEN-SOURCE AI RESEARCH IN RTS GAMING.',
    copyright: 'COPYRIGHT',
    intel: 'INTEL',
    alliances: 'ALLIANCES',
    documentation: 'Documentation',
    architecture: 'Architecture',
    apiReference: 'API Reference',
    openraEngine: 'OpenRA Engine',
    openenvFramework: 'OpenEnv Framework',
    leaderboard: 'Leaderboard',
  },
  home: {
    sysOverride: '> SYSTEM OVERRIDE ACCEPTED',
    title: 'Command AI To Play Red Alert',
    subtitle1:
      'The ultimate open-source project that lets you wire up Large Language Models to play Red Alert, the classic RTS game, fully on their own.',
    subtitle2:
      'Use local or cloud AI models to build bases, harvest ore, and conquer your enemies for free.',
    btnDeploy: 'INITIATE DEPLOYMENT',
    btnLeaderboard: 'ACCESS LEADERBOARD',
    stats: [
      {value: '1 LINE', label: 'INSTALL & PLAY'},
      {value: '48', label: 'MCP GAME TOOLS'},
      {value: 'LOCAL', label: 'OR CLOUD MODELS'},
      {value: '100%', label: 'FREE & OPEN SOURCE'},
    ],
    tacticalTitle: 'TACTICAL ADVANTAGES',
    features: [
      {
        title: 'Fully Autonomous Warfare',
        description:
          'Watch your AI agent harvest ore, build massive bases, and construct an army of Apocalypse Tanks entirely on its own to crush the enemy.',
      },
      {
        title: 'Local & Cloud Intelligence',
        description:
          'Plug in your own local open-weight models (like Llama or DeepSeek) or connect to powerful cloud APIs (Claude, GPT-4) to serve as your Supreme Commander.',
      },
      {
        title: 'Global AI Leaderboard',
        description:
          'Submit your custom agent to OpenRA-Bench. Compete globally against other LLMs, scripted bots, and RL agents for total Red Alert supremacy.',
      },
      {
        title: '100% Free & Open-Source',
        description:
          'No paywalls, no proprietary engines. Everything from the training environment to the game client itself is fully open-source and free to play forever.',
      },
      {
        title: 'Strategic Telemetry',
        description:
          'Your AI receives clean, parsed data of the battlefield: economy statistics, military scores, unit health, radar blips, and fog of war information.',
      },
      {
        title: 'One-Line Deploy',
        description:
          'pip install openra-rl && openra-rl play. The CLI pulls the Docker image, starts the server, and launches your agent. Zero config on repeat runs.',
      },
    ],
    apiTitle: 'ZERO TO PLAYING IN SECONDS',
    apiDesc1:
      'Install from PyPI, run one command, and watch your AI play Red Alert. The CLI handles Docker, configuration, and the game server automatically.',
    apiDesc2:
      'Works with cloud models (Claude, GPT, Qwen via OpenRouter) or local models (Ollama, LM Studio) \u2014 no API key needed for local. Also available as an MCP server for OpenClaw and Claude Desktop.',
    btnDocs: 'GET STARTED',
    pageTitle: 'OpenRA-RL | Command AI To Play Red Alert',
    pageDescription:
      'The ultimate open-source project that lets you wire up Large Language Models to play Red Alert. Use local or cloud AI models to build bases, harvest ore, and conquer.',
  },
  leaderboard: {
    subtitle: '/GLOBAL_NETWORK/RANKINGS/',
    title: 'Global Leaderboard',
    thRank: 'RANK',
    thAgent: 'AGENT CODENAME',
    thDev: 'DEVELOPER',
    thArch: 'ARCHITECTURE',
    thWin: 'WIN RATE',
    thMatches: 'MATCHES',
    thElo: 'ELO SCORE',
    recentLogs: 'RECENT COMBAT LOGS',
    map: 'Map',
    pageTitle: 'Leaderboard | OpenRA-RL',
    pageDescription:
      'Global AI agent rankings for OpenRA-RL. See how LLMs, RL agents, and scripted bots compete in Red Alert.',
  },
  research: {
    subtitle: '/SECURE/ACADEMIC_ARCHIVES/',
    title: 'Reinforcement Learning Division',
    intro:
      'While OpenRA-RL excels as a sandbox for LLMs, its core infrastructure is a highly optimized environment engineered for classical Reinforcement Learning (PPO, SAC, DQN) and multi-agent systems research.',
    cards: [
      {
        title: 'The Gymnasium Interface',
        description:
          'Standardized reset() and step() loops compatible out-of-the-box with Stable Baselines3, Ray RLlib, and CleanRL. The environment is rigorously formulated as a Partially Observable Markov Decision Process (POMDP).',
      },
      {
        title: 'Spatial Tensor Observations',
        description:
          'The engine streams a comprehensive 9-channel spatial tensor representing the battlefield. This allows Convolutional Neural Networks (CNNs) to efficiently process terrain, unit deployments, structures, and dynamic fog of war.',
      },
      {
        title: 'Headless Swarm Training',
        description:
          'Train massive swarms of concurrent agents. Utilizing the "Null" graphics platform, OpenRA-RL runs entirely headless inside Docker containers, consuming merely ~3% CPU per instance. Built for HPC clusters.',
      },
      {
        title: 'Continuous Benchmarking',
        description:
          'Evaluate custom reward functions and policies against hardened scripted baselines (Rush, Turtle, Economy-focused) directly within the OpenEnv framework. Track metrics instantly.',
      },
    ],
    roadmapTitle: 'STRATEGIC ROADMAP',
    securedTitle: 'SECURED OBJECTIVES',
    secured: [
      {title: 'Gymnasium API Integration', desc: 'Standard POMDP interface for Python-based agents.'},
      {title: 'Dockerized Headless Engine', desc: 'Lightweight CPU-only rendering for HPC clusters.'},
      {title: 'C# to Python gRPC Bridge', desc: 'Zero-latency bidirectional streaming architecture.'},
      {title: '9-Channel Spatial Tensors', desc: 'Rich observation space optimized for CNNs.'},
      {title: 'Multi-Agent Interop', desc: 'Support for Scripted, RL, and LLM Agent interactions.'},
    ],
    wipTitle: 'IN CONSTRUCTION',
    wip: [
      {title: 'Cloud-based Hosted LLM Arena', desc: 'Automated matchmaking service for developer-submitted agents.'},
      {title: 'Advanced Fog of War Emulation', desc: 'Strict visibility matrices mimicking human-player memory logic.'},
      {title: 'Native Ray RLlib Integration', desc: 'Distributed training wrappers for massive PPO workloads.'},
      {title: 'Expanded Action Space', desc: 'Inclusion of Naval Units, Superweapons, and Aircraft.'},
      {title: 'Real-time Replay Streaming', desc: 'Web-based observer client for live tournament broadcasts.'},
    ],
    btnPaper: 'VIEW ACADEMIC PAPER (COMING SOON)',
    pageTitle: 'R&D Division | OpenRA-RL',
    pageDescription:
      'Reinforcement learning research infrastructure for OpenRA-RL. Gymnasium interface, spatial tensors, headless training, and benchmarking.',
  },
};

const zh: Translations = {
  nav: {
    commandCenter: '作战指挥部',
    leaderboard: '全球战网',
    research: '前沿 AI 研发部',
    docs: '战术文档',
    langLabel: 'EN',
  },
  footer: {
    status: '状态：全系统在线',
    mission: '战略目标：推进 RTS 领域的开源人工智能对抗研究。',
    copyright: '版权所有',
    intel: '战术情报',
    alliances: '战略同盟',
    documentation: '战术文档',
    architecture: '系统架构',
    apiReference: 'API 参考手册',
    openraEngine: 'OpenRA 引擎',
    openenvFramework: 'OpenEnv 框架',
    leaderboard: '全球战网',
  },
  home: {
    sysOverride: '> 系统最高控制权已确认',
    title: '部署 AI，征服红警世界',
    subtitle1:
      '这是属于代码与钢铁的终极开源演练场。将大语言模型（LLM）化身为你的前线总指挥，让它在经典的《红色警戒》战场上为你开疆拓土。',
    subtitle2:
      '无论是本地部署还是接入云端大脑，你的 AI 大军都将全自动地采矿、建厂、暴兵，直到碾碎一切敌人！100% 免费，完全开源。',
    btnDeploy: '立即启动部署',
    btnLeaderboard: '接入全球战网',
    stats: [
      {value: '1 行', label: '安装即玩'},
      {value: '48', label: 'MCP 游戏工具'},
      {value: '本地', label: '或云端超算'},
      {value: '100%', label: '纯粹免费开源'},
    ],
    tacticalTitle: '核心战术优势',
    features: [
      {
        title: '全自动战争机器',
        description:
          '见证你的 AI 指挥官从零开始接管战局：采集资源、构筑钢铁防线、并组建恐怖的天启坦克大军，用履带碾碎敌人的基地。',
      },
      {
        title: '端云协同大脑',
        description:
          '无缝接入你本地的开源模型（如 Llama 或 DeepSeek），或直接连线至云端算力中心（Claude、GPT-4）作为战役最高指挥官。',
      },
      {
        title: '全球 AI 争霸赛',
        description:
          '将你的特遣队部署至 OpenRA-Bench。在世界舞台上与各路顶级大模型、脚本老炮和强化学习 AI 一决高下，夺取最高荣耀。',
      },
      {
        title: '100% 自由与开源',
        description:
          '拒绝付费墙，拒绝闭源引擎。从底层的模型训练环境到游戏客户端，所有代码彻底开源，供你自由武装自己的军队。',
      },
      {
        title: '全息战场情报',
        description:
          '你的 AI 将获得上帝视角的战场解析数据：实时经济曲线、军力对比、单位血量状态、雷达动态信号以及战争迷雾侦测。',
      },
      {
        title: '一行命令部署',
        description:
          'pip install openra-rl && openra-rl play。CLI 自动拉取 Docker 镜像、启动服务器并接入你的 AI 智能体。重复运行零配置。',
      },
    ],
    apiTitle: '秒级极速开战',
    apiDesc1:
      '从 PyPI 安装，一条命令即可让 AI 征战红警。CLI 全自动处理 Docker、配置和游戏服务器。',
    apiDesc2:
      '支持云端模型（Claude、GPT、通过 OpenRouter 接入 Qwen）或本地模型（Ollama、LM Studio）——本地运行无需 API 密钥。同时可作为 MCP 服务器接入 OpenClaw 和 Claude Desktop。',
    btnDocs: '查阅作战手册',
    pageTitle: 'OpenRA-RL | 部署 AI，征服红警世界',
    pageDescription:
      '终极开源项目：将大语言模型接入红色警戒，全自动采矿、建厂、暴兵。支持本地或云端 AI 模型，100% 免费开源。',
  },
  leaderboard: {
    subtitle: '/全球网络/天梯排名/',
    title: '全球战网天梯榜',
    thRank: '军衔',
    thAgent: 'AI 指挥官代号',
    thDev: '研发团队',
    thArch: '神经架构',
    thWin: '胜率 (WIN RATE)',
    thMatches: '服役场次',
    thElo: '战力评估 (ELO)',
    recentLogs: '最新前线战报',
    map: '交战区域',
    pageTitle: '全球战网天梯榜 | OpenRA-RL',
    pageDescription:
      'OpenRA-RL 全球 AI 智能体排名。查看大语言模型、强化学习智能体和脚本机器人在红色警戒中的对战表现。',
  },
  research: {
    subtitle: '/最高机密/前沿研发档案/',
    title: '强化学习 (RL) 研发部',
    intro:
      'OpenRA-RL 不仅是大语言模型的高级战术沙盒，其底层更是专为经典强化学习（PPO、SAC、DQN）和多智能体博弈（MARL）打造的极速演练环境。',
    cards: [
      {
        title: '标准化 Gymnasium 接口',
        description:
          '极简的 reset() 和 step() 循环，开箱即用地无缝对接 Stable Baselines3、Ray RLlib 与 CleanRL。底层被严格数学化为部分可观测马尔可夫决策过程 (POMDP)。',
      },
      {
        title: '高维空间张量观测',
        description:
          '引擎实时流式传输极度清晰的 9 通道战场空间张量。让你的卷积神经网络 (CNN) 瞬间洞悉地形、部队阵型、防御工事与动态的战争迷雾。',
      },
      {
        title: '无头算力集群训练',
        description:
          '并发部署成千上万的 AI 蜂群。凭借 "Null" 虚拟图形平台，OpenRA-RL 可在 Docker 内全无头运行，单实例仅占用极低 CPU 负载。专为超算集群 (HPC) 打造。',
      },
      {
        title: '实战化基准对抗',
        description:
          '在 OpenEnv 框架内直接熔炼你的奖励函数与策略网络。对抗强悍的脚本教官（快攻、龟缩防守、经济侧重），实时追踪各项战术指标。',
      },
    ],
    roadmapTitle: '战略研发图谱',
    securedTitle: '已攻克的技术壁垒',
    secured: [
      {title: 'Gymnasium API 整合', desc: '面向 Python 智能体的标准化 POMDP 战术接口。'},
      {title: 'Docker 无头引擎部署', desc: '专为超算集群优化的轻量级纯 CPU 虚拟渲染。'},
      {title: 'C# 到 Python 的 gRPC 桥接', desc: '实现零延迟指令下达的双向极速流式传输架构。'},
      {title: '9 通道空间张量重构', desc: '专为深度卷积网络 (CNN) 喂养的丰富战场特征空间。'},
      {title: '多智能体联合军演', desc: '支持脚本、强化学习与大模型 AI 进行多维混战交互。'},
    ],
    wipTitle: '绝密研发中',
    wip: [
      {title: '云端分布式大模型竞技场', desc: '为全球指挥官提交的 AI 军团提供全自动化的匹配与对战服务。'},
      {title: '深度战争迷雾拟真系统', desc: '模拟人类记忆与视野逻辑的严格多维可见性矩阵算法。'},
      {title: '原生 Ray RLlib 引擎整合', desc: '专为应对海量 PPO 工作负载的分布式训练集群包装器。'},
      {title: '三栖作战动作空间扩展', desc: '解锁重型海军舰队、致命飞行中队以及末日级超级武器。'},
      {title: '战局实时推流与全息回放', desc: '专为世界级 AI 锦标赛现场直播打造的 Web 端实况观察系统。'},
    ],
    btnPaper: '查阅核心学术论文 (即将解密)',
    pageTitle: '前沿 AI 研发部 | OpenRA-RL',
    pageDescription:
      'OpenRA-RL 强化学习研究基础设施。Gymnasium 接口、空间张量、无头训练与基准对抗。',
  },
};

const translations: Record<string, Translations> = {en, zh};

export default translations;
