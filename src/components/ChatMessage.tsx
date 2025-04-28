
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
      "flex w-full gap-3 my-4 animate-slide-in items-center",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 transition-transform hover:scale-110 duration-200 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-[#004c92] to-[#1a69b5] text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "group px-4 py-3 rounded-2xl max-w-[80%] break-words transition-all duration-300",
        isUser ? 
          "bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.02] origin-right" : 
          "bg-white/40 hover:bg-white/60 backdrop-blur-sm text-[#003366] border border-white/20 shadow-md hover:shadow-lg hover:scale-[1.02] origin-left"
      )}>
        <p className="text-base leading-relaxed">{content}</p>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 transition-transform hover:scale-110 duration-200 flex-shrink-0">
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
