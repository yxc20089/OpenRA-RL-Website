import React from 'react';
import {CheckSquare, Clock, ExternalLink} from 'lucide-react';

const secured = [
  {title: 'Gymnasium API Integration', desc: 'Standard POMDP interface for Python-based agents.'},
  {title: 'Dockerized Headless Engine', desc: 'Lightweight CPU-only rendering for HPC clusters.'},
  {title: 'C# to Python gRPC Bridge', desc: 'Zero-latency bidirectional streaming architecture.'},
  {title: '9-Channel Spatial Tensors', desc: 'Rich observation space optimized for CNNs.'},
  {title: 'Multi-Agent Interop', desc: 'Support for Scripted, RL, and LLM Agent interactions.'},
];

const inProgress = [
  {title: 'Cloud-based Hosted LLM Arena', desc: 'Automated matchmaking service for developer-submitted agents.'},
  {title: 'Advanced Fog of War Emulation', desc: 'Strict visibility matrices mimicking human-player memory logic.'},
  {title: 'Native Ray RLlib Integration', desc: 'Distributed training wrappers for massive PPO workloads.'},
  {title: 'Expanded Action Space', desc: 'Inclusion of Naval Units, Superweapons, and Aircraft.'},
  {title: 'Real-time Replay Streaming', desc: 'Web-based observer client for live tournament broadcasts.'},
];

export default function Roadmap() {
  return (
    <div>
      <div className="mt-24 border-t border-gray-800 pt-16">
        <h2 className="font-teko text-5xl text-white mb-8 border-b-2 border-red-600 inline-block pb-2">
          STRATEGIC ROADMAP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Secured Objectives */}
          <div className="bg-[#0a0505] border border-red-900/50 p-8 rounded shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <h3 className="font-teko text-3xl text-red-500 mb-6 flex items-center gap-3">
              <CheckSquare className="w-7 h-7" /> SECURED OBJECTIVES
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400 list-none pl-0">
              {secured.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">[X]</span>
                  <div>
                    <strong className="text-gray-300 block mb-1">{item.title}</strong>
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* In Construction */}
          <div className="bg-[#050505] border border-gray-800 p-8 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <h3 className="font-teko text-3xl text-yellow-500 mb-6 flex items-center gap-3">
              <Clock className="w-7 h-7" /> IN CONSTRUCTION
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400 list-none pl-0">
              {inProgress.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">[ ]</span>
                  <div>
                    <strong className="text-gray-300 block mb-1">{item.title}</strong>
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="btn-ghost font-teko text-2xl px-10 py-4 flex items-center gap-3 mx-auto cursor-pointer">
          <ExternalLink className="w-6 h-6" /> VIEW ACADEMIC PAPER (COMING SOON)
        </button>
      </div>
    </div>
  );
}
