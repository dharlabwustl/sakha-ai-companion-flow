
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { UserRole } from '@/components/onboarding/OnboardingFlow';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || {};
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Role display names for UI
  const roleDisplayNames: Record<UserRole, string> = {
    'student': 'Student',
    'employee': 'Professional',
    'doctor': 'Medical Professional',
    'researcher': 'Researcher',
    'founder': 'Founder',
    '': 'Custom'
  };
  
  useEffect(() => {
    // Show welcome toast based on selected role
    if (role) {
      const displayRole = roleDisplayNames[role as UserRole] || 'User';
      toast({
        title: `Welcome, ${displayRole}!`,
        description: "Let's personalize your Sakha AI experience.",
      });
    }
    
    // Auto-hide welcome screen after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [role]);
  
  // If user clicks to skip welcome screen
  const handleContinue = () => {
    setShowWelcome(false);
  };
  
  // Handle back button click
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-16 relative">
        {showWelcome ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10 animate-fade-in">
            <div className="text-center max-w-md px-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-sakha-purple/10 mx-auto mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-sakha-purple/20">
                  <div className="w-12 h-12 rounded-full bg-sakha-purple text-white flex items-center justify-center text-2xl font-bold">
                    S
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-display font-bold mb-4 gradient-text">
                {role ? `Welcome, ${roleDisplayNames[role as UserRole]}!` : 'Welcome to Sakha AI!'}
              </h1>
              
              {role && (
                <Badge className="mb-4 bg-sakha-purple">
                  {roleDisplayNames[role as UserRole]} Experience
                </Badge>
              )}
              
              <p className="text-lg text-muted-foreground mb-6">
                Let's create your personalized AI companion that adapts to your unique needs.
              </p>
              
              <Button 
                className="bg-sakha-purple hover:bg-sakha-purple/90"
                onClick={handleContinue}
              >
                Begin Personalization
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="fixed top-20 left-4 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <OnboardingFlow initialRole={role} />
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
