import React from 'react';
import { Briefcase, TrendingUp, ShieldCheck, GraduationCap, Code, ArrowRight, Terminal, Database, Zap, Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const ServicesPage: React.FC = () => {
  const businessServices = [
    { icon: <Terminal size={24} className="text-neon-gold" />, title: "Custom Business Software", desc: "Purpose-built apps and systems designed for your industry. From compliance tools to client management — tailored to how you actually work." },
    { icon: <GraduationCap size={24} className="text-slate-400" />, title: "Custom Training Packages", desc: "Training designed for your team. Compliance, best practice, and operational efficiency modules for NDIS, aged care, allied health, and more." },
    { icon: <Database size={24} className="text-neon-gold" />, title: "Business Consulting", desc: "Strategic consulting to restructure your operations. Audit-ready processes and scalable systems for regulated and growing businesses." },
    { icon: <TrendingUp size={24} className="text-slate-400" />, title: "Business Acquisitions & Due Diligence", desc: "Due diligence and risk assessment for buying or selling businesses — with specialist expertise in NDIS registered providers." },
    { icon: <ShieldCheck size={24} className="text-neon-gold" />, title: "Compliance Solutions", desc: "Real-time compliance monitoring and audit preparation. Stay ahead of regulatory requirements across NDIS, aged care, and allied health." },
    { icon: <Code size={24} className="text-slate-400" />, title: "SYNK Product Integration", desc: "Direct setup and onboarding of our SYNK suite tools to streamline your daily operations — for any business, any industry." }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-24 pb-16 w-full">
        
        <div className="text-center mb-12 animate-hero-reveal flex flex-col items-center">
          <div className="circuit-capsule border border-slate-300 dark:border-neon-gold/30 bg-white dark:bg-black/40 backdrop-blur-md text-slate-600 dark:text-neon-gold px-10 py-3 shadow-3xl inline-flex items-center gap-4 mb-6">
            <Briefcase size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">What We Do</span>
          </div>
          <h1 className="text-5xl font-mono font-black uppercase tracking-tighter leading-[0.8] mb-6 animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">Our</span> 
            <span className="text-chiseled-gold text-stroked-black">Services.</span>
          </h1>
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic opacity-90 tracking-tight uppercase">
               <DecodingText text="Business Consulting • Smart Tech • Industry Expertise" stagger={15} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile !bg-transparent !border !border-white/10 !shadow-none hover:!border-neon-gold/40 hover:!shadow-[0_0_20px_rgba(229,199,139,0.1)] group h-full flex flex-col transition-all duration-700 rounded-2xl p-6">
              <div className="mb-6 p-6 bg-royal-950 rounded-2xl border border-white/10 w-fit group-hover:scale-110 group-hover:border-neon-gold/30 transition-all shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-3xl font-mono font-black text-white mb-4 uppercase tracking-tighter leading-none group-hover:text-chiseled-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed font-bold mb-6 flex-grow italic opacity-80 group-hover:opacity-100 transition-opacity">
                "{service.desc}"
              </p>
              <Link to="/contact" className="w-full py-5 bg-black border-2 border-neon-gold text-white rounded-xl font-black text-[11px] tracking-[0.4em] uppercase hover:scale-[1.03] active:bg-neon-gold active:text-black transition-all shadow-xl flex items-center justify-center gap-4 group/btn">
                <Zap size={18} className="text-neon-gold group-active:text-black" />
                <span>Get Started</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 orbital-tile !bg-transparent !border !border-white/10 !shadow-none hover:!border-neon-gold/40 hover:!shadow-[0_0_20px_rgba(229,199,139,0.1)] !rounded-[4rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter leading-none animate-liquid-shimmer">
                <span className="text-chiseled-silver block mb-2 text-stroked-black">Automate Your</span>
                <span className="text-chiseled-gold text-stroked-black">Compliance.</span>
              </h2>
              <p className="text-xl text-slate-300 font-bold italic leading-relaxed">
                Connect your existing software ecosystem to our SYNK platform and eliminate administrative burden instantly.
              </p>
              <Link to="/contact" className="px-12 py-6 bg-white text-black font-black text-[12px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-gold hover:text-black transition-all inline-flex items-center gap-6">
                Connect My Systems <ArrowRight size={20} />
              </Link>
           </div>
           <div className="relative">
              <div className="w-64 h-64 border-4 border-dashed border-neon-gold/20 rounded-full animate-spin-slow"></div>
              <Boxes className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-gold" size={80} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
