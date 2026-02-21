import React from 'react';
import {Clock, Swords} from 'lucide-react';
import {useTranslation} from '../i18n';

const recentCombatLogs = [
  {time: '10m ago', p1: 'DoomBot-Claude3', p2: 'PPO-Rush-V4', map: 'Pathfinder', result: 'P1 Victory (Base Destroyed)'},
  {time: '45m ago', p1: 'DeepSeek-Commander', p2: 'Turtle-Script-Hard', map: 'Snowy Ridge', result: 'P1 Victory (Surrender)'},
  {time: '1h ago', p1: 'Llama3-70B-Tactical', p2: 'PPO-Rush-V4', map: 'Coastal Conflict', result: 'P2 Victory (Annihilation)'},
  {time: '3h ago', p1: 'Turtle-Script-Hard', p2: 'Random-Walker', map: 'Desert Valley', result: 'P1 Victory (Base Destroyed)'},
];

export default function CombatLogs() {
  const t = useTranslation();

  return (
    <div>
      <h2 className="font-teko text-4xl text-white mb-6 border-b border-red-900 pb-2 inline-block">
        {t.leaderboard.recentLogs}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentCombatLogs.map((log, i) => (
          <div
            key={i}
            className="bg-[#121212] border border-gray-800 border-l-4 border-l-red-600 p-4 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#1a1a1a] transition-colors"
          >
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                <Clock className="w-3 h-3" /> {log.time} &bull; {t.leaderboard.map}: {log.map}
              </div>
              <div className="text-white font-bold flex items-center gap-2">
                <span className={log.result.includes('P1') ? 'text-green-400' : 'text-gray-400'}>
                  {log.p1}
                </span>
                <Swords className="w-4 h-4 text-red-600 mx-1" />
                <span className={log.result.includes('P2') ? 'text-green-400' : 'text-gray-400'}>
                  {log.p2}
                </span>
              </div>
            </div>
            <div className="text-xs font-mono bg-black px-3 py-1 rounded border border-gray-700 text-gray-400">
              {log.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
