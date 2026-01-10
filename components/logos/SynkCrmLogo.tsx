
import React, { useId } from 'react';

interface SynkCrmLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const SynkCrmLogo: React.FC<SynkCrmLogoProps> = ({ 
  className = "", 
  width = 380, 
  height = 100 
}) => {
  const uniqueId = useId().replace(/:/g, "");

  const c = {
    navy: '#1E293B',
    gold: '#E5C78B',
    white: '#f8fafc',
    dark: '#0F172A',
    slate: '#475569'
  };

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 380 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
    >
      <defs>
        <linearGradient id={`grad-${uniqueId}`} x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor={c.gold} />
          <stop offset="100%" stopColor={c.slate} />
        </linearGradient>
      </defs>

      {/* --- THE ICON (Hex Core) --- */}
      <g transform="translate(10, 15)">
         <path 
           d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z" 
           stroke={c.gold} 
           strokeWidth="2.5"
           fill="none"
         />
         <circle cx="25" cy="28.8" r="6" fill={c.dark} stroke={c.white} strokeWidth="1" />
         <path d="M25 28.8 L25 57.7" stroke={c.gold} strokeWidth="1.5" opacity="0.3" />
         <path d="M25 28.8 L50 14.4" stroke={c.gold} strokeWidth="1.5" opacity="0.3" />
         <path d="M25 28.8 L0 14.4" stroke={c.gold} strokeWidth="1.5" opacity="0.3" />
      </g>

      {/* --- REFINED TYPOGRAPHY --- */}
      <g transform="translate(85, 15)">
         {/* S */}
         <g transform="translate(0,0)">
            <path d="M30 8 H 10 L 10 30 H 30 L 30 52 H 10" stroke="white" strokeWidth="5" strokeLinecap="square" fill="none" />
            <circle cx="30" cy="8" r="2" fill={c.gold} />
         </g>
         {/* Y */}
         <g transform="translate(45,0)">
            <path d="M8 8 L 20 30 L 32 8" stroke="white" strokeWidth="5" strokeLinecap="square" />
            <path d="M20 30 V 52" stroke="white" strokeWidth="5" />
         </g>
         {/* N */}
         <g transform="translate(90,0)">
            <path d="M8 52 V 8 L 32 52 V 8" stroke="white" strokeWidth="5" strokeLinecap="square" fill="none" />
         </g>
         {/* K */}
         <g transform="translate(135,0)">
            <path d="M8 8 V 52 M32 8 L 8 30 L 32 52" stroke="white" strokeWidth="5" strokeLinecap="square" fill="none" />
         </g>

         <line x1="185" y1="10" x2="185" y2="50" stroke={c.slate} strokeWidth="1" opacity="0.4" />

         {/* --- CRM --- */}
         <g transform="translate(205, 0)">
            <path d="M30 15 H 10 Q 5 15 5 30 Q 5 45 10 45 H 30" stroke={c.gold} strokeWidth="3" fill="none" />
            <g transform="translate(45, 0)">
               <path d="M5 15 V 45 M5 15 H 25 Q 30 15 30 25 Q 30 35 25 35 H 5 M20 35 L 30 45" stroke={c.gold} strokeWidth="3" fill="none" />
            </g>
            <g transform="translate(90, 0)">
               <path d="M5 45 V 15 L 20 35 L 35 15 V 45" stroke={c.gold} strokeWidth="3" fill="none" />
            </g>
         </g>
      </g>
      
      <text x="88" y="82" fill={c.slate} fontFamily="monospace" fontSize="8" letterSpacing="0.6em" fontWeight="bold" className="uppercase opacity-60">
         INSTITUTIONAL CORE NODE
      </text>
    </svg>
  );
};
