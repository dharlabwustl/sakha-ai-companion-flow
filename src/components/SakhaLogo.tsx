
import React from 'react';

interface SakhaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SakhaLogo: React.FC<SakhaLogoProps> = ({ size = 'md', className = '' }) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full bg-sakha-purple/10 flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full bg-sakha-purple/20 flex items-center justify-center">
          <div className="w-[75%] h-[75%] rounded-full bg-sakha-purple text-white flex items-center justify-center font-bold">
            S
          </div>
        </div>
      </div>
    </div>
  );
};

export default SakhaLogo;
