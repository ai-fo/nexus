
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EFF6FF] to-[#E6F0FF] animate-fade-in">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-[#004c92] drop-shadow-sm transition-all duration-300 hover:drop-shadow-lg">
          SmartSupport
        </h1>
        <p className="text-[#1a69b5] mt-2 text-lg animate-slide-in">
          Votre support, sans attente
        </p>
      </header>
      
      <div className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-12">
        <ChatInterface 
          chatbotName="Bill"
          initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
        />
      </div>
      
      <footer className="py-6 text-center text-sm text-[#3380cc] transition-opacity duration-200 hover:opacity-80">
        <p>L'IA peut faire des erreurs. En cas de besoin, contactez la hotline au 9400</p>
      </footer>
    </div>
  );
};

export default Index;
