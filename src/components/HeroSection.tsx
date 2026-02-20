import React from 'react';
import Link from '@docusaurus/Link';
import {ChevronRight, Terminal, Trophy} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="carbon-bg border-b-4 border-red-700 pt-24 pb-32 relative">
      <div
        className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')"}}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="terminal-text text-lg sm:text-xl mb-4 font-bold flex items-center justify-center gap-2">
          <Terminal className="w-5 h-5" /> &gt; SYSTEM OVERRIDE ACCEPTED
        </h2>
        <h1 className="font-teko text-6xl sm:text-8xl font-bold alert-text uppercase leading-none mb-6">
          Command AI To Play Red Alert
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed bg-black/50 p-6 border border-gray-800 rounded">
          The ultimate open-source project that lets you wire up Large Language Models to play Red Alert, the classic RTS game, fully on their own.
          <strong className="text-white block mt-2">
            Use local or cloud AI models to build bases, harvest ore, and conquer your enemies for free.
          </strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/docs/getting-started"
            className="btn-soviet font-teko text-3xl px-8 py-3 flex items-center justify-center gap-2 text-white no-underline hover:no-underline hover:text-white"
          >
            INITIATE DEPLOYMENT <ChevronRight className="w-8 h-8" />
          </Link>
          <Link
            to="/leaderboard"
            className="btn-ghost font-teko text-3xl px-8 py-3 flex items-center justify-center gap-2 no-underline hover:no-underline"
          >
            ACCESS LEADERBOARD <Trophy className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </section>
  );
}
