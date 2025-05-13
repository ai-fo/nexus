
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Button } from "@/components/ui/button";
import { RefreshCw, PhoneCall, TrendingUp, Clock, Headset } from 'lucide-react';
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
      {/* Header section with title and logo */}
      <div className={`transition-all duration-500 ease-in-out ${isAnimated ? 'pt-3 pb-2 pl-6 flex flex-col items-start gap-2 pr-6' : 'pt-20 pb-8 h-[28vh] flex flex-col items-center justify-center gap-4'}`}>
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 
            onClick={handleNewChat}
            className={`text-2xl sm:text-3xl font-bold text-[#004c92] transition-all duration-500 ease-in-out ${isAnimated ? 'transform -translate-x-0 scale-100 cursor-pointer' : 'transform scale-150 mt-4'}`}
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
          
          <div className={`transition-all duration-500 ${isAnimated ? 'w-10 h-10 opacity-70' : 'w-28 h-28 opacity-100 mb-2'} flex-shrink-0`}>
            <img 
              src="/lovable-uploads/fb0ab2b3-5c02-4037-857a-19b40f122960.png" 
              alt="Hotline Assistant Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {isAnimated && (
          <div className="mt-2 self-end">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E6F0FF]/50 h-10 w-10"
              onClick={handleNewChat}
              title="Nouvelle conversation"
            >
              <RefreshCw className="h-5 w-5 text-[#004c92]" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Chat interface section with incidents sidebar */}
      <div className={`flex-1 flex items-start justify-between px-4 md:px-8 lg:px-12 transition-all duration-500 ease-in-out overflow-hidden gap-4 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
        {/* Main chat area */}
        <div className="w-full max-w-[calc(100%-20rem)] flex-1 flex flex-col items-center justify-center max-h-full">
          <ChatInterface 
            key={chatKey}
            chatbotName="Bill"
            initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
            onFirstMessage={handleFirstMessage}
            trendingQuestions={TRENDING_QUESTIONS}
          />
        </div>
        
        {/* Incidents sidebar - only show when chat is active */}
        {isAnimated && (
          <div className="w-80 flex-shrink-0 px-1 flex flex-col gap-4">
            <IncidentStatus showTitle showWaitTime compact={false} />
          </div>
        )}
      </div>
      
      {/* Footer section */}
      <footer className="py-3 mt-auto text-center text-sm text-[#3380cc] flex items-center justify-center gap-3 transition-opacity duration-200 hover:opacity-80">
        <p>Si l'IA prends le contrôle, contactez vite la hotline au 3400</p>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-3 py-1 shadow-sm border border-blue-200">
          <Clock className="h-3.5 w-3.5 text-[#004c92]" />
          <span className="text-xs text-[#004c92] font-medium">~{waitTimeInfo.minutes} min d'attente</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
