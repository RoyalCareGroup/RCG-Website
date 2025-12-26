import React, { useState } from 'react';
import { Terminal, Search, ShieldCheck, AlertTriangle, Loader2, Zap, Database, ChevronRight, FileCheck } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService.ts';

export const TechDemo: React.FC = () => {
  const [input, setInput] = useState('01_011_0107_1_1 - Saturday Support at $85/hr');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isValidating) return;

    setIsValidating(true);
    setResult(null);

    try {
      const prompt = `Perform a TFix Regulatory Deep-Scan on this NDIS Claim data: "${input}". 
      1. Verify if the code matches current 2024/25 NDIS Pricing arrangements.
      2. Check for "Revenue Leakage" (is the rate too low?).
      3. Identify "Compliance Slippage" (is the code description accurate?).
      
      Format the response as:
      STATUS: [PASSED/REVISION REQUIRED]
      LOGIC: [One sentence on why]
      RATE_ANALYSIS: [Current vs Target rate]
      REGULATORY_NODE: [Relevant Price Guide Section]`;

      const { text, sources } = await sendChatMessage(prompt, [], true);
      setResult({ text, sources });
    } catch (err) {
      setResult({ text: "CRITICAL: Logic Bridge Failure. Diagnostic terminated." });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      {/* Console Side */}
      <div className="glass bg-royal-950/80 border border-royal-800 rounded-[2.5rem] p-10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-royal-800">
           <div className="flex items-center gap-3">
              <Terminal size={18} className="text-neon-blue" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Validation Console</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">v5.4.2_STABLE</span>
           </div>
        </div>

        <form onSubmit={handleValidate} className="space-y-8 flex-grow flex flex-col">
          <div className="space-y-4">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Claim Metadata Input</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-royal-900 border border-royal-800 rounded-2xl p-6 text-slate-200 focus:border-neon-blue outline-none transition-all min-h-[120px] font-mono text-sm placeholder:text-slate-700 resize-none"
              placeholder="Input NDIS Code or description..."
            />
          </div>

          <div className="p-6 bg-royal-950 rounded-2xl border border-royal-800 space-y-4">
             <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                <span>Diagnostic Precision</span>
                <span className="text-neon-blue">High</span>
             </div>
             <div className="w-full h-1 bg-royal-900 rounded-full overflow-hidden">
                <div className="h-full bg-neon-blue w-[94%] shadow-[0_0_8px_#06b6d4]"></div>
             </div>
          </div>

          <button 
            type="submit"
            disabled={isValidating || !input.trim()}
            className="w-full py-5 bg-white text-black font-black text-[10px] tracking-[0.5em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 mt-auto"
          >
            {isValidating ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
            {isValidating ? 'Executing Deep-Scan...' : 'Initialize Logic Check'}
          </button>
        </form>
      </div>

      {/* Result Side */}
      <div className="orbital-tile border-transparent bg-royal-900/20 p-1 rounded-[2.5rem]">
        <div className="bg-royal-950/40 backdrop-blur-3xl rounded-[2.4rem] p-10 h-full flex flex-col border border-white/5">
          {!result && !isValidating ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 grayscale group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-500 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                <Search size={40} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] max-w-[200px]">Awaiting Diagnostic Payload</p>
            </div>
          ) : isValidating ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-pulse">
               <div className="relative">
                  <div className="w-20 h-20 border-2 border-neon-purple rounded-full animate-ping opacity-20"></div>
                  <Database size={40} className="text-neon-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
               </div>
               <div className="space-y-2">
                 <div className="text-white font-black text-[10px] uppercase tracking-widest">Grounding Engine Active</div>
                 <div className="text-slate-500 text-[8px] font-mono">CALIBRATING_NDIS_GND_v5...</div>
               </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between border-b border-royal-800 pb-6">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl ${result.text.includes('PASSED') ? 'bg-green-500/20 text-green-500 border-green-500/40' : 'bg-neon-purple/20 text-neon-purple border-neon-purple/40'} border`}>
                        {result.text.includes('PASSED') ? <FileCheck size={24} /> : <AlertTriangle size={24} />}
                     </div>
                     <div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Report</div>
                        <div className={`text-xl font-display font-black tracking-tight ${result.text.includes('PASSED') ? 'text-green-500' : 'text-neon-purple'}`}>
                           {result.text.split('LOGIC:')[0].replace('STATUS:', '').trim()}
                        </div>
                     </div>
                  </div>
                  <ShieldCheck size={20} className="text-neon-blue opacity-40" />
               </div>

               <div className="space-y-6">
                  <div className="p-6 bg-royal-900/50 rounded-2xl border border-royal-800">
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ChevronRight size={12} className="text-neon-blue" /> Structural Logic
                     </div>
                     <p className="text-slate-300 text-sm font-light leading-relaxed">
                        {result.text.split('LOGIC:')[1]?.split('RATE_ANALYSIS:')[0] || 'Analyzing...'}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-5 bg-royal-900/50 rounded-xl border border-royal-800">
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Rate Analysis</div>
                        <p className="text-white text-xs font-mono">{result.text.split('RATE_ANALYSIS:')[1]?.split('REGULATORY_NODE:')[0] || 'N/A'}</p>
                     </div>
                     <div className="p-5 bg-royal-900/50 rounded-xl border border-royal-800">
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Grounding Node</div>
                        <p className="text-white text-xs font-mono">{result.text.split('REGULATORY_NODE:')[1] || 'TFix Engine Default'}</p>
                     </div>
                  </div>
               </div>

               {result.sources && result.sources.length > 0 && (
                 <div className="pt-6 border-t border-royal-800">
                   <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-4">Grounded Regulatory Nodes</div>
                   <div className="space-y-2">
                     {result.sources.slice(0, 2).map((s: any, i: number) => s.web && (
                       <a key={i} href={s.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-royal-900/30 border border-royal-800 rounded-lg text-[9px] text-slate-500 hover:text-neon-blue transition-colors">
                          <span className="truncate max-w-[200px]">{s.web.title}</span>
                          <Search size={10} />
                       </a>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};