
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, SmilePlus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center gap-3 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#e6f0ff]/60 w-full transition-all duration-300 hover:shadow-xl focus-within:border-[#3380cc]/30 focus-within:from-white focus-within:to-white/90"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-[#003366] placeholder:text-[#3380cc]/40 transition-all duration-200"
      />
      
      <div className="flex items-center gap-2">
        <Button 
          type="button"
          variant="ghost" 
          size="icon"
          className="text-[#3380cc] hover:text-[#004c92] hover:bg-[#f8faff]/80 transition-all duration-300 rounded-xl"
        >
          <SmilePlus className="h-5 w-5" />
          <span className="sr-only">Ajouter un emoji</span>
        </Button>

        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="rounded-xl bg-gradient-to-r from-[#004c92] to-[#1a69b5] hover:from-[#003366] hover:to-[#004c92] transition-all duration-300 shadow hover:shadow-lg hover:scale-105 active:scale-95"
          size="icon"
        >
          <SendHorizonal className="h-5 w-5 text-white" />
          <span className="sr-only">Envoyer</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
