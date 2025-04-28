
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
          <AvatarFallback className="bg-gradient-to-br from-[#004c92] to-[#1a69b5] text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "px-4 py-2 rounded-lg max-w-[80%] break-words transition-all duration-200",
        isUser ? 
          "bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white backdrop-blur-sm" : 
          "bg-white/40 backdrop-blur-sm text-[#003366] border border-white/20"
      )}>
        {content}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 transition-transform hover:scale-110 duration-200">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-[#004c92] to-[#003366] text-white">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
