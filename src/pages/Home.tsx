
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import TargetAudienceSection from '@/components/home/TargetAudienceSection';
import { UserRole } from '@/components/onboarding/OnboardingFlow';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

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
      <div className="bg-secondary/30 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4 gradient-text">
            Ready to transform your experience?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose a plan that fits your needs and unlock the full potential of Sakha AI.
          </p>
          <Button 
            size="lg" 
            className="bg-sakha-purple hover:bg-sakha-purple/90"
            onClick={() => navigate('/pricing')}
          >
            View Pricing Plans
          </Button>
        </div>
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
          <div className="mt-6 pt-6 border-t border-muted flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Button variant="link" size="sm" className="text-muted-foreground" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="link" size="sm" className="text-muted-foreground">Privacy Policy</Button>
            <Button variant="link" size="sm" className="text-muted-foreground">Terms of Service</Button>
            <Button variant="link" size="sm" className="text-muted-foreground">Contact Us</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
