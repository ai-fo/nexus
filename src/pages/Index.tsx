
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { clearConversation } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { waitTimeInfo } from '@/components/IncidentStatus';
import IncidentStatus, { appIncidents } from '@/components/IncidentStatus';
import { Clock } from 'lucide-react';

// Trending questions without having to access them from ChatInterface
const TRENDING_QUESTIONS = [
  "Problème avec Artis",
  "SAS est très lent aujourd'hui",
  "Impossible d'accéder à mon compte",
];

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const { toast } = useToast();

  const handleFirstMessage = () => {
    setIsAnimated(true);
  };

  const handleNewChat = async () => {
    try {
      await clearConversation();
      setIsAnimated(false);
      setChatKey(prev => prev + 1);
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
    <div className="min-h-screen flex flex-col bg-[#e6f0ff]/80 animate-fade-in">
      {/* Header section with title and logo */}
      <header className={`transition-all duration-500 ease-in-out ${isAnimated ? 'pt-4 pb-2 flex items-center justify-between px-6' : 'py-10 flex flex-col items-center justify-center'}`}>
        <div className="flex items-center gap-4">
          <div className={`transition-all duration-500 ${isAnimated ? 'w-10 h-10' : 'w-20 h-20'} flex-shrink-0`}>
            <img 
              src="/lovable-uploads/fb0ab2b3-5c02-4037-857a-19b40f122960.png" 
              alt="Hotline Assistant Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 
            onClick={isAnimated ? handleNewChat : undefined}
            className={`text-2xl sm:text-3xl font-bold text-[#004c92] transition-all duration-500 cursor-pointer`}
          >
            HotlineAssistance
          </h1>
        </div>
        
        {isAnimated && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#E6F0FF]/50 h-10 w-10"
            onClick={handleNewChat}
            title="Nouvelle conversation"
          >
            <RefreshCw className="h-5 w-5 text-[#004c92]" />
          </Button>
        )}
      </header>
      
      {/* Main content with chat and incidents */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pb-4 max-w-7xl mx-auto w-full">
        {!isAnimated && (
          <div className="text-center text-xl text-[#3380cc] mb-2">
            Un soucis technique ?
          </div>
        )}
        
        <div className="flex flex-1 w-full gap-4">
          {/* Chat interface */}
          <div className={`flex flex-col h-full ${isAnimated ? 'w-[65%]' : 'w-full'}`}>
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
            <div className="w-[35%] h-full">
              <IncidentStatus showTitle showWaitTime compact={false} />
            </div>
          )}
        </div>
        
        {/* Only show incidents at bottom when chat is not active */}
        {!isAnimated && (
          <div className="w-full mt-4 mb-4">
            <IncidentStatus showTitle showWaitTime compact={true} />
          </div>
        )}
      </main>
      
      {/* Footer section */}
      <footer className="py-3 text-center text-sm text-[#3380cc] flex items-center justify-center gap-3 bg-[#e6f0ff]/90 border-t border-blue-100">
        <p>Si l'IA prends le contrôle, contactez vite la hotline au 3400</p>
        <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 shadow-sm border border-blue-200">
          <Clock className="h-3.5 w-3.5 text-[#004c92]" />
          <span className="text-xs text-[#004c92] font-medium">~{waitTimeInfo.minutes} min d'attente</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
