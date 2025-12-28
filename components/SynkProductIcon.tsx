import React, { useId } from 'react';
import { Cpu, MapPin } from 'lucide-react';
import { SynkCrmLogo } from './logos/SynkCrmLogo.tsx';
import { ClaimSynkLogo } from './logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from './logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from './logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from './logos/ChargeSynkLogo.tsx';

export type SynkIconType = 
  | 'claim' | 'service' | 'charge' | 'report' | 'form' 
  | 'sign' | 'chat' | 'profile' | 'plan' | 'budget' 
  | 'text' | 'email' | 'call' | 'train' | 'store'
  | 'quote' | 'map' | 'crm';

interface SynkProductIconProps {
  type: SynkIconType;
  phase?: 1 | 2 | 3 | 4; // 1=Purple, 2=Blue, 3=Orange, 4=Indigo
  size?: number;
  className?: string;
  isActive?: boolean;
}

export const SynkProductIcon: React.FC<SynkProductIconProps> = ({ 
  type, 
  phase = 1, 
  size = 48, 
  className = "",
  isActive = false
}) => {
  const uniqueId = useId().replace(/:/g, "");
  
  const getColors = () => {
    switch (phase) {
      case 1: return { primary: '#d946ef', glow: 'rgba(217,70,239,0.5)' };
      case 2: return { primary: '#06b6d4', glow: 'rgba(6,182,212,0.5)' };
      case 3: return { primary: '#f97316', glow: 'rgba(249,115,22,0.5)' };
      case 4: return { primary: '#6366f1', glow: 'rgba(99,102,241,0.5)' };
      default: return { primary: '#d946ef', glow: 'rgba(217,70,239,0.5)' };
    }
  };

  const colors = getColors();
  const strokeColor = isActive ? colors.primary : '#334155';

  const renderContent = () => {
    switch(type) {
      case 'crm':
        return <SynkCrmLogo width={size * 3.8} height={size} />;
      case 'claim':
        return <ClaimSynkLogo size={size} isStable={isActive} />;
      case 'report':
        return <ReportSynkLogo size={size} isStable={isActive} />;
      case 'form':
        return <FormSynkLogo size={size} isStable={isActive} />;
      case 'chat':
        return <ChargeSynkLogo size={size} isStable={isActive} />;
      case 'service':
        return <FormSynkLogo size={size} isStable={isActive} />;
      case 'map':
        return <MapPin size={size * 0.6} className="text-neon-blue" transform="translate(20,20)" />;
      default:
        return <Cpu size={size * 0.6} className={className} transform="translate(20,20)" />;
    }
  };

  if (type === 'crm') {
    return <SynkCrmLogo width={size * 3.8} height={size} className={className} />;
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-lg transition-all duration-500`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={`glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="5" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id={`grad-${uniqueId}`} x1="0" y1="0" x2="100" y2="100">
           <stop offset="0%" stopColor="#1e293b" />
           <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Frame: Rounded Square 18px */}
      <rect x="5" y="5" width="90" height="90" rx="18" fill={`url(#grad-${uniqueId})`} stroke={strokeColor} strokeWidth={isActive ? 2 : 1} fillOpacity="0.8" />
      
      {/* Status: Rounded Square (Not Circle) */}
      <rect x="80" y="10" width="8" height="8" rx="2" fill={isActive ? '#00e054' : '#64748b'} filter={isActive ? `url(#glow-${uniqueId})` : ''}>
         {isActive && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
      </rect>

      <g transform="translate(0,0)">
        {renderContent()}
      </g>
    </svg>
  );
};