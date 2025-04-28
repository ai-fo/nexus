
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
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200 w-full">
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-gray-400 hover:text-purple-500 hover:bg-purple-50"
      >
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Ajouter un fichier</span>
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 placeholder:text-gray-400"
      />
      
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        className="text-gray-400 hover:text-purple-500 hover:bg-purple-50"
      >
        <SmilePlus className="h-5 w-5" />
        <span className="sr-only">Ajouter un emoji</span>
      </Button>

      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        size="icon"
      >
        <SendHorizonal className="h-5 w-5 text-white" />
        <span className="sr-only">Envoyer</span>
      </Button>
    </form>
  );
};

export default ChatInput;
