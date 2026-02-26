import React, {useEffect, useState} from 'react';
import {useTranslation} from '../i18n';

const HF_SPACE = 'https://openra-rl-openra-bench.hf.space';

interface AgentRow {
  rank: number;
  name: string;
  type: string;
  opponent: string;
  games: number;
  winRate: number;
  score: number;
  kdRatio: number;
}

function stripHtml(html: string): string {
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || html;
  }
  return html.replace(/<[^>]*>/g, '');
}

function typeBadgeColor(rawType: string): string {
  const t = stripHtml(rawType).trim();
  if (t === 'LLM') return 'text-blue-400 border-blue-700 bg-blue-950';
  if (t === 'RL') return 'text-purple-400 border-purple-700 bg-purple-950';
  if (t === 'Scripted') return 'text-yellow-400 border-yellow-700 bg-yellow-950';
  return 'text-gray-400 border-gray-700 bg-gray-900';
}

async function fetchLeaderboard(): Promise<AgentRow[]> {
  try {
    // Gradio SSE two-step protocol
    const resp = await fetch(`${HF_SPACE}/gradio_api/call/filter_leaderboard`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: ['', [], 'All']}),
    });
    const {event_id} = await resp.json();

    const sse = await fetch(`${HF_SPACE}/gradio_api/call/filter_leaderboard/${event_id}`);
    const text = await sse.text();

    for (const line of text.split('\n')) {
      if (line.startsWith('data: ')) {
        const payload = JSON.parse(line.slice(6));
        if (Array.isArray(payload) && payload[0]?.value?.data) {
          const rows: any[][] = payload[0].value.data;
          return rows.map((r) => ({
            rank: r[0],
            name: stripHtml(String(r[1])),
            type: stripHtml(String(r[2])),
            opponent: r[3],
            games: r[4],
            winRate: r[5],
            score: r[6],
            kdRatio: r[7],
          }));
        }
      }
    }
  } catch {
    // Network error or Space sleeping — return empty
  }
  return [];
}

export default function LeaderboardTable() {
  const t = useTranslation();
  const [agents, setAgents] = useState<AgentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard().then((data) => {
      setAgents(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#050505] border border-gray-800 rounded-lg p-12 text-center mb-16">
        <div className="text-gray-500 font-mono animate-pulse">{t.leaderboard.loading}</div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="bg-[#050505] border border-gray-800 rounded-lg p-12 text-center mb-16">
        <div className="text-gray-500 font-mono">{t.leaderboard.noData}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] border border-gray-800 rounded-lg overflow-hidden shadow-2xl mb-16">
      <div className="overflow-x-auto">
        <table className="table-military">
          <thead>
            <tr>
              <th className="w-16 text-center">{t.leaderboard.thRank}</th>
              <th>{t.leaderboard.thAgent}</th>
              <th>{t.leaderboard.thType}</th>
              <th>{t.leaderboard.thOpponent}</th>
              <th className="text-right">{t.leaderboard.thWin}</th>
              <th className="text-right text-yellow-500">{t.leaderboard.thScore}</th>
              <th className="text-right">{t.leaderboard.thKD}</th>
              <th className="text-right">{t.leaderboard.thGames}</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={`${agent.rank}-${agent.name}`} className="group cursor-default">
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
                <td>
                  <span className={`border px-2 py-1 rounded text-xs ${typeBadgeColor(agent.type)}`}>
                    {agent.type}
                  </span>
                </td>
                <td className="text-gray-400">{agent.opponent}</td>
                <td className="text-right font-bold text-gray-300">{agent.winRate}%</td>
                <td className="text-right font-bold text-yellow-500 text-lg">{agent.score}</td>
                <td className="text-right text-gray-400">{agent.kdRatio}</td>
                <td className="text-right">{agent.games}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
