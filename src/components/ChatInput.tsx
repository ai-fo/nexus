
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
    <form onSubmit={handleSubmit} className="relative flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-orange-200/10 w-full">
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-orange-300 hover:text-orange-400 hover:bg-orange-400/10"
      >
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Ajouter un fichier</span>
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Comment puis-je vous aider ?"
        disabled={disabled}
        className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 text-orange-50 placeholder:text-orange-200/50"
      />
      
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-orange-300 hover:text-orange-400 hover:bg-orange-400/10"
      >
        <SmilePlus className="h-5 w-5" />
        <span className="sr-only">Ajouter un emoji</span>
      </Button>

      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
        size="icon"
      >
        <SendHorizonal className="h-5 w-5 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
