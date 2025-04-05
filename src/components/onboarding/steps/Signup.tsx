
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupProps {
  onComplete: (data: any) => void;
}

const Signup: React.FC<SignupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    otp: '',
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleRequestOTP = () => {
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onComplete(formData);
    }, 1500);
  };

  const isStep1Valid = formData.name.trim() && 
    formData.mobile.trim().length >= 10;
  const isStep2Valid = formData.otp.trim().length === 6;

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">
        {step === 1 ? 'Create your account' : 'Verify your number'}
      </h3>
      
      {step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="Enter your mobile number"
              type="tel"
            />
          </div>
          
          <Button 
            onClick={handleRequestOTP} 
            disabled={!isStep1Valid || isLoading}
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
          >
            {isLoading ? 'Sending OTP...' : 'Request OTP'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've sent a 6-digit code to {formData.mobile}
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              value={formData.otp}
              onChange={(e) => handleInputChange('otp', e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>
          
          <Button 
            onClick={handleVerifyOTP} 
            disabled={!isStep2Valid || isLoading}
            className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
          >
            {isLoading ? 'Verifying...' : 'Verify & Create Account'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Didn't receive the code?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs text-sakha-purple"
              onClick={() => setStep(1)}
            >
              Resend OTP
            </Button>
          </p>
        </div>
      )}
    </Card>
  );
};

export default Signup;
