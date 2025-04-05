
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Book, Calendar, Edit, Mic, Search, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudentDashboard: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

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

  const features = [
    { 
      id: 'tutor',
      title: '24/7 Tutor', 
      description: 'Ask questions, get help with homework, and learn concepts',
      icon: Book
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
      icon: Edit
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
      icon: Mic
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    toast({
      title: "Feature activated",
      description: `You've activated the ${features.find(f => f.id === featureId)?.title} feature.`,
    });
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
      <DashboardHeader role="student" username="Alex" />
      
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
                    content: "Hi Alex! I'm Sakha, your personal AI study companion. What would you like to work on today?",
                    timestamp: new Date()
                  }
                ]}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-secondary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="min-h-[40px]">
                        {feature.description}
                      </CardDescription>
                      <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => handleFeatureClick(feature.id)}>
                        Access Feature
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
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
                <p className="text-center py-8 text-muted-foreground">
                  Detailed progress tracking will be available after completing more lessons.
                </p>
                <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90" onClick={() => {
                  toast({
                    title: "Learning Session Started",
                    description: "Your learning session has begun. Focus on your goals!",
                  });
                }}>
                  Start a New Learning Session
                </Button>
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
