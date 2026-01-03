import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Cpu, Rocket, Palette, Layout, Mic, Video, 
  Terminal, Activity, Globe, Zap, Settings, 
  ChevronRight, Layers, Command, ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const CommandCenter: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    {
      id: 'deploy',
      title: 'Deployment Hub',
      icon: <Rocket size={32} className="text-emerald-400" />,
      desc: 'Monitor production grid state and manage domain synchronization.',
      path: '/deploy',
      status: 'STABLE',
      color: 'border-emerald-500/20'
    },
    {
      id: 'design',
      title: 'Design System',
      icon: <Palette size={32} className="text-neon-purple" />,
      desc: 'Identity blueprints, asset exports, and brand architecture.',
      path: '/design-system',
      status: 'STABLE',
      color: 'border-neon-purple/20'
    },
    {
      id: 'creative',
      title: 'Blueprint Studio',
      icon: <Layout size={32} className="text-neon-blue" />,
      desc: 'Generative visual synthesis for organizational concepts.',
      path: '/creative',
      status: 'READY',
      color: 'border-neon-blue/20'
    },
    {
      id: 'video',
      title: 'Kinetic Engine',
      icon: <Video size={32} className="text-pink-500" />,
      desc: 'AI Video manifestation for temporal brand assets.',
      path: '/video',
      status: 'IDLE',
      color: 'border-pink-500/20'
    },
    {
      id: 'audio',
      title: 'Voice Synth',
      icon: <Mic size={32} className="text-neon-blue" />,
      desc: 'Neural audio interface for real-time voice protocols.',
      path: '/audio',
      status: 'ACTIVE',
      color: 'border-neon-blue/20'
    },
    {
      id: 'weblab',
      title: 'Web Lab',
      icon: <Terminal size={32} className="text-white" />,
      desc: 'Structural web interface synthesis and prototyping.',
      path: '/weblab',
      status: 'BETA',
      color: 'border-white/10'
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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-40">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12 animate-hero-reveal">
          <div className="max-w-3xl">
            <div className="circuit-capsule border-2 border-emerald-500 text-emerald-500 mb-10 shadow-[0_0_30px_rgba(16,185,129,0.1)] bg-black px-10 py-4">
              <ShieldCheck size={16} className="mr-4 animate-pulse" /> Grid Operational: v{COMPANY_DETAILS.appVersion}
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.8] heading-wow">
              Sovereign<br/>
              <span className="heading-tech">Interface.</span>
            </h1>
            <p className="text-2xl text-white font-bold border-l-8 border-emerald-500 pl-12 italic opacity-90">
              "Welcome back, Architect. Recovery protocol complete. National nodes synchronized at high-fidelity integrity."
            </p>
          </div>

          <div className="flex gap-6">
             <div className="glass p-8 rounded-[2rem] border-2 border-white/10 bg-black text-center min-w-[200px] shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] mb-3">Sync Status</div>
                <div className="text-3xl font-mono text-emerald-400 font-black animate-pulse">LOCKED</div>
             </div>
             <div className="glass p-8 rounded-[2rem] border-2 border-white/10 bg-black text-center min-w-[200px] shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] mb-3">Auth Logic</div>
                <div className="text-3xl font-mono text-white font-black">LEVEL_4</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-hero-reveal">
          {modules.map((m) => (
            <Link 
              key={m.id} 
              to={m.path} 
              className={`orbital-tile group p-12 bg-black flex flex-col h-full hover:border-white transition-all duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.7)] border-2 border-white/10`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-5 bg-royal-950 rounded-[1.5rem] border-2 border-white/5 shadow-inner group-hover:scale-110 transition-transform group-hover:border-white/20">
                  {m.icon}
                </div>
                <span className={`text-[10px] font-mono tracking-[0.4em] font-black border-2 px-4 py-1.5 rounded-lg ${m.status === 'STABLE' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-slate-600 border-white/5'}`}>
                   {m.status}
                </span>
              </div>
              
              <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-4">
                {m.title} <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all text-neon-blue" />
              </h3>
              <p className="text-white text-base font-bold leading-relaxed mb-12 flex-grow italic opacity-60 group-hover:opacity-100 transition-opacity">
                "{m.desc}"
              </p>
              
              <div className="mt-auto pt-8 border-t-2 border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]"></div>
                  RC_NOMINAL_SYNC
                </div>
                <ExternalLink size={16} className="text-slate-800 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-40 p-16 md:p-24 banner-pop bg-black flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-2 border-white/10 rounded-[4rem]">
           <div className="flex items-center gap-10">
              <div className="p-8 bg-royal-950 rounded-full border-2 border-white/10 shadow-3xl relative">
                 <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full animate-pulse"></div>
                 <Activity size={48} className="text-emerald-400 relative z-10" />
              </div>
              <div>
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-[0.2em]">Structural Pulse</h4>
                 <p className="text-slate-600 text-[11px] font-black mt-3 uppercase tracking-[0.6em] font-mono italic">Site active at https://royalcaregroup.com.au</p>
              </div>
           </div>
           <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'Security', val: 'AES-256' },
                { label: 'Core', val: 'STABILIZED' },
                { label: 'Node', val: 'AU_EAST' }
              ].map((stat, i) => (
                <div key={i} className="px-8 py-5 bg-royal-950 border-2 border-white/5 rounded-2xl text-[11px] font-mono font-black shadow-inner">
                   <span className="text-slate-700 mr-4 uppercase tracking-widest">{stat.label}</span>
                   <span className="text-emerald-500">{stat.val}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;