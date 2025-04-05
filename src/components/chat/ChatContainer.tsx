
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage, { Message, MessageRole } from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatContainerProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  className?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 10);

const ChatContainer: React.FC<ChatContainerProps> = ({
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (onSendMessage) {
      onSendMessage(content);
    } else {
      // Default behavior: generate an AI response after a short delay
      setTimeout(() => {
        const responses = [
          "I'm here to assist you with that. What specific information do you need?",
          "Great question! Let me help you with that.",
          "Based on your profile, I'd recommend focusing on this area first.",
          "I've analyzed your progress, and you're doing well with this skill!",
          "Would you like me to create a personalized plan for this?",
          "Let me find some resources that match your learning style."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const aiResponse: Message = {
          id: generateId(),
          role: 'assistant',
          content: randomResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md animate-fade-in">
              <h2 className="text-2xl font-display font-semibold mb-2">Welcome to Sakha AI</h2>
              <p className="text-muted-foreground">
                Your personal AI companion for learning, growth, and well-being.
              </p>
            </div>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <ChatInput 
          onSendMessage={handleSendMessage}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
