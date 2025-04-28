
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900/30 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
          Chatbot Support Hotline
        </h1>
        <p className="text-orange-100/80 mt-4 text-xl font-light">Votre assistant personnel à votre service</p>
      </header>
      
      <div className="flex-1 flex items-start justify-center px-4">
        <ChatInterface 
          chatbotName="Bill"
          initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
        />
      </div>
      
      <footer className="mt-12 text-center text-sm text-orange-200/50">
        <p>Propulsé par une IA avancée pour mieux vous servir</p>
      </footer>
    </div>
  );
};

export default Index;
