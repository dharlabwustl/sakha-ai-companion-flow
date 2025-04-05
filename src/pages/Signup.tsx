
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/components/onboarding/OnboardingFlow';

const Signup = () => {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  // Form state with properly typed role
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as UserRole
  });
  
  // Selected plan state with properly typed role
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    role: UserRole;
  }>({
    name: 'Free',
    price: '$0',
    role: '' as UserRole
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectPlan = (planName: string, planPrice: string, role: UserRole) => {
    setSelectedPlan({
      name: planName,
      price: planPrice,
      role: role
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    
    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to Sakha AI. Let's set up your personalized experience.",
      });
      
      // Navigate to onboarding with selected role
      navigate('/onboarding', { 
        state: { 
          role: selectedPlan.role || 'student' 
        } 
      });
      
      setIsSigningUp(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Join Sakha AI and get your personalized AI companion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Choose your plan</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button 
                      type="button"
                      variant={selectedPlan.name === 'Free' ? "default" : "outline"}
                      className={selectedPlan.name === 'Free' ? "bg-sakha-purple" : ""}
                      onClick={() => handleSelectPlan('Free', '$0', 'student')}
                    >
                      <div className="text-left">
                        <div className="font-medium">Free</div>
                        <div className="text-xs">$0/month</div>
                      </div>
                    </Button>
                    
                    <Button 
                      type="button"
                      variant={selectedPlan.name === 'Pro' ? "default" : "outline"}
                      className={selectedPlan.name === 'Pro' ? "bg-sakha-purple" : ""}
                      onClick={() => handleSelectPlan('Pro', '$10', 'employee')}
                    >
                      <div className="text-left">
                        <div className="font-medium">Pro</div>
                        <div className="text-xs">$10/month</div>
                      </div>
                    </Button>
                    
                    <Button 
                      type="button"
                      variant={selectedPlan.name === 'Premium' ? "default" : "outline"}
                      className={selectedPlan.name === 'Premium' ? "bg-sakha-purple" : ""}
                      onClick={() => handleSelectPlan('Premium', '$20', 'doctor')}
                    >
                      <div className="text-left">
                        <div className="font-medium">Premium</div>
                        <div className="text-xs">$20/month</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-sakha-purple hover:bg-sakha-purple/90"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="link" 
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/login')}
            >
              Already have an account? Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
