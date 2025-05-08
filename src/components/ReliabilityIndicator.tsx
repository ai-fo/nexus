
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
          color: 'bg-gradient-to-r from-purple-50 to-[#E5DEFF] text-[#6E59A5] border border-purple-200 shadow-sm',
          label: 'Fiabilité élevée',
          description: 'Cette réponse est basée sur des sources fiables et vérifiées.'
        };
      case 'medium':
        return {
          icon: Info,
          color: 'bg-gradient-to-r from-amber-50 to-[#FEF7CD] text-amber-700 border border-amber-200 shadow-sm',
          label: 'Fiabilité moyenne',
          description: 'Cette réponse est basée sur des sources partiellement vérifiées.'
        };
      case 'low':
        return {
          icon: ShieldAlert,
          color: 'bg-gradient-to-r from-red-50 to-[#FFDEE2] text-[#ea384c] border border-red-200 shadow-sm',
          label: 'Fiabilité faible',
          description: 'Cette réponse pourrait contenir des imprécisions.'
        };
      default:
        return {
          icon: Info,
          color: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 border border-gray-200 shadow-sm',
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
            "flex items-center gap-1 h-5 px-2 py-0 rounded-full font-medium transition-all",
            "hover:scale-105 hover:shadow-md backdrop-blur-sm",
            config.color,
            className
          )}
        >
          <IconComponent className="animate-pulse" size={12} strokeWidth={2.5} />
          <span className="text-[10px]">{config.label}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="max-w-xs text-center bg-white/90 backdrop-blur-lg border shadow-lg rounded-xl p-3"
      >
        <p>{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ReliabilityIndicator;
