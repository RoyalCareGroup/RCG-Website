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
      icon: <Compass size={28} className="text-neon-blue" />,
      title: "Workflow Re-Engineering",
      desc: "We dismantle manual legacy processes and replace them with automated SYNK logic. Our architects map your current state and design a 40% more efficient future state."
    },
    {
      icon: <BarChart3 size={28} className="text-neon-purple" />,
      title: "Financial Performance Node",
      desc: "Identifying 'Revenue Leakage' through deep auditing. We optimize your line-item utilization and billing cycles to recover lost margin and fund organizational growth."
    },
    {
      icon: <ShieldCheck size={28} className="text-neon-blue" />,
      title: "Governance Architecture",
      desc: "Deploying structural compliance layers that protect your NDIS registration. We build audit-proof documentation frameworks that shift risk from humans to systems."
    },
    {
      icon: <Users size={28} className="text-neon-purple" />,
      title: "Executive Strategic Advisory",
      desc: "High-stakes consultation for NDIS Boards and CEOs. We provide the intelligence needed for national expansion, acquisitions, and navigating regulatory pivots."
    }
  ];

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-[1000px] bg-neon-blue/5 blur-[150px] pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-32">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Target size={14} className="mr-3" /> Strategic Command
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[0.85] text-spotlight">
            Sovereign<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Advisory.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10 max-w-2xl">
            Elite business management for national NDIS providers. We don't just advise; we re-engineer your organizational DNA for structural scale.
          </p>
        </div>

        {/* Growth Telemetry Dashboard */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8 orbital-tile p-12 bg-royal-950/40">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-widest">Growth Projection</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">SYNK Impact Analysis 2024/25</p>
                 </div>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                       <span className="text-[9px] text-slate-400 font-black uppercase">Efficiency Gain</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                       <span className="text-[9px] text-slate-400 font-black uppercase">Compliance Level</span>
                    </div>
                 </div>
              </div>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }} />
                       <Area type="monotone" dataKey="growth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={3} />
                       <Area type="monotone" dataKey="compliance" stroke="#d946ef" fillOpacity={1} fill="url(#colorComp)" strokeWidth={3} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="lg:col-span-4 space-y-6">
              {[
                { label: "Administrative Debt", val: "-72%", icon: <Activity className="text-red-500" />, desc: "Average reduction in manual data entry after SYNK deployment." },
                { label: "Audit Pass Velocity", val: "Instant", icon: <Shield className="text-neon-blue" />, desc: "Real-time compliance validation via TFix Diagnostic engine." },
                { label: "Scalability Index", val: "9.8/10", icon: <Gauge className="text-neon-purple" />, desc: "Proprietary organizational capacity score." }
              ].map((m, i) => (
                <div key={i} className="glass p-8 border border-royal-800 rounded-[2rem] hover:border-neon-blue/40 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-royal-900 rounded-xl group-hover:scale-110 transition-transform">{m.icon}</div>
                      <span className="text-3xl font-display font-black text-white">{m.val}</span>
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</div>
                   <p className="text-[9px] text-slate-500 leading-relaxed font-light">{m.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* The RCG Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-40">
           {[
             { step: "01", label: "AUDIT", title: "Diagnostic Deep-Scan", desc: "We utilize TFix telemetry to identify slippage, inefficiencies, and regulatory gaps in your current operation." },
             { step: "02", label: "ARCHITECT", title: "Structural Design", desc: "Our architects map a custom SYNK integration plan, re-engineering workflows to eliminate administrative debt." },
             { step: "03", label: "ACCELERATE", title: "Deployment Node", desc: "Execution of national training protocols and software layering, scaling your capacity without increasing headcount." }
           ].map((item, i) => (
             <div key={i} className="orbital-tile p-12 group hover:border-neon-blue transition-all">
                <div className="flex items-center justify-between mb-8">
                   <span className="text-5xl font-display font-black text-royal-800 group-hover:text-neon-blue/20 transition-colors">{item.step}</span>
                   <div className="px-3 py-1 bg-royal-950 border border-royal-800 rounded-lg text-[9px] font-black text-slate-500 tracking-widest">{item.label}</div>
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Consultancy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
           {strategies.map((s, idx) => (
             <div key={idx} className="glass p-12 rounded-[3rem] border border-royal-800 flex flex-col group hover:border-neon-purple/50 transition-all">
                <div className="mb-10 p-5 bg-royal-900 border border-royal-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-6">{s.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-12 flex-grow">{s.desc}</p>
                <Link to="/contact" className="inline-flex items-center text-[10px] font-black text-neon-blue uppercase tracking-[0.4em] hover:text-white transition-colors group/link">
                  Request Strategy Node <ArrowRight size={14} className="ml-3 group-hover/link:translate-x-2 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        {/* Interactive Growth Callout */}
        <div className="bg-royal-900/50 border border-royal-800 rounded-[5rem] p-12 md:p-32 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
            <BrainCircuit size={300} className="animate-spin-slow text-neon-purple" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-12 space-y-12 text-center">
               <div className="inline-flex items-center space-x-4 text-neon-purple mx-auto">
                 <Briefcase size={40} className="animate-pulse" />
                 <span className="text-sm font-black uppercase tracking-[0.6em]">Executive Advisory</span>
               </div>
               <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none">Architectural<br/>Intelligence.</h2>
               <p className="text-2xl text-slate-400 leading-relaxed font-light max-w-3xl mx-auto">
                 We provide the technical and strategic oversight required to scale from a regional provider to a national infrastructure leader.
               </p>
               
               <div className="flex flex-wrap justify-center gap-8 pt-8">
                  <Link to="/contact" className="px-14 py-7 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-xl">
                    Initiate Consultation
                  </Link>
                  <Link to="/services" className="px-14 py-7 border-2 border-royal-800 text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:border-neon-purple transition-all">
                    Explore Service Nodes
                  </Link>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-40 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.8em]">
           Strategic Transmission // RCG Global Consultancy
        </div>
      </div>
    </div>
  );
};

export default Consultancy;