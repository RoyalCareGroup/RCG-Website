import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const iconSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-9 w-9' : size === 'xl' ? 'h-16 w-16' : 'h-7 w-7';
  const fontSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-5xl' : 'text-xl';
  
  return (
    <div className={`flex items-center space-x-4 group select-none cursor-pointer 
      ${size !== 'sm' ? 'bg-[#000000] border border-white/80 px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.9)]' : ''} 
      transition-all duration-500 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-95`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-neon-purple/50 blur-2xl rounded-full scale-150 group-hover:bg-neon-blue/50 transition-colors duration-700 opacity-30"></div>
        <div className="relative z-10 p-2 bg-black rounded-xl border-2 border-white/10 group-hover:border-neon-blue/40 transition-colors shadow-2xl">
          <Crown 
            className={`${iconSize} text-white drop-shadow-[0_0_12px_rgba(217,70,239,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-700`} 
            strokeWidth={3}
          />
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 bg-black p-1 rounded-lg border-2 border-white/30 shadow-2xl z-20 group-hover:border-neon-blue/50 transition-colors">
           <Cpu className="h-3 w-3 text-neon-blue animate-pulse" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col relative z-10">
          <span className={`${fontSize} font-display font-black text-white tracking-tighter uppercase leading-none 
            drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-neon-blue transition-colors duration-500`}
          >
            {COMPANY_DETAILS.company}
          </span>
          <div className="flex items-center mt-2 space-x-2">
            <div className="h-[2px] w-6 bg-neon-purple group-hover:w-9 group-hover:bg-neon-blue transition-all duration-500 shadow-[0_0_8px_rgba(217,70,239,1)]"></div>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-neon-purple font-black whitespace-nowrap group-hover:text-white transition-colors">
              TECH DIVISION
            </span>
          </div>
        </div>
      )}
    </div>
  );
};