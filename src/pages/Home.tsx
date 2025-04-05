
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import TargetAudienceSection from '@/components/home/TargetAudienceSection';
import { UserRole } from '@/components/onboarding/OnboardingFlow';
import ThemeToggle from '@/components/ThemeToggle';

const Home = () => {
  const navigate = useNavigate();
  
  const handleStartChat = () => {
    navigate('/onboarding');
  };
  
  const handleSelectRole = (role: string) => {
    navigate('/onboarding', { state: { role } });
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection onStartChat={handleStartChat} />
        <TargetAudienceSection onSelectRole={handleSelectRole} />
      </div>
      <footer className="bg-slate-100 dark:bg-sakha-dark/50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-display font-semibold gradient-text">Sakha AI</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">© 2025 Sakha AI. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
