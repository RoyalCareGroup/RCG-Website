
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Rocket, Sparkles,
  Terminal, Briefcase, Zap,
  Scale, Users, Cpu, Target
} from 'lucide-react';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { DecodingText } from '../components/DecodingText.tsx';

const Home = () => {
  
  const featurePortal = [
    {
      title: "Our Services",
      subtitle: "What We Offer",
      icon: <Briefcase size={18} className="text-neon-gold" />,
      desc: "Business consulting, custom training packages, and tech solutions — with deep expertise in NDIS, aged care, and allied health.",
      path: "/services",
    },
    {
      title: "Business Consulting",
      subtitle: "Strategic Advisory",
      icon: <Target size={18} className="text-neon-blue" />,
      desc: "Strategic guidance to build, scale, and future-proof your business — from compliance-heavy industries to professional services.",
      path: "/consultancy",
    },
    {
      title: "SYNK Tech Suite",
      subtitle: "Built for Business",
      icon: <Cpu size={18} className="text-neon-gold" />,
      desc: "Smart tools that automate compliance, notes, invoicing, and communication for businesses of all sizes.",
      path: "/tech",
    }
  ];

  const heroBtnClass = "w-full px-6 py-3.5 bg-black border-2 border-neon-gold text-white font-black text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group rounded-xl";

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-4 sm:px-10 lg:px-16 font-sans relative">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center pt-28 pb-6 z-10">
        <div className="max-w-5xl mx-auto w-full animate-hero-reveal">
          
          <div className="flex flex-col items-center gap-4 mb-8">
             <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter leading-none max-w-5xl animate-liquid-shimmer group cursor-default flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
               <span className="text-chiseled-silver text-stroked-black">Structural</span> 
               <span className="text-chiseled-gold text-stroked-black">Intelligence.</span>
             </h1>

             <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
               <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-bold leading-relaxed italic opacity-90 tracking-tight text-center uppercase">
                 <DecodingText 
                    text="Smart Tools for Smarter Business"
                    stagger={25}
                    glow={true}
                    className="text-slate-950 dark:text-white"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-2.5 max-w-lg mx-auto pt-2">
                 <Link to="/tech" className={heroBtnClass}>
                   <Cpu size={12} className="text-neon-gold" />
                   <span>SYNK Suite</span>
                   <ArrowRight size={12} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/consultancy" className={heroBtnClass}>
                   <Target size={12} className="text-neon-gold" />
                   <span>Business Consulting</span>
                   <ArrowRight size={12} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/services" className={heroBtnClass}>
                   <Briefcase size={12} className="text-neon-gold" />
                   <span>Our Services</span>
                   <ArrowRight size={12} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/about" className={heroBtnClass}>
                   <Users size={12} className="text-neon-gold" />
                   <span>Our Story</span>
                   <ArrowRight size={12} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-2">
              <div className="text-xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">4+</div>
              <div className="text-[7px] text-slate-500 font-black uppercase tracking-[0.3em]">Years in Business</div>
            </div>
            <div className="p-2">
              <div className="text-xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">170+</div>
              <div className="text-[7px] text-slate-500 font-black uppercase tracking-[0.3em]">Clients Supported</div>
            </div>
            <div className="p-2">
              <div className="text-xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">5</div>
              <div className="text-[7px] text-slate-500 font-black uppercase tracking-[0.3em]">SYNK Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION — CLEAN HORIZONTAL CARDS --- */}
      <section className="py-10 relative z-10 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-3xl mx-auto space-y-4 px-4">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className="group flex items-center gap-6 p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm hover:border-neon-gold/40 hover:bg-white/80 dark:hover:bg-white/[0.05] transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              <div className="shrink-0 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-neon-gold/30 group-hover:bg-neon-gold/5 transition-all">
                {item.icon}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-display font-black text-slate-950 dark:text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
                    {item.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-slate-300 dark:text-slate-700 group-hover:text-neon-gold group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* --- SECONDARY CTA --- */}
      <section className="py-14 relative z-10 border-t border-slate-200 dark:border-white/5 px-4 text-center">
         <div className="max-w-4xl mx-auto space-y-6">
           <div className="circuit-capsule border border-slate-300 dark:border-neon-gold/20 text-[8px] px-6 py-2 inline-flex bg-white dark:bg-black shadow-lg items-center gap-3 text-slate-600 dark:text-neon-gold/80 uppercase font-black tracking-[0.3em]">
              <Scale size={14} className="animate-pulse" /> Business Intelligence
           </div>
           <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-tighter leading-[0.9] animate-liquid-shimmer">
              <span className="text-chiseled-silver block mb-2 text-stroked-black">Eliminate administrative burden</span> 
              <span className="text-chiseled-gold text-stroked-black italic">and return to purpose.</span>
           </h2>
           <Link 
             to="/contact" 
             className="px-6 py-3 bg-black border-2 border-neon-gold rounded-xl text-white font-black text-[9px] tracking-[0.3em] uppercase hover:scale-[1.03] active:bg-white active:text-black shadow-[0_10px_40px_rgba(229,199,139,0.1)] transition-all inline-flex items-center gap-3 group"
           >
              <Sparkles size={14} className="text-neon-gold transition-transform group-hover:rotate-12" />
              Get In Touch
           </Link>
         </div>
      </section>

      {/* --- SYNK OS FOOTER TEASE --- */}
      <section className="py-12 relative z-10 border-t border-slate-200 dark:border-white/5 px-4">
        <div className="max-w-4xl mx-auto w-full">
           <div className="orbital-tile !rounded-2xl lg:!rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.01] pointer-events-none">
                <Rocket size={400} className="text-neon-gold -rotate-12" />
              </div>
              <div className="relative z-10 space-y-8 max-w-3xl w-full">
                 <div className="flex flex-col items-center gap-4">
                    <div className="orbital-tile !rounded-xl p-3 bg-royal-950 shadow-inner border-white/5 group-hover:border-neon-gold/30 transition-all">
                       <Terminal size={20} className="text-neon-gold" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">The 2026 SYNK Ecosystem</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">
                      Unified <br/> <span className="text-chiseled-gold text-stroked-black">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-2 scale-85 sm:scale-95">
                    <HeroLogoAnimation />
                 </div>
                 <Link to="/tech" className="text-slate-500 hover:text-neon-gold transition-all text-[9px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 group mt-2">
                   View the SYNK Product Suite <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
