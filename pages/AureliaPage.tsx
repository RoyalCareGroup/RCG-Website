
import React from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { ArrowLeft, Radio, Mic, MicOff, Loader2, Send, Activity, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AetherOrb } from '../components/AetherOrb.tsx';

const AureliaPage: React.FC = () => {
  const { 
    aureliaActive, aureliaConnecting, aureliaSpeaking, 
    aureliaListening, aureliaStatus, aureliaTranscript,
    startAurelia, stopAurelia
  } = useSovereign();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neon-green transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Mainframe
          </Link>
          <div className="flex items-center gap-4 px-4 py-2 bg-royal-950/40 border border-white/5 rounded-full">
             <div className={`w-1.5 h-1.5 rounded-full ${aureliaActive ? 'bg-neon-green animate-pulse' : 'bg-slate-700'}`}></div>
             <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{aureliaStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
           <div className="lg:col-span-5 flex flex-col items-center text-center space-y-12">
              <div className="space-y-6">
                <div className="circuit-capsule px-6 py-2 border-neon-green/30 bg-black text-neon-green text-[9px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-3">
                  <Radio size={14} className={aureliaActive ? 'animate-pulse' : ''} /> Strategic Peer Interface
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">Presence.</h1>
                <p className="text-slate-400 text-sm font-bold italic max-w-sm mx-auto">
                  Aurelia is your active strategic advisor. She listens to your organizational pain and maps technical solutions in real-time.
                </p>
              </div>

              <AetherOrb 
                isActive={aureliaActive} 
                isConnecting={aureliaConnecting} 
                isSpeaking={aureliaSpeaking} 
                isListening={aureliaListening} 
              />

              <button
                onClick={aureliaActive ? stopAurelia : startAurelia}
                disabled={aureliaConnecting}
                className={`w-full max-w-xs py-8 rounded-[2rem] font-black text-[12px] tracking-[0.4em] uppercase transition-all duration-500 shadow-3xl active:scale-95 flex items-center justify-center gap-6 ${
                  aureliaActive 
                    ? 'bg-royal-950 border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white' 
                    : 'bg-white text-black border-2 border-white hover:bg-neon-green hover:border-neon-green hover:text-white'
                }`}
              >
                {aureliaConnecting ? <Loader2 className="animate-spin" size={20} /> : aureliaActive ? <MicOff size={20} /> : <Mic size={20} />}
                {aureliaConnecting ? 'Opening Link...' : aureliaActive ? 'Terminate Link' : 'Establish Presence'}
              </button>
           </div>

           <div className="lg:col-span-7 h-[650px] flex flex-col">
              <div className="flex-grow bg-black/60 backdrop-blur-3xl border-2 border-white/10 rounded-[3rem] p-10 overflow-hidden flex flex-col shadow-inner relative">
                 <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                    <Terminal size={16} className="text-slate-700" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Live_Dialogue_Stream</span>
                 </div>
                 
                 <div className="flex-grow overflow-y-auto space-y-10 scrollbar-hide pr-4">
                    {aureliaTranscript.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-10 space-y-8 grayscale">
                         <Activity size={64} className="animate-pulse" />
                         <p className="text-xl font-black uppercase tracking-[0.5em]">Establishing Neural Resonance...</p>
                      </div>
                    ) : (
                      aureliaTranscript.map((line, i) => (
                        <div key={i} className={`flex flex-col gap-3 animate-in slide-in-from-bottom-2 ${line.role === 'user' ? 'items-end' : 'items-start'}`}>
                           <div className={`text-[9px] font-black uppercase tracking-widest ${line.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'}`}>
                              {line.role === 'user' ? 'Operator' : 'Aurelia'}
                           </div>
                           <div className={`max-w-[85%] px-8 py-6 rounded-3xl text-base font-bold border ${
                             line.role === 'user' ? 'bg-neon-blue/5 border-neon-blue/20 text-white italic' : 'bg-white/5 border-white/5 text-slate-300'
                           }`}>
                             {line.text}
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AureliaPage;
