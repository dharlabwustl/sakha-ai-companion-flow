
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Book, Briefcase, Calendar, Edit, Mic, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DashboardFeatureCard, { FeatureCardProps } from './DashboardFeatureCard';

// Mock user data that would normally come from API/auth
const mockUserData = {
  name: 'Taylor',
  role: 'employee' as const,
  personality: 'Driver',
  interests: ['Leadership', 'Marketing', 'Data Science'],
  additionalInfo: {
    company: 'TechCorp',
    position: 'Senior Manager'
  }
};

const EmployeeDashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // This would typically be fetched from an API
  const kpis = [
    {
      title: 'Productivity Score',
      value: '82/100',
      indicator: 'up' as const,
      change: '8% from last week'
    },
    {
      title: 'Skill Gap Progress',
      value: '65%',
      indicator: 'up' as const,
      change: '5% improved'
    },
    {
      title: 'Weekly Goals Met',
      value: '4/5',
      indicator: 'neutral' as const,
      change: '1 remaining'
    },
    {
      title: 'Burnout Risk',
      value: 'Low',
      indicator: 'down' as const,
      change: 'Improved from Medium'
    },
    {
      title: 'Training Completion',
      value: '70%',
      indicator: 'up' as const,
      change: '10% increase'
    }
  ];

  const features: FeatureCardProps[] = [
    { 
      id: 'advisor',
      title: '24/7 Job Advisor', 
      description: 'Upskill advice and content creation assistance',
      icon: Briefcase,
      isNew: true
    },
    { 
      id: 'productivity',
      title: 'Productivity Tracker', 
      description: 'Habit coaching and AI feedback on your performance',
      icon: Calendar
    },
    { 
      id: 'career',
      title: 'Career Guide', 
      description: 'Career path planning and mentor suggestions',
      icon: Edit,
      isPremium: true
    },
    { 
      id: 'training',
      title: 'Training Modules', 
      description: 'Job-aligned learning paths for professional growth',
      icon: Book
    },
    { 
      id: 'settings',
      title: 'Smart Settings', 
      description: 'Customize your professional experience',
      icon: Settings
    },
    { 
      id: 'voice',
      title: 'Voice Assistant', 
      description: 'Get help through voice interactions',
      icon: Mic,
      isPremium: true
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
    
    // Simulate different feature behaviors
    switch(featureId) {
      case 'advisor':
        toast({
          title: "Job Advisor Activated",
          description: "Let's analyze your career trajectory and identify growth opportunities.",
        });
        break;
      case 'productivity':
        toast({
          title: "Productivity Tracker",
          description: "Tracking your work patterns to optimize performance.",
        });
        break;
      case 'training':
        toast({
          title: "Training Module",
          description: "Select a skill to develop through our guided learning modules.",
        });
        break;
      case 'settings':
        toast({
          title: "Settings Panel",
          description: "Customize your professional environment and preferences.",
        });
        break;
      default:
        toast({
          title: "Feature activated",
          description: `You've activated the ${features.find(f => f.id === featureId)?.title} feature.`,
        });
    }
  };

  const handleUpgradeClick = () => {
    toast({
      title: "Premium Features",
      description: "Unlock all premium features to enhance your professional growth.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader 
        role={mockUserData.role} 
        username={mockUserData.name}
        personality={mockUserData.personality}
        additionalInfo={mockUserData.additionalInfo}
      />
      
      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <DashboardKPI kpis={kpis} />
        </div>
        
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[60vh]">
              <ChatContainer 
                initialMessages={[
                  {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Hi ${mockUserData.name}! I'm Sakha, your professional growth companion. How can I help you excel at work today?`,
                    timestamp: new Date()
                  }
                ]}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <DashboardFeatureCard
                  key={feature.id}
                  {...feature}
                  onClick={handleFeatureClick}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Professional Growth</CardTitle>
                <CardDescription>
                  Track your improvement across different professional skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserData.interests.length > 0 ? (
                    <div className="space-y-4">
                      {mockUserData.interests.map((interest, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{interest}</span>
                            <span className="text-sm text-muted-foreground">{70 + index * 5}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sakha-purple rounded-full" 
                              style={{ width: `${70 + index * 5}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Detailed progress tracking will be available after completing more training modules.
                    </p>
                  )}
                  
                  <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90" onClick={() => {
                    toast({
                      title: "Training Session Started",
                      description: "Your professional training session has begun. Focus on your growth!",
                    });
                  }}>
                    Start a New Training Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Premium</CardTitle>
              <CardDescription>
                Get full access to career coaching, AI performance reports, and premium training modules
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm">Premium Features:</p>
                <ul className="text-sm list-disc list-inside text-muted-foreground">
                  <li>Advanced AI feedback</li>
                  <li>Unlimited training modules</li>
                  <li>Project sharing tools</li>
                  <li>Goal planning reports</li>
                  <li>AI career coach</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90" onClick={handleUpgradeClick}>
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
