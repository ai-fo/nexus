
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
    <Card className="w-full max-w-4xl mx-auto min-h-[700px] flex flex-col shadow-2xl rounded-3xl bg-white/80 backdrop-blur-md border-white/20">
      <CardHeader className="bg-gradient-to-r from-chatbot-primary to-chatbot-dark text-white rounded-t-3xl py-6 px-8">
        <CardTitle className="text-center text-2xl font-medium tracking-tight">
          {chatbotName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {loading && (
            <div className="flex justify-start my-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm">
                <div className="flex space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-chatbot-primary animate-bounce"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-chatbot-primary animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-chatbot-primary animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-6 bg-white/50 border-t border-white/10 rounded-b-3xl">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
