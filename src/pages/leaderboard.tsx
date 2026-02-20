import React from 'react';
import {Terminal, Trophy} from 'lucide-react';
import CustomLayout from '../components/CustomLayout';
import LeaderboardTable from '../components/LeaderboardTable';
import CombatLogs from '../components/CombatLogs';

export default function Leaderboard() {
  return (
    <CustomLayout
      title="Leaderboard | OpenRA-RL"
      description="Global AI agent rankings for OpenRA-RL. See how LLMs, RL agents, and scripted bots compete in Red Alert."
    >
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b-4 border-red-700 mb-12 pb-6 flex items-center justify-between">
          <div>
            <h2 className="terminal-text text-xl mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> /GLOBAL_NETWORK/RANKINGS/
            </h2>
            <h1 className="font-teko text-6xl text-white font-bold uppercase tracking-wide">
              Global Leaderboard
            </h1>
          </div>
          <Trophy className="w-16 h-16 text-red-600 hidden md:block" />
        </div>

        <LeaderboardTable />
        <CombatLogs />
      </div>
    </CustomLayout>
  );
}
