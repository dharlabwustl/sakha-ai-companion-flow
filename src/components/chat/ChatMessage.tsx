
import React from 'react';
import { cn } from '@/lib/utils';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full max-w-4xl mx-auto items-start gap-4 py-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sakha-purple to-sakha-blue flex items-center justify-center text-white text-sm font-semibold">
          S
        </div>
      )}
      
      <div 
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[90%] sm:max-w-[75%]",
          isUser 
            ? "bg-sakha-purple text-white rounded-tr-none" 
            : "bg-secondary text-foreground rounded-tl-none"
        )}
      >
        <div className="prose prose-sm">
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground text-sm font-semibold">
          U
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
