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
      icon: <Compass size={28} className="text-neon-blue" />,
      title: "Workflow Re-Engineering",
      desc: "We dismantle manual legacy processes and replace them with automated SYNK logic nodes. Our architects design a 40%+ more efficient future state."
    },
    {
      icon: <BarChart3 size={28} className="text-neon-purple" />,
      title: "Yield Performance Node",
      desc: "Identifying 'Revenue Leakage' through technical auditing. We optimize line-item utilization to recover lost margin and fund growth."
    },
    {
      icon: <ShieldCheck size={28} className="text-neon-blue" />,
      title: "Governance Architecture",
      desc: "Deploying structural compliance layers that protect your NDIS registration. Audit-proof frameworks that shift risk to sovereign systems."
    },
    {
      icon: <Users size={28} className="text-neon-purple" />,
      title: "Executive Strategic Advisory",
      desc: "High-stakes consultation for national NDIS Boards and CEOs. Intelligence for expansion and critical regulatory pivots at scale."
    }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div 
          className="absolute inset-0 parallax-layer opacity-[0.04]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px,transparent 2px), linear-gradient(90deg,rgba(255,255,255,0.06) 2px,transparent_2px)',
            backgroundSize: '120px 120px',
            transform: `translateY(${scrollY * -0.05}px)` 
          }}
        ></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-28 animate-hero-reveal">
          <div className="circuit-capsule mb-10 px-8 bg-black border-2 border-white/80 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Target size={14} className="mr-3 animate-pulse text-neon-blue" /> Strategic Command Center
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] heading-wow">
            Sovereign<br/>
            <span className="heading-tech">Advisory.</span>
          </h1>
          <div className="max-w-xl relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10 mt-10">
            <DecodingText 
              text="Elite management for national NDIS providers. We re-engineer organizational DNA for structural scale and absolute regulatory adherence."
              className="text-xl md:text-2xl text-white font-black leading-tight tracking-wide opacity-100"
              stagger={8}
            />
          </div>
        </div>

        <div className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           <div className="lg:col-span-8 orbital-tile p-12 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                 <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Impact Projection</h3>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] mt-3 font-mono">SYNK_INTEGRATION_METRICS</p>
                 </div>
                 <div className="flex gap-8 bg-royal-950 px-8 py-4 rounded-2xl border-2 border-white/5 shadow-inner">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#06b6d4]"></div>
                       <span className="text-[10px] text-white font-black uppercase tracking-widest">Efficiency</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_#d946ef]"></div>
                       <span className="text-[10px] text-white font-black uppercase tracking-widest">Compliance</span>
                    </div>
                 </div>
              </div>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorGrowthElite" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#475569" fontSize={11} fontWeight="black" axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#000', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '11px', fontWeight: '900', color: '#fff' }} />
                       <Area type="monotone" dataKey="growth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorGrowthElite)" strokeWidth={5} />
                       <Area type="monotone" dataKey="compliance" stroke="#d946ef" fillOpacity={0} strokeWidth={5} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="lg:col-span-4 flex flex-col gap-6">
              {[
                { label: "Administrative Debt", val: "-72%", icon: <Activity className="text-neon-red" size={20} /> },
                { label: "Audit Readiness", val: "Instant", icon: <Shield className="text-neon-blue" size={20} /> },
                { label: "Scalability Index", val: "9.8/10", icon: <Gauge className="text-neon-purple" size={20} /> }
              ].map((m, i) => (
                <div key={i} className="orbital-tile p-8 bg-black border-2 border-white/5 hover:border-white transition-all flex flex-col justify-center shadow-2xl flex-1 group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-royal-950 rounded-xl group-hover:scale-110 group-hover:border-neon-blue border-2 border-transparent transition-all shadow-inner">{m.icon}</div>
                      <span className="text-3xl font-display font-black text-white tracking-tighter">{m.val}</span>
                   </div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">{m.label}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
           {strategies.map((s, idx) => (
             <div key={idx} className="orbital-tile p-14 bg-black border-2 border-white/10 flex flex-col group hover:border-neon-purple transition-all shadow-3xl min-h-[450px]">
                <div className="mb-10 p-5 bg-royal-950 border-2 border-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-purple transition-all shadow-2xl">
                  {s.icon}
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none group-hover:text-neon-blue transition-colors">{s.title}</h3>
                <p className="text-white text-lg font-black leading-relaxed mb-12 flex-grow italic opacity-80 group-hover:opacity-100 transition-opacity">"{s.desc}"</p>
                <Link to="/contact" className="slim-orbital-btn inline-flex items-center justify-center py-5 text-white font-black text-[11px] uppercase tracking-[0.6em] border-2 border-white/80 hover:bg-white hover:text-black transition-all group/link shadow-2xl active:scale-95">
                  Execute Strategy Node <ArrowRight size={18} className="ml-4 group-hover/link:translate-x-3 transition-transform text-neon-purple" />
                </Link>
             </div>
           ))}
        </div>

        <div className="banner-pop bg-black border-2 border-white/10 rounded-[4rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.9)] text-center">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
            <BrainCircuit size={450} className="animate-spin-slow text-neon-purple" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center space-y-12">
             <div className="circuit-capsule border-2 border-white/80 text-white bg-black px-10 py-4">
               <Briefcase size={20} className="mr-4 animate-pulse text-neon-purple" /> Executive Strategy Node
             </div>
             <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter heading-wow">
              Architectural<br/>
              <span className="heading-tech">Excellence.</span>
             </h2>
             <p className="text-2xl text-white font-black leading-relaxed max-w-3xl italic">
               "We provide the strategic oversight required to transition from regional provider to national infrastructure leader."
             </p>
             
             <div className="flex flex-wrap justify-center gap-8 pt-10">
                <Link to="/contact" className="slim-orbital-btn px-16 py-7 text-black bg-white font-black text-[12px] tracking-[0.7em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-4">
                  Initiate Advisory Sync <ArrowRight size={18} className="text-neon-blue" />
                </Link>
                <Link to="/tech" className="slim-orbital-btn px-16 py-7 border-2 border-white/30 text-white font-black text-[12px] tracking-[0.7em] uppercase transition-all hover:bg-white/5">
                  Explore SYNK Modules
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;