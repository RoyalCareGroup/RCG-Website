import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, ShieldCheck, Briefcase, 
  BarChart3, Target, Zap, ArrowRight, 
  Settings, Layers, Compass, BrainCircuit,
  Activity, Gauge, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { DecodingText } from '../components/DecodingText.tsx';

const PERFORMANCE_DATA = [
  { month: 'Q1', growth: 12, compliance: 88 },
  { month: 'Q2', growth: 24, compliance: 92 },
  { month: 'Q3', growth: 38, compliance: 96 },
  { month: 'Q4', growth: 52, compliance: 100 },
];

const Consultancy: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strategies = [
    {
      icon: <Compass size={24} className="text-neon-blue" />,
      title: "Workflow Re-Engineering",
      desc: "We dismantle manual legacy processes and replace them with automated SYNK logic nodes."
    },
    {
      icon: <BarChart3 size={24} className="text-neon-purple" />,
      title: "Yield Performance Node",
      desc: "Identifying 'Revenue Leakage' through technical auditing. We optimize line-item utilization."
    },
    {
      icon: <ShieldCheck size={24} className="text-neon-blue" />,
      title: "Governance Architecture",
      desc: "Deploying structural compliance layers that protect your NDIS registration. Audit-proof frameworks."
    },
    {
      icon: <Users size={24} className="text-neon-purple" />,
      title: "Executive Strategic Advisory",
      desc: "High-stakes consultation for national NDIS Boards and CEOs. Intelligence for critical pivots."
    }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-32 pb-24">
        <div className="mb-16 animate-hero-reveal">
          <div className="circuit-capsule mb-6 px-6 bg-black border border-white/80 py-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Target size={12} className="mr-3 animate-pulse text-neon-blue" /> Strategic Command Center
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
            Sovereign<br/>
            <span className="text-neon-blue">Advisory.</span>
          </h1>
          <div className="max-w-lg banner-pop bg-black p-6 shadow-2xl border border-white/10 mt-6">
            <DecodingText 
              text="Elite management for national NDIS providers. We re-engineer organizational DNA for structural scale."
              className="text-lg text-white font-black leading-tight opacity-100"
              stagger={6}
            />
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           <div className="lg:col-span-8 orbital-tile p-8 bg-black border border-white/10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                 <div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter">Impact Projection</h3>
                    <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.4em] mt-2">SYNK_INTEGRATION_METRICS</p>
                 </div>
                 <div className="flex gap-4 bg-royal-950 px-5 py-2 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-neon-blue"></div>
                       <span className="text-[9px] text-white font-black uppercase">Efficiency</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-neon-purple"></div>
                       <span className="text-[9px] text-white font-black uppercase">Compliance</span>
                    </div>
                 </div>
              </div>
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorGrowthElite" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '10px', color: '#fff' }} />
                       <Area type="monotone" dataKey="growth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorGrowthElite)" strokeWidth={4} />
                       <Area type="monotone" dataKey="compliance" stroke="#d946ef" fillOpacity={0} strokeWidth={4} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="lg:col-span-4 flex flex-col gap-4">
              {[
                { label: "Admin Debt", val: "-72%", icon: <Activity className="text-neon-red" size={16} /> },
                { label: "Readiness", val: "Instant", icon: <Shield className="text-neon-blue" size={16} /> },
                { label: "Scalability", val: "9.8/10", icon: <Gauge className="text-neon-purple" size={16} /> }
              ].map((m, i) => (
                <div key={i} className="orbital-tile p-5 bg-black border border-white/5 flex flex-col justify-center shadow-xl flex-1 group">
                   <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 bg-royal-950 rounded-lg group-hover:scale-110 border border-transparent transition-all shadow-inner">{m.icon}</div>
                      <span className="text-2xl font-display font-black text-white">{m.val}</span>
                   </div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">{m.label}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
           {strategies.map((s, idx) => (
             <div key={idx} className="orbital-tile p-8 bg-black border border-white/10 flex flex-col group hover:border-neon-purple transition-all shadow-xl">
                <div className="mb-6 p-4 bg-royal-950 border border-white/5 rounded-xl w-fit group-hover:scale-110 transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">{s.title}</h3>
                <p className="text-white text-xs font-bold leading-relaxed mb-8 flex-grow italic opacity-80 group-hover:opacity-100 transition-opacity">"{s.desc}"</p>
                <Link to="/contact" className="slim-orbital-btn inline-flex items-center justify-center py-3 text-white font-black text-[9px] uppercase tracking-[0.5em] border border-white/50 hover:bg-white hover:text-black transition-all group/link shadow-xl active:scale-95">
                  Execute <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        <div className="banner-pop bg-black border border-white/10 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden group shadow-2xl text-center">
          <div className="relative z-10 flex flex-col items-center space-y-8">
             <div className="circuit-capsule border border-white/80 text-white bg-black px-8 py-3">
               <Briefcase size={16} className="mr-3 animate-pulse text-neon-purple" /> Executive Strategy Node
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
              Architectural<br/>
              <span className="text-neon-blue">Excellence.</span>
             </h2>
             <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link to="/contact" className="slim-orbital-btn px-10 py-5 text-black bg-white font-black text-[10px] tracking-[0.6em] uppercase hover:scale-105 active:scale-95 flex items-center gap-3">
                  Initiate Advisory Sync <ArrowRight size={16} />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;