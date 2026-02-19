import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

const features = [
  {
    icon: '🔗',
    title: 'gRPC Bridge',
    description:
      'Real-time bidirectional gRPC bridge between Python agents and the C# game engine. Non-blocking, ~25 ticks/sec.',
  },
  {
    icon: '🏋️',
    title: 'Gymnasium API',
    description:
      'Standard reset/step interface via OpenEnv. Drop-in compatible with RL training frameworks like TRL and Stable Baselines.',
  },
  {
    icon: '🗺️',
    title: 'Rich Observations',
    description:
      '9-channel spatial tensor, per-unit stats (facing, stance, range, veterancy), economy, military scores, and fog of war.',
  },
  {
    icon: '🎮',
    title: '21 Action Types',
    description:
      'Move, attack, build, train, deploy, guard, set stance, transport loading, power management, and more.',
  },
  {
    icon: '🤖',
    title: 'Multi-Agent Support',
    description:
      'Scripted bots, LLM agents (Claude/GPT), and RL policies. Pre-game planning phase with opponent intelligence.',
  },
  {
    icon: '🐳',
    title: 'Docker & Headless',
    description:
      'Null platform for headless training at 3% CPU. Docker Compose for one-command deployment.',
  },
];

const quickStart = `from openra_env.client import OpenRAEnv

async with OpenRAEnv("http://localhost:8000") as env:
    obs = await env.reset()           # Start a new game
    while not obs.done:
        action = agent.decide(obs)    # Your agent logic
        obs = await env.step(action)  # Execute and observe`;

function HeroSection(): ReactNode {
  return (
    <header className="hero hero--openra">
      <div className="container">
        <Heading as="h1" className="hero__title">
          OpenRA-RL
        </Heading>
        <p className="hero__subtitle">
          A Gymnasium-style reinforcement learning environment for the
          OpenRA real-time strategy engine. Train AI agents to build bases,
          command armies, and win games.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/yxc20089/OpenRA-RL">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsBar(): ReactNode {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-number">212+</span>
        <span className="stat-label">Tests Passing</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">21</span>
        <span className="stat-label">Action Types</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">9</span>
        <span className="stat-label">Spatial Channels</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">~25</span>
        <span className="stat-label">Ticks/Second</span>
      </div>
    </div>
  );
}

function FeatureGrid(): ReactNode {
  return (
    <section style={{padding: '3rem 0'}}>
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Features
        </Heading>
        <div className="row">
          {features.map((f, idx) => (
            <div key={idx} className="col col--4" style={{marginBottom: '1.5rem'}}>
              <div className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <Heading as="h3">{f.title}</Heading>
                <p>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodePreview(): ReactNode {
  return (
    <section className="code-preview">
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h2">Simple, Familiar API</Heading>
            <p>
              OpenRA-RL follows the standard Gymnasium <code>reset/step</code> pattern
              through the <a href="https://huggingface.co/openenv">OpenEnv</a> framework.
              Connect to a running OpenRA game, observe the world, and issue commands &mdash;
              all through async Python.
            </p>
            <p>
              Compatible with <strong>TRL</strong>, <strong>Stable Baselines3</strong>,
              and any framework that speaks Gymnasium.
            </p>
            <Link
              className="button button--primary"
              to="/docs/getting-started">
              Read the Docs
            </Link>
          </div>
          <div className="col col--6">
            <CodeBlock language="python" title="quickstart.py">
              {quickStart}
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection(): ReactNode {
  return (
    <section className="architecture-section">
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '1rem'}}>
          Architecture
        </Heading>
        <p style={{textAlign: 'center', maxWidth: 700, margin: '0 auto 2rem'}}>
          Three components work together: a Python environment wrapper, a gRPC bridge
          running inside the OpenRA game engine (via ASP.NET Core Kestrel), and the
          OpenEnv framework for standardized agent interaction.
        </p>
        <div style={{textAlign: 'center'}}>
          <img
            src={require('@site/static/img/architecture_diagram.png').default}
            alt="OpenRA-RL Architecture"
            style={{maxWidth: 800}}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Train AI Agents to Play RTS"
      description="OpenRA-RL: A Gymnasium-style reinforcement learning environment for the OpenRA real-time strategy engine.">
      <HeroSection />
      <main>
        <StatsBar />
        <FeatureGrid />
        <CodePreview />
        <ArchitectureSection />
      </main>
    </Layout>
  );
}
