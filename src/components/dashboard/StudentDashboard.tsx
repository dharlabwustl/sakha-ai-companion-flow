
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Book, Calendar, Edit, Mic, Search, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DashboardFeatureCard, { FeatureCardProps } from './DashboardFeatureCard';

// Mock user data that would normally come from API/auth
const mockUserData = {
  name: 'Alex',
  role: 'student' as const,
  personality: 'Analytical',
  interests: ['Mathematics', 'Physics', 'Computer Science'],
  additionalInfo: {
    school: 'Tech University',
    year: 'Junior'
  }
};

const StudentDashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // This would typically be fetched from an API
  const kpis = [
    {
      title: 'Study Time',
      value: '4.5 hrs',
      indicator: 'up' as const,
      change: '15% from yesterday'
    },
    {
      title: 'Quiz Performance',
      value: '85%',
      indicator: 'up' as const,
      change: '5% from last week'
    },
    {
      title: 'Emotional Score',
      value: 'Good',
      indicator: 'neutral' as const,
      change: 'Stable this week'
    },
    {
      title: 'Practice Tests',
      value: '3/5',
      indicator: 'neutral' as const,
      change: '2 remaining'
    },
    {
      title: 'Resume Progress',
      value: '60%',
      indicator: 'up' as const,
      change: '10% increase'
    }
  ];

  const features: FeatureCardProps[] = [
    { 
      id: 'tutor',
      title: '24/7 Tutor', 
      description: 'Ask questions, get help with homework, and learn concepts',
      icon: Book,
      isNew: true
    },
    { 
      id: 'advisor',
      title: 'Academic Advisor', 
      description: 'Smart study plans, deadline reminders, and academic guidance',
      icon: Calendar
    },
    { 
      id: 'career',
      title: 'Career Guide', 
      description: 'Resume help, mock interviews, and career path planning',
      icon: Edit,
      isPremium: true
    },
    { 
      id: 'practice',
      title: 'Practice Tests', 
      description: 'Subject-specific exams to test your knowledge',
      icon: Search
    },
    { 
      id: 'settings',
      title: 'Smart Settings', 
      description: 'Customize your learning experience',
      icon: Settings
    },
    { 
      id: 'voice',
      title: 'Voice Learning', 
      description: 'Learn through voice interactions',
      icon: Mic,
      isPremium: true
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
    
    // Simulate different feature behaviors
    switch(featureId) {
      case 'tutor':
        toast({
          title: "Tutor Mode Activated",
          description: "Ask any question about your homework or studies.",
        });
        break;
      case 'advisor':
        toast({
          title: "Academic Advisor",
          description: "Let's organize your study schedule and academic goals.",
        });
        break;
      case 'practice':
        toast({
          title: "Practice Test Started",
          description: "Your practice session has begun. Good luck!",
        });
        break;
      case 'settings':
        toast({
          title: "Settings Panel",
          description: "Customize your learning environment and preferences.",
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
      description: "Unlock all premium features to enhance your learning experience.",
      variant: "default",
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
                    content: `Hi ${mockUserData.name}! I'm Sakha, your personal AI study companion. What would you like to work on today?`,
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
                <CardTitle>Your Learning Progress</CardTitle>
                <CardDescription>
                  Track your improvement across different subjects and skills
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
                            <span className="text-sm text-muted-foreground">65%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-sakha-purple rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Detailed progress tracking will be available after completing more lessons.
                    </p>
                  )}
                  
                  <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90" onClick={() => {
                    toast({
                      title: "Learning Session Started",
                      description: "Your learning session has begun. Focus on your goals!",
                    });
                  }}>
                    Start a New Learning Session
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
                Unlock personalized study planning, advanced practice tools, and full tutor access
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm">Premium Features:</p>
                <ul className="text-sm list-disc list-inside text-muted-foreground">
                  <li>Unlimited tutor queries</li>
                  <li>Smart study planner</li>
                  <li>MVP project tools</li>
                  <li>Full memory training suite</li>
                  <li>Weekly progress reports</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90" onClick={handleUpgradeClick}>
                  View Plans and Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
