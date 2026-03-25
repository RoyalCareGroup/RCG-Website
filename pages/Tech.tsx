
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Zap, Network, ShieldCheck, Activity, 
  Database, Terminal, Shield, Workflow, Wrench, 
  ArrowRight, Gauge, Command, Layers,
  Boxes, Code2, Globe, CheckCircle2,
  AlertCircle, Layout, Plus, Minus, Microscope,
  // Fix: Removed non-existent 'Pulse' member from lucide-react imports
  ChevronDown, Binary, Lock, Share2
} from 'lucide-react';
import { TechDemo } from '../components/TechDemo.tsx';
import { SynkCrmLogo } from '../components/logos/SynkCrmLogo.tsx';
import { ClaimSynkLogo } from '../components/logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from '../components/logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from '../components/logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from '../components/logos/ChargeSynkLogo.tsx';
import { DecodingText } from '../components/DecodingText.tsx';
import { COMPANY_DETAILS } from '../config.ts';

// --- SUB-COMPONENT: HERO PRODUCT SECTION ---
const ProductHeroSection: React.FC<{
  tool: any;
  index: number;
}> = ({ tool, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative py-32 overflow-hidden border-b border-white/5"
    >
      {/* Background Blueprint Traces */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
         <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id={`trace-grad-${tool.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#E5C78B" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path 
              d={isEven ? "M 0 100 L 400 100 L 600 400" : "M 100% 100 L 100%-400 100 L 100%-600 400"} 
              fill="none" 
              stroke={`url(#trace-grad-${tool.id})`} 
              strokeWidth="1" 
              strokeDasharray="1000"
              strokeDashoffset={isVisible ? "0" : "1000"}
              style={{ transition: 'stroke-dashoffset 3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Content Side */}
        <div className={`lg:col-span-5 space-y-12 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : (isEven ? '-translate-x-20' : 'translate-x-20') + ' opacity-0'}`}>
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 rounded-full border border-neon-gold/30 bg-black text-neon-gold text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] animate-pulse" />
                    MODULE_{tool.id.toUpperCase()}_STABLE
                 </div>
                 <div className="h-[1px] w-12 bg-white/10" />
                 <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">{tool.version}</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none overflow-hidden">
                 <span className={`block transition-transform duration-1000 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                   {tool.name.split('SYNK')[0]}<span className="text-chiseled-gold">SYNK</span>
                 </span>
              </h2>
              <p className="text-2xl text-slate-400 font-bold leading-relaxed italic border-l-4 border-neon-gold pl-10 opacity-90">
                 "{tool.desc}"
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tool.capabilities.map((cap: string, i: number) => (
                <div key={i} className="orbital-tile p-6 flex flex-col gap-4 group/cap bg-black shadow-inner border border-white/5 hover:border-neon-gold/40 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#06b6d4] shadow-[0_0_5px_#06b6d4]" />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">{cap}</span>
                   </div>
                   <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic opacity-0 group-hover/cap:opacity-100 transition-opacity duration-500">
                      Included in this product.
                   </p>
                </div>
              ))}
           </div>
           
           <div className="pt-6">
              <button className="px-10 py-5 bg-white text-black rounded-xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-[#06b6d4] hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-95 flex items-center gap-5 group">
                 <span>Learn More</span>
                 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
        </div>

        {/* Hero Visual Side (The Hardware Chassis) */}
        <div className={`lg:col-span-7 relative flex items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
           
           {/* Ambient Glow Orbs */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-gold/5 rounded-full blur-[120px] animate-pulse opacity-40" />
           
           {/* The Main Chassis */}
           <div className="relative z-10 w-full max-w-[550px] aspect-square bg-[#0a0a12] border-2 border-white/10 rounded-[4rem] shadow-[0_60px_120px_rgba(0,0,0,0.9)] flex items-center justify-center group/chassis overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-gold/10 via-transparent to-transparent opacity-0 group-hover/chassis:opacity-100 transition-opacity duration-1000" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] animate-scan-line opacity-20" />

              {/* Product Logo - Scaled Up */}
              <div className="scale-[1.8] md:scale-[2.4] transition-transform duration-1000 group-hover/chassis:scale-[1.9] md:group-hover/chassis:scale-[2.5] grayscale opacity-80 group-hover/chassis:grayscale-0 group-hover/chassis:opacity-100">
                 {tool.logo}
              </div>

              {/* Electric Cyan Status Indicators */}
              <div className="absolute top-6 right-12 flex gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] animate-pulse" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] animate-pulse [animation-delay:200ms]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] animate-pulse [animation-delay:400ms]" />
              </div>

              {/* Orbital Data Tags (Hardware Specs) */}
              <div className={`absolute top-12 left-12 flex flex-col gap-2 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                 <span className="text-[8px] font-mono text-neon-gold font-black tracking-[0.4em] uppercase">AES-256_ENCRYPTED</span>
                 <div className="h-[1px] w-24 bg-neon-gold/30" />
              </div>

              <div className={`absolute bottom-12 right-12 flex flex-col items-end gap-2 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                 <span className="text-[8px] font-mono text-slate-500 font-black tracking-[0.4em] uppercase">AU_CLOUD_HOSTED</span>
                 <span className="text-[10px] font-mono text-[#06b6d4] font-black tracking-widest uppercase">STABLE_V{tool.version}</span>
              </div>
              
              {/* Floating Blueprint Connectors */}
              <div className="absolute inset-12 pointer-events-none opacity-40 group-hover/chassis:opacity-100 transition-opacity">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20" />
                 <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20" />
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20" />
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20" />
              </div>
           </div>

           {/* Floating Accessory Components (Hardware Metaphor) */}
           <div className={`absolute -top-10 -right-10 w-40 h-40 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-3xl p-6 flex flex-col justify-between transition-all duration-1000 delay-[1200ms] ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-20 -translate-y-10 opacity-0'}`}>
              <div className="flex justify-between items-start">
                 <Binary size={20} className="text-[#06b6d4]" />
                 <span className="text-[8px] font-black text-slate-600 uppercase">PERFORMANCE</span>
              </div>
              <div className="space-y-2">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#06b6d4] w-[80%] animate-pulse" />
                 </div>
                 <span className="text-[9px] font-mono text-white/40 block uppercase">SYNK_ACTIVE</span>
              </div>
           </div>

           <div className={`absolute -bottom-10 -left-10 w-48 h-32 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-3xl p-6 flex items-center gap-5 transition-all duration-1000 delay-[1400ms] ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-20 translate-y-10 opacity-0'}`}>
              <div className="p-3 bg-[#06b6d4]/10 rounded-xl border border-[#06b6d4]/20">
                 <Lock size={20} className="text-[#06b6d4]" />
              </div>
              <div>
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Security</span>
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Encrypted</span>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

const Tech: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    { 
      id: 'crm', 
      name: 'SynkCRM', 
      version: 'v1.2',
      status: 'STABLE', 
      logo: <SynkCrmLogo width={110} height={24} />, 
      desc: 'Smart client management. Track relationships, automate follow-ups, and scale your business with confidence.',
      capabilities: ['Client Management', 'Plan Tracking', 'Integrations', 'Churn Prevention']
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={28} isStable={true} />, 
      desc: 'Invoicing & claims made simple. Real-time validation, batch processing, and automatic error detection.',
      capabilities: ['Real-time Checks', 'Error Detection', 'Batch Processing', 'Compliance']
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={28} isStable={true} />, 
      desc: 'Turn voice notes into professional reports in seconds. AI-powered documentation that saves hours.',
      capabilities: ['Voice to Text', 'Smart Templates', 'Instant Reports', 'AI Assistance']
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={28} isStable={false} />, 
      desc: 'Smart intake forms. Auto-populate, digital signatures, and risk flagging built in.',
      capabilities: ['Risk Flagging', 'Auto-Fill', 'Secure Storage', 'Smart Logic']
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen font-sans font-bold relative">
      
      {/* Page Header (Intro) */}
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-12 w-full px-6">
        <div className="flex flex-col items-center text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule mb-10 px-8 py-3 bg-black border-2 border-neon-gold/30 shadow-3xl text-neon-gold inline-flex items-center gap-4">
             <Boxes size={18} className="animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em]">Tech Division // Suite v10.13</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.8] animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">Our</span> 
            <span className="text-chiseled-gold text-stroked-black">Products.</span>
          </h1>
          <div className="max-w-3xl mx-auto px-4 space-y-12">
            <p className="text-slate-400 text-xl md:text-2xl font-bold leading-relaxed italic opacity-90 tracking-tight text-center uppercase">
               <DecodingText 
                text="Simple, powerful tools that handle the busy work — so you can focus on what matters."
                stagger={5}
               />
            </p>
            <div className="flex justify-center">
               <div className="h-24 w-[1px] bg-gradient-to-b from-neon-gold/50 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Hero Sequence */}
      <div className="relative z-10">
         {tools.map((tool, index) => (
           <ProductHeroSection key={tool.id} tool={tool} index={index} />
         ))}
      </div>

      {/* Final Diagnostic Section */}
      <div className="py-40 relative z-10 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-6">
               <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">See It In Action.</h2>
               <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[11px]">Smart Tools Working in Real-time</p>
            </div>
            
            <div className="p-1 bg-gradient-to-br from-neon-gold/10 to-transparent rounded-[3rem] shadow-3xl max-w-6xl mx-auto border border-white/5 overflow-hidden">
               <div className="orbital-tile !rounded-[2.9rem] p-8 lg:p-16 bg-black/80 backdrop-blur-3xl">
                  <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                     <div className="flex items-center gap-5">
                        <div className="p-4 bg-royal-950 rounded-2xl border border-neon-gold/20 shadow-2xl">
                           <Activity size={24} className="text-neon-gold" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Live Product Demo</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">DEMO_ACTIVE</span>
                     </div>
                  </div>
                  <TechDemo />
               </div>
            </div>

            <div className="mt-40 text-center">
               <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[1em] font-black">
                  RCG_TECH_MANIFESTO // v{COMPANY_DETAILS.appVersion}
               </p>
            </div>
         </div>
      </div>

      <div className="h-32 w-full"></div>
    </div>
  );
};

export default Tech;
