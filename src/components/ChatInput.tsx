
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, TrendingUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  getInputRef?: (ref: HTMLInputElement | null) => void;
  showTrendingIcon?: boolean;
  onTrendingClick?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  getInputRef,
  showTrendingIcon = false,
  onTrendingClick
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Exposer la référence de l'input au parent
    if (getInputRef && inputRef.current) {
      getInputRef(inputRef.current);
    }
  }, [getInputRef, inputRef.current]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Focus on the input after sending a message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center gap-2 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md rounded-xl p-2 px-3 shadow-md border border-[#e6f0ff]/60 w-full max-w-xl mx-auto transition-all duration-300 hover:shadow-lg focus-within:border-[#3380cc]/30 focus-within:from-white focus-within:to-white/90"
    >
      {showTrendingIcon && (
        <Button
          type="button"
          onClick={onTrendingClick}
          variant="ghost"
          className="h-10 w-10 p-2 rounded-lg text-[#3380cc] hover:text-[#004c92] hover:bg-blue-50 transition-all duration-200"
          title="Questions tendance"
        >
          <TrendingUp className="h-5 w-5" />
        </Button>
      )}
      
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 h-10 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 text-[#003366] placeholder:text-[#3380cc]/40 transition-all duration-200 outline-none"
      />
      
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="rounded-lg bg-gradient-to-r from-[#004c92] to-[#1a69b5] hover:from-[#003366] hover:to-[#004c92] transition-all duration-300 shadow hover:shadow-md hover:scale-105 active:scale-95 h-10 w-10"
        size="icon"
      >
        <SendHorizonal className="h-5 w-5 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
