
import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  role,
  timestamp = new Date(),
}) => {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex w-full gap-3 my-4 animate-slide-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "group max-w-[80%] break-words transition-all duration-300",
        isUser ? 
          "px-4 py-3 rounded-2xl bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.02] origin-right" : 
          "text-[#003366]"
      )}>
        <p className="text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
