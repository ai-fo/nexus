
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage, clearConversation } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import { ReliabilityLevel } from './ReliabilityIndicator';

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

  // Fonction pour scroller automatiquement vers le bas
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageProps = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    if (messages.length === 0 && onFirstMessage) {
      onFirstMessage();
    }
    
    setLoading(true);
    
    try {
      // Scroll après l'ajout du message utilisateur
      setTimeout(scrollToBottom, 100);
      
      const response = await sendMessage(content);
      
      // Déterminer le niveau de fiabilité basé sur les données de réponse
      let reliabilityLevel: ReliabilityLevel = 'medium';
      
      // Si la réponse contient des métadonnées sur les sources
      if (response.sources && response.sources.length > 0) {
        // Calculer une moyenne de pertinence
        const avgRelevance = response.sources.reduce((sum: number, src: any) => sum + (src.pertinence || 0), 0) / response.sources.length;
        
        if (avgRelevance > 0.8) {
          reliabilityLevel = 'high';
        } else if (avgRelevance < 0.5) {
          reliabilityLevel = 'low';
        }
      }
      
      // Si peut_repondre est explicitement défini à false, fiabilité faible
      if (response.peut_repondre === false) {
        reliabilityLevel = 'low';
      }
      
      // Si c'est le premier message, ajouter la réponse humanisée
      if (response.humanized) {
        const humanizedMessage: ChatMessageProps = {
          role: 'assistant',
          content: response.humanized,
          reliability: 'medium' // Les réponses humanisées ont une fiabilité moyenne par défaut
        };
        setMessages(prev => [...prev, humanizedMessage]);
        // Scroll après l'ajout du message humanisé
        setTimeout(scrollToBottom, 100);
      }
      
      // Ajouter la réponse réelle du bot
      const botResponse: ChatMessageProps = {
        role: 'assistant',
        content: response.answer,
        reliability: reliabilityLevel
      };
      
      setMessages(prev => [...prev, botResponse]);
      // Scroll après l'ajout de la réponse du bot
      setTimeout(scrollToBottom, 100);
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
    scrollToBottom();
  }, [messages]);

  // Effet pour scroller automatiquement vers le bas quand un message du bot reçoit de nouvelles parties
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        scrollToBottom();
      });
    });

    if (messagesEndRef.current?.parentElement) {
      observer.observe(messagesEndRef.current.parentElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const isInitialState = messages.length === 0;

  return (
    <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-8.5rem)]">
      {!isInitialState && (
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 p-4 space-y-4 overflow-hidden scrollbar-hidden"
        >
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} onNewChunkDisplayed={scrollToBottom} />
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
