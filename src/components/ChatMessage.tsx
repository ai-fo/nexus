
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
      "flex w-full gap-3 my-4 animate-slide-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "px-4 py-3 rounded-2xl max-w-[80%] break-words shadow-lg",
        isUser ? 
          "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-none" : 
          "bg-white/10 backdrop-blur-md text-orange-50 rounded-bl-none border border-orange-200/10"
      )}>
        {content}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
