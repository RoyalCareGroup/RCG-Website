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
    purple: '#d946ef',
    blue: '#06b6d4',
    white: '#f8fafc',
    dark: '#0f172a',
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
          <stop offset="0%" stopColor={c.purple} />
          <stop offset="100%" stopColor={c.blue} />
        </linearGradient>
        <filter id={`glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
           <feGaussianBlur stdDeviation="3" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- THE ICON (Hex Core) --- */}
      <g transform="translate(10, 15)">
         <path 
           d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z" 
           stroke={`url(#grad-${uniqueId})`} 
           strokeWidth="3"
           fill="none"
         />
         <circle cx="25" cy="28.8" r="7" fill={c.dark} stroke={c.white} strokeWidth="2.5" />
         <path d="M25 28.8 L25 57.7" stroke={c.blue} strokeWidth="2.5" opacity="0.6" />
         <path d="M25 28.8 L50 14.4" stroke={c.purple} strokeWidth="2.5" opacity="0.6" />
         <path d="M25 28.8 L0 14.4" stroke={c.purple} strokeWidth="2.5" opacity="0.6" />
         <circle cx="25" cy="28.8" r="3.5" fill={c.white}>
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
         </circle>
      </g>

      {/* --- SUPER SOLID TYPOGRAPHY --- */}
      <g transform="translate(85, 15)">
         {/* S - Blocky/Solid */}
         <g transform="translate(0,0)">
            <path d="M32 8 H 8 L 8 30 H 32 L 32 52 H 8" stroke="white" strokeWidth="6" strokeLinecap="square" strokeLinejoin="round" fill="none" />
            <circle cx="32" cy="8" r="3.5" fill={c.blue} />
            <circle cx="8" cy="52" r="3.5" fill={c.purple} />
         </g>

         {/* Y - Structural */}
         <g transform="translate(48,0)">
            <path d="M8 8 L 22.5 30 L 37 8" stroke="white" strokeWidth="6" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M22.5 30 V 52" stroke="white" strokeWidth="6" strokeLinecap="square" />
            <circle cx="8" cy="8" r="3.5" fill={c.blue} />
            <circle cx="37" cy="8" r="3.5" fill={c.blue} />
            <circle cx="22.5" cy="52" r="3.5" fill={c.purple} />
         </g>

         {/* N - Heavy Beam */}
         <g transform="translate(96,0)">
            <path d="M8 52 V 8" stroke="white" strokeWidth="6" strokeLinecap="square" />
            <path d="M8 8 L 37 52" stroke="white" strokeWidth="6" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M37 52 V 8" stroke="white" strokeWidth="6" strokeLinecap="square" />
            <circle cx="8" cy="52" r="3.5" fill={c.purple} />
            <circle cx="37" cy="8" r="3.5" fill={c.blue} />
         </g>

         {/* K - Girder */}
         <g transform="translate(144,0)">
            <path d="M12 8 V 52" stroke="white" strokeWidth="6" strokeLinecap="square" />
            <path d="M37 8 L 12 30 L 37 52" stroke="white" strokeWidth="6" strokeLinecap="square" strokeLinejoin="round" />
            <circle cx="12" cy="8" r="3.5" fill={c.blue} />
            <circle cx="37" cy="52" r="3.5" fill={c.purple} />
         </g>

         <line x1="198" y1="5" x2="198" y2="55" stroke={c.slate} strokeWidth="2" strokeDasharray="4 4" />

         {/* --- CRM --- */}
         <g transform="translate(215, 0)">
            <g>
                <path d="M30 15 H 10 C 5 15 5 20 5 30 V 30 C 5 40 10 45 15 45 H 30" stroke={`url(#grad-${uniqueId})`} strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="30" cy="15" r="2.5" fill={c.white} />
            </g>
            <g transform="translate(40, 0)">
                <path d="M5 15 V 45" stroke={`url(#grad-${uniqueId})`} strokeWidth="4" strokeLinecap="round" />
                <path d="M5 15 H 25 C 30 15 30 25 25 30 H 5" stroke={`url(#grad-${uniqueId})`} strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M18 30 L 30 45" stroke={`url(#grad-${uniqueId})`} strokeWidth="4" strokeLinecap="round" />
                <circle cx="30" cy="45" r="2.5" fill={c.white} />
            </g>
            <g transform="translate(85, 0)">
                <path 
                    d="M30 15 H 5 L 25 30 L 5 45 H 30" 
                    stroke={`url(#grad-${uniqueId})`} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="bevel"
                    fill="none"
                    filter={`url(#glow-${uniqueId})`}
                />
                <circle cx="30" cy="15" r="2.5" fill={c.white} />
                <circle cx="25" cy="30" r="2" fill={c.purple} />
            </g>
         </g>
      </g>
      
      <text x="88" y="80" fill="#64748b" fontFamily="monospace" fontSize="9" letterSpacing="0.4em" fontWeight="bold" className="uppercase">
         Unified Intelligence Engine
      </text>
    </svg>
  );
};