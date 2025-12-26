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
      "Syncing with NDIS Practice Standards v5.4...",
      "Validating organizational logic against Quality Indicators...",
      "Diagnostic: Zero-gap documentation integrity verified.",
      "Structural Alert: Minor HR training node pending update.",
      "Policy Node: Automated update to Participant Rights protocol complete.",
      "Grid Integrity: OPTIMAL.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i % messages.length]}`].slice(-6));
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-32 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <div className="absolute top-0 right-0 w-full h-[800px] bg-neon-purple/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-32">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Shield size={14} className="mr-3" /> Sovereignty Architecture
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[0.85] text-spotlight">
            Governance<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Framework.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10 max-w-2xl">
            Automating regulatory adherence through structural logic. We shift NDIS compliance from a human burden to a systemic certainty.
          </p>
        </div>

        {/* Audit Telemetry & Risk HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-40">
           <div className="lg:col-span-7 orbital-tile p-12 bg-royal-950/40">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-widest">Audit Preparedness</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">Real-time Adherence Matrix</p>
                 </div>
                 <div className="p-4 bg-neon-blue/10 rounded-2xl text-neon-blue animate-pulse">
                    <Gauge size={24} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_VECTOR_DATA}>
                          <PolarGrid stroke="#1e293b" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                          <Radar
                             name="Compliance"
                             dataKey="A"
                             stroke="#06b6d4"
                             fill="#06b6d4"
                             fillOpacity={0.3}
                          />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Document Integrity", val: "99.2%", color: "text-neon-blue" },
                      { label: "Risk Mitigation", val: "LEVEL 5", color: "text-neon-purple" },
                      { label: "Audit Readiness", val: "OPTIMAL", color: "text-green-500" }
                    ].map((m, i) => (
                      <div key={i} className="p-6 bg-royal-900/50 border border-white/5 rounded-2xl flex items-center justify-between shadow-inner hover:border-neon-blue/40 transition-all cursor-crosshair">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                         <span className={`text-xl font-display font-black ${m.color}`}>{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5 space-y-8">
              <div className="glass p-10 rounded-[3rem] border border-royal-800 bg-royal-900/20 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Terminal size={120} />
                 </div>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-neon-purple/10 rounded-xl text-neon-purple border border-neon-purple/20">
                       <Activity size={20} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Live Policy Node</span>
                 </div>
                 <div className="space-y-4 font-mono text-[11px] h-48 overflow-hidden">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-4 text-slate-400 group">
                          <span className="text-neon-blue opacity-50">#</span>
                          <span className="group-hover:text-white transition-colors">{log}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-8 pt-8 border-t border-royal-800 flex items-center justify-between">
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Protocol: SYNK_GND_v5</div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                 </div>
              </div>

              <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-neon-blue/5 flex items-center gap-8 group hover:border-neon-blue transition-all cursor-pointer">
                 <div className="p-4 bg-royal-950 rounded-2xl border border-neon-blue/30 text-neon-blue group-hover:scale-110 transition-transform shadow-xl">
                    <Lock size={24} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Sovereignty</div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">System-wide AES-256 encryption across all governance nodes.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Pillars of Structural Governance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
           {[
             { 
               icon: <Scale className="text-neon-blue" />, 
               title: "Regulatory Parity", 
               desc: "Dynamic policy architecture that updates your organizational guideboards in real-time as NDIS standards evolve. Eliminate manual version control."
             },
             { 
               icon: <ShieldCheck className="text-neon-purple" />, 
               title: "Automated Auditing", 
               desc: "Continuous deep-scan of support logs and financial trails. We catch discrepancies at the logic layer before they manifest as non-compliance."
             },
             { 
               icon: <Layers className="text-neon-blue" />, 
               title: "Operational Oversight", 
               desc: "Board-level dashboards providing 100% visibility into national service delivery. Data-driven governance for the modern provider."
             }
           ].map((pillar, i) => (
             <div key={i} className="orbital-tile p-12 group hover:border-neon-blue transition-all border-white/5 shadow-2xl">
                <div className="mb-10 p-5 bg-royal-950 border border-royal-800 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-blue/30 transition-all shadow-lg">
                   {pillar.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6">{pillar.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-12">{pillar.desc}</p>
                <div className="mt-auto flex items-center gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest group-hover:text-neon-blue transition-colors">
                   <CheckCircle2 size={12} className="text-green-500" /> Standard {i + 1}.4 Certified
                </div>
             </div>
           ))}
        </div>

        {/* The Diagnostic Deep-Scan Section */}
        <div className="bg-royal-900/30 border border-white/5 rounded-[6rem] p-16 md:p-32 relative overflow-hidden group shadow-3xl">
          <div className="absolute top-0 left-0 p-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none">
            <Command size={400} className="animate-spin-slow text-neon-purple" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
               <div className="inline-flex items-center space-x-5 text-neon-purple bg-neon-purple/5 p-4 rounded-3xl border border-neon-purple/10">
                 <AlertTriangle size={40} className="animate-pulse" />
                 <span className="text-base font-black uppercase tracking-[0.5em]">Risk Mitigation Node</span>
               </div>
               <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">Structural<br/>Security.</h2>
               <p className="text-2xl text-slate-400 leading-relaxed font-light border-l-4 border-neon-purple pl-12">
                 We identify "Governance Debt"—the accumulated risk of manual oversight—and replace it with high-fidelity SYNK logic.
               </p>
               
               <div className="flex flex-wrap gap-8 pt-8">
                  <Link to="/contact" className="px-14 py-7 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-xl">
                    Request Governance Audit
                  </Link>
                  <Link to="/tech" className="px-14 py-7 border-2 border-royal-800 text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:border-neon-purple transition-all">
                    Explore SYNK Suite
                  </Link>
               </div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
               <div className="glass p-12 border border-royal-800 rounded-[4rem] bg-royal-950/40 relative">
                  <div className="absolute -top-4 -right-4 p-6 bg-neon-blue rounded-3xl shadow-[0_0_30px_#06b6d4]">
                     <ShieldCheck className="text-white" size={32} />
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-10">Diagnostic Manifest</div>
                  <div className="space-y-8">
                     {[
                        { label: 'Risk Vector ID', val: 'RC-GV-482' },
                        { label: 'Integrity Level', val: '99.98%' },
                        { label: 'Logic Sync', val: 'NATIONAL_GRID' }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-royal-800 pb-4">
                           <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                           <span className="text-sm font-mono text-white tracking-widest">{item.val}</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 p-6 bg-royal-950/80 rounded-2xl border border-white/5 flex items-center gap-4">
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                     <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Awaiting Command Link...</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Global Compliance CTA */}
        <div className="mt-48 text-center">
           <Link to="/contact" className="inline-flex flex-col items-center gap-8 group">
              <span className="text-slate-600 text-[11px] font-mono uppercase tracking-[1em] font-black group-hover:text-neon-blue transition-colors">Initialize Governance Protocol</span>
              <div className="text-6xl md:text-[8rem] font-display font-black text-white uppercase tracking-tighter group-hover:scale-105 transition-transform leading-none flex items-center gap-12">
                 Secure Hub. <div className="p-8 md:p-12 rounded-full border-[5px] border-white group-hover:border-neon-blue group-hover:text-neon-blue transition-all"><ArrowRight size={56} /></div>
              </div>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Governance;