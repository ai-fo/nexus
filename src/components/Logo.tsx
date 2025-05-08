
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'h-10 w-10',
    medium: 'h-16 w-16',
    large: 'h-24 w-24'
  };

  return (
    <div 
      className={`${sizeClasses[size]} transition-transform duration-300 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <img 
        src="/lovable-uploads/e3380f2d-b76a-47fd-aae5-6b3b9e71c511.png" 
        alt="AI & DATA STUDIO Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
