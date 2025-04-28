
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
    // Add user message
    const userMessage: ChatMessageProps = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate loading
    setLoading(true);
    
    // This is where you would integrate with your Python backend
    // For now, we'll simulate a response
    setTimeout(() => {
      const botResponse: ChatMessageProps = {
        role: 'assistant', 
        content: "Cette réponse est un placeholder. Connectez votre backend Python RAG pour des réponses intelligentes."
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col shadow-xl rounded-2xl bg-white/70 backdrop-blur-sm border-white/20">
      <CardHeader className="bg-gradient-to-r from-chatbot-primary to-chatbot-dark text-white rounded-t-2xl py-4 px-6">
        <CardTitle className="text-center text-xl font-medium">{chatbotName}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {loading && (
            <div className="flex justify-start my-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-chatbot-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-chatbot-primary animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-chatbot-primary animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-white/50">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
