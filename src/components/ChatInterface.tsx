
import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  chatbotName?: string;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatbotName = "Bill",
  initialMessage = "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
}) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { role: 'assistant', content: initialMessage }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageProps = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    
    setTimeout(() => {
      const botResponse: ChatMessageProps = {
        role: 'assistant', 
        content: "Cette réponse est un placeholder. Connectez votre backend Python RAG pour des réponses intelligentes."
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isInitialState = messages.length === 1;

  return (
    <div className="w-full max-w-4xl flex flex-col min-h-[calc(100vh-12rem)]">
      {!isInitialState && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {loading && (
              <div className="flex justify-start my-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#004c92] animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1a69b5] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-[#3380cc] animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      
      <div className={cn(
        "p-4 transition-all duration-300 ease-in-out",
        isInitialState ? "flex-1 flex items-center justify-center" : "sticky bottom-0 bg-gradient-to-b from-transparent to-[#E6F0FF]"
      )}>
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default ChatInterface;
