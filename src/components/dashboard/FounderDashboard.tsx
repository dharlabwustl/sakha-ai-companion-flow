
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import DashboardKPI from './DashboardKPI';
import ChatContainer from '../chat/ChatContainer';
import { Lightbulb, LineChart, Users, FileText, Calendar, Settings, ChevronRight, PlusCircle, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const FounderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

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
      id: 'advisor',
      title: '24/7 Startup Advisor', 
      description: 'Strategy help and business questions answered instantly',
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h3 className="font-medium mb-2">Ask me anything about:</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Market Research', 'Business Model', 'Product Strategy', 'Team Building', 'Fundraising', 'Legal & Compliance'].map((topic, index) => (
                <Badge key={index} variant="outline" className="justify-start gap-1 py-1.5">
                  <ChevronRight className="h-3 w-3" /> {topic}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-sakha-purple hover:bg-sakha-purple/90"
              onClick={() => toast({
                title: "Advisor Activated",
                description: "Your startup advisor is now ready to chat.",
              })}
            >
              Start Conversation
            </Button>
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={() => navigate('/pricing')}
            >
              Upgrade for 24/7 Access
            </Button>
          </div>
        </div>
      )
    },
    { 
      id: 'mvp',
      title: 'MVP Builder', 
      description: 'Transform your idea into a product with structured guidance',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { id: 'mvp1', name: 'Define Core Problem', status: 'completed' },
              { id: 'mvp2', name: 'Identify Target Users', status: 'completed' },
              { id: 'mvp3', name: 'Create User Stories', status: 'active' },
              { id: 'mvp4', name: 'Design Wireframes', status: 'pending' },
              { id: 'mvp5', name: 'Technical Stack Selection', status: 'pending' },
            ].map((task) => (
              <div 
                key={task.id}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                  task.status === 'completed' 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : task.status === 'active'
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                      : 'bg-secondary/30 border-secondary'
                } ${activeTaskId === task.id ? 'ring-2 ring-sakha-purple' : ''}`}
                onClick={() => {
                  setActiveTaskId(task.id);
                  toast({
                    title: `Task ${task.status === 'completed' ? 'Completed' : task.status === 'active' ? 'In Progress' : 'Pending'}`,
                    description: `${task.name} is ${task.status === 'completed' ? 'already completed' : task.status === 'active' ? 'currently active' : 'scheduled next'}.`,
                  });
                }}
              >
                <div className="flex items-center gap-2">
                  {task.status === 'completed' ? (
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : task.status === 'active' ? (
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-dashed animate-spin" style={{ animationDuration: '3s' }}></div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-muted-foreground"></div>
                  )}
                  <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                    {task.name}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Overall Progress: 40%</div>
            <Progress value={40} className="w-1/2" />
          </div>
          <Button 
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
            onClick={() => {
              toast({
                title: "MVP Builder Activated",
                description: "Let's continue building your minimum viable product.",
              });
            }}
          >
            Continue MVP Development
          </Button>
        </div>
      )
    },
    { 
      id: 'coach',
      title: 'Company Coach', 
      description: 'Hiring help, pitch decks, and presentation templates',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Pitch Deck Builder</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button 
                  className="w-full mt-2" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Pitch Deck Builder",
                      description: "Create a compelling investor pitch deck with AI guidance.",
                    });
                  }}
                >
                  Create Deck
                </Button>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Hiring Assistant</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button 
                  className="w-full mt-2" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Hiring Assistant",
                      description: "Find and evaluate the perfect candidates for your startup.",
                    });
                  }}
                >
                  Start Hiring
                </Button>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Team Alignment</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button 
                  className="w-full mt-2" 
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                >
                  Premium Feature
                </Button>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Leadership Coach</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Button 
                  className="w-full mt-2" 
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                >
                  Premium Feature
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
            onClick={() => {
              toast({
                title: "Company Coach Activated",
                description: "Get personalized guidance for your startup's growth.",
              });
            }}
          >
            Get Coaching
          </Button>
        </div>
      )
    },
    { 
      id: 'analytics',
      title: 'Business Analytics', 
      description: 'Track metrics and get insights for growth',
      icon: LineChart,
      content: (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Monthly Growth Metrics</h3>
              <Badge>Beta</Badge>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Acquisition</span>
                  <span className="text-green-600 dark:text-green-400">+15%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Revenue Growth</span>
                  <span className="text-green-600 dark:text-green-400">+8%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>User Engagement</span>
                  <span className="text-green-600 dark:text-green-400">+22%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-sakha-purple hover:bg-sakha-purple/90"
              onClick={() => {
                toast({
                  title: "Analytics Dashboard",
                  description: "View detailed metrics about your startup's performance.",
                });
              }}
            >
              View Full Analytics
            </Button>
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={() => navigate('/pricing')}
            >
              Upgrade for Advanced Insights
            </Button>
          </div>
        </div>
      )
    },
    { 
      id: 'calendar',
      title: 'Startup Calendar', 
      description: 'Organize your fundraising and product milestones',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Upcoming Milestones</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 gap-1"
                onClick={() => {
                  toast({
                    title: "New Milestone Added",
                    description: "Add important dates to track your startup journey.",
                  });
                }}
              >
                <PlusCircle className="h-4 w-4" /> Add
              </Button>
            </div>
            
            {[
              { id: 'cal1', date: 'April 15', title: 'MVP Alpha Release', status: 'upcoming' },
              { id: 'cal2', date: 'April 22', title: 'Investor Pitch Preparation', status: 'upcoming' },
              { id: 'cal3', date: 'May 5', title: 'Seed Funding Round', status: 'upcoming' },
            ].map((event) => (
              <div 
                key={event.id}
                className="p-3 rounded-lg border border-secondary bg-secondary/30 flex justify-between items-center cursor-pointer hover:border-sakha-purple/50 transition-colors"
                onClick={() => {
                  toast({
                    title: event.title,
                    description: `Scheduled for ${event.date}. Click to view details.`,
                  });
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-sakha-purple/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-sakha-purple">{event.date.split(' ')[1]}</span>
                    <span className="text-xs">Apr</span>
                  </div>
                  <span>{event.title}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
            onClick={() => {
              toast({
                title: "Startup Calendar Opened",
                description: "Plan your startup journey with important milestones.",
              });
            }}
          >
            View Full Calendar
          </Button>
        </div>
      )
    },
    { 
      id: 'settings',
      title: 'Smart Settings', 
      description: 'Customize your founder experience',
      icon: Settings,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium">Personalization</h3>
            
            <div className="space-y-2 p-3 rounded-lg border border-secondary">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Startup Industry</div>
                  <div className="text-sm text-muted-foreground">SaaS / Technology</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Industry Updated",
                      description: "Your startup category has been updated to SaaS / Technology.",
                    });
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 p-3 rounded-lg border border-secondary">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Startup Stage</div>
                  <div className="text-sm text-muted-foreground">Early / Pre-seed</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Startup Stage Updated",
                      description: "Your startup stage has been updated to Early / Pre-seed.",
                    });
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 p-3 rounded-lg border border-secondary">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Team Size</div>
                  <div className="text-sm text-muted-foreground">1-5 employees</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Team Size Updated",
                      description: "Your team size has been updated to 1-5 employees.",
                    });
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
            onClick={() => {
              toast({
                title: "Settings Saved",
                description: "Your founder experience has been customized based on your preferences.",
              });
            }}
          >
            Update Profile
          </Button>
        </div>
      )
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId === selectedFeature ? null : featureId);
    toast({
      title: "Feature activated",
      description: `You've activated the ${features.find(f => f.id === featureId)?.title} feature.`,
    });
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  const startRoadmap = () => {
    toast({
      title: "Startup Roadmap Started",
      description: "Your startup roadmap has been created. Start adding milestones and goals.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="founder" username="Amit" />
      
      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sakha-purple">
                <img 
                  src="/lovable-uploads/d13b9fa0-f489-47d4-be1e-8aff11cbc12a.png" 
                  alt="Amit Singh, Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, Amit!</h1>
              <p className="text-muted-foreground">Here's your startup progress for today</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="bg-sakha-purple/10 text-sakha-purple">
                  Founder
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  Tech Startup
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Pre-seed
                </Badge>
              </div>
            </div>
          </div>
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
                    content: "Hello Amit! I'm Sakha, your startup companion. Your MVP is now 65% complete - would you like to continue working on user story development or review your pitch deck for the upcoming investor meeting?",
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
                const isSelected = selectedFeature === feature.id;
                
                return (
                  <Card 
                    key={index} 
                    className={`overflow-hidden transition-all ${
                      isSelected ? 'ring-2 ring-sakha-purple' : ''
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${
                          isSelected ? 'bg-sakha-purple text-white' : 'bg-secondary'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <CardDescription className="min-h-[40px]">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isSelected ? (
                        feature.content
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4 w-full" 
                          onClick={() => handleFeatureClick(feature.id)}
                        >
                          Access Feature
                        </Button>
                      )}
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Startup Roadmap</h3>
                      <Badge>In Progress</Badge>
                    </div>
                    <div className="relative">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-sakha-purple rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Idea</span>
                        <span>MVP</span>
                        <span>Product-Market Fit</span>
                        <span>Scale</span>
                      </div>
                      <div className="absolute top-0 left-[35%] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 rounded-full bg-sakha-purple"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-secondary/30">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Product</CardTitle>
                          <Badge variant="outline">65%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <Button 
                          className="w-full mt-2" 
                          size="sm"
                          onClick={() => handleFeatureClick('mvp')}
                        >
                          Continue MVP
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-secondary/30">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Funding</CardTitle>
                          <Badge variant="outline">40%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <Button 
                          className="w-full mt-2" 
                          size="sm"
                          onClick={() => handleFeatureClick('coach')}
                        >
                          Prepare Pitch
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-secondary/30">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Team</CardTitle>
                          <Badge variant="outline">20%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <Button 
                          className="w-full mt-2" 
                          size="sm"
                          onClick={() => handleFeatureClick('coach')}
                        >
                          Start Hiring
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button className="w-full bg-sakha-purple hover:bg-sakha-purple/90" onClick={startRoadmap}>
                    Update Startup Roadmap
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
                <Button className="bg-sakha-purple hover:bg-sakha-purple/90" onClick={handleUpgradeClick}>
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
