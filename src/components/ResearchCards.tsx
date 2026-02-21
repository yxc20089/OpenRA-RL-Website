import React from 'react';
import {Target} from 'lucide-react';
import {NeuralChipIcon, RadarIcon, TowerIcon} from './Icons';
import {useTranslation} from '../i18n';

const icons = [NeuralChipIcon, RadarIcon, TowerIcon, Target];

export default function ResearchCards() {
  const t = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {t.research.cards.map((card, idx) => {
        const IconComponent = icons[idx];
        return (
          <div key={idx} className="card-military p-8 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-red-900/20">
              <IconComponent className="w-32 h-32" />
            </div>
            <h3 className="font-teko text-4xl text-white mb-4 relative z-10">{card.title}</h3>
            <p className="text-gray-400 relative z-10">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
