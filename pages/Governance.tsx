import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, FileCheck, Scale, 
  Database, Shield, Globe, Activity, Terminal, 
  ArrowRight, Search, Cpu, Lock, CheckCircle2,
  ChevronRight, Gauge, Command, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { DecodingText } from '../components/DecodingText.tsx';

const RISK_VECTOR_DATA = [
  { subject: 'Privacy', A: 95, fullMark: 100 },
  { subject: 'Billing', A: 99, fullMark: 100 },
  { subject: 'Service Delivery', A: 92, fullMark: 100 },
  { subject: 'HR Compliance', A: 85, fullMark: 100 },
  { subject: 'Data Integrity', A: 98, fullMark: 100 },
];

const Governance: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i % messages.length]}`].slice(-5));
      i++;
    }, 4500);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-32 pb-24">
        <div className="mb-16 animate-hero-reveal">
          <div className="circuit-capsule mb-6 border border-white/80 bg-black px-8 py-3 shadow-xl inline-block">
            <Shield size={14} className="mr-3 animate-pulse text-neon-blue" /> National Sovereign Layer
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
            Sovereign<br/>
            <span className="text-neon-purple">Governance.</span>
          </h1>
          <div className="max-w-lg banner-pop bg-black p-6 shadow-2xl border border-white/10 mt-6">
            <DecodingText 
              text="Automating regulatory adherence through binary logic. Shifting risk from humans to systems."
              className="text-lg text-white font-black leading-tight opacity-100"
              stagger={6}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24 items-stretch">
           <div className="lg:col-span-7 orbital-tile p-8 bg-black border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter">Integrity Matrix</h3>
                    <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.4em] mt-2">Live_Regulatory_Adherence_v10.9</p>
                 </div>
                 <Gauge size={20} className="text-neon-blue animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="h-[250px] w-full group">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_VECTOR_DATA}>
                          <PolarGrid stroke="#1e293b" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: '900' }} />
                          <Radar
                             name="Compliance"
                             dataKey="A"
                             stroke="#06b6d4"
                             fill="#06b6d4"
                             fillOpacity={0.3}
                             strokeWidth={3}
                          />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Fidelity", val: "99.2%", color: "text-neon-blue" },
                      { label: "Mitigation", val: "LEVEL 5", color: "text-neon-purple" },
                      { label: "Readiness", val: "OPTIMAL", color: "text-neon-green" }
                    ].map((m, i) => (
                      <div key={i} className="p-5 bg-royal-950 border border-white/5 rounded-xl flex items-center justify-between shadow-inner">
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">{m.label}</span>
                         <span className={`text-xl font-display font-black ${m.color}`}>{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="orbital-tile p-8 bg-black border border-white/10 relative overflow-hidden flex-grow flex flex-col">
                 <div className="flex items-center gap-4 mb-6">
                    <Activity size={16} className="text-neon-purple animate-pulse" />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Policy Node Real-time</span>
                 </div>
                 <div className="space-y-3 font-mono text-[11px] h-48 overflow-hidden flex-grow opacity-60">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-4">
                          <span className="text-neon-blue">#</span>
                          <span>{log}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">SYNK_GND_v10.9</div>
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
           {[
             { icon: <Scale size={24} className="text-neon-blue" />, title: "Parity", desc: "Dynamic policy architecture that updates as NDIS standards evolve." },
             { icon: <ShieldCheck size={24} className="text-neon-purple" />, title: "Auditing", desc: "Deep-scan algorithms for support logs and financial trails." },
             { icon: <Layers size={24} className="text-neon-blue" />, title: "Oversight", desc: "Board-level dashboards for national service delivery nodes." }
           ].map((pillar, i) => (
             <div key={i} className="orbital-tile p-10 group bg-black border border-white/10 flex flex-col min-h-[300px]">
                <div className="mb-8 p-4 bg-royal-950 border border-white/5 rounded-xl w-fit group-hover:scale-110 transition-all">
                   {pillar.icon}
                </div>
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">{pillar.title}</h3>
                <p className="text-white text-xs font-bold leading-relaxed opacity-80 italic">"{pillar.desc}"</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;