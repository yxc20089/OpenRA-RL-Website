import React from 'react';
import {Terminal} from 'lucide-react';
import CustomLayout from '../components/CustomLayout';
import ResearchCards from '../components/ResearchCards';
import Roadmap from '../components/Roadmap';

export default function Research() {
  return (
    <CustomLayout
      title="R&D Division | OpenRA-RL"
      description="Reinforcement learning research infrastructure for OpenRA-RL. Gymnasium interface, spatial tensors, headless training, and benchmarking."
    >
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b-4 border-red-700 mb-12 pb-6">
          <h2 className="terminal-text text-xl mb-2 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> /SECURE/ACADEMIC_ARCHIVES/
          </h2>
          <h1 className="font-teko text-6xl text-white font-bold uppercase tracking-wide">
            Reinforcement Learning Division
          </h1>
        </div>

        <div className="mb-16 max-w-4xl">
          <p className="text-xl text-gray-400 leading-relaxed border-l-4 border-red-600 pl-6 py-2 bg-red-950/10">
            While OpenRA-RL excels as a sandbox for LLMs, its core infrastructure is a highly
            optimized environment engineered for classical Reinforcement Learning (PPO, SAC, DQN)
            and multi-agent systems research.
          </p>
        </div>

        <ResearchCards />
        <Roadmap />
      </div>
    </CustomLayout>
  );
}
