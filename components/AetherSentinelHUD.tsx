import React, { useState, useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { AetherOrb } from './AetherOrb.tsx';
import { 
  Terminal, X, Maximize2, Minimize2, 
  Mic, MicOff, Loader2, Radio, Send, Mail, ChevronUp 
} from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

export const AetherSentinelHUD: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState('');
  const { 
    aureliaActive, aureliaConnecting, aureliaSpeaking, 
    aureliaListening, aureliaStatus, aureliaTranscript,
    startAurelia, stopAurelia, clearAureliaTranscript
  } = useSovereign();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [aureliaTranscript, isExpanded]);

  const handleToggle = () => {
    if (!aureliaActive && !aureliaConnecting) {
      startAurelia();
    }
    setIsExpanded(!isExpanded);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    const opName = localStorage.getItem('rcg_visitor_name') || 'Operator';
    const body = `ROYAL CARE GROUP - NEURAL STRATEGY BRIEF\n` +
      `PROVIDER OPERATOR: ${opName}\n` +
      `TRANSCRIPT:\n` +
      aureliaTranscript.map(l => `[${l.role.toUpperCase()}]: ${l.text}`).join('\n\n');

    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=Urgent Strategy Node: ${opName}&body=${encodeURIComponent(body)}`;
    setShowEmailDialog(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[2000] flex flex-col items-end pointer-events-none">
      
      {/* Expanded Terminal View - Responsive sizing */}
      {isExpanded && (
        <div className="w-[88vw] sm:w-[400px] h-[65vh] sm:h-[500px] bg-black/90 backdrop-blur-3xl border-2 border-white/10 rounded-[2rem] sm:rounded-[2.5rem] mb-4 sm:mb-6 flex flex-col overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
           <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between bg-royal-950/40">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></div>
                 <span className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest">Aurelia_Strategic_v4</span>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => setIsExpanded(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                    <Minimize2 size={16} />
                 </button>
              </div>
           </div>

           <div className="flex-grow overflow-hidden flex flex-col relative">
              {showEmailDialog ? (
                 <div className="p-6 sm:p-10 flex flex-col items-center justify-center h-full text-center space-y-6 sm:space-y-8 animate-fade-in">
                    <Mail className="text-neon-blue" size={32} />
                    <h4 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">Transmit Strategy</h4>
                    <form onSubmit={handleTransmit} className="w-full space-y-4 sm:space-y-6">
                       <input 
                         required type="email" placeholder="YOUR_EMAIL..." 
                         className="w-full bg-royal-950 border border-white/10 rounded-xl p-4 text-white text-center font-mono text-[10px] sm:text-xs outline-none focus:border-neon-blue"
                         value={email} onChange={e => setEmail(e.target.value)}
                       />
                       <div className="flex gap-3">
                          <button type="button" onClick={() => setShowEmailDialog(false)} className="flex-1 py-3 text-[9px] font-black uppercase text-slate-500">Cancel</button>
                          <button type="submit" className="flex-1 py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all">Transmit</button>
                       </div>
                    </form>
                 </div>
              ) : (
                <>
                  <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 sm:p-8 space-y-6 scrollbar-hide">
                    {aureliaTranscript.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-6">
                        <Radio size={40} className="text-white animate-pulse" />
                        <p className="text-[9px] font-black uppercase tracking-[0.5em]">Awaiting Uplink...</p>
                      </div>
                    ) : (
                      aureliaTranscript.map((line, i) => (
                        <div key={i} className={`flex flex-col gap-2 ${line.role === 'user' ? 'items-end' : 'items-start'}`}>
                           <span className={`text-[7px] font-black uppercase tracking-widest ${line.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'}`}>
                              {line.role === 'user' ? 'Operator' : 'Aurelia'}
                           </span>
                           <div className={`px-4 py-3 rounded-2xl text-[12px] sm:text-[13px] border ${
                             line.role === 'user' ? 'bg-neon-blue/5 border-neon-blue/20 text-white italic' : 'bg-white/5 border-white/5 text-slate-300'
                           }`}>
                             {line.text}
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                  {aureliaTranscript.length > 2 && (
                    <div className="p-4 sm:p-6 border-t border-white/5 bg-black/40">
                       <button 
                         onClick={() => setShowEmailDialog(true)}
                         className="w-full py-4 bg-neon-blue/10 border border-neon-blue/20 text-neon-blue rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all"
                       >
                         Request Strategy Sync
                       </button>
                    </div>
                  )}
                </>
              )}
           </div>
        </div>
      )}

      {/* Main Orb Sentinel Control */}
      <div className="flex items-center gap-4 pointer-events-auto">
         {aureliaActive && !isExpanded && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-4 animate-in slide-in-from-right-10 duration-500 shadow-2xl">
               <div className="flex gap-1.5">
                  <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${aureliaSpeaking ? 'bg-neon-purple animate-bounce' : 'bg-slate-700'}`}></div>
                  <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${aureliaSpeaking ? 'bg-neon-purple animate-bounce delay-75' : 'bg-slate-700'}`}></div>
                  <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${aureliaSpeaking ? 'bg-neon-purple animate-bounce delay-150' : 'bg-slate-700'}`}></div>
               </div>
               <span className="text-[8px] sm:text-[9px] font-black text-white uppercase tracking-widest">Neural Presence</span>
            </div>
         )}

         <button 
            onClick={handleToggle}
            className="relative group p-1 transition-all duration-700 transform hover:scale-105 active:scale-95"
         >
            <div className="scale-[0.45] sm:scale-[0.6] origin-bottom-right">
               <AetherOrb 
                  isActive={aureliaActive} 
                  isConnecting={aureliaConnecting} 
                  isSpeaking={aureliaSpeaking} 
                  isListening={aureliaListening} 
               />
            </div>
            
            {!isExpanded && (
              <div className="absolute top-0 right-0 p-2 sm:p-3 bg-white text-black rounded-full shadow-2xl group-hover:bg-neon-blue group-hover:text-white transition-all border-2 border-black">
                 <ChevronUp size={16} className="sm:w-[20px] sm:h-[20px]" />
              </div>
            )}
            
            {isExpanded && (
              <div 
                onClick={(e) => { e.stopPropagation(); stopAurelia(); }}
                className="absolute top-0 right-0 p-2 sm:p-3 bg-red-500 text-white rounded-full shadow-2xl hover:bg-red-600 transition-all pointer-events-auto border-2 border-black"
              >
                 <X size={16} className="sm:w-[20px] sm:h-[20px]" />
              </div>
            )}
         </button>
      </div>
    </div>
  );
};