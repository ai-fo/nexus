
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
    <form onSubmit={handleSubmit} className="relative flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-orange-100 w-full">
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-orange-400 hover:text-chatbot-primary hover:bg-orange-50"
      >
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Ajouter un fichier</span>
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Comment puis-je vous aider ?"
        disabled={disabled}
        className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder:text-slate-400"
      />
      
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-orange-400 hover:text-chatbot-primary hover:bg-orange-50"
      >
        <SmilePlus className="h-5 w-5" />
        <span className="sr-only">Ajouter un emoji</span>
      </Button>

      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="rounded-xl bg-gradient-to-r from-chatbot-primary to-orange-500 hover:from-chatbot-dark hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
        size="icon"
      >
        <SendHorizonal className="h-5 w-5 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
