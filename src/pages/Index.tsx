
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-900 drop-shadow-sm">
          Chatbot Support
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Votre assistant personnel à votre service</p>
      </header>
      
      <div className="flex-1 flex items-start justify-center px-4">
        <ChatInterface 
          chatbotName="Bill"
          initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
        />
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Propulsé par une IA avancée pour mieux vous servir</p>
      </footer>
    </div>
  );
};

export default Index;
