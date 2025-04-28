import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    "Quel est votre problème ?",
    "Qu'est-ce qui va pas ?",
    "Un soucis technique ?"
  ];

  useEffect(() => {
    if (!isAnimated) {
      const interval = setInterval(() => {
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnimated]);

  const handleFirstMessage = () => {
    setIsAnimated(true);
  };

  const handleNewChat = () => {
    setIsAnimated(false);
    setChatKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#E6F0FF] animate-fade-in overflow-hidden">
      <div className={`transition-all duration-500 ease-in-out ${isAnimated ? 'pt-2 pb-1 pl-4 flex items-center gap-4' : 'h-[30vh] flex items-center justify-center'}`}>
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
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#E6F0FF]/50"
            onClick={handleNewChat}
          >
            <MessageSquare className="h-5 w-5 text-[#004c92]" />
          </Button>
        )}
      </div>
      
      <div className={`flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12 transition-all duration-500 ease-in-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
        <div className="w-full max-w-4xl flex flex-col items-center">
          {!isAnimated && (
            <div className="text-[#3380cc] text-xl font-bold mb-8">
              <p 
                className="transition-all duration-500 transform animate-fade-in"
              >
                {questions[currentQuestionIndex]}
              </p>
            </div>
          )}
          <ChatInterface 
            key={chatKey}
            chatbotName="Bill"
            initialMessage="Bonjour ! Je suis Bill, votre assistant personnel. Comment puis-je vous aider aujourd'hui ?"
            onFirstMessage={handleFirstMessage}
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
