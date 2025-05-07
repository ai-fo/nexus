
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  getInputRef?: (ref: HTMLInputElement | null) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  getInputRef
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
      className="relative flex items-center gap-3 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-[#e6f0ff]/60 w-full transition-all duration-300 hover:shadow-xl focus-within:border-[#3380cc]/30 focus-within:from-white focus-within:to-white/90"
    >
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
        className="rounded-xl bg-gradient-to-r from-[#004c92] to-[#1a69b5] hover:from-[#003366] hover:to-[#004c92] transition-all duration-300 shadow hover:shadow-lg hover:scale-105 active:scale-95 h-10 w-10"
        size="icon"
      >
        <SendHorizonal className="h-4 w-4 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
