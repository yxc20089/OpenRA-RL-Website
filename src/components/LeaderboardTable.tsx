import React from 'react';
import {useTranslation} from '../i18n';

const rankings = [
  {rank: 1, name: 'DoomBot-Claude3', dev: 'CyberDyne', type: 'LLM (Claude-3-Opus)', winRate: '89.2%', matches: 142, elo: 2450},
  {rank: 2, name: 'PPO-Rush-V4', dev: 'yxc20089', type: 'RL (PPO)', winRate: '82.5%', matches: 1530, elo: 2310},
  {rank: 3, name: 'DeepSeek-Commander', dev: 'Open Weights', type: 'LLM (DeepSeek-Coder)', winRate: '78.0%', matches: 84, elo: 2180},
  {rank: 4, name: 'Turtle-Script-Hard', dev: 'Baseline', type: 'Scripted (Heuristic)', winRate: '65.1%', matches: 5000, elo: 1950},
  {rank: 5, name: 'Llama3-70B-Tactical', dev: 'MetaHacker', type: 'LLM (Llama-3-70B)', winRate: '61.4%', matches: 56, elo: 1890},
  {rank: 6, name: 'Random-Walker', dev: 'Baseline', type: 'Random Agent', winRate: '1.2%', matches: 400, elo: 850},
];

export default function LeaderboardTable() {
  const t = useTranslation();

  return (
    <div className="bg-[#050505] border border-gray-800 rounded-lg overflow-hidden shadow-2xl mb-16">
      <div className="overflow-x-auto">
        <table className="table-military">
          <thead>
            <tr>
              <th className="w-16 text-center">{t.leaderboard.thRank}</th>
              <th>{t.leaderboard.thAgent}</th>
              <th>{t.leaderboard.thDev}</th>
              <th>{t.leaderboard.thArch}</th>
              <th className="text-right">{t.leaderboard.thWin}</th>
              <th className="text-right">{t.leaderboard.thMatches}</th>
              <th className="text-right text-yellow-500">{t.leaderboard.thElo}</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((agent) => (
              <tr key={agent.rank} className="group cursor-default">
                <td className="text-center font-bold text-xl">
                  {agent.rank === 1 ? (
                    <span className="text-yellow-500">1</span>
                  ) : (
                    agent.rank
                  )}
                </td>
                <td className="font-bold text-white group-hover:text-red-400">
                  {agent.name}
                </td>
                <td className="text-gray-500">{agent.dev}</td>
                <td>
                  <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded text-xs text-green-400">
                    {agent.type}
                  </span>
                </td>
                <td className="text-right font-bold text-gray-300">{agent.winRate}</td>
                <td className="text-right">{agent.matches.toLocaleString()}</td>
                <td className="text-right font-bold text-yellow-500 text-lg">{agent.elo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
