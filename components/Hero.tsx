import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Activity, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[140px] animate-pulse"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <div className="animate-fade-in">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-[10px] font-black tracking-[0.5em] mb-12 uppercase">
             <Sparkles size={16} className="mr-3" /> Australia Wide Deployments
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-12">
            Structural<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Intelligence.</span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-xl mb-16 border-l-4 border-royal-800 pl-10 font-light leading-relaxed">
            Architecting the future of NDIS. We re-engineer provider logic with proprietary binary systems and elite consultancy.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <Link to="/services" className="px-14 py-7 bg-white text-black font-black text-xs tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all text-center">
              Consultancy Node
            </Link>
            <Link to="/tech" className="px-14 py-7 border-2 border-royal-800 text-white font-black text-xs tracking-[0.4em] uppercase rounded-2xl hover:border-neon-purple transition-all text-center">
              SYNK Tech Suite
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-black text-white mb-1">500+</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Deployments</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">99%</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Audit Success</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">24ms</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Core Latency</div>
            </div>
          </div>
        </div>

        <div className="relative group lg:block hidden">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
           <div className="relative bg-royal-950 border border-royal-800 p-12 rounded-[3rem] animate-float">
             <div className="flex justify-between items-start mb-12">
               <Terminal size={40} className="text-neon-blue" />
               <div className="text-right">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">System Integrity</div>
                 <div className="text-neon-blue font-mono font-bold">SYNK_CORE_{COMPANY_DETAILS.appVersion}: OPTIMAL</div>
               </div>
             </div>
             
             <div className="space-y-8">
               <div className="p-6 bg-royal-900/50 border border-royal-800 rounded-2xl">
                 <div className="flex items-center gap-4 mb-3">
                   <ShieldCheck className="text-green-500" size={24} />
                   <span className="text-sm font-black uppercase tracking-widest">Compliance Engine Active</span>
                 </div>
                 <div className="w-full bg-royal-950 h-2 rounded-full overflow-hidden">
                   <div className="bg-green-500 h-full w-[98%] animate-pulse"></div>
                 </div>
               </div>
               
               <div className="p-6 bg-royal-900/50 border border-royal-800 rounded-2xl">
                 <div className="flex items-center gap-4 mb-3">
                   <Cpu className="text-neon-purple" size={24} />
                   <span className="text-sm font-black uppercase tracking-widest">Neural Link Synchronized</span>
                 </div>
                 <div className="w-full bg-royal-950 h-2 rounded-full overflow-hidden">
                   <div className="bg-neon-purple h-full w-[100%]"></div>
                 </div>
               </div>
             </div>

             <div className="mt-12 flex justify-center">
               <div className="w-32 h-32 rounded-full border-4 border-dashed border-royal-700 animate-spin-slow flex items-center justify-center">
                 <Activity size={40} className="text-neon-blue" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;