
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Rocket, Sparkles,
  Boxes, Terminal, Briefcase, Zap,
  Scale, Users, Cpu, Target
} from 'lucide-react';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { DecodingText } from '../components/DecodingText.tsx';

const Home = () => {
  
  const featurePortal = [
    {
      title: "Our Services",
      subtitle: "What We Offer",
      icon: <Briefcase size={24} className="text-neon-gold" />,
      desc: "NDIS consulting, custom training packages, and tech solutions built for providers.",
      path: "/services",
      btnText: "Explore Services",
    },
    {
      title: "NDIS Consulting",
      subtitle: "Business Advisory",
      icon: <Target size={24} className="text-neon-blue" />,
      desc: "Strategic guidance to build, scale, and bulletproof your NDIS provider business.",
      path: "/consultancy",
      btnText: "Get Started",
    },
    {
      title: "SYNK Tech Suite",
      subtitle: "Built for NDIS",
      icon: <Cpu size={24} className="text-neon-gold" />,
      desc: "Purpose-built tools that automate compliance, notes, invoicing, and communication.",
      path: "/tech",
      btnText: "View Products",
    }
  ];

  const heroBtnClass = "w-full max-w-sm px-8 py-5 bg-black border-2 border-neon-gold text-white font-black text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-4 group rounded-xl";

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center pt-32 pb-12 z-10">
        <div className="max-w-7xl mx-auto w-full animate-hero-reveal">
          
          <div className="flex flex-col items-center gap-8 mb-12">
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter leading-none max-w-7xl animate-liquid-shimmer group cursor-default flex flex-wrap justify-center gap-x-4 sm:gap-x-6">
               <span className="text-chiseled-silver text-stroked-black">Structural</span> 
               <span className="text-chiseled-gold text-stroked-black">Intelligence.</span>
             </h1>

             <div className="max-w-6xl mx-auto text-center px-4 space-y-12">
               <div className="text-slate-600 dark:text-slate-400 text-base sm:text-xl font-bold leading-relaxed italic opacity-90 tracking-tight text-center uppercase">
                 <DecodingText 
                    text="Systematizing Your NDIS Knowledge"
                    stagger={25}
                    glow={true}
                    className="text-slate-950 dark:text-white"
                 />
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto pt-4">
                 <Link 
                   to="/tech"
                   className={heroBtnClass}
                 >
                   <Cpu size={16} className="text-neon-gold" />
                   <span>SYNK Suite</span>
                   <ArrowRight size={16} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link 
                   to="/consultancy"
                   className={heroBtnClass}
                 >
                   <Target size={16} className="text-neon-gold" />
                   <span>NDIS Consulting</span>
                   <ArrowRight size={16} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link 
                   to="/services"
                   className={heroBtnClass}
                 >
                   <Briefcase size={16} className="text-neon-gold" />
                   <span>Our Services</span>
                   <ArrowRight size={16} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>

                 <Link 
                   to="/about"
                   className={heroBtnClass}
                 >
                   <Users size={16} className="text-neon-gold" />
                   <span>Our Story</span>
                   <ArrowRight size={16} className="text-neon-gold group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-4xl font-black text-slate-950 dark:text-white mb-2 tracking-tighter">4+</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Years in NDIS</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-slate-950 dark:text-white mb-2 tracking-tighter">170+</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Participants Supported</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-slate-950 dark:text-white mb-2 tracking-tighter">5</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">SYNK Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE FEATURE PORTALS --- */}
      <section className="py-24 relative z-10 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className="orbital-tile p-12 group transition-all duration-700 flex flex-col h-full shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="mb-10 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-gold/10 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-4 mb-10 flex-grow">
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none group-hover:text-chiseled-gold transition-all">
                  {item.title}
                </h3>
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-400 text-lg font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{item.desc}"
                </p>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between group">
                <span className="text-white font-black text-[11px] uppercase tracking-[0.5em]">{item.btnText}</span>
                <div className="px-10 py-5 bg-black border-2 border-neon-gold text-white rounded-xl flex items-center justify-center gap-8 transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                  <Zap size={20} className="text-neon-gold" />
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SECONDARY CTA --- */}
      <section className="py-28 relative z-10 border-t border-slate-200 dark:border-white/5 px-4 text-center">
         <div className="max-w-7xl mx-auto space-y-12">
           <div className="circuit-capsule border border-slate-300 dark:border-neon-gold/20 text-[11px] px-12 py-5 inline-flex bg-white dark:bg-black shadow-3xl items-center gap-8 text-slate-600 dark:text-neon-gold/80 uppercase font-black tracking-[0.5em]">
              <Scale size={24} className="animate-pulse" /> NDIS Business Intelligence
           </div>
           <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter leading-[0.9] animate-liquid-shimmer">
              <span className="text-chiseled-silver block mb-4 text-stroked-black">Eliminate administrative debt</span> 
              <span className="text-chiseled-gold text-stroked-black italic">and return to purpose.</span>
           </h2>
           <Link 
             to="/contact" 
             className="px-12 py-6 bg-black border-2 border-neon-gold rounded-xl text-white font-black text-[12px] tracking-[0.6em] uppercase hover:scale-[1.03] active:bg-white active:text-black shadow-[0_40px_80px_rgba(229,199,139,0.1)] transition-all inline-flex items-center gap-8 group"
           >
              <Sparkles size={24} className="text-neon-gold transition-transform group-hover:rotate-12" />
              Get In Touch
           </Link>
         </div>
      </section>

      {/* --- SYNK OS FOOTER TEASE --- */}
      <section className="py-28 relative z-10 border-t border-slate-200 dark:border-white/5 px-4">
        <div className="max-w-7xl mx-auto w-full">
           <div className="orbital-tile !rounded-[3rem] lg:!rounded-[4rem] p-16 sm:p-24 relative overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,1)] group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.01] pointer-events-none">
                <Rocket size={800} className="text-neon-gold -rotate-12" />
              </div>
              <div className="relative z-10 space-y-16 max-w-5xl w-full">
                 <div className="flex flex-col items-center gap-10">
                    <div className="orbital-tile !rounded-2xl p-6 bg-royal-950 shadow-inner border-white/5 group-hover:border-neon-gold/30 transition-all">
                       <Terminal size={32} className="text-neon-gold" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[1.2em] text-slate-500 ml-[1.2em]">The 2026 SYNK Ecosystem</span>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
                      Unified <br/> <span className="text-chiseled-gold text-stroked-black">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-6 scale-95 sm:scale-110">
                    <HeroLogoAnimation />
                 </div>
                 <Link to="/tech" className="text-slate-500 hover:text-neon-gold transition-all text-[12px] font-black uppercase tracking-[0.8em] flex items-center justify-center gap-10 group mt-8">
                   View the SYNK Product Suite <ArrowRight size={22} className="group-hover:translate-x-4 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
