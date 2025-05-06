
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

// Fonction utilitaire pour découper un texte en paragraphes
const splitTextIntoChunks = (text: string, maxLength = 300): string[] => {
  if (text.length <= maxLength) return [text];
  
  // Diviser d'abord par les sauts de ligne existants
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  // Si les paragraphes sont déjà courts, les retourner directement
  if (paragraphs.every(p => p.length <= maxLength)) {
    return paragraphs;
  }
  
  // Sinon, découper les longs paragraphes en phrases
  const result: string[] = [];
  
  for (const paragraph of paragraphs) {
    if (paragraph.length <= maxLength) {
      result.push(paragraph);
      continue;
    }
    
    // Découper en phrases
    const sentences = paragraph.split(/(?<=[.!?])\s+/);
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > maxLength) {
        if (currentChunk) result.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    if (currentChunk) result.push(currentChunk.trim());
  }
  
  return result;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  role,
  timestamp = new Date(),
}) => {
  const isUser = role === 'user';
  const contentChunks = splitTextIntoChunks(content);
  const [visibleChunks, setVisibleChunks] = useState<number>(isUser ? contentChunks.length : 0);
  
  // Effet pour afficher progressivement les messages de l'assistant
  useEffect(() => {
    if (isUser) return; // Ne pas animer les messages de l'utilisateur
    
    let chunkIndex = 0;
    const intervalId = setInterval(() => {
      if (chunkIndex < contentChunks.length) {
        setVisibleChunks(prev => prev + 1);
        chunkIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 700); // Délai entre chaque "bulle" de message
    
    return () => clearInterval(intervalId);
  }, [contentChunks.length, isUser]);
  
  // Si c'est un message utilisateur, tout afficher immédiatement
  // Si c'est un message assistant, afficher progressivement
  const chunksToShow = isUser 
    ? contentChunks 
    : contentChunks.slice(0, visibleChunks);
  
  return (
    <div className={cn(
      "flex flex-col w-full gap-1 my-4 animate-slide-in",
      isUser ? "items-end" : "items-start"
    )}>
      {chunksToShow.map((chunk, index) => (
        <div 
          key={index}
          className={cn(
            "group max-w-[80%] break-words transition-all duration-300 mb-1",
            "animate-fade-in",
            isUser ? 
              "px-4 py-3 rounded-2xl bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.02] origin-right" : 
              "px-4 py-3 rounded-2xl bg-white/80 text-[#003366] shadow-sm hover:shadow backdrop-blur-sm"
          )}
        >
          <p className="text-base leading-relaxed">{chunk}</p>
        </div>
      ))}
      
      {/* Indicateur de frappe pour l'assistant */}
      {!isUser && visibleChunks < contentChunks.length && (
        <div className="flex px-4 py-3 bg-white/60 rounded-2xl shadow-sm animate-pulse mb-1">
          <span className="w-2 h-2 bg-[#003366] rounded-full mx-0.5 animate-pulse"></span>
          <span className="w-2 h-2 bg-[#003366] rounded-full mx-0.5 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-[#003366] rounded-full mx-0.5 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
