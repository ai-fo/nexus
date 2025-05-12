
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { TrendingUp, PhoneCall } from 'lucide-react';
import IncidentStatus, { waitTimeInfo, appIncidents } from './IncidentStatus';
import { Card } from '@/components/ui/card';

interface ChatInterfaceProps {
  chatbotName?: string;
  initialMessage?: string;
  onFirstMessage?: () => void;
  trendingQuestions?: string[];
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
  onFirstMessage,
  trendingQuestions = [
    "Problème avec Artis",
    "SAS est très lent aujourd'hui",
    "Impossible d'accéder à mon compte",
  ]
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
      
      // Si c'est le premier message, ajouter la réponse humanisée
      if (response.humanized) {
        const humanizedMessage: ChatMessageProps = {
          role: 'assistant',
          content: response.humanized
        };
        setMessages(prev => [...prev, humanizedMessage]);
        // Scroll après l'ajout du message humanisé
        setTimeout(scrollToBottom, 100);
      }
      
      // Ajouter la réponse réelle du bot
      const botResponse: ChatMessageProps = {
        role: 'assistant',
        content: response.answer
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
        <div className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full flex-1 gap-4">
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
          
          <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch sm:items-start mt-4">
            {/* Modern wait time pill */}
            <div className={`rounded-full px-4 py-1.5 flex items-center gap-2 text-sm shadow-sm mb-2 mx-auto sm:mx-0 ${
              waitTimeInfo.status === 'low' ? 'bg-green-100 text-green-800' : 
              waitTimeInfo.status === 'high' ? 'bg-red-100 text-red-800' : 
              'bg-amber-100 text-amber-800'
            }`}>
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Temps d'attente: ~{waitTimeInfo.minutes} min</span>
              {waitTimeInfo.callers > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/70 text-xs font-medium">
                  {waitTimeInfo.callers} {waitTimeInfo.callers === 1 ? 'appelant' : 'appelants'}
                </span>
              )}
            </div>
          </div>
          
          {/* Display both sections side by side */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Incidents Section */}
            <Card className="bg-white/80 shadow-sm overflow-hidden">
              <IncidentStatus showTitle={true} compact={true} />
            </Card>
            
            {/* Trending Questions Section */}
            <Card className="bg-white/80 shadow-sm p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-[#004c92]" />
                <h3 className="font-medium text-[#004c92] text-sm">Questions tendance aujourd'hui</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {trendingQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-left p-2 bg-white/70 hover:bg-white rounded border border-[#e6f0ff] shadow-sm hover:shadow transition-all duration-200 text-[#333] hover:text-[#004c92] text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>
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
