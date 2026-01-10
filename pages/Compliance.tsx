
import React, { useEffect, useState } from 'react';
import { 
  Shield, Gavel, AlertOctagon, EyeOff, CheckCircle2, Zap, ArrowLeft, Mic, Volume2, Activity, Settings, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

const Compliance: React.FC = () => {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('rcg_hardware_prefs');
    return saved ? JSON.parse(saved) : { mic: true, speaker: true, haptics: true };
  });

  const handleToggle = (key: keyof typeof prefs) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    localStorage.setItem('rcg_hardware_prefs', JSON.stringify(newPrefs));
  };

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 animate-hero-reveal flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-neon-gold transition-colors mb-12 group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Mainframe
          </Link>
          <div className="circuit-capsule mb-10 border border-neon-gold/30 bg-black/40 text-neon-gold px-10 py-3 shadow-3xl inline-flex items-center gap-4">
            <Shield size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Sovereign_Compliance_Node</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
            Legal & <br/> <span className="text-chiseled-gold">Governance.</span>
          </h1>
          <div className="text-center px-4 max-w-5xl">
            <p className="text-xl sm:text-2xl text-slate-400 font-black uppercase tracking-[0.5em] italic">
              <DecodingText text="Authoritative documentation for the Royal Care Group grid." stagger={15} />
            </p>
          </div>
        </div>

        <div className="mb-24 space-y-12">
           <div className="flex flex-col items-center text-center gap-6">
              <div className="flex items-center gap-4 text-neon-gold">
                 <Settings size={20} className="animate-spin-slow opacity-60" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.6em] font-mono">Protocol 1: Hardware Calibration</h3>
              </div>
              <p className="text-lg sm:text-xl text-slate-400 font-bold italic max-w-4xl mx-auto leading-relaxed text-center opacity-80">
                Access to microphone, speakers and other functions via your personal system are ACTIVE when <span className="text-neon-gold underline decoration-neon-gold/40 underline-offset-4">Gold</span>.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 'mic', label: 'Microphone Node', icon: <Mic size={28} />, active: prefs.mic, desc: 'Voice Synth Interface.' },
                { id: 'speaker', label: 'Speaker Node', icon: <Volume2 size={28} />, active: prefs.speaker, desc: 'Neural audio briefings.' },
                { id: 'haptics', label: 'Neural Haptics', icon: <Activity size={28} />, active: prefs.haptics, desc: 'Visual resonance feedback.' }
              ].map((node) => (
                <button 
                 key={node.id}
                 onClick={() => handleToggle(node.id as any)}
                 className={`p-12 rounded-[3rem] transition-all duration-700 flex flex-col items-center gap-8 group/toggle relative overflow-hidden bg-black/60 shadow-2xl ${
                   node.active 
                      ? 'border-2 border-neon-gold shadow-[0_0_50px_rgba(229,199,139,0.1)]' 
                      : 'border-2 border-white/5 opacity-50 shadow-none grayscale'
                 } active:scale-95`}
                >
                   <div className={`p-8 rounded-2xl transition-all duration-700 flex items-center justify-center ${
                     node.active 
                       ? 'text-neon-gold bg-neon-gold/10 shadow-[0_0_30px_rgba(229,199,139,0.2)]' 
                       : 'bg-black border border-white/10 text-slate-700'
                   }`}>
                     {node.icon}
                   </div>
                   <div className="text-center space-y-4">
                     <div className="text-[12px] font-black text-white uppercase tracking-[0.3em]">{node.label}</div>
                     <div className={`text-[9px] font-mono font-black uppercase transition-colors ${node.active ? 'text-neon-gold' : 'text-slate-700'}`}>
                       {node.active ? 'Node: Operational' : 'Node: Offline'}
                     </div>
                   </div>
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-8">
          <div className="orbital-tile p-12 bg-black/60 border border-white/10 shadow-3xl group">
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
              <div className="p-5 bg-royal-950 rounded-2xl border border-white/10 text-slate-400 group-hover:text-neon-gold transition-colors shadow-inner">
                <AlertOctagon size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">Environmental Liability</h2>
                <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em] mt-2">SYNK_HW_PROT_01</p>
              </div>
            </div>
            <div className="space-y-6 text-slate-400 text-lg font-bold italic leading-relaxed">
              <p>
                {COMPANY_DETAILS.legalName} ("RCG") provides a high-fidelity structural intelligence grid. By accessing this grid, the user acknowledges and agrees that RCG assumes no responsibility or liability for any performance degradation to user-end hardware or software environments.
              </p>
            </div>
          </div>

          <div className="orbital-tile p-12 bg-black/60 border border-neon-gold/20 shadow-3xl group">
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
              <div className="p-5 bg-royal-950 rounded-2xl border border-neon-gold/30 text-neon-gold shadow-3xl group-hover:scale-110 transition-transform">
                <EyeOff size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">Confidential Inquiry Node</h2>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.5em] mt-2 font-black">SYNK_PRIV_HANDSHAKE</p>
              </div>
            </div>
            <div className="space-y-6 text-slate-400 text-lg font-bold italic leading-relaxed">
              <p>
                Communication integrity is paramount. We maintain a <span className="text-neon-gold underline decoration-neon-gold/20 underline-offset-4">zero-disclosure policy</span>: your organizational data and strategic queries are encrypted and never shared with unauthorized third-party nodes beyond the AU East Cloud boundary.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 p-16 bg-black/80 border-2 border-neon-gold/20 rounded-[4rem] text-center shadow-[0_80px_160px_rgba(0,0,0,1)]">
           <CheckCircle2 className="text-neon-gold/30 mx-auto mb-10" size={64} />
           <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-6 leading-none">Regulatory Parity.</h3>
           <p className="text-xl text-slate-500 font-bold italic mb-16 max-w-4xl mx-auto leading-relaxed">
             For specific legal inquiries or requests regarding organizational data sovereignty, please contact our Compliance Architect.
           </p>
           <Link to="/contact" className="px-12 py-6 bg-black border-2 border-neon-gold text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-xl hover:scale-[1.03] active:bg-neon-gold active:text-black transition-all shadow-3xl inline-flex items-center gap-6 group">
             <Zap size={20} className="text-neon-gold group-active:text-black" />
             <span>Contact Legal Node</span>
             <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-[10px] font-mono text-slate-800 uppercase tracking-[1em] font-black">
            RCG_LEGAL_DOSSIER // v{COMPANY_DETAILS.appVersion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
