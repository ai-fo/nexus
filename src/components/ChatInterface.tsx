
import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage, clearConversation } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";

interface ChatInterfaceProps {
  chatbotName?: string;
  initialMessage?: string;
  onFirstMessage?: () => void;
}

const QUESTIONS = [
  "Quel souci rencontrez-vous ?",
  "En quoi puis-je vous aider ?",
  "Qu'est-ce qui ne va pas ?",
  "Un soucis technique ?"
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatbotName = "Bill",
  initialMessage = "Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?",
  onFirstMessage
}) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % QUESTIONS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Fonction pour capturer la référence de l'input depuis le composant ChatInput
  const setInputRef = (ref: HTMLInputElement | null) => {
    inputRef.current = ref;
  };

  // Fonction pour refocuser l'input
  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageProps = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    if (messages.length === 0 && onFirstMessage) {
      onFirstMessage();
    }
    
    setLoading(true);
    
    try {
      const response = await sendMessage(content);
      
      // Si c'est le premier message, ajouter la réponse humanisée
      if (response.humanized) {
        const humanizedMessage: ChatMessageProps = {
          role: 'assistant',
          content: response.humanized
        };
        setMessages(prev => [...prev, humanizedMessage]);
      }
      
      // Ajouter la réponse réelle du bot
      const botResponse: ChatMessageProps = {
        role: 'assistant',
        content: response.answer
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au serveur. Vérifiez que le backend Python est en cours d'exécution.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      // Refocuser l'input après réception de la réponse
      focusInput();
    }
  };

  // Effet pour scroller automatiquement vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isInitialState = messages.length === 0;

  return (
    <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-8.5rem)]">
      {!isInitialState && (
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 p-4 space-y-4 group/scroller overflow-hidden"
        >
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      )}
      
      {isInitialState && (
        <div className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full flex-1">
          <div className="h-8 mb-2 overflow-hidden">
            <p 
              key={currentQuestionIndex}
              className="text-[#3380cc] text-xl font-bold animate-slide-in"
            >
              {QUESTIONS[currentQuestionIndex]}
            </p>
          </div>
          <div className="w-full px-4 py-2">
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} getInputRef={setInputRef} />
          </div>
        </div>
      )}
      
      {!isInitialState && (
        <div className="sticky bottom-0 p-2 bg-gradient-to-b from-transparent to-[#E6F0FF] max-w-4xl w-full">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} getInputRef={setInputRef} />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
