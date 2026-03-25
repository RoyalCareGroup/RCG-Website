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
      icon: <Briefcase size={20} className="text-neon-gold" />,
      desc: "Business consulting, custom training packages, and tech solutions — with deep expertise in NDIS, aged care, and allied health.",
      path: "/services",
      btnText: "Explore",
    },
    {
      title: "Business Consulting",
      subtitle: "Strategic Advisory",
      icon: <Target size={20} className="text-neon-blue" />,
      desc: "Strategic guidance to build, scale, and future-proof your business — from compliance-heavy industries to professional services.",
      path: "/consultancy",
      btnText: "Get Started",
    },
    {
      title: "SYNK Tech Suite",
      subtitle: "Built for Business",
      icon: <Cpu size={20} className="text-neon-gold" />,
      desc: "Smart tools that automate compliance, notes, invoicing, and communication for businesses of all sizes.",
      path: "/tech",
      btnText: "View Products",
    }
  ];

  const heroBtnClass = "w-full px-6 py-3.5 bg-black border-2 border-neon-gold text-white font-black text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group rounded-xl";

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-4 sm:px-10 lg:px-16 font-sans relative">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center pt-24 pb-8 z-10">
        <div className="max-w-5xl mx-auto w-full animate-hero-reveal">
          
          <div className="flex flex-col items-center gap-5 mb-8">
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tighter leading-none max-w-5xl animate-liquid-shimmer group cursor-default flex flex-wrap justify-center gap-x-3 sm:gap-x-5">
               <span className="text-chiseled-silver text-stroked-black">Structural</span> 
               <span className="text-chiseled-gold text-stroked-black">Intelligence.</span>
             </h1>

             <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
               <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-bold leading-relaxed italic opacity-90 tracking-tight text-center uppercase">
                 <DecodingText 
                    text="Smart Tools for Smarter Business"
                    stagger={25}
                    glow={true}
                    className="text-slate-950 dark:text-white"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto pt-2">
                 <Link to="/tech" className={heroBtnClass}>
                   <Cpu size={14} className="text-neon-gold" />
                   <span>SYNK Suite</span>
                   <ArrowRight size={14} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/consultancy" className={heroBtnClass}>
                   <Target size={14} className="text-neon-gold" />
                   <span>Business Consulting</span>
                   <ArrowRight size={14} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/services" className={heroBtnClass}>
                   <Briefcase size={14} className="text-neon-gold" />
                   <span>Our Services</span>
                   <ArrowRight size={14} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link to="/about" className={heroBtnClass}>
                   <Users size={14} className="text-neon-gold" />
                   <span>Our Story</span>
                   <ArrowRight size={14} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-3">
              <div className="text-2xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">4+</div>
              <div className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">Years in Business</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">170+</div>
              <div className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">Clients Supported</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-slate-950 dark:text-white mb-1 tracking-tighter">5</div>
              <div className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">SYNK Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE FEATURE PORTALS --- */}
      <section className="py-14 relative z-10 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className="orbital-tile p-8 group transition-all duration-700 flex flex-col h-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="mb-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-neon-gold/10 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-2 mb-6 flex-grow">
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tighter leading-none group-hover:text-chiseled-gold transition-all">
                  {item.title}
                </h3>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-400 text-sm font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>
              <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-white font-black text-[9px] uppercase tracking-[0.4em]">{item.btnText}</span>
                <div className="px-6 py-3 bg-black border-2 border-neon-gold text-white rounded-xl flex items-center justify-center gap-4 transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                  <Zap size={14} className="text-neon-gold" />
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SECONDARY CTA --- */}
      <section className="py-16 relative z-10 border-t border-slate-200 dark:border-white/5 px-4 text-center">
         <div className="max-w-5xl mx-auto space-y-8">
           <div className="circuit-capsule border border-slate-300 dark:border-neon-gold/20 text-[9px] px-8 py-3 inline-flex bg-white dark:bg-black shadow-xl items-center gap-4 text-slate-600 dark:text-neon-gold/80 uppercase font-black tracking-[0.4em]">
              <Scale size={16} className="animate-pulse" /> Business Intelligence
           </div>
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-[0.9] animate-liquid-shimmer">
              <span className="text-chiseled-silver block mb-2 text-stroked-black">Eliminate administrative debt</span> 
              <span className="text-chiseled-gold text-stroked-black italic">and return to purpose.</span>
           </h2>
           <Link 
             to="/contact" 
             className="px-8 py-4 bg-black border-2 border-neon-gold rounded-xl text-white font-black text-[10px] tracking-[0.4em] uppercase hover:scale-[1.03] active:bg-white active:text-black shadow-[0_20px_60px_rgba(229,199,139,0.1)] transition-all inline-flex items-center gap-4 group"
           >
              <Sparkles size={16} className="text-neon-gold transition-transform group-hover:rotate-12" />
              Get In Touch
           </Link>
         </div>
      </section>

      {/* --- SYNK OS FOOTER TEASE --- */}
      <section className="py-16 relative z-10 border-t border-slate-200 dark:border-white/5 px-4">
        <div className="max-w-5xl mx-auto w-full">
           <div className="orbital-tile !rounded-[2rem] lg:!rounded-[3rem] p-10 sm:p-16 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.01] pointer-events-none">
                <Rocket size={500} className="text-neon-gold -rotate-12" />
              </div>
              <div className="relative z-10 space-y-10 max-w-4xl w-full">
                 <div className="flex flex-col items-center gap-6">
                    <div className="orbital-tile !rounded-xl p-4 bg-royal-950 shadow-inner border-white/5 group-hover:border-neon-gold/30 transition-all">
                       <Terminal size={24} className="text-neon-gold" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500">The 2026 SYNK Ecosystem</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                      Unified <br/> <span className="text-chiseled-gold text-stroked-black">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-4 scale-90 sm:scale-100">
                    <HeroLogoAnimation />
                 </div>
                 <Link to="/tech" className="text-slate-500 hover:text-neon-gold transition-all text-[10px] font-black uppercase tracking-[0.6em] flex items-center justify-center gap-6 group mt-4">
                   View the SYNK Product Suite <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
