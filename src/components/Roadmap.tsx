import React from 'react';
import {CheckSquare, Clock, ExternalLink} from 'lucide-react';
import {useTranslation} from '../i18n';

export default function Roadmap() {
  const t = useTranslation();

  return (
    <div>
      <div className="mt-24 border-t border-gray-800 pt-16">
        <h2 className="font-teko text-5xl text-white mb-8 border-b-2 border-red-600 inline-block pb-2">
          {t.research.roadmapTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Secured Objectives */}
          <div className="bg-[#0a0505] border border-red-900/50 p-8 rounded shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <h3 className="font-teko text-3xl text-red-500 mb-6 flex items-center gap-3">
              <CheckSquare className="w-7 h-7" /> {t.research.securedTitle}
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400 list-none pl-0">
              {t.research.secured.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">[X]</span>
                  <div>
                    <strong className="text-gray-300 block mb-1">{item.title}</strong>
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* In Construction */}
          <div className="bg-[#050505] border border-gray-800 p-8 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <h3 className="font-teko text-3xl text-yellow-500 mb-6 flex items-center gap-3">
              <Clock className="w-7 h-7" /> {t.research.wipTitle}
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400 list-none pl-0">
              {t.research.wip.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">[ ]</span>
                  <div>
                    <strong className="text-gray-300 block mb-1">{item.title}</strong>
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="btn-ghost font-teko text-2xl px-10 py-4 flex items-center gap-3 mx-auto cursor-pointer">
          <ExternalLink className="w-6 h-6" /> {t.research.btnPaper}
        </button>
      </div>
    </div>
  );
}
