import React from 'react';
import {Target} from 'lucide-react';
import {NeuralChipIcon, RadarIcon, TowerIcon} from './Icons';

const cards = [
  {
    icon: NeuralChipIcon,
    title: 'The Gymnasium Interface',
    description: (
      <>
        Standardized <code className="text-green-400 bg-black/50 px-1">reset()</code> and{' '}
        <code className="text-green-400 bg-black/50 px-1">step()</code> loops compatible
        out-of-the-box with <strong>Stable Baselines3</strong>, <strong>Ray RLlib</strong>,
        and <strong>CleanRL</strong>. The environment is rigorously formulated as a Partially
        Observable Markov Decision Process (POMDP).
      </>
    ),
  },
  {
    icon: RadarIcon,
    title: 'Spatial Tensor Observations',
    description:
      'The engine streams a comprehensive 9-channel spatial tensor representing the battlefield. This allows Convolutional Neural Networks (CNNs) to efficiently process terrain, unit deployments, structures, and dynamic fog of war.',
  },
  {
    icon: TowerIcon,
    title: 'Headless Swarm Training',
    description:
      'Train massive swarms of concurrent agents. Utilizing the "Null" graphics platform, OpenRA-RL runs entirely headless inside Docker containers, consuming merely ~3% CPU per instance. Built for HPC clusters.',
  },
  {
    icon: Target,
    title: 'Continuous Benchmarking',
    description:
      'Evaluate custom reward functions and policies against hardened scripted baselines (Rush, Turtle, Economy-focused) directly within the OpenEnv framework. Track metrics instantly.',
  },
];

export default function ResearchCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div key={idx} className="card-military p-8 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-red-900/20">
              <IconComponent className="w-32 h-32" />
            </div>
            <h3 className="font-teko text-4xl text-white mb-4 relative z-10">{card.title}</h3>
            <p className="text-gray-400 relative z-10">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
