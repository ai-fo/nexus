
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

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
      "flex w-full gap-3 my-3 animate-slide-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 transition-transform hover:scale-110 duration-200">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-[#004c92] to-[#1a69b5] text-white shadow-lg">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "px-4 py-2 rounded-lg max-w-[80%] break-words transition-all duration-200 hover:shadow-md",
        isUser ? 
          "bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white backdrop-blur-sm" : 
          "bg-white/90 text-[#003366] border border-[#e6f0ff] hover:bg-white/95"
      )}>
        {content}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 transition-transform hover:scale-110 duration-200">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-[#004c92] to-[#003366] text-white shadow-lg">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
