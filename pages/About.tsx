import React from 'react';
import { 
  ShieldCheck, ArrowLeft, Users, Cpu, Heart, Workflow, Zap, ArrowRight, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const About: React.FC = () => {
  const coreValues = [
    { 
      label: "Our Origin", 
      title: "Front-Line Experience", 
      desc: "We delivered the care before we built the systems. Our expertise was forged in SIL houses, not boardrooms.",
      id: "ORG_01"
    },
    { 
      label: "Our Approach", 
      title: "The Provider Bridge", 
      desc: "We build the tools we wish we had when scaling our own services. Translating NDIS policy into practical technology.",
      id: "STR_04"
    },
    { 
      label: "Our Reach", 
      title: "National Compliance", 
      desc: "Keeping national providers ahead of the NDIS Commission's evolving requirements with proactive oversight.",
      id: "NAT_09"
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-20 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-600 hover:text-neon-gold transition-colors mb-12 group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Home
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-8">
              <div className="circuit-capsule border border-neon-gold/30 bg-white dark:bg-black/40 backdrop-blur-md text-slate-600 dark:text-neon-gold px-10 py-3 shadow-3xl inline-flex items-center gap-4">
                <Users size={18} className="animate-pulse" /> 
                <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">About Us</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.85] animate-liquid-shimmer">
                <span className="text-chiseled-silver block mb-4 text-stroked-black">The RCG</span> 
                <span className="text-chiseled-gold text-stroked-black">Story.</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-stretch">
          <div className="lg:col-span-7">
            <div className="orbital-tile p-12 lg:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Heart size={400} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="border-l-4 border-neon-gold pl-12 space-y-8">
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-none">Experience-Led <br/>Innovation.</h3>
                  <p className="text-xl sm:text-2xl text-slate-300 font-bold leading-relaxed italic opacity-90">
                    "Most NDIS software was built by engineers who never ran a support shift. We fixed that."
                  </p>
                </div>
                
                <div className="space-y-8 text-lg font-bold text-slate-400 leading-relaxed italic">
                  <p>
                    Composed of former NDIA staffers, SIL owners, and clinical experts, our team has lived the manual red tape. We transitioned into building smart systems to eliminate administrative burden.
                  </p>
                  <p>
                    Today, we build specialised AI tools that work <span className="text-white">alongside</span> your people—cutting complex research and keeping every outcome human-verified.
                  </p>
                </div>

                <div className="pt-12 border-t border-white/5 flex items-center gap-8">
                   <div className="orbital-tile !rounded-2xl p-6 bg-royal-950 shadow-inner border-neon-gold/20">
                      <Workflow size={28} className="text-neon-gold" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.6em] font-mono">Our Mission</div>
                      <div className="text-white text-sm font-black uppercase tracking-[0.2em] mt-2">Built by Providers, for Providers.</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {coreValues.map((item, i) => (
              <div key={i} className="orbital-tile p-10 group transition-all shadow-xl flex flex-col justify-center flex-1">
                 <div className="flex items-center justify-between mb-6">
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black">RCG_{item.id}</div>
                    <Cpu size={20} className="text-neon-gold opacity-30 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4 group-hover:text-chiseled-gold transition-colors">{item.title}</h4>
                 <p className="text-sm text-slate-400 font-bold italic leading-relaxed">
                    "{item.desc}"
                 </p>
              </div>
            ))}
          </div>
        </div>

        <div className="orbital-tile !rounded-[4rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,1)] text-center">
          <div className="relative z-10 flex flex-col items-center space-y-12">
             <div className="circuit-capsule border border-neon-gold/30 text-neon-gold bg-black px-12 py-4 shadow-3xl">
               <Terminal size={22} className="mr-4 animate-pulse" /> Ready to Connect
             </div>
             <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter">
              Stop Surviving. <br/><span className="text-chiseled-gold">Start Scaling.</span>
             </h2>
             
             <div className="flex flex-wrap justify-center gap-10 pt-10">
                <Link 
                  to="/contact" 
                  className="px-12 py-6 bg-black border-2 border-neon-gold text-white font-black text-[11px] tracking-[0.5em] uppercase transition-all shadow-3xl hover:scale-[1.03] active:bg-neon-gold active:text-black flex items-center gap-6 group rounded-xl"
                >
                  <Zap size={20} className="text-neon-gold group-active:text-black" />
                  <span>Get in Touch</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[1.2em] font-black">
            Royal_Care_Group // v{COMPANY_DETAILS.appVersion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
