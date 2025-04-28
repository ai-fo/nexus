
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-chatbot-primary to-chatbot-accent bg-clip-text text-transparent">
          Chatbot Support Hotline
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Votre assistant personnel à votre service</p>
      </header>
      
      <div className="flex-1 flex items-start justify-center">
        <ChatInterface 
          chatbotName="Bill"
          initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
        />
      </div>
      
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>Propulsé par une IA avancée pour mieux vous servir</p>
      </footer>
    </div>
  );
};

export default Index;
