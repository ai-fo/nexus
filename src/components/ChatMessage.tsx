
import React from 'react';
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
  
  return (
    <div className={cn(
      "flex flex-col w-full gap-1 my-4 animate-slide-in",
      isUser ? "items-end" : "items-start"
    )}>
      {contentChunks.map((chunk, index) => (
        <div 
          key={index}
          className={cn(
            "group max-w-[80%] break-words transition-all duration-300 mb-1",
            isUser ? 
              "px-4 py-3 rounded-2xl bg-gradient-to-r from-[#004c92] to-[#1a69b5] text-white shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.02] origin-right" : 
              "px-4 py-3 rounded-2xl bg-white/80 text-[#003366] shadow-sm hover:shadow backdrop-blur-sm"
          )}
        >
          <p className="text-base leading-relaxed">{chunk}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
