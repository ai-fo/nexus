import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <Card className="w-full max-w-4xl mx-auto min-h-[700px] flex flex-col shadow-lg rounded-lg bg-white/90 backdrop-blur-sm border border-[#e6f0ff]">
      <CardHeader className="bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white rounded-t-lg py-4 px-6">
        <CardTitle className="text-center text-xl font-medium">
          {chatbotName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {loading && (
            <div className="flex justify-start my-4">
              <div className="bg-gray-100 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-[#f8faff] border-t border-[#e6f0ff]">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
