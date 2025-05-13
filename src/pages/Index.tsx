
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Button } from "@/components/ui/button";
import { RefreshCw, PhoneCall, TrendingUp, Clock } from 'lucide-react';
import { clearConversation } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { waitTimeInfo } from '@/components/IncidentStatus';
import IncidentStatus, { appIncidents } from '@/components/IncidentStatus';
import { Card } from "@/components/ui/card";

// Trending questions without having to access them from ChatInterface
const TRENDING_QUESTIONS = [
  "Problème avec Artis",
  "SAS est très lent aujourd'hui",
  "Impossible d'accéder à mon compte",
];

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [chatKey, setChatKey] = useState(0); // Add key to force re-render ChatInterface
  const { toast } = useToast();

  const handleFirstMessage = () => {
    setIsAnimated(true);
  };

  const handleNewChat = async () => {
    try {
      await clearConversation();
      setIsAnimated(false);
      setChatKey(prev => prev + 1); // Increment key to reset ChatInterface
      toast({
        title: "Conversation réinitialisée",
        description: "Une nouvelle conversation a été démarrée",
      });
    } catch (error) {
      console.error("Erreur lors de la réinitialisation de la conversation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser la conversation",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#E6F0FF] animate-fade-in overflow-hidden">
      <div className={`transition-all duration-500 ease-in-out ${isAnimated ? 'pt-2 pb-1 pl-4 flex flex-col items-start gap-1 pr-4' : 'h-[60vh] flex flex-col items-center justify-center'}`}>
        <h1 
          onClick={handleNewChat}
          className={`text-xl sm:text-2xl font-bold text-[#004c92] transition-all duration-500 ease-in-out ${isAnimated ? 'transform -translate-x-0 scale-100 cursor-pointer' : 'transform scale-150'}`}
        >
          <span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">H</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">o</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">t</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">l</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">i</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">n</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">e</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]"> </span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">A</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">s</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">s</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">i</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">s</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">t</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">a</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">n</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">c</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 hover:text-[#1a69b5]">e</span>
          </span>
        </h1>
        
        {isAnimated && (
          <div className="mt-2 self-end">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E6F0FF]/50"
              onClick={handleNewChat}
              title="Nouvelle conversation"
            >
              <RefreshCw className="h-5 w-5 text-[#004c92]" />
            </Button>
          </div>
        )}
      </div>
      
      <div className={`flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12 transition-all duration-500 ease-in-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
        <div className="w-full flex flex-col items-center justify-center">
          <ChatInterface 
            key={chatKey}
            chatbotName="Bill"
            initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
            onFirstMessage={handleFirstMessage}
            trendingQuestions={TRENDING_QUESTIONS}
          />
        </div>
      </div>
      
      <footer className="py-2 text-center text-sm text-[#3380cc] flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-80">
        <p>Si l'IA prends le contrôle, contactez vite la hotline au 3400</p>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-3 py-0.5 shadow-sm border border-blue-200">
          <Clock className="h-3 w-3 text-[#004c92]" />
          <span className="text-xs text-[#004c92] font-medium">~{waitTimeInfo.minutes} min d'attente</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
