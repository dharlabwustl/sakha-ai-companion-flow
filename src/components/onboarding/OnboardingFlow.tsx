
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleIdentification from './steps/RoleIdentification';
import PersonalityTest from './steps/PersonalityTest';
import EmotionalCheck from './steps/EmotionalCheck';
import HabitAnalysis from './steps/HabitAnalysis';
import InterestSelection from './steps/InterestSelection';
import Signup from './steps/Signup';
import { Message } from '../chat/ChatMessage';
import ChatContainer from '../chat/ChatContainer';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'student' | 'employee' | 'doctor' | 'researcher' | 'founder' | '';
export type UserData = {
  role: UserRole;
  personality: string;
  interests: string[];
  habits: {
    sleep: string;
    routine: string;
    stress: string;
    focus: string;
  };
  mood: string;
  additionalInfo: Record<string, string>;
};

const STEPS = [
  'welcome',
  'role-identification',
  'personality-test',
  'emotional-check',
  'habit-analysis',
  'interest-selection',
  'signup',
  'dashboard-intro'
];

interface OnboardingFlowProps {
  initialRole?: UserRole;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ initialRole = '' }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({
    role: initialRole,
    personality: '',
    interests: [],
    habits: {
      sleep: '',
      routine: '',
      stress: '',
      focus: ''
    },
    mood: '',
    additionalInfo: {}
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initial message
    if (currentStep === 0) {
      const initialMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
    
    // If initialRole is provided, skip the role identification step
    if (initialRole && currentStep === 0) {
      setUserData(prev => ({ ...prev, role: initialRole }));
      setTimeout(() => {
        addBotMessage("Great! Let's get to know your personality type with a quick assessment.");
        setCurrentStep(2);
      }, 1000);
    }
  }, [initialRole]);

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 10),
      role: 'assistant',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleStepComplete = (stepData: any) => {
    setIsProcessing(true);
    
    // Update userData based on current step
    const updatedUserData = { ...userData };
    
    switch (STEPS[currentStep]) {
      case 'role-identification':
        updatedUserData.role = stepData.role;
        updatedUserData.additionalInfo = { ...updatedUserData.additionalInfo, ...stepData.additionalInfo };
        addBotMessage("Great! Let's get to know your personality type with a quick assessment.");
        break;
      case 'personality-test':
        updatedUserData.personality = stepData.personality;
        addBotMessage(`I see you're a ${stepData.personality}! Now, how are you feeling today?`);
        break;
      case 'emotional-check':
        updatedUserData.mood = stepData.mood;
        addBotMessage("Thanks for sharing. Let's understand your habits better.");
        break;
      case 'habit-analysis':
        updatedUserData.habits = stepData.habits;
        addBotMessage("Now, let's find out what you're interested in learning or improving.");
        break;
      case 'interest-selection':
        updatedUserData.interests = stepData.interests;
        addBotMessage("Your personalized Sakha dashboard is ready. Please sign up to access it.");
        break;
      case 'signup':
        toast({
          title: "Account created!",
          description: "Welcome to Sakha AI. Your personalized dashboard is ready.",
        });
        // Navigate to dashboard after signup
        setTimeout(() => {
          navigate(`/dashboard/${userData.role}`);
        }, 1000);
        break;
    }
    
    setUserData(updatedUserData);
    
    // Move to next step
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const renderStepContent = () => {
    switch (STEPS[currentStep]) {
      case 'welcome':
      case 'role-identification':
        return <RoleIdentification onComplete={handleStepComplete} />;
      case 'personality-test':
        return <PersonalityTest onComplete={handleStepComplete} />;
      case 'emotional-check':
        return <EmotionalCheck onComplete={handleStepComplete} />;
      case 'habit-analysis':
        return <HabitAnalysis onComplete={handleStepComplete} />;
      case 'interest-selection':
        return <InterestSelection role={userData.role} onComplete={handleStepComplete} />;
      case 'signup':
        return <Signup onComplete={handleStepComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <ChatContainer 
        initialMessages={messages}
        isLoading={isProcessing}
        className="flex-1"
      />
      <div className="p-4 flex-shrink-0 animate-fade-in">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
