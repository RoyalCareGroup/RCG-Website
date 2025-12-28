import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, FileCheck, Scale, 
  Database, Shield, Globe, Activity, Terminal, 
  ArrowRight, Search, Cpu, Lock, CheckCircle2,
  ChevronRight, Gauge, Command, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const AUDIT_READY_DATA = [
  { name: 'Documentation', value: 98, full: 100 },
  { name: 'Financials', value: 95, full: 100 },
  { name: 'Staff Training', value: 92, full: 100 },
  { name: 'Risk Mitigation', value: 89, full: 100 },
];

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
      "Syncing with NDIS Practice Standards v5.4.2...",
      "Validating logic against National Quality Indicators...",
      "Diagnostic: Zero-gap documentation integrity verified.",
      "Structural Alert: Minor training node pending update.",
      "Policy Node: Automated protocol synchronization complete.",
      "Grid Integrity: STATUS_OPTIMAL_v10.9",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i % messages.length]}`].slice(-6));
      i++;
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-royal-950 pt-48 pb-40 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:48px_48px]"></div>
      </div>
      <div className="absolute top-0 right-0 w-full h-[1000px] bg-neon-purple/5 blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32 animate-fade-in">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.6em] uppercase mb-12 shadow-2xl">
            <Shield size={16} className="mr-4 animate-pulse" /> National Sovereign Layer
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.9] text-spotlight">
            Sovereign<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]">Governance.</span>
          </h1>
          <p className="text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-blue pl-14 max-w-3xl italic">
            "Automating regulatory adherence through high-fidelity binary logic. We shift NDIS compliance from a human risk to a systemic certainty."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-40 items-stretch">
           <div className="lg:col-span-7 orbital-tile p-12 bg-royal-900/40 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Integrity Matrix</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">Live_Regulatory_Adherence_v10.9</p>
                 </div>
                 <div className="p-4 bg-neon-blue/15 rounded-xl text-neon-blue border border-neon-blue/30 shadow-[0_0_25px_rgba(6,182,212,0.25)] animate-pulse">
                    <Gauge size={24} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="h-[300px] w-full group">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_VECTOR_DATA}>
                          <PolarGrid stroke="#1e293b" strokeWidth={2} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'black' }} />
                          <Radar
                             name="Compliance"
                             dataKey="A"
                             stroke="#06b6d4"
                             fill="#06b6d4"
                             fillOpacity={0.4}
                             strokeWidth={3}
                          />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Document Fidelity", val: "99.2%", color: "text-neon-blue" },
                      { label: "Risk Mitigation", val: "LEVEL 5", color: "text-neon-purple" },
                      { label: "Audit Readiness", val: "OPTIMAL", color: "text-green-500" }
                    ].map((m, i) => (
                      <div key={i} className="p-6 bg-royal-950/80 border border-white/5 rounded-2xl flex items-center justify-between shadow-3xl hover:border-neon-blue transition-all cursor-crosshair group/item">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] group-hover/item:text-slate-300 transition-colors">{m.label}</span>
                         <span className={`text-2xl font-display font-black ${m.color} drop-shadow-[0_0_10px_currentColor]`}>{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="orbital-tile p-10 bg-royal-900/20 border-white/10 shadow-3xl relative overflow-hidden flex-grow flex flex-col">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Terminal size={150} />
                 </div>
                 <div className="flex items-center gap-5 mb-8">
                    <div className="p-3 bg-neon-purple/15 rounded-xl text-neon-purple border border-neon-purple/30 shadow-2xl animate-pulse">
                       <Activity size={20} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.6em]">Policy Node Real-time</span>
                 </div>
                 <div className="space-y-4 font-mono text-[12px] h-56 overflow-hidden flex-grow">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-4 text-slate-400 group/log">
                          <span className="text-neon-blue opacity-50 font-black">#</span>
                          <span className="group-hover/log:text-white transition-colors leading-relaxed">{log}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-8 pt-6 border-t border-royal-800 flex items-center justify-between">
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Protocol: SYNK_GND_v10.9</div>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live Link</span>
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]"></div>
                    </div>
                 </div>
              </div>

              <div className="orbital-tile p-8 bg-neon-blue/5 border-neon-blue/20 flex items-center gap-8 group hover:scale-105 transition-all cursor-pointer shadow-3xl">
                 <div className="p-4 bg-royal-950 rounded-xl border border-neon-blue/40 text-neon-blue shadow-2xl group-hover:bg-neon-blue group-hover:text-white transition-all">
                    <Lock size={24} />
                 </div>
                 <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-1">Data Sovereignty Node</div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xs">AES-256 encryption active across clusters.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
           {[
             { 
               icon: <Scale size={28} className="text-neon-blue" />, 
               title: "Regulatory Parity", 
               desc: "Dynamic policy architecture that updates your organizational guideboards in real-time as NDIS standards evolve."
             },
             { 
               icon: <ShieldCheck size={28} className="text-neon-purple" />, 
               title: "Automated Auditing", 
               desc: "Deep-scan algorithms for support logs and financial trails. We catch discrepancies at the logic layer."
             },
             { 
               icon: <Layers size={28} className="text-neon-blue" />, 
               title: "Executive Oversight", 
               desc: "Board-level dashboards providing 100% visibility into national service delivery nodes. Data-driven governance."
             }
           ].map((pillar, i) => (
             <div key={i} className="orbital-tile p-12 group hover:border-neon-blue bg-royal-900/30 border-white/5 shadow-3xl flex flex-col min-h-[420px]">
                <div className="mb-10 p-5 bg-royal-950 border border-royal-800 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-blue/40 transition-all shadow-3xl">
                   {pillar.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6 leading-none">{pillar.title}</h3>
                <p className="text-slate-300 text-base leading-relaxed font-light mb-10 flex-grow italic">"{pillar.desc}"</p>
                <div className="mt-auto flex items-center gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em] font-black group-hover:text-neon-blue transition-colors">
                   <CheckCircle2 size={14} className="text-green-500" /> Standard {i + 1}.4 Certified
                </div>
             </div>
           ))}
        </div>

        <div className="bg-royal-900/40 border border-white/10 rounded-[4rem] p-16 md:p-24 relative overflow-hidden group shadow-[0_60px_120px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 p-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none">
            <Command size={400} className="animate-spin-slow text-neon-purple" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7 space-y-12 text-left">
               <div className="inline-flex items-center space-x-5 text-neon-purple bg-neon-purple/10 p-4 rounded-[1.5rem] border border-neon-purple/30 shadow-3xl">
                 <AlertTriangle size={36} className="animate-pulse" />
                 <span className="text-base font-black uppercase tracking-[0.6em]">Risk Mitigation Node</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] text-spotlight">Structural<br/>Integrity.</h2>
               <p className="text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-purple pl-12 max-w-3xl italic">
                 "We identify Governance Debt—the accumulated risk of manual oversight—and replace it with high-fidelity SYNK sovereign logic."
               </p>
               
               <div className="flex flex-wrap gap-8 pt-8">
                  <Link to="/contact" className="px-14 py-7 bg-white text-black font-black text-[12px] tracking-[0.8em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl hover:scale-105 active:scale-95">
                    Execute Governance Audit
                  </Link>
                  <Link to="/tech" className="px-14 py-7 border-4 border-royal-800 text-white font-black text-[12px] tracking-[0.8em] uppercase rounded-xl hover:border-neon-purple transition-all hover:bg-neon-purple/5">
                    Explore Ecosystem
                  </Link>
               </div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
               <div className="orbital-tile p-12 border-white/10 rounded-[3rem] bg-royal-950/60 relative shadow-inner">
                  <div className="absolute -top-4 -right-4 p-6 bg-neon-blue rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.6)] animate-float">
                     <ShieldCheck className="text-white" size={36} />
                  </div>
                  <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-10 border-b border-white/5 pb-5">Diagnostic Manifest</div>
                  <div className="space-y-8">
                     {[
                        { label: 'Risk Vector ID', val: 'RC-GV-482' },
                        { label: 'Integrity Level', val: '99.98%' },
                        { label: 'Logic Sync', val: 'STABLE_NODE' }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">{item.label}</span>
                           <span className="text-base font-mono text-white font-black tracking-widest">{item.val}</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 p-6 bg-royal-950 rounded-2xl border border-white/10 flex items-center justify-center gap-5 shadow-inner">
                     <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse shadow-[0_0_15px_#10b981]"></div>
                     <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.6em] font-black animate-pulse">Awaiting Sync Protocol...</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-40 text-center py-32 border-t border-white/5">
           <Link to="/contact" className="inline-flex flex-col items-center gap-12 group hover:scale-102 transition-all duration-700 p-8">
              <span className="text-slate-600 text-[12px] font-mono uppercase tracking-[1.5em] font-black group-hover:text-neon-blue transition-colors animate-pulse">Initialize Sovereignty Layer Engagement</span>
              <div className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter group-hover:text-neon-blue transition-colors leading-none flex items-center gap-16">
                 Secure. <div className="p-10 md:p-16 rounded-full border-[8px] border-white group-hover:border-neon-blue transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)]"><ArrowRight size={64} className="group-hover:translate-x-4 transition-transform duration-700" /></div>
              </div>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Governance;