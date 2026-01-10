
import React from 'react';
import { 
  Palette, Layout, Smartphone, Globe, ArrowRight, Zap,
  Monitor, Layers, Search, Sparkles, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const WebsiteMakeovers: React.FC = () => {
  const steps = [
    {
      icon: <Search size={28} className="text-neon-blue" />,
      title: "Compliance Audit",
      desc: "We analyze your current site for WCAG 2.1 accessibility and NDIS provider regulations. Identifying friction points."
    },
    {
      icon: <Layers size={28} className="text-neon-gold" />,
      title: "Structural Design",
      desc: "Moving beyond templates. We architect custom layouts that prioritize participant ease-of-use and trust."
    },
    {
      icon: <Smartphone size={28} className="text-neon-purple" />,
      title: "Native Performance",
      desc: "Hyper-fast mobile optimization. Your digital front-door should open instantly in the field."
    },
    {
      icon: <Sparkles size={28} className="text-white" />,
      title: "Visual Identity",
      desc: "Premium chiseled aesthetics that command authority. We build the most respected brands in care."
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-600 hover:text-neon-gold transition-colors mb-12 group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Mainframe
          </Link>
          
          <div className="flex flex-col items-center text-center">
            <div className="circuit-capsule mb-10 px-10 py-3 bg-white dark:bg-black/40 border border-neon-gold/30 text-slate-600 dark:text-neon-gold shadow-3xl inline-flex items-center gap-4">
              <Palette size={18} className="animate-pulse" /> 
              <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Digital_Re-Architecture_Node</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.8] mb-12 animate-liquid-shimmer">
              <span className="text-chiseled-silver block mb-4 text-stroked-black">Website</span> 
              <span className="text-chiseled-gold text-stroked-black">Makeovers.</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic opacity-90 tracking-tight uppercase">
                <DecodingText text="Transforming compliance-heavy legacy sites into high-performance structural assets." stagger={10} />
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32 items-stretch">
           <div className="orbital-tile p-12 lg:p-20 flex flex-col justify-center gap-10">
              <h3 className="text-4xl font-display font-black text-white uppercase tracking-tight leading-none">The Era of <br/>"Template Debt" is Over.</h3>
              <div className="space-y-8 text-lg font-bold text-slate-400 leading-relaxed italic">
                 <p>Most NDIS websites are cluttered with stock photos and broken links. They hide your quality behind administrative mess.</p>
                 <p>RCG re-engineers your digital presence to match the quality of your care. High-fidelity, accessible, and grounded in structural intelligence.</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                 <div className="flex items-center gap-6">
                    <div className="p-4 bg-royal-950 rounded-2xl border border-neon-gold/20 shadow-inner">
                       <Monitor size={24} className="text-neon-gold" />
                    </div>
                    <div>
                       <div className="text-white text-sm font-black uppercase tracking-widest">Full Custom Stack</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Zero Templates • Zero Debt</div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="orbital-tile p-10 group flex flex-col justify-center">
                   <div className="mb-8 p-5 bg-royal-950 rounded-2xl border border-white/5 w-fit group-hover:scale-110 transition-transform shadow-inner">
                      {step.icon}
                   </div>
                   <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-4 group-hover:text-chiseled-gold transition-colors">{step.title}</h4>
                   <p className="text-xs text-slate-400 font-bold italic leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">"{step.desc}"</p>
                </div>
              ))}
           </div>
        </div>

        <div className="orbital-tile !rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,1)]">
           <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <div className="relative z-10 flex flex-col items-center space-y-12">
              <div className="circuit-capsule border border-neon-blue/30 text-neon-blue bg-black px-12 py-4 shadow-3xl">
                <Globe size={22} className="mr-4 animate-pulse" /> Global Grid Synchronization
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter">
                Evolve Your <br/><span className="text-chiseled-gold">Digital Node.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-10 pt-10">
                <Link to="/contact" className="px-16 py-8 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl flex items-center gap-8 group">
                   <Zap size={24} className="text-neon-blue group-hover:animate-bounce" />
                   <span>Request Design Sync</span>
                   <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteMakeovers;
