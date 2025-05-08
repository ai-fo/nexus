
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ReliabilityLevel = 'high' | 'medium' | 'low';

interface ReliabilityIndicatorProps {
  level: ReliabilityLevel;
  className?: string;
}

const ReliabilityIndicator: React.FC<ReliabilityIndicatorProps> = ({ level, className }) => {
  const getConfig = () => {
    switch (level) {
      case 'high':
        return {
          icon: ShieldCheck,
          color: 'bg-[#E5DEFF]/80 text-[#6E59A5] hover:bg-[#E5DEFF]',
          label: 'Fiabilité élevée',
          description: 'Cette réponse est basée sur des sources fiables et vérifiées.'
        };
      case 'medium':
        return {
          icon: Info,
          color: 'bg-[#FEF7CD]/80 text-amber-700 hover:bg-[#FEF7CD]',
          label: 'Fiabilité moyenne',
          description: 'Cette réponse est basée sur des sources partiellement vérifiées.'
        };
      case 'low':
        return {
          icon: ShieldAlert,
          color: 'bg-[#FFDEE2]/80 text-[#ea384c] hover:bg-[#FFDEE2]',
          label: 'Fiabilité faible',
          description: 'Cette réponse pourrait contenir des imprécisions.'
        };
      default:
        return {
          icon: Info,
          color: 'bg-gray-100 text-gray-500',
          label: 'Fiabilité inconnue',
          description: 'Impossible de déterminer la fiabilité de cette réponse.'
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          className={cn(
            "flex items-center gap-1 h-6 px-2 rounded-full font-normal transition-all",
            config.color,
            className
          )}
        >
          <IconComponent size={14} />
          <span className="text-xs">{config.label}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-center">
        <p>{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ReliabilityIndicator;
