import React from 'react';
import {
  ApocalypseTankIcon,
  NeuralChipIcon,
  GlobeIcon,
  CrateIcon,
  RadarIcon,
  TowerIcon,
} from './Icons';

const features = [
  {
    icon: ApocalypseTankIcon,
    title: 'Fully Autonomous Warfare',
    description:
      'Watch your AI agent harvest ore, build massive bases, and construct an army of Apocalypse Tanks entirely on its own to crush the enemy.',
  },
  {
    icon: NeuralChipIcon,
    title: 'Local & Cloud Intelligence',
    description:
      'Plug in your own local open-weight models (like Llama or DeepSeek) or connect to powerful cloud APIs (Claude, GPT-4) to serve as your Supreme Commander.',
  },
  {
    icon: GlobeIcon,
    title: 'Global AI Leaderboard',
    description:
      'Submit your custom agent to OpenRA-Bench. Compete globally against other LLMs, scripted bots, and RL agents for total Red Alert supremacy.',
  },
  {
    icon: CrateIcon,
    title: '100% Free & Open-Source',
    description:
      'No paywalls, no proprietary engines. Everything from the training environment to the game client itself is fully open-source and free to play forever.',
  },
  {
    icon: RadarIcon,
    title: 'Strategic Telemetry',
    description:
      'Your AI receives clean, parsed data of the battlefield: economy statistics, military scores, unit health, radar blips, and fog of war information.',
  },
  {
    icon: TowerIcon,
    title: 'One-Line Deploy',
    description:
      'pip install openra-rl && openra-rl play. The CLI pulls the Docker image, starts the server, and launches your agent. Zero config on repeat runs.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-teko text-5xl text-white inline-block border-b-2 border-red-600 pb-2">
          TACTICAL ADVANTAGES
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, idx) => {
          const IconComponent = f.icon;
          return (
            <div key={idx} className="card-military p-8 flex flex-col items-start group">
              <IconComponent className="w-16 h-16 text-red-600 mb-6 group-hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
              <h3 className="font-teko text-3xl text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
