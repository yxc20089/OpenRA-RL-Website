import React from 'react';
import {useTranslation} from '../i18n';

export default function StatsBar() {
  const t = useTranslation();

  return (
    <section className="bg-black border-b-2 border-red-900 py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-red-900/50">
        {t.home.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-teko text-4xl sm:text-5xl alert-text font-bold">{stat.value}</div>
            <div className="text-sm terminal-text mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
