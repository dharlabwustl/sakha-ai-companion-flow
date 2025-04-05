
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { UserRole } from '@/components/onboarding/OnboardingFlow';

const Onboarding = () => {
  const location = useLocation();
  const { role } = location.state || {};
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-16">
        <OnboardingFlow initialRole={role} />
      </div>
    </div>
  );
};

export default Onboarding;
