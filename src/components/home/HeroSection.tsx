
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartChat }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-sakha-dark dark:to-sakha-dark/50 -z-10" />
      
      <div className="max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in gradient-text">
          Your Personal AI Companion
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground animate-fade-in animate-delay-100">
          Sakha AI adapts to your unique needs, helping you learn, grow, and thrive in every aspect of life.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in animate-delay-200">
          <Button 
            size="lg" 
            className="bg-sakha-purple hover:bg-sakha-purple/90 text-lg"
            onClick={onStartChat}
          >
            Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-16 px-4 animate-fade-in animate-delay-300">
          <h2 className="text-2xl font-display font-semibold mb-4">
            From Our Founder
          </h2>
          <div className="bg-white/50 dark:bg-sakha-dark/50 backdrop-blur-sm p-6 rounded-xl shadow-sm max-w-3xl mx-auto">
            <p className="text-lg italic mb-4">
              "We created Sakha AI to be more than just a virtual assistant — it's a companion that understands your unique context, adapts to your needs, and helps you achieve your full potential in learning, work, and personal growth."
            </p>
            <p className="font-medium">
              - Amit Singh, Founder of Sakha AI
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="h-10 w-10 rounded-full border-2 border-muted flex items-center justify-center">
          <ArrowRight className="h-5 w-5 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
