
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { UserRole } from '@/components/onboarding/OnboardingFlow';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, role } = location.state || {};
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    otp: ''
  });
  
  const [planInfo, setPlanInfo] = useState<{
    name: string;
    price: string;
    role: UserRole;
  } | null>(null);
  
  useEffect(() => {
    // Set plan information based on the plan ID passed
    if (plan) {
      let planDetails = {
        name: "Free Plan",
        price: "₹0/month",
        role: role as UserRole || ''
      };
      
      // This would normally come from an API or more complex state management
      if (plan.includes('pro')) {
        if (plan.includes('student')) {
          planDetails = {
            name: "Student Pro",
            price: "₹499/month",
            role: 'student'
          };
        } else if (plan.includes('founder')) {
          planDetails = {
            name: "Founder Pro",
            price: "₹4,999/month",
            role: 'founder'
          };
        } else {
          planDetails = {
            name: "Pro Plan",
            price: "₹799/month",
            role: role as UserRole || ''
          };
        }
      } else if (plan.includes('basic') && plan.includes('founder')) {
        planDetails = {
          name: "Startup Basic",
          price: "₹1,999/month",
          role: 'founder'
        };
      }
      
      setPlanInfo(planDetails);
    }
  }, [plan, role]);
  
  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };
  
  const validateStep = (currentStep: number): boolean => {
    switch(currentStep) {
      case 1:
        if (!formData.name.trim()) {
          toast({ title: "Name is required", description: "Please enter your name" });
          return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
          toast({ title: "Valid email is required", description: "Please enter a valid email address" });
          return false;
        }
        return true;
      case 2:
        if (!formData.password.trim() || formData.password.length < 6) {
          toast({ title: "Strong password required", description: "Password must be at least 6 characters" });
          return false;
        }
        if (!formData.mobile.trim() || formData.mobile.length < 10) {
          toast({ title: "Mobile number required", description: "Please enter a valid mobile number" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };
  
  const handleRequestOTP = () => {
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.mobile}`,
      });
    }, 1500);
  };
  
  const handleVerifyOTP = () => {
    if (!formData.otp.trim() || formData.otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit verification code" });
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification and account creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to Sakha AI. Let's get started!",
      });
      // Navigate to onboarding flow with role (if provided)
      navigate('/onboarding', { state: { role: planInfo?.role || role || '' } });
    }, 1500);
  };
  
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <Button 
              className="w-full bg-sakha-purple hover:bg-sakha-purple/90" 
              onClick={handleNext}
            >
              Continue
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-sakha-purple hover:bg-sakha-purple/90" 
                onClick={handleRequestOTP}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Request OTP"
                )}
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit verification code to {formData.mobile}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Enter Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                maxLength={6}
                required
              />
            </div>
            <Button 
              className="w-full bg-sakha-purple hover:bg-sakha-purple/90" 
              onClick={handleVerifyOTP}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Create Account"
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Didn't receive the code?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-sakha-purple"
                onClick={handleRequestOTP}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            </p>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display font-bold">Create an Account</CardTitle>
            <CardDescription>
              {planInfo ? (
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground">Selected Plan:</div>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <Badge variant="outline" className="bg-sakha-purple/10 text-sakha-purple border-sakha-purple/30">
                      {planInfo.name}
                    </Badge>
                    <span className="text-sm font-medium">{planInfo.price}</span>
                  </div>
                </div>
              ) : (
                "Sign up for Sakha AI and start your journey"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderStep()}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-sakha-purple hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
