import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatInterfaceProps {
  chatbotName?: string;
  initialMessage?: string;
  onFirstMessage?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatbotName = "Bill",
  initialMessage = "Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?",
  onFirstMessage
}) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageProps = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    // Call onFirstMessage callback if this is the first message
    if (messages.length === 0 && onFirstMessage) {
      onFirstMessage();
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const botResponse: ChatMessageProps = {
        role: 'assistant', 
        content: initialMessage
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isInitialState = messages.length === 0;

  return (
    <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-8.5rem)]">
      {!isInitialState && (
        <ScrollArea className="flex-1 p-4 space-y-4 [&_[data-radix-scroll-area-thumb]]:bg-transparent [&_[data-radix-scroll-area-scrollbar]]:w-0">
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {loading && (
              <div className="flex justify-start my-4 animate-fade-in">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
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
        </ScrollArea>
      )}
      
      <div className="sticky bottom-0 p-2 bg-gradient-to-b from-transparent to-[#E6F0FF] max-w-4xl w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default ChatInterface;
