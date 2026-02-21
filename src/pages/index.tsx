import React from 'react';
import CustomLayout from '../components/CustomLayout';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import FeatureGrid from '../components/FeatureGrid';
import CodeTerminal from '../components/CodeTerminal';
import {useTranslation} from '../i18n';

export default function Home() {
  const t = useTranslation();

  return (
    <CustomLayout
      title={t.home.pageTitle}
      description={t.home.pageDescription}
    >
      <div className="animate-fade-in">
        <HeroSection />
        <StatsBar />
        <FeatureGrid />
        <CodeTerminal />
      </div>
    </CustomLayout>
  );
}
