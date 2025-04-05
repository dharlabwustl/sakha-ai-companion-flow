
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Lightbulb, LineChart, Users, FileText, Calendar, Settings } from 'lucide-react';

const FounderDashboard: React.FC = () => {
  const kpis = [
    {
      title: 'MVP Completion',
      value: '65%',
      indicator: 'up' as const,
      change: '15% this week'
    },
    {
      title: 'Team Engagement',
      value: 'High',
      indicator: 'up' as const,
      change: 'Improved from Medium'
    },
    {
      title: 'Fundraising Readiness',
      value: '70%',
      indicator: 'up' as const,
      change: '10% increase'
    },
    {
      title: 'Burnout Risk',
      value: 'Low',
      indicator: 'down' as const,
      change: 'Decreased this month'
    },
    {
      title: 'Goal Completion',
      value: '8/10',
      indicator: 'neutral' as const,
      change: '2 remaining'
    }
  ];

  const features = [
    { 
      title: '24/7 Startup Advisor', 
      description: 'Strategy help and business questions answered instantly',
      icon: Lightbulb
    },
    { 
      title: 'MVP Builder', 
      description: 'Transform your idea into a product with structured guidance',
      icon: FileText
    },
    { 
      title: 'Company Coach', 
      description: 'Hiring help, pitch decks, and presentation templates',
      icon: Users
    },
    { 
      title: 'Business Analytics', 
      description: 'Track metrics and get insights for growth',
      icon: LineChart
    },
    { 
      title: 'Startup Calendar', 
      description: 'Organize your fundraising and product milestones',
      icon: Calendar
    },
    { 
      title: 'Smart Settings', 
      description: 'Customize your founder experience',
      icon: Settings
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="founder" username="Jamie" />
      
      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <DashboardKPI kpis={kpis} />
        </div>
        
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="startup">Startup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[60vh]">
              <ChatContainer 
                initialMessages={[
                  {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello Jamie! I'm Sakha, your startup companion. How can I help grow your business today?",
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
          
          <TabsContent value="startup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Startup Journey</CardTitle>
                <CardDescription>
                  Track your progress from idea to successful business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Create your startup roadmap to organize your vision, team, and funding strategy.
                </p>
                <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90">
                  Start Your Startup Roadmap
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
                Launch your idea with expert AI support, from MVP to pitch
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm">Premium Features:</p>
                <ul className="text-sm list-disc list-inside text-muted-foreground">
                  <li>Complete startup journey planner</li>
                  <li>Advanced team analysis tools</li>
                  <li>Pitch deck coaching</li>
                  <li>Fundraising AI assistant</li>
                  <li>Full MVP builder toolkit</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90">
                  Unlock Founder Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;
