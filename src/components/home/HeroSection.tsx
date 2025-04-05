
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartChat }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, isBot: boolean}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const triggerBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Define possible bot responses based on user input
    const possibleResponses = [
      {
        triggers: ['hi', 'hello', 'hey', 'greetings'],
        response: "Hello! I'm Sakha, your AI companion. How can I help you today? Are you a student, professional, or perhaps a founder?"
      },
      {
        triggers: ['student', 'study', 'learn', 'college', 'school'],
        response: "As a student, I can help you study more effectively, manage your assignments, and explain complex concepts. Would you like to explore our student features?"
      },
      {
        triggers: ['work', 'job', 'professional', 'career', 'employee'],
        response: "I can boost your professional growth with skill development, productivity tracking, and career guidance. Would you like to see what I can do for professionals?"
      },
      {
        triggers: ['startup', 'business', 'founder', 'entrepreneur'],
        response: "As a founder, I can help with product development, fundraising strategy, and scaling your business. Would you like to explore our founder features?"
      },
      {
        triggers: ['doctor', 'medical', 'healthcare', 'patient'],
        response: "For medical professionals, I offer research assistance, patient care insights, and continuing education. Shall we explore these features?"
      },
      {
        triggers: ['research', 'academic', 'paper', 'study'],
        response: "I can accelerate your research with literature reviews, writing assistance, and methodology guidance. Would you like to learn more about our researcher tools?"
      },
      {
        triggers: ['help', 'features', 'what can you do', 'capabilities'],
        response: "I can adapt to your unique needs, whether you're learning, working, researching, or building a business. I offer personalized assistance to help you achieve your goals. Would you like to see our different plans?"
      },
      {
        triggers: ['pricing', 'cost', 'plans', 'subscription', 'price'],
        response: "We offer various plans tailored to different needs. Would you like to check our pricing page for detailed information?"
      }
    ];
    
    const lowerUserMessage = userMessage.toLowerCase();
    
    // Find matching response
    let botResponse = "I'm Sakha, your AI companion. I can help with learning, work, and personal growth. Would you like to explore a specific area?";
    
    for (const item of possibleResponses) {
      if (item.triggers.some(trigger => lowerUserMessage.includes(trigger))) {
        botResponse = item.response;
        break;
      }
    }
    
    // Simulate thinking time
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1500);
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [...prev, { text: message, isBot: false }]);
    triggerBotResponse(message);
    setMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleChatButtonClick = () => {
    if (!chatActive) {
      setChatActive(true);
      // Add initial bot message
      setTimeout(() => {
        setChatMessages([{ 
          text: "Hi! I'm Sakha, your personal AI companion. How can I help you today?", 
          isBot: true 
        }]);
      }, 500);
    } else {
      onStartChat();
    }
  };
  
  const handlePricingClick = () => {
    navigate('/pricing');
  };
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages, isTyping]);
  
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-sakha-dark dark:to-sakha-dark/50 -z-10" />
      
      <div className="max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in gradient-text">
          Your Personal AI Companion
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground animate-fade-in animate-delay-100">
          Sakha AI adapts to your unique needs, helping you learn, grow, and thrive in every aspect of life.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in animate-delay-200">
          {!chatActive ? (
            <>
              <Button 
                size="lg" 
                className="bg-sakha-purple hover:bg-sakha-purple/90 text-lg"
                onClick={handleChatButtonClick}
              >
                Try Sakha AI Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg"
                onClick={handlePricingClick}
              >
                View Pricing Plans
              </Button>
            </>
          ) : (
            <Card className="w-full max-w-xl mx-auto shadow-xl border-sakha-purple/20">
              <div className="bg-sakha-purple/10 p-4 rounded-t-lg flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-sakha-purple text-white">AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Sakha AI</h3>
                  <p className="text-xs text-muted-foreground">Your personal AI companion</p>
                </div>
              </div>
              
              <div 
                id="chat-messages" 
                className="h-72 overflow-y-auto p-4 space-y-4 bg-background/50 backdrop-blur-sm"
              >
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                      msg.isBot 
                        ? 'bg-secondary text-secondary-foreground rounded-tl-none' 
                        : 'bg-sakha-purple text-white rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-3 bg-secondary text-secondary-foreground rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-sakha-purple/60 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-sakha-purple/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-sakha-purple/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t flex items-center">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                />
                <Button 
                  size="icon" 
                  className="bg-sakha-purple hover:bg-sakha-purple/90" 
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 pt-0 text-center">
                <Button 
                  variant="link" 
                  className="text-sakha-purple" 
                  onClick={() => navigate('/onboarding')}
                >
                  Start Full Onboarding Experience
                </Button>
              </div>
            </Card>
          )}
        </div>
        
        <div className="mt-16 px-4 animate-fade-in animate-delay-300">
          <h2 className="text-2xl font-display font-semibold mb-4">
            From Our Founder
          </h2>
          <div className="bg-white/50 dark:bg-sakha-dark/50 backdrop-blur-sm p-6 rounded-xl shadow-sm max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sakha-purple flex-shrink-0">
              <img 
                src="/lovable-uploads/d13b9fa0-f489-47d4-be1e-8aff11cbc12a.png" 
                alt="Amit Singh, Founder of Sakha AI" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg italic mb-4">
                "We created Sakha AI to be more than just a virtual assistant — it's a companion that understands your unique context, adapts to your needs, and helps you achieve your full potential in learning, work, and personal growth."
              </p>
              <p className="font-medium">
                - Amit Singh, Founder of Sakha AI
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="h-10 w-10 rounded-full border-2 border-muted flex items-center justify-center">
          <ArrowRight className="h-5 w-5 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
