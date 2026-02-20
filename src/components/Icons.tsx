import React from 'react';

interface IconProps {
  className?: string;
}

export function ApocalypseTankIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <path d="M2 15h20v3.5a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5V15z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="6" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="18" cy="17.5" r="1.5" fill="currentColor" />
      <path d="M3 15L5 11h14l2 4" />
      <path d="M7 11V7h10v4" fill="currentColor" fillOpacity="0.3" />
      <path d="M17 8h6M17 10h6" strokeWidth="2.5" />
      <path d="M9 7V4h2v3M13 7V4h2v3" strokeWidth="1.5" />
    </svg>
  );
}

export function NeuralChipIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M4 8h16M4 16h16M8 4v16M16 4v16" strokeOpacity="0.3" />
      <path d="M10 10h4v4h-4z" fill="currentColor" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  );
}

export function RadarIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 12l8.5-8.5" />
      <path d="M12 2v10H2" strokeOpacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function TowerIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <path d="M12 22V6" strokeWidth="2" />
      <path d="M8 22l4-16 4 16" />
      <path d="M9 14h6M10 9h4" />
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M6 6c-2 2-2 5 0 7M18 6c2 2 2 5 0 7" strokeOpacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function CrateIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M3 3l18 18M21 3L3 21" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" />
    </svg>
  );
}

export function GlobeIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <path d="M12 2l4 10-4 10M12 2L8 12l4 10" strokeOpacity="0.5" />
      <path d="M12 7l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" fill="currentColor" />
    </svg>
  );
}
