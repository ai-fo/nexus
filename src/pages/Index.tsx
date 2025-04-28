
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-chatbot-primary">RAG Chatbot</h1>
        <p className="text-slate-600 mt-2">Interface moderne pour votre assistant IA</p>
      </header>
      
      <div className="flex-1 flex items-start justify-center">
        <ChatInterface 
          chatbotName="RAG Assistant"
          initialMessage="Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?"
        />
      </div>
      
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>Connectez cette interface à votre backend Python RAG pour des réponses intelligentes</p>
      </footer>
    </div>
  );
};

export default Index;
