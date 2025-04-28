
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Paperclip, SmilePlus } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border border-[#e6f0ff] w-full">
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-[#3380cc] hover:text-[#004c92] hover:bg-[#f8faff]"
      >
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Ajouter un fichier</span>
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-[#003366] placeholder:text-[#3380cc]/50"
      />
      
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-[#3380cc] hover:text-[#004c92] hover:bg-[#f8faff]"
      >
        <SmilePlus className="h-5 w-5" />
        <span className="sr-only">Ajouter un emoji</span>
      </Button>

      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="rounded-lg bg-gradient-to-r from-[#004c92] to-[#1a69b5] hover:from-[#003366] hover:to-[#004c92] transition-all duration-200"
        size="icon"
      >
        <SendHorizonal className="h-5 w-5 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
