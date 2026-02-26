import React from 'react';
import {Terminal, Trophy, ExternalLink} from 'lucide-react';
import CustomLayout from '../components/CustomLayout';
import LeaderboardTable from '../components/LeaderboardTable';
import {useTranslation} from '../i18n';

export default function Leaderboard() {
  const t = useTranslation();

  return (
    <CustomLayout
      title={t.leaderboard.pageTitle}
      description={t.leaderboard.pageDescription}
    >
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b-4 border-red-700 mb-12 pb-6 flex items-center justify-between">
          <div>
            <h2 className="terminal-text text-xl mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> {t.leaderboard.subtitle}
            </h2>
            <h1 className="font-teko text-6xl text-white font-bold uppercase tracking-wide">
              {t.leaderboard.title}
            </h1>
            <a
              href="https://huggingface.co/spaces/openra-rl/OpenRA-Bench"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-600/50 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 px-4 py-2 rounded font-teko text-lg tracking-wider transition-colors no-underline hover:no-underline"
            >
              🤗 {t.leaderboard.hfLink} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <Trophy className="w-16 h-16 text-red-600 hidden md:block" />
        </div>

        <LeaderboardTable />
      </div>
    </CustomLayout>
  );
}
