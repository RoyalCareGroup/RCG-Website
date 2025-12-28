import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : size === 'xl' ? 'h-20 w-20' : 'h-9 w-9';
  const fontSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-4xl' : 'text-xl';
  
  return (
    <div className="flex items-center space-x-4 group select-none cursor-pointer">
      <div className="relative">
        <Crown className={`${iconSize} text-neon-purple drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] group-hover:scale-110 transition-transform duration-500`} />
        <div className="absolute -bottom-1.5 -right-1.5 bg-royal-950 p-0.5 rounded-lg border border-white/10 shadow-2xl">
           <Cpu className="h-3.5 w-3.5 text-neon-blue animate-pulse" />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${fontSize} font-display font-black text-white tracking-tighter uppercase leading-none group-hover:text-neon-blue transition-colors duration-500`}>{COMPANY_DETAILS.company}</span>
          <span className="text-[0.65rem] uppercase tracking-[0.6em] text-slate-500 font-bold mt-1.5 group-hover:text-neon-purple transition-colors duration-700">{COMPANY_DETAILS.techDivisionName}</span>
        </div>
      )}
    </div>
  );
};