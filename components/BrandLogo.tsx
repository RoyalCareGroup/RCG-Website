
import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : size === 'xl' ? 'h-16 w-16' : 'h-8 w-8';
  return (
    <div className="flex items-center space-x-3 group select-none">
      <div className="relative">
        <Crown className={`${iconSize} text-neon-purple drop-shadow-[0_0_10px_rgba(217,70,239,0.6)] group-hover:scale-110 transition-transform`} />
        <Cpu className="h-3 w-3 text-neon-blue absolute -bottom-1 -right-1 bg-royal-900 rounded-full border border-royal-700 animate-pulse" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-display font-black text-white tracking-tighter uppercase leading-none">{COMPANY_DETAILS.company}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-neon-blue font-bold mt-1">Tech Division</span>
        </div>
      )}
    </div>
  );
};
