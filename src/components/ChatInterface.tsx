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

  const exampleQuestions = [
    "Comment changer mon mot de passe ?",
    "Mon VPN ne fonctionne pas",
    "Je ne peux pas accéder à mes emails",
    "Comment installer les mises à jour ?",
  ];

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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
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
        </div>
      )}
      
      {isInitialState && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 max-w-4xl mx-auto">
          <div className="text-center space-y-2 animate-fade-in">
            <p className="text-[#3380cc]/60 text-sm">Exemples de questions fréquentes :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="px-4 py-2 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm text-[#003366] border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 text-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full sticky bottom-0 max-w-4xl px-4 py-4 bg-gradient-to-b from-transparent to-[#E6F0FF]">
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
          </div>
        </div>
      )}
      
      {!isInitialState && (
        <div className="sticky bottom-0 p-4 bg-gradient-to-b from-transparent to-[#E6F0FF] max-w-4xl w-full">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
