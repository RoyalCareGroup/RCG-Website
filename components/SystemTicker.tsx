import React from 'react';
import { Zap, Shield, Cpu, Activity, Globe, RefreshCcw } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const TickerItem: React.FC<{ icon: any; text: string; color: string }> = ({ icon: Icon, text, color }) => (
  <div className="flex items-center space-x-3 px-8 shrink-0 border-r border-royal-800/40">
    <Icon size={10} className={color} />
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] whitespace-nowrap">
      {text}
    </span>
  </div>
);

export const SystemTicker: React.FC = () => {
  const items = [
    { icon: Zap, text: "GRID STATUS: OPERATIONAL_NOMINAL", color: "text-neon-green shadow-[0_0_8px_#10b981]" },
    { icon: Shield, text: `SOVEREIGNTY: v${COMPANY_DETAILS.appVersion} STABLE`, color: "text-neon-purple" },
    { icon: Cpu, text: "SYNK_CORE: SYNCING_AU_EAST_1", color: "text-neon-blue" },
    { icon: Activity, text: "UPLINK: SECURE_TUNNEL_ACTIVE", color: "text-neon-blue" },
    { icon: Globe, text: "NATIONAL DEPLOYMENTS: ONLINE", color: "text-neon-blue" },
    { icon: RefreshCcw, text: "RE-VALIDATING_GROUNDING_NODES", color: "text-amber-500 animate-spin-slow" },
  ];

  return (
    <div className="w-full bg-royal-950/60 backdrop-blur-md border-b border-white/5 py-1.5 overflow-hidden flex relative z-[1002]">
      <div className="flex animate-[ticker_40s_linear_infinite]">
        {[...items, ...items].map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};