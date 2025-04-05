
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Book, Briefcase, Calendar, Edit, Mic, Settings } from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
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

  const features = [
    { 
      title: '24/7 Job Advisor', 
      description: 'Upskill advice and content creation assistance',
      icon: Briefcase
    },
    { 
      title: 'Productivity Tracker', 
      description: 'Habit coaching and AI feedback on your performance',
      icon: Calendar
    },
    { 
      title: 'Career Guide', 
      description: 'Career path planning and mentor suggestions',
      icon: Edit
    },
    { 
      title: 'Training Modules', 
      description: 'Job-aligned learning paths for professional growth',
      icon: Book
    },
    { 
      title: 'Smart Settings', 
      description: 'Customize your professional experience',
      icon: Settings
    },
    { 
      title: 'Voice Assistant', 
      description: 'Get help through voice interactions',
      icon: Mic
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="employee" username="Taylor" />
      
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
                    content: "Hi Taylor! I'm Sakha, your professional growth companion. How can I help you excel at work today?",
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
                      <Button variant="outline" size="sm" className="mt-4 w-full">
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
                <CardTitle>Your Professional Growth</CardTitle>
                <CardDescription>
                  Track your improvement across different professional skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Detailed progress tracking will be available after completing more training modules.
                </p>
                <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90">
                  Start a New Training Session
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
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90">
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
