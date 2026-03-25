import React from 'react';
import { 
  BarChart3, Target, Zap, ArrowRight, Compass, Activity, Gauge, Shield, Users, ShieldCheck, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { DecodingText } from '../components/DecodingText.tsx';
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
      icon: <Compass size={28} className="text-neon-gold" />,
      title: "Workflow Re-Engineering",
      desc: "We replace manual legacy processes with automated, efficient systems using our SYNK platform."
    },
    {
      icon: <BarChart3 size={28} className="text-slate-400" />,
      title: "Revenue Optimisation",
      desc: "Identifying revenue leakage through detailed auditing. We optimise line-item utilisation across your services."
    },
    {
      icon: <ShieldCheck size={28} className="text-neon-gold" />,
      title: "Governance & Compliance",
      desc: "Building compliance frameworks that protect your registration. Audit-ready systems from day one."
    },
    {
      icon: <Users size={28} className="text-slate-400" />,
      title: "Executive Strategic Advisory",
      desc: "High-level consultation for Boards and CEOs. Strategic guidance for critical business decisions."
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 animate-hero-reveal flex flex-col items-center text-center">
          <div className="circuit-capsule mb-10 px-10 py-3 bg-white dark:bg-black/40 border border-neon-gold/30 text-slate-600 dark:text-neon-gold shadow-3xl inline-flex items-center gap-4">
            <Target size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Strategic Advisory</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.8] animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">NDIS Business</span> 
            <span className="text-chiseled-gold text-stroked-black">Consulting.</span>
          </h1>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic opacity-90 tracking-tight uppercase">
               <DecodingText text="Expert consulting for national NDIS providers. We restructure operations for scalable growth." stagger={8} />
            </div>
          </div>
        </div>

        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
           <div className="lg:col-span-8 orbital-tile p-12 shadow-[0_60px_120px_rgba(0,0,0,0.8)] border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                 <div>
                    <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">Impact Projection</h3>
                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2 font-mono">SYNK_Performance_Metrics</p>
                 </div>
                 <div className="flex gap-8 bg-black/40 px-8 py-4 rounded-2xl border border-white/5 shadow-inner">
                    <div className="flex items-center gap-4">
                       <div className="w-2.5 h-2.5 rounded-full bg-neon-gold shadow-[0_0_10px_#E5C78B]"></div>
                       <span className="text-[11px] text-white font-black uppercase tracking-widest">Efficiency</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                       <span className="text-white font-black uppercase tracking-widest">Compliance</span>
                    </div>
                 </div>
              </div>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                       <defs>
                          <linearGradient id="colorGrowthElite" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#E5C78B" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#E5C78B" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#000', border: '2px solid rgba(229,199,139,0.2)', borderRadius: '15px', fontSize: '12px', color: '#fff' }} />
                       <Area type="monotone" dataKey="growth" stroke="#E5C78B" fillOpacity={1} fill="url(#colorGrowthElite)" strokeWidth={5} />
                       <Area type="monotone" dataKey="compliance" stroke="#475569" fillOpacity={0} strokeWidth={5} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="lg:col-span-4 flex flex-col gap-6">
              {[
                { label: "Admin Reduction", val: "-72%", icon: <Activity className="text-slate-400" size={24} /> },
                { label: "Audit Readiness", val: "Instant", icon: <Shield className="text-neon-gold" size={24} /> },
                { label: "Scalability", val: "9.8/10", icon: <Gauge className="text-slate-400" size={24} /> }
              ].map((m, i) => (
                <div key={i} className="orbital-tile p-10 flex flex-col justify-center shadow-xl flex-1 group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-5 bg-royal-950 rounded-2xl border border-white/5 transition-all group-hover:scale-110 shadow-inner">{m.icon}</div>
                      <span className="text-4xl font-display font-black text-white tracking-tighter">{m.val}</span>
                   </div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">{m.label}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
           {strategies.map((s, idx) => (
             <div key={idx} className="orbital-tile p-12 flex flex-col group hover:border-neon-gold/20 transition-all shadow-xl min-h-[420px]">
                <div className="mb-10 p-6 bg-royal-950 border border-white/10 rounded-2xl w-fit group-hover:scale-110 transition-all shadow-inner">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none group-hover:text-chiseled-gold transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-base font-bold leading-relaxed mb-12 flex-grow italic opacity-80 group-hover:opacity-100 transition-opacity">"{s.desc}"</p>
                <Link to="/contact" className="w-full py-5 bg-black border-2 border-neon-gold text-white rounded-xl font-black text-[11px] tracking-[0.4em] uppercase rounded-xl hover:scale-[1.03] active:bg-neon-gold active:text-black transition-all shadow-xl flex items-center justify-center gap-4">
                  <Zap size={18} className="text-neon-gold group-active:text-black" />
                  <span>Get Started</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        <div className="orbital-tile !rounded-[4rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,1)] text-center">
          <div className="relative z-10 flex flex-col items-center space-y-12">
             <div className="circuit-capsule border border-neon-gold/30 text-neon-gold bg-black px-12 py-4 shadow-3xl">
               <Briefcase size={22} className="mr-4 animate-pulse" /> Executive Strategy
             </div>
             <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.85] animate-liquid-shimmer">
              <span className="text-chiseled-silver block mb-2 text-stroked-black">Operational</span> 
              <span className="text-chiseled-gold text-stroked-black">Excellence.</span>
             </h2>
             <div className="flex flex-wrap justify-center gap-10 pt-10">
                <Link to="/contact" className="px-12 py-6 bg-white text-black font-black text-[12px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-gold hover:text-black transition-all shadow-3xl flex items-center gap-6 group">
                  <Target size={24} />
                  <span>Request a Consultation</span>
                  <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;
