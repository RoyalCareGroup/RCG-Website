
import React, { useId } from 'react';

interface ClaimSynkLogoProps {
  size?: number;
  className?: string;
  isStable?: boolean;
}

export const ClaimSynkLogo: React.FC<ClaimSynkLogoProps> = ({ size = 64, className = "", isStable = true }) => {
  const uniqueId = useId().replace(/:/g, "");
  
  const colors = {
    primary: isStable ? '#06b6d4' : '#d946ef', 
    glow: isStable ? 'rgba(6,182,212,0.5)' : 'rgba(217,70,239,0.5)',
    accent: '#10b981', 
    darkBg: '#1e293b',   
    darkerBg: '#0f172a'
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={`glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="3" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id={`grad-${uniqueId}`} x1="0" y1="0" x2="100" y2="100">
           <stop offset="0%" stopColor={colors.darkBg} />
           <stop offset="100%" stopColor={colors.darkerBg} />
        </linearGradient>
      </defs>

      <rect 
        x="5" y="5" width="90" height="90" rx="20" 
        fill={`url(#grad-${uniqueId})`}
        stroke={colors.primary} 
        strokeWidth="1.5"
        fillOpacity="0.9"
      />

      <path d="M15 5 H5 V15" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M85 95 H95 V85" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />

      <circle cx="88" cy="12" r="2.5" fill={colors.accent} filter={`url(#glow-${uniqueId})`} />

      <g transform="translate(25, 20)">
        <rect x="0" y="0" width="50" height="60" rx="4" stroke={colors.primary} strokeWidth="2.5" fill={colors.darkBg} />
        <path d="M10 12 H40" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        <path d="M10 22 H30" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        
        <line x1="-5" y1="35" x2="55" y2="35" stroke={colors.accent} strokeWidth="1.5" strokeDasharray="3 2">
          <animate attributeName="y1" values="5;55;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="5;55;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        
        <g transform="translate(40, 50)">
          <circle r="12" fill={colors.primary} stroke={colors.darkerBg} strokeWidth="2" />
          <path d="M-5 0 L-1 4 L7 -4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
};
