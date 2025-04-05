
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { BookOpen, FileText, Stethoscope, Calendar, Book, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DashboardFeatureCard, { FeatureCardProps } from './DashboardFeatureCard';

// Mock user data that would normally come from API/auth
const mockUserData = {
  name: 'Dr. Morgan',
  role: 'doctor' as const,
  personality: 'Analytical',
  interests: ['Cardiology', 'Medical Research', 'Patient Care'],
  additionalInfo: {
    hospital: 'Central Medical',
    specialty: 'Cardiology'
  }
};

const DoctorDashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // This would typically be fetched from an API
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

  const features: FeatureCardProps[] = [
    { 
      id: 'thesis',
      title: 'Research Assistant', 
      description: 'Topic planner and milestone tracker for your research',
      icon: FileText,
      isNew: true
    },
    { 
      id: 'advisor',
      title: '24/7 Advisor', 
      description: 'Research help and structured guidance',
      icon: Stethoscope
    },
    { 
      id: 'career',
      title: 'Career Guide', 
      description: 'Publish papers and get grant application help',
      icon: BookOpen,
      isPremium: true
    },
    { 
      id: 'calendar',
      title: 'Research Calendar', 
      description: 'Track deadlines and organize your research schedule',
      icon: Calendar
    },
    { 
      id: 'literature',
      title: 'Literature Review', 
      description: 'AI-powered literature summaries and analysis',
      icon: Book,
      isPremium: false
    },
    { 
      id: 'settings',
      title: 'Smart Settings', 
      description: 'Customize your research experience',
      icon: Settings
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
    
    // Simulate different feature behaviors
    switch(featureId) {
      case 'thesis':
        toast({
          title: "Research Assistant Activated",
          description: "Let's organize your research project and track milestones.",
        });
        break;
      case 'advisor':
        toast({
          title: "Medical Advisor",
          description: "How can I assist with your medical research today?",
        });
        break;
      case 'calendar':
        toast({
          title: "Research Calendar",
          description: "Let's manage your research schedule and deadlines.",
        });
        break;
      case 'literature':
        toast({
          title: "Literature Review",
          description: "Search and analyze medical research papers.",
        });
        break;
      case 'settings':
        toast({
          title: "Settings Panel",
          description: "Customize your medical research environment.",
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
      description: "Unlock all premium features to enhance your research capabilities.",
    });
  };

  const startResearchProject = () => {
    toast({
      title: "Research Project Started",
      description: "Your new research project has been created. Start adding milestones and literature.",
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
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[60vh]">
              <ChatContainer 
                initialMessages={[
                  {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Hello ${mockUserData.name}! I'm Sakha, your research companion. How can I assist with your medical research today?`,
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
          
          <TabsContent value="research" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Research Projects</CardTitle>
                <CardDescription>
                  Track your ongoing research and publications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserData.interests.length > 0 ? (
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Ongoing Research: {mockUserData.interests[0]} Study</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>40%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-sakha-purple rounded-full" style={{ width: '40%' }}></div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">
                            Next milestone: Literature review completion (in 2 weeks)
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Create your first research project to track milestones, literature, and findings.
                    </p>
                  )}
                  
                  <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90" onClick={startResearchProject}>
                    Start a New Research Project
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
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90" onClick={handleUpgradeClick}>
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
