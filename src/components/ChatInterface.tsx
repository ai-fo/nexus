
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  chatbotName?: string;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatbotName = "Assistant AI",
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
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col shadow-lg">
      <CardHeader className="bg-chatbot-primary text-white py-3">
        <CardTitle className="text-center">{chatbotName}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {loading && (
            <div className="flex justify-start my-4">
              <div className="bg-gray-200 rounded-lg px-4 py-2">
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
      
      <CardFooter className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
