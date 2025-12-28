import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Cpu, Rocket, Palette, Layout, Mic, Video, 
  Terminal, Activity, Globe, Zap, Settings, 
  ChevronRight, Layers, Command, ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const CommandCenter: React.FC = () => {
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
    <div className="min-h-screen bg-[#01040f] pt-40 pb-32 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.1)_0%,transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-[0.4em] mb-6 uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <ShieldCheck size={14} className="mr-3 animate-pulse" /> Grid Operational: v{COMPANY_DETAILS.appVersion}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Sovereign<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-emerald-400 to-neon-purple drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Interface.</span>
            </h1>
            <p className="text-xl text-slate-400 font-light border-l-4 border-emerald-500 pl-8 max-w-2xl">
              Welcome back, Architect. The recovery protocol is complete. All national nodes are now operating at high-fidelity integrity.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="glass p-6 rounded-3xl border border-royal-800 bg-royal-900/40 text-center min-w-[160px] shadow-3xl">
                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Sync Status</div>
                <div className="text-2xl font-mono text-emerald-400 font-bold animate-pulse">LOCKED</div>
             </div>
             <div className="glass p-6 rounded-3xl border border-royal-800 bg-royal-900/40 text-center min-w-[160px] shadow-3xl">
                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Auth Logic</div>
                <div className="text-2xl font-mono text-white font-bold">LEVEL_4</div>
             </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((m) => (
            <Link 
              key={m.id} 
              to={m.path} 
              className={`orbital-tile group p-10 bg-royal-950/40 border ${m.color} flex flex-col h-full hover:border-white/20 transition-all duration-500 shadow-2xl`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-royal-900/80 rounded-2xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <span className={`text-[9px] font-mono tracking-[0.3em] font-black border px-3 py-1 rounded-md ${m.status === 'STABLE' ? 'text-emerald-400 border-emerald-500/20' : 'text-slate-500 border-white/5'}`}>
                   STATUS: {m.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                {m.title} <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-neon-blue" />
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-10 flex-grow">
                {m.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-10 transition-opacity">
                <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                  RC_NOMINAL_SYNC
                </div>
                <ExternalLink size={14} className="text-slate-700" />
              </div>
            </Link>
          ))}
        </div>

        {/* Command Center Footer Info */}
        <div className="mt-32 p-12 glass rounded-[3rem] border border-royal-800 bg-royal-950/40 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left shadow-3xl">
           <div className="flex items-center gap-8">
              <div className="p-6 bg-royal-900 rounded-full border border-white/5 shadow-2xl relative">
                 <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
                 <Activity size={40} className="text-emerald-400 relative z-10" />
              </div>
              <div>
                 <h4 className="text-xl font-display font-black text-white uppercase tracking-widest">Structural Pulse</h4>
                 <p className="text-slate-500 text-sm font-light mt-1 uppercase tracking-widest font-mono italic">Site active at https://royalcaregroup.com.au</p>
              </div>
           </div>
           <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Security', val: 'AES-256' },
                { label: 'Core', val: 'STABILIZED' },
                { label: 'Node', val: 'AU_EAST' }
              ].map((stat, i) => (
                <div key={i} className="px-6 py-3 bg-royal-950/80 border border-white/5 rounded-2xl text-[10px] font-mono font-bold shadow-inner">
                   <span className="text-slate-600 mr-3 uppercase">{stat.label}:</span>
                   <span className="text-emerald-400">{stat.val}</span>
                </div>
              ))}
           </div>
        </div>
        
        <div className="mt-20 text-center opacity-20 hover:opacity-50 transition-opacity cursor-default">
           <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[1em]">Royal Care Group Administrative Mainframe // NOMINAL_STATE</p>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;