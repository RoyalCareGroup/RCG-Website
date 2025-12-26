
import React, { useId } from 'react';

interface FormSynkLogoProps {
  size?: number;
  className?: string;
  isStable?: boolean;
}

export const FormSynkLogo: React.FC<FormSynkLogoProps> = ({ size = 64, className = "", isStable = false }) => {
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
      <circle cx="88" cy="12" r="2.5" fill="#eab308" filter={`url(#glow-${uniqueId})`} />

      <g transform="translate(25, 20)">
        <rect x="0" y="0" width="50" height="60" rx="4" stroke={colors.primary} strokeWidth="2.5" fill={colors.darkBg} strokeDasharray="6 3" />
        
        <g transform="translate(10, 10)">
           <rect width="30" height="8" rx="2" fill={colors.primary} opacity="0.3" />
           <rect y="12" width="20" height="8" rx="2" fill={colors.primary} opacity="0.3" />
           <rect y="24" width="30" height="8" rx="2" fill={colors.primary} opacity="0.3" />
        </g>

        <g transform="translate(45, 50)">
           <path d="M-12 0 L0 -12 L12 0 L0 12 Z" fill="#eab308" stroke={colors.darkerBg} strokeWidth="2" />
           <path d="M0 -4 V1" stroke="white" strokeWidth="2" strokeLinecap="round" />
           <circle cy="4" r="1" fill="white" />
           <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" additive="sum" />
        </g>
      </g>
    </svg>
  );
};
