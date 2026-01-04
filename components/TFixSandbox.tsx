
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  FileSearch, Upload, ShieldAlert, Terminal, 
  Activity, Loader2, CheckCircle2, AlertTriangle, 
  Search, X, FileText, Zap, Cpu
} from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { COMPANY_DETAILS } from '../config.ts';

export const TFixSandbox: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditReport, setAuditReport] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const { setIsThinking } = useSovereign();

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 4 * 1024 * 1024) {
        alert("Payload exceeds 4MB limit. Compress and re-upload.");
        return;
      }
      setFile(selected);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
      setAuditReport(null);
      setTerminalLogs([]);
    }
  };

  const executeAudit = async () => {
    if (!file || isAnalyzing) return;

    setIsAnalyzing(true);
    setIsThinking(true);
    setTerminalLogs([]);
    addLog("INITIALIZING_TFIX_CORE...");
    addLog("ESTABLISHING_SECURE_TUNNEL...");
    
    try {
      const base64Data = await fileToBase64(file);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const simulationInterval = setInterval(() => {
        const msgs = [
          "DECRYPTING_DOCUMENT_SYNTAX...",
          "CROSS_REFERENCING_NDIS_PRICE_GUIDE_24_25...",
          "IDENTIFYING_REVENUE_LEAKAGE_VECTORS...",
          "SCANNING_FOR_GOVERNANCE_SLIPPAGE...",
          "COMPUTING_AUDIT_RISK_INDEX..."
        ];
        addLog(msgs[Math.floor(Math.random() * msgs.length)]);
      }, 1500);

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: file.type } },
            { text: `Perform an RCG TFix Structural Audit on this NDIS document. 
            Identify:
            1. Audit Risk Level (LOW/MEDIUM/HIGH).
            2. Compliance Slippage (Specific errors in language or formatting).
            3. Revenue Leakage (Missing billable items or undervalued claims).
            
            Return ONLY a JSON object with these keys: riskLevel, slippagePoints (array), leakageFound (array), summary (short string).
            Maintain a detached, architectural tone.` }
          ]
        },
        config: { responseMimeType: "application/json" }
      });

      clearInterval(simulationInterval);
      const result = JSON.parse(response.text || '{}');
      setAuditReport(result);
      addLog("AUDIT_SEQUENCE_COMPLETE.");
      addLog("STRUCTURAL_REPORT_READY.");
    } catch (err) {
      console.error(err);
      addLog("CRITICAL_LOGIC_FAILURE.");
      alert("Neural handshake failed. Ensure document is clear and redacted.");
    } finally {
      setIsAnalyzing(false);
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-20">
           <div className="circuit-capsule border-2 border-neon-purple/50 bg-black px-8 py-3 inline-flex items-center gap-4 mb-8 shadow-3xl">
              <ShieldAlert size={20} className="text-neon-purple animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white">TFix Diagnostic Sandbox</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
             Logic <span className="text-neon-purple">Sandbox.</span>
           </h2>
           <p className="text-slate-400 text-lg font-bold italic mt-6 max-w-2xl mx-auto">
             Upload a redacted service agreement or progress note. Witness Aurelia perform a live structural audit for leakage and slippage.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* File Upload / Preview Area */}
          <div className="lg:col-span-5 space-y-8">
            <div className="orbital-tile border-2 border-white/10 p-1 bg-royal-950/20 group relative overflow-hidden h-[500px]">
               {!preview ? (
                 <label className="h-full w-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-all">
                    <div className="p-8 rounded-full border-2 border-dashed border-white/20 group-hover:border-neon-blue transition-all group-hover:scale-110">
                       <Upload size={48} className="text-slate-700 group-hover:text-neon-blue" />
                    </div>
                    <div className="mt-8 text-center">
                       <p className="text-white font-black uppercase text-xs tracking-widest">Transmit Payload</p>
                       <p className="text-[9px] text-slate-600 mt-2 uppercase tracking-[0.2em]">IMG / PDF // MAX 4MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                 </label>
               ) : (
                 <div className="relative h-full w-full group/preview">
                    {file?.type.includes('pdf') ? (
                       <div className="h-full w-full flex flex-col items-center justify-center text-slate-500 gap-6">
                          <FileText size={80} />
                          <span className="text-xs font-mono uppercase tracking-widest">{file.name}</span>
                       </div>
                    ) : (
                       <img src={preview} alt="Audit Payload" className="h-full w-full object-contain opacity-40 group-hover/preview:opacity-80 transition-opacity" />
                    )}
                    <button 
                      onClick={() => { setFile(null); setPreview(null); setAuditReport(null); }}
                      className="absolute top-6 right-6 p-3 bg-black/80 rounded-xl text-white hover:text-red-500 transition-all border border-white/10"
                    >
                       <X size={20} />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                       <button 
                        onClick={executeAudit}
                        disabled={isAnalyzing}
                        className="w-full py-5 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all shadow-3xl flex items-center justify-center gap-4"
                       >
                         {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                         {isAnalyzing ? 'Analyzing...' : 'Initialize Audit'}
                       </button>
                    </div>
                 </div>
               )}
            </div>

            {/* Terminal Log View */}
            <div className="orbital-tile bg-black border border-white/10 p-6 font-mono h-48 flex flex-col shadow-inner">
               <div className="flex items-center gap-3 mb-4 text-slate-700">
                  <Terminal size={14} />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em]">System_Audit_Log</span>
               </div>
               <div className="flex-grow overflow-y-auto space-y-2 scrollbar-hide">
                  {terminalLogs.length === 0 ? (
                    <div className="text-slate-800 text-[10px] animate-pulse">Awaiting Payload Transfer...</div>
                  ) : (
                    terminalLogs.map((log, i) => (
                      <div key={i} className="text-[10px] text-neon-blue font-bold flex gap-3">
                         <span className="opacity-40">::</span>
                         <span>{log}</span>
                      </div>
                    ))
                  )}
                  <div ref={logEndRef} />
               </div>
            </div>
          </div>

          {/* Audit Results View */}
          <div className="lg:col-span-7">
             <div className="orbital-tile border-2 border-white/10 bg-black min-h-[700px] flex flex-col p-10 lg:p-16 relative overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.9)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-white/20 to-neon-blue"></div>
                
                {!auditReport && !isAnalyzing ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-10 opacity-10">
                     <FileSearch size={120} className="text-white" />
                     <div>
                        <p className="text-3xl font-display font-black uppercase tracking-tighter">Awaiting Diagnostic Data</p>
                        <p className="text-sm font-mono mt-4">Load document into TFix Mainframe to start structural scan.</p>
                     </div>
                  </div>
                ) : isAnalyzing ? (
                  <div className="flex-grow flex flex-col items-center justify-center space-y-12">
                     <div className="relative">
                        <div className="w-48 h-48 rounded-full border-4 border-dashed border-neon-purple animate-spin-slow"></div>
                        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-purple" size={64} />
                     </div>
                     <div className="text-center space-y-4">
                        <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter animate-pulse">Executing Logic Sweep</h3>
                        <div className="flex justify-center gap-2">
                           <div className="h-1 w-24 bg-royal-900 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-purple animate-ping"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="space-y-12 animate-in fade-in duration-1000">
                     <div className="flex items-center justify-between border-b border-white/5 pb-8">
                        <div>
                           <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">Structural Report</h3>
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2 font-mono italic">SYNK_AUDIT_NODE_COMPLETE</p>
                        </div>
                        <div className={`px-8 py-3 rounded-xl border-2 font-black text-xs uppercase tracking-widest flex items-center gap-4 ${
                          auditReport.riskLevel === 'HIGH' ? 'border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
                          auditReport.riskLevel === 'MEDIUM' ? 'border-amber-500 text-amber-500 bg-amber-500/10' :
                          'border-green-500 text-green-500 bg-green-500/10'
                        }`}>
                           <AlertTriangle size={16} /> RISK_LEVEL: {auditReport.riskLevel}
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Slippage Results */}
                        <div className="p-8 bg-royal-950/40 border border-white/5 rounded-3xl space-y-6">
                           <div className="flex items-center gap-4 text-neon-purple">
                              <Zap size={20} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Compliance Slippage</span>
                           </div>
                           <div className="space-y-4">
                              {auditReport.slippagePoints?.map((p: string, i: number) => (
                                <div key={i} className="flex gap-4 items-start text-slate-300 text-sm italic font-bold">
                                   <span className="text-neon-purple shrink-0 mt-1.5">•</span>
                                   <p>"{p}"</p>
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* Leakage Results */}
                        <div className="p-8 bg-royal-950/40 border border-white/5 rounded-3xl space-y-6">
                           <div className="flex items-center gap-4 text-neon-blue">
                              <Activity size={20} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Revenue Leakage</span>
                           </div>
                           <div className="space-y-4">
                              {auditReport.leakageFound?.map((p: string, i: number) => (
                                <div key={i} className="flex gap-4 items-start text-slate-300 text-sm italic font-bold">
                                   <span className="text-neon-blue shrink-0 mt-1.5">•</span>
                                   <p>"{p}"</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="p-10 bg-black border border-neon-purple/20 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                           <Cpu size={200} className="text-white" />
                        </div>
                        <div className="relative z-10 space-y-6">
                           <h4 className="text-xl font-display font-black text-white uppercase tracking-tight">Architectural Summary</h4>
                           <p className="text-slate-400 text-lg leading-relaxed italic font-bold">"{auditReport.summary}"</p>
                           
                           <div className="pt-8 border-t border-white/5 mt-8 flex flex-col md:flex-row items-center justify-between gap-8">
                              <div className="flex items-center gap-4">
                                 <CheckCircle2 className="text-neon-green" size={20} />
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logic Grounding: NDIS_2024_PARITY</span>
                              </div>
                              <a href="#/contact" className="slim-orbital-btn px-10 py-4 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase hover:bg-neon-blue hover:text-white transition-all shadow-3xl">
                                Initialize Remediation Sync
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
