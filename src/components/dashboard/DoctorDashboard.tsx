
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { BookOpen, FileText, Stethoscope, Calendar, Book, Settings } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const kpis = [
    {
      title: 'Research Milestones',
      value: '7/10',
      indicator: 'up' as const,
      change: '2 completed this month'
    },
    {
      title: 'Writing Frequency',
      value: '3 days/week',
      indicator: 'neutral' as const,
      change: 'Consistent'
    },
    {
      title: 'Stress Level',
      value: 'Moderate',
      indicator: 'down' as const,
      change: 'Improving trend'
    },
    {
      title: 'Literature Reviewed',
      value: '28 papers',
      indicator: 'up' as const,
      change: '+5 this week'
    },
    {
      title: 'Grant Progress',
      value: '40%',
      indicator: 'up' as const,
      change: '10% increase'
    }
  ];

  const features = [
    { 
      title: 'Make Thesis/Research', 
      description: 'Topic planner and milestone tracker for your research',
      icon: FileText
    },
    { 
      title: '24/7 Advisor', 
      description: 'Research help and structured guidance',
      icon: Stethoscope
    },
    { 
      title: 'Career Guide', 
      description: 'Publish papers and get grant application help',
      icon: BookOpen
    },
    { 
      title: 'Research Calendar', 
      description: 'Track deadlines and organize your research schedule',
      icon: Calendar
    },
    { 
      title: 'Literature Review', 
      description: 'AI-powered literature summaries and analysis',
      icon: Book
    },
    { 
      title: 'Smart Settings', 
      description: 'Customize your research experience',
      icon: Settings
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="doctor" username="Dr. Morgan" />
      
      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <DashboardKPI kpis={kpis} />
        </div>
        
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[60vh]">
              <ChatContainer 
                initialMessages={[
                  {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello Dr. Morgan! I'm Sakha, your research companion. How can I assist with your medical research today?",
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
          
          <TabsContent value="research" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Research Projects</CardTitle>
                <CardDescription>
                  Track your ongoing research and publications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Create your first research project to track milestones, literature, and findings.
                </p>
                <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90">
                  Start a New Research Project
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
                Speed up your thesis with AI support and stay on track with smart nudges
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm">Premium Features:</p>
                <ul className="text-sm list-disc list-inside text-muted-foreground">
                  <li>Full thesis assistant</li>
                  <li>Advanced literature summarization</li>
                  <li>Weekly progress insights</li>
                  <li>Mentor suggestions</li>
                  <li>Grant writing assistance</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90">
                  See Premium Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
