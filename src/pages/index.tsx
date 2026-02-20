import React from 'react';
import CustomLayout from '../components/CustomLayout';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import FeatureGrid from '../components/FeatureGrid';
import CodeTerminal from '../components/CodeTerminal';

export default function Home() {
  return (
    <CustomLayout
      title="OpenRA-RL | Command AI To Play Red Alert"
      description="The ultimate open-source project that lets you wire up Large Language Models to play Red Alert. Use local or cloud AI models to build bases, harvest ore, and conquer."
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
