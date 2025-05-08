
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackButtonsProps {
  messageId: string;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ messageId }) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const { toast } = useToast();

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    
    // Ici on pourrait envoyer le feedback à l'API dans une implémentation future
    console.log(`Feedback ${type} pour le message ${messageId}`);
    
    toast({
      title: "Merci pour votre feedback!",
      description: type === 'positive' 
        ? "Nous sommes ravis que cette réponse vous ait été utile." 
        : "Nous nous efforcerons d'améliorer nos réponses à l'avenir.",
      duration: 3000
    });
  };

  return (
    <div className="flex items-center gap-2 mt-1">
      <Button
        variant="ghost"
        size="icon"
        className={`h-6 w-6 rounded-full ${feedback === 'positive' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-green-600 hover:bg-green-50'}`}
        onClick={() => feedback !== 'positive' && handleFeedback('positive')}
        disabled={feedback !== null}
        title="Réponse utile"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={`h-6 w-6 rounded-full ${feedback === 'negative' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
        onClick={() => feedback !== 'negative' && handleFeedback('negative')}
        disabled={feedback !== null}
        title="Réponse pas utile"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FeedbackButtons;
