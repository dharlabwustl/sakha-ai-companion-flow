
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/components/onboarding/OnboardingFlow';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
  roleSpecific?: UserRole;
}

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedRole, setSelectedRole] = useState<UserRole>('');
  
  const generalPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic AI companion features for casual users',
      price: {
        monthly: '₹0',
        yearly: '₹0',
      },
      features: [
        { name: 'Basic AI chat', included: true },
        { name: 'Personalized recommendations', included: true },
        { name: 'Cross-device sync', included: true },
        { name: 'Advanced AI models', included: false },
        { name: 'Unlimited conversations', included: false },
        { name: 'Role-specific features', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Enhanced AI features for individual growth',
      price: {
        monthly: '₹799',
        yearly: '₹7,999',
      },
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'Advanced AI models', included: true },
        { name: 'Unlimited conversations', included: true },
        { name: 'Role-specific features', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom plugins', included: false },
      ],
      buttonText: 'Upgrade to Pro',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom AI solutions for teams and organizations',
      price: {
        monthly: 'Custom',
        yearly: 'Custom',
      },
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Custom AI training', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'API access', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'White-label solution', included: true },
      ],
      buttonText: 'Contact Sales',
    },
  ];
  
  const studentPlans: PricingPlan[] = [
    {
      id: 'student-free',
      name: 'Student Free',
      description: 'Basic study tools for students',
      price: {
        monthly: '₹0',
        yearly: '₹0',
      },
      features: [
        { name: 'Basic study planner', included: true },
        { name: '3 subject tutoring per day', included: true },
        { name: 'Exam preparation guides', included: true },
        { name: 'Advanced concept explanations', included: false },
        { name: 'Unlimited tutoring', included: false },
      ],
      buttonText: 'Start Learning',
      roleSpecific: 'student',
    },
    {
      id: 'student-pro',
      name: 'Student Pro',
      description: 'Comprehensive learning tools for serious students',
      price: {
        monthly: '₹499',
        yearly: '₹4,999',
      },
      features: [
        { name: 'Everything in Student Free', included: true },
        { name: 'Advanced concept explanations', included: true },
        { name: 'Unlimited tutoring', included: true },
        { name: 'Paper writing assistance', included: true },
        { name: 'Career guidance', included: true },
      ],
      buttonText: 'Upgrade Learning',
      popular: true,
      roleSpecific: 'student',
    },
  ];
  
  const founderPlans: PricingPlan[] = [
    {
      id: 'founder-basic',
      name: 'Startup Basic',
      description: 'Essential tools for early-stage founders',
      price: {
        monthly: '₹1,999',
        yearly: '₹19,990',
      },
      features: [
        { name: 'Startup advisor chatbot', included: true },
        { name: 'Basic business plan templates', included: true },
        { name: 'Funding strategy guidance', included: true },
        { name: 'Pitch deck review', included: false },
        { name: 'Investor network access', included: false },
      ],
      buttonText: 'Start Building',
      roleSpecific: 'founder',
    },
    {
      id: 'founder-pro',
      name: 'Founder Pro',
      description: 'Complete toolkit for scaling your startup',
      price: {
        monthly: '₹4,999',
        yearly: '₹49,990',
      },
      features: [
        { name: 'Everything in Startup Basic', included: true },
        { name: 'Advanced financial modeling', included: true },
        { name: 'Pitch deck review & optimization', included: true },
        { name: 'Investor network access', included: true },
        { name: 'Team scaling strategy', included: true },
      ],
      buttonText: 'Scale Faster',
      popular: true,
      roleSpecific: 'founder',
    },
  ];
  
  // Select plans based on role
  const getPlansForRole = (role: UserRole): PricingPlan[] => {
    switch(role) {
      case 'student':
        return studentPlans;
      case 'founder':
        return founderPlans;
      default:
        return generalPlans;
    }
  };
  
  const displayedPlans = selectedRole ? getPlansForRole(selectedRole) : generalPlans;
  
  const handlePlanSelect = (plan: PricingPlan) => {
    if (plan.id === 'enterprise') {
      toast({
        title: "Contact request sent",
        description: "Our sales team will contact you shortly to discuss enterprise options.",
      });
      return;
    }
    
    const role = plan.roleSpecific || '';
    toast({
      title: `${plan.name} plan selected!`,
      description: "Let's set up your account to get started.",
    });
    
    if (plan.id.includes('free')) {
      navigate('/signup', { state: { plan: plan.id, role } });
    } else {
      // For paid plans, we'd typically go to a payment page
      // For this demo, we'll go straight to signup
      navigate('/signup', { state: { plan: plan.id, role } });
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Choose Your Sakha AI Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Select the perfect plan to help you learn, grow, and achieve your goals with personalized AI assistance.
          </p>
          
          <div className="mb-12">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mx-auto">
                <TabsTrigger value="all" onClick={() => setSelectedRole('')}>All Plans</TabsTrigger>
                <TabsTrigger value="student" onClick={() => setSelectedRole('student')}>Student</TabsTrigger>
                <TabsTrigger value="employee" onClick={() => setSelectedRole('employee')}>Professional</TabsTrigger>
                <TabsTrigger value="founder" onClick={() => setSelectedRole('founder')}>Founder</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex justify-center mb-12">
              <div className="bg-secondary rounded-lg p-1 flex items-center">
                <Button
                  variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setBillingCycle('monthly')}
                  className={billingCycle === 'monthly' ? 'bg-sakha-purple hover:bg-sakha-purple/90' : ''}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setBillingCycle('yearly')}
                  className={billingCycle === 'yearly' ? 'bg-sakha-purple hover:bg-sakha-purple/90' : ''}
                >
                  Yearly
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                    Save 15%
                  </Badge>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`flex flex-col transition-all ${
                    plan.popular 
                      ? 'border-sakha-purple shadow-lg scale-105 relative z-10' 
                      : 'hover:border-sakha-purple/50 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-sakha-purple">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="min-h-12">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                      {plan.price.monthly !== 'Custom' && (
                        <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-sakha-purple hover:bg-sakha-purple/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-8 mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Need a custom solution?</h2>
            <p className="text-muted-foreground mb-6">
              For specialized AI solutions tailored to your unique requirements, our team is ready to help.
            </p>
            <Button className="bg-sakha-purple hover:bg-sakha-purple/90" onClick={() => {
              toast({
                title: "Request received",
                description: "We'll be in touch shortly to discuss your custom requirements.",
              });
            }}>
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
