
import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  // Enhanced sizing ratios to match the "Landing Page" presence
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-12 w-12' : size === 'xl' ? 'h-24 w-24' : 'h-10 w-10';
  const fontSize = size === 'sm' ? 'text-[12px]' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-5xl' : 'text-lg';
  
  return (
    <div className={`flex items-center space-x-6 group select-none cursor-pointer 
      ${size !== 'sm' ? 'bg-[#0F172A] border border-white/5 px-6 py-4 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : ''} 
      transition-all duration-700 hover:border-neon-gold/40 hover:shadow-[0_0_30px_rgba(229,199,139,0.05)] hover:scale-[1.01] active:scale-95`}
    >
      <div className="flex items-center gap-3 relative">
        {/* Main Logo: The Sovereign Crown - INCREASED SCALE */}
        <div className="relative -top-1 transition-transform duration-700 group-hover:-translate-y-1">
          <div className="absolute inset-0 bg-neon-gold/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
          <div className="relative z-10 transition-colors">
            <Crown 
              className={`${iconSize} text-neon-gold drop-shadow-[0_0_20px_rgba(229,199,139,0.5)]`} 
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Separated Tech Node: OFFSET DOWN and RIGHT */}
        <div className="bg-[#0F172A] p-1.5 rounded-lg border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-500 translate-y-3 group-hover:translate-x-1">
           <Cpu className="h-4 w-4 text-indigo-400 animate-pulse" strokeWidth={2} />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col relative z-10 pl-2">
          <span className={`${fontSize} font-display font-black tracking-tight uppercase leading-none text-white group-hover:text-chiseled-gold transition-colors duration-700`}
          >
            {COMPANY_DETAILS.company}
          </span>
          <div className="flex items-center mt-3 space-x-2">
            <div className="h-[2px] w-8 bg-neon-gold group-hover:w-12 transition-all duration-700 opacity-40"></div>
            {/* Bold Indigo Text with Hover Glow */}
            <span className="text-[0.62rem] uppercase tracking-[0.5em] text-indigo-400 font-black whitespace-nowrap font-mono transition-all duration-500 group-hover:text-indigo-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
              TECH DIVISION
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
