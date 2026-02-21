import React from 'react';
import {
  ApocalypseTankIcon,
  NeuralChipIcon,
  GlobeIcon,
  CrateIcon,
  RadarIcon,
  TowerIcon,
} from './Icons';
import {useTranslation} from '../i18n';

const icons = [ApocalypseTankIcon, NeuralChipIcon, GlobeIcon, CrateIcon, RadarIcon, TowerIcon];

export default function FeatureGrid() {
  const t = useTranslation();

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-teko text-5xl text-white inline-block border-b-2 border-red-600 pb-2">
          {t.home.tacticalTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.home.features.map((f, idx) => {
          const IconComponent = icons[idx];
          return (
            <div key={idx} className="card-military p-8 flex flex-col items-start group">
              <IconComponent className="w-16 h-16 text-red-600 mb-6 group-hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
              <h3 className="font-teko text-3xl text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
