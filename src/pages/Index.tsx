
import React, { useEffect, useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Delay animation to ensure user sees the centered title first
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#E6F0FF] animate-fade-in overflow-hidden">
      <div className={`transition-all duration-700 ease-in-out ${isAnimated ? 'pt-2 pb-1 pl-4' : 'h-[60vh] flex items-center justify-center'}`}>
        <h1 className={`text-xl sm:text-2xl font-bold text-[#004c92] drop-shadow-sm transition-all duration-700 hover:drop-shadow-lg ${isAnimated ? 'text-left' : 'text-center scale-150'}`}>
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
      </div>
      
      <div className={`flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12 transition-opacity duration-700 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-4xl flex flex-col items-center">
          <ChatInterface 
            chatbotName="Bill"
            initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
          />
        </div>
      </div>
      
      <footer className="py-2 text-center text-sm text-[#3380cc] transition-opacity duration-200 hover:opacity-80">
        <p>L'IA peut faire des erreurs. En cas de besoin, contactez la hotline au 9400</p>
      </footer>
    </div>
  );
};

export default Index;
