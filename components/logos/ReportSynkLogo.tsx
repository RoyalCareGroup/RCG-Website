
import React, { useId } from 'react';

interface ReportSynkLogoProps {
  size?: number;
  className?: string;
  isStable?: boolean;
}

export const ReportSynkLogo: React.FC<ReportSynkLogoProps> = ({ size = 64, className = "", isStable = true }) => {
  const uniqueId = useId().replace(/:/g, "");
  const colors = {
    primary: isStable ? '#06b6d4' : '#d946ef',
    accent: '#10b981',
    darkBg: '#1e293b',
    darkerBg: '#0f172a'
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ overflow: 'visible' }}>
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

      <rect x="5" y="5" width="90" height="90" rx="20" fill={`url(#grad-${uniqueId})`} stroke={colors.primary} strokeWidth="1.5" fillOpacity="0.9" />
      <path d="M15 5 H5 V15" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M85 95 H95 V85" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="88" cy="12" r="2.5" fill={colors.accent} filter={`url(#glow-${uniqueId})`} />

      <g transform="translate(25, 20)">
        <rect x="0" y="0" width="50" height="60" rx="4" stroke={colors.primary} strokeWidth="2.5" fill={colors.darkBg} />
        <path d="M10 12 H40" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        
        <path d="M10 25 Q25 15 40 25 T70 25" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
           <animate attributeName="d" values="M10 25 Q25 15 40 25 T70 25;M10 25 Q25 35 40 25 T70 25;M10 25 Q25 15 40 25 T70 25" dur="2s" repeatCount="indefinite" />
        </path>

        <g transform="translate(25, 45)">
           <path d="M-15 0 C-15 -10 15 -10 15 0 C15 10 -15 10 -15 0" stroke={colors.primary} strokeWidth="2" fill="none" />
           <circle r="4" fill={colors.primary}>
             <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
           </circle>
        </g>
      </g>
    </svg>
  );
};
