
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Gauge, Activity, Scale, Layers, Shield, Terminal, ArrowRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { DecodingText } from '../components/DecodingText.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const RISK_VECTOR_DATA = [
  { subject: 'Privacy', A: 95, fullMark: 100 },
  { subject: 'Billing', A: 99, fullMark: 100 },
  { subject: 'Service Delivery', A: 92, fullMark: 100 },
  { subject: 'HR Compliance', A: 85, fullMark: 100 },
  { subject: 'Data Integrity', A: 98, fullMark: 100 },
];

const Governance: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "Syncing with NDIS Standards v5.4.2...",
      "Validating logic against Quality Indicators...",
      "Diagnostic: documentation integrity verified.",
      "Structural Alert: training node pending.",
      "Policy Node: synchronization complete.",
      "Grid Integrity: STATUS_OPTIMAL_v10.9",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i % messages.length]}`].slice(-6));
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 animate-hero-reveal flex flex-col items-center text-center">
          <div className="circuit-capsule border border-neon-gold/30 bg-white dark:bg-black/40 text-slate-600 dark:text-neon-gold px-10 py-3 shadow-3xl mb-10 inline-flex items-center gap-4">
            <Shield size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">National_Sovereign_Layer</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.8] animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">Sovereign</span> 
            <span className="text-chiseled-gold text-stroked-black">Governance.</span>
          </h1>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic opacity-90 tracking-tight uppercase">
               <DecodingText text="Automating regulatory adherence through binary logic. Shifting risk from humans to systems." stagger={10} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-32 items-stretch">
           <div className="lg:col-span-7 orbital-tile p-12 border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-16">
                 <div>
                    <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">Integrity Matrix</h3>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-2 font-mono">Live_Regulatory_Adherence_v10.9</p>
                 </div>
                 <Gauge size={28} className="text-neon-gold animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_VECTOR_DATA}>
                          <PolarGrid stroke="rgba(255,255,255,0.05)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' }} />
                          <Radar
                             name="Compliance"
                             dataKey="A"
                             stroke="#E5C78B"
                             fill="#E5C78B"
                             fillOpacity={0.15}
                             strokeWidth={4}
                          />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Fidelity Node", val: "99.2%", color: "text-neon-gold" },
                      { label: "Mitigation", val: "LEVEL 5", color: "text-white" },
                      { label: "Audit Readiness", val: "OPTIMAL", color: "text-neon-gold" }
                    ].map((m, i) => (
                      <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between shadow-inner">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">{m.label}</span>
                         <span className={`text-2xl font-display font-black ${m.color}`}>{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="orbital-tile p-10 border border-white/10 relative overflow-hidden flex-grow flex flex-col shadow-2xl">
                 <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/5">
                    <Activity size={20} className="text-neon-gold animate-pulse" />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em] font-mono">Policy_Node_Realtime</span>
                 </div>
                 <div className="space-y-5 font-mono text-[12px] h-[320px] overflow-hidden flex-grow opacity-60">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-6">
                          <span className="text-neon-gold opacity-40">#</span>
                          <span className="text-slate-300">{log}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] font-mono">SYNK_GND_OS_V10.9</div>
                    <div className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-neon-gold animate-pulse"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <Scale size={28} className="text-neon-gold" />, title: "Regulatory Parity", desc: "Dynamic architecture that updates as NDIS standards evolve. Real-time grounding." },
             { icon: <ShieldCheck size={28} className="text-slate-400" />, title: "Automated Auditing", desc: "Deep-scan algorithms for support logs and financial trails. Zero-leakage protocol." },
             { icon: <Layers size={28} className="text-neon-gold" />, title: "Governance Oversight", desc: "Board-level dashboards for national nodes. Total transparency for Tier-1 entities." }
           ].map((pillar, i) => (
             <div key={i} className="orbital-tile p-12 group flex flex-col min-h-[350px] shadow-2xl transition-all hover:border-neon-gold/30">
                <div className="mb-10 p-6 bg-royal-950 border border-white/10 rounded-2xl w-fit group-hover:scale-110 transition-all shadow-inner">
                   {pillar.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none group-hover:text-chiseled-gold transition-colors">{pillar.title}</h3>
                <p className="text-slate-400 text-base font-bold leading-relaxed opacity-80 italic group-hover:opacity-100 transition-opacity">"{pillar.desc}"</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;
