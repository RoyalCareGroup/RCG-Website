import React from 'react';
import { Zap, Shield, Cpu, Activity, Globe } from 'lucide-react';
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
    { icon: Globe, text: "National Grid Sync: ACTIVE", color: "text-neon-blue" },
    { icon: Shield, text: `Compliance Parity: v${COMPANY_DETAILS.appVersion.split('-')[0]} Grounded`, color: "text-neon-purple" },
    { icon: Activity, text: "Network Latency: 14.2ms Optimized", color: "text-neon-green" },
    { icon: Cpu, text: "SYNK_CORE Cluster: Status Nominal", color: "text-neon-blue" },
    { icon: Zap, text: "TFix Diagnostic: Scanning Real-time", color: "text-amber-500" },
    { icon: Globe, text: "Uplink Node: AU-EAST DEPLOYMENT_VERIFIED", color: "text-neon-blue" },
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