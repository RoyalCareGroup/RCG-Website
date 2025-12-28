import React from 'react';
import { 
  TrendingUp, Users, ShieldCheck, Briefcase, 
  BarChart3, Target, Zap, ArrowRight, 
  Settings, Layers, Compass, BrainCircuit,
  Activity, Gauge, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { COMPANY_DETAILS } from '../config.ts';

const PERFORMANCE_DATA = [
  { month: 'Q1', growth: 12, compliance: 88 },
  { month: 'Q2', growth: 24, compliance: 92 },
  { month: 'Q3', growth: 38, compliance: 96 },
  { month: 'Q4', growth: 52, compliance: 100 },
];

const Consultancy: React.FC = () => {
  const strategies = [
    {
      icon: <Compass size={32} className="text-neon-blue" />,
      title: "Workflow Re-Engineering",
      desc: "We dismantle manual legacy processes and replace them with automated SYNK logic nodes. Our architects design a 40%+ more efficient future state through structural optimization."
    },
    {
      icon: <BarChart3 size={32} className="text-neon-purple" />,
      title: "Yield Performance Node",
      desc: "Identifying 'Revenue Leakage' through technical auditing. We optimize line-item utilization to recover lost margin and fund organizational infrastructure growth."
    },
    {
      icon: <ShieldCheck size={32} className="text-neon-blue" />,
      title: "Governance Architecture",
      desc: "Deploying structural compliance layers that protect your NDIS registration. Audit-proof documentation frameworks that shift risk from humans to sovereign systems."
    },
    {
      icon: <Users size={32} className="text-neon-purple" />,
      title: "Executive Strategic Advisory",
      desc: "High-stakes consultation for national NDIS Boards and CEOs. Intelligence for expansion, acquisitions, and navigating critical regulatory pivots at scale."
    }
  ];

  return (
    <div className="min-h-screen bg-royal-950 pt-48 pb-40 relative overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute top-0 right-0 w-full h-[1200px] bg-neon-blue/5 blur-[200px] pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:48px_48px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-32 animate-fade-in">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.6em] uppercase mb-12 shadow-2xl">
            <Target size={16} className="mr-4 animate-pulse" /> Strategic Command Center
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.9] text-spotlight">
            Sovereign<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]">Advisory.</span>
          </h1>
          <p className="text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-blue pl-12 max-w-3xl italic">
            "Elite management for national NDIS providers. We re-engineer organizational DNA for structural scale and absolute regulatory adherence."
          </p>
        </div>

        {/* Growth Telemetry Dashboard */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           <div className="lg:col-span-8 orbital-tile p-12 bg-royal-900/40 border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                 <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Impact Projection</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">SYNK_INTEGRATION_METRICS 2024/25</p>
                 </div>
                 <div className="flex gap-8 bg-royal-950/80 px-6 py-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#06b6d4]"></div>
                       <span className="text-[9px] text-white font-black uppercase tracking-widest">Efficiency</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_8px_#d946ef]"></div>
                       <span className="text-[9px] text-white font-black uppercase tracking-widest">Compliance</span>
                    </div>
                 </div>
              </div>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorGrowthElite" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCompElite" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#d946ef" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#475569" fontSize={11} fontWeight="bold" axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#020817', border: '1px solid #1e293b', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }} />
                       <Area type="monotone" dataKey="growth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorGrowthElite)" strokeWidth={5} animationDuration={2500} />
                       <Area type="monotone" dataKey="compliance" stroke="#d946ef" fillOpacity={1} fill="url(#colorCompElite)" strokeWidth={5} animationDuration={2500} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="lg:col-span-4 flex flex-col gap-6">
              {[
                { label: "Administrative Debt", val: "-72%", icon: <Activity className="text-red-500" />, desc: "Average reduction in manual entry load after SYNK deployment." },
                { label: "Audit Readiness", val: "Instant", icon: <Shield className="text-neon-blue" />, desc: "Real-time compliance validation via TFix Engine telemetry." },
                { label: "Scalability Index", val: "9.8/10", icon: <Gauge className="text-neon-purple" />, desc: "Proprietary organizational capacity benchmarks." }
              ].map((m, i) => (
                <div key={i} className="orbital-tile p-8 bg-royal-900/30 border-white/5 hover:border-neon-blue/50 transition-all flex flex-col justify-center shadow-2xl flex-1 group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-royal-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner">{m.icon}</div>
                      <span className="text-3xl font-display font-black text-white">{m.val}</span>
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">{m.label}</div>
                   <p className="text-xs text-slate-500 leading-relaxed font-light">{m.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* The RCG Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-40 relative">
           <div className="absolute inset-0 bg-neon-purple/5 pointer-events-none blur-[150px]"></div>
           {[
             { step: "01", label: "DIAGNOSTIC", title: "Structural Audit", desc: "We utilize TFix telemetry to identify slippage, inefficiencies, and regulatory gaps in your organization." },
             { step: "02", label: "ARCHITECT", title: "Protocol Design", desc: "Our architects map a custom SYNK integration plan, re-engineering workflows for high-fidelity scale." },
             { step: "03", label: "SCALE", title: "National Deployment", desc: "Execution of national training protocols and software layering, scaling capacity without headcount increase." }
           ].map((item, i) => (
             <div key={i} className="orbital-tile p-12 group hover:border-neon-blue bg-royal-900/20 shadow-3xl flex flex-col h-full relative overflow-hidden transition-all duration-700">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <span className="text-8xl font-display font-black text-white">{item.step}</span>
                </div>
                <div className="flex items-center justify-between mb-10 relative z-10">
                   <div className="px-5 py-1.5 bg-royal-950 border border-royal-800 rounded-lg text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">{item.label}</div>
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4 group-hover:text-neon-blue transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-base font-light leading-relaxed mb-8">{item.desc}</p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest font-black">
                   RCG_METHODOLOGY_0{i+1}
                </div>
             </div>
           ))}
        </div>

        {/* Consultancy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
           {strategies.map((s, idx) => (
             <div key={idx} className="orbital-tile p-12 rounded-[3rem] bg-royal-900/40 border-white/10 flex flex-col group hover:border-neon-purple/50 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
                <div className="mb-10 p-5 bg-royal-950 border border-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-purple transition-all shadow-3xl">
                  {s.icon}
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-6 leading-none">{s.title}</h3>
                <p className="text-slate-300 text-lg font-light leading-relaxed mb-12 flex-grow italic">"{s.desc}"</p>
                <Link to="/contact" className="inline-flex items-center text-[12px] font-black text-neon-blue uppercase tracking-[0.6em] hover:text-white transition-all group/link">
                  Execute Strategy Node <ArrowRight size={18} className="ml-4 group-hover/link:translate-x-3 transition-transform text-neon-purple" />
                </Link>
             </div>
           ))}
        </div>

        {/* CTA Section */}
        <div className="bg-royal-900/50 border border-white/10 rounded-[5rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_60px_120px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 right-0 p-32 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
            <BrainCircuit size={400} className="animate-spin-slow text-neon-purple" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-12">
             <div className="inline-flex items-center space-x-6 text-neon-purple bg-neon-purple/10 px-8 py-3 rounded-[1.5rem] border border-neon-purple/30 shadow-3xl">
               <Briefcase size={32} className="animate-pulse" />
               <span className="text-base font-black uppercase tracking-[0.8em]">Executive Strategy</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] text-spotlight">Architectural<br/>Excellence.</h2>
             <p className="text-2xl text-slate-300 font-light leading-relaxed max-w-4xl italic">
               "We provide the strategic oversight required to transition from regional provider to national infrastructure leader."
             </p>
             
             <div className="flex flex-wrap justify-center gap-8 pt-8">
                <Link to="/contact" className="px-14 py-7 bg-white text-black font-black text-[12px] tracking-[0.8em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl hover:scale-105 active:scale-95">
                  Initiate Advisory Sync
                </Link>
                <Link to="/tech" className="px-14 py-7 border-4 border-royal-800 text-white font-black text-[12px] tracking-[0.8em] uppercase rounded-2xl hover:border-neon-purple transition-all hover:bg-neon-purple/5 shadow-2xl">
                  Explore SYNK Modules
                </Link>
             </div>
          </div>
        </div>

        <div className="mt-32 text-center">
           <div className="text-slate-700 text-[11px] font-mono uppercase tracking-[1.5em] font-black border-t border-white/5 pt-20">
             Strategic Transmission // RCG Global Division // v10.9.0
           </div>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;