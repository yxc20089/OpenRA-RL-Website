import React from 'react';
import Link from '@docusaurus/Link';
import {ChevronRight, Play, Terminal, Trophy} from 'lucide-react';
import {useTranslation} from '../i18n';

export default function HeroSection() {
  const t = useTranslation();

  return (
    <section className="carbon-bg border-b-4 border-red-700 pt-24 pb-32 relative">
      <div
        className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')"}}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="terminal-text text-lg sm:text-xl mb-4 font-bold flex items-center justify-center gap-2">
          <Terminal className="w-5 h-5" /> {t.home.sysOverride}
        </h2>
        <h1 className="font-teko text-6xl sm:text-8xl font-bold alert-text uppercase leading-none mb-6">
          {t.home.title}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed bg-black/50 p-6 border border-gray-800 rounded">
          {t.home.subtitle1}
          <strong className="text-white block mt-2">
            {t.home.subtitle2}
          </strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="https://openra-rl-openra-rl.hf.space/try"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soviet font-teko text-3xl px-8 py-3 flex items-center justify-center gap-2 text-white no-underline hover:no-underline hover:text-white"
          >
            {t.home.btnTryAI} <Play className="w-7 h-7" />
          </a>
          <Link
            to="/docs/getting-started"
            className="btn-ghost font-teko text-3xl px-8 py-3 flex items-center justify-center gap-2 no-underline hover:no-underline"
          >
            {t.home.btnDeploy} <ChevronRight className="w-8 h-8" />
          </Link>
          <Link
            to="/leaderboard"
            className="btn-ghost font-teko text-3xl px-8 py-3 flex items-center justify-center gap-2 no-underline hover:no-underline"
          >
            {t.home.btnLeaderboard} <Trophy className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </section>
  );
}
