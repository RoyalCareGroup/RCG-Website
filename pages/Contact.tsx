import React, { useState, useEffect } from 'react';
import { Send, Mail, Zap, ShieldCheck, Terminal, Activity, ArrowRight, ExternalLink, Loader2, Cpu, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ category: string, recommendation: string, intent: string } | null>(null);
  const [showHandshake, setShowHandshake] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const analyzeIntent = async () => {
    if (!formData.msg.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this NDIS provider inquiry: "${formData.msg}". 
      Return a JSON object with: 
      1. category (short 2-3 word title of the need)
      2. intent (one sentence describing the user's structural goal)
      3. recommendation (which RCG department: Consultancy, Tech, or Governance).
      Maintain an elite, architectural tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      setAnalysis(result);
      setShowHandshake(true);
    } catch (err) {
      console.error("Neural analysis failed:", err);
      // Fallback to simple handshake if AI fails
      setShowHandshake(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const finalizeUplink = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'ads_conversion_Contact_1', {
        'event_category': 'Engagement',
        'event_label': 'Contact Form Submission',
        'value': 1.0
      });
    }
    
    // Secure background routing - email hello@royalcaregroup.com.au is handled via COMPANY_DETAILS.email
    const recipient = COMPANY_DETAILS.email; 
    const subject = `[UPLINK] Strategic Inquiry: ${formData.name}`;
    const body = `ROYAL CARE GROUP - CONTACT MATRIX PAYLOAD\n` +
                 `------------------------------------------\n` +
                 `OPERATOR: ${formData.name}\n` +
                 `REPLY_NODE: ${formData.email}\n` +
                 `INTENT: ${analysis?.intent || 'Not Analyzed'}\n` +
                 `CATEGORY: ${analysis?.category || 'Standard Inquiry'}\n\n` +
                 `MESSAGE PAYLOAD:\n` +
                 `${formData.msg}\n` +
                 `------------------------------------------\n` +
                 `Sent via Sovereign Uplink Protocol v${COMPANY_DETAILS.appVersion}`;
    
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto pt-48 pb-32 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-12 animate-hero-reveal">
            <div className="space-y-8">
              <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-8 py-3 shadow-3xl inline-flex items-center gap-4">
                <Terminal size={14} className="animate-pulse text-neon-blue" /> Smart_Contact_Protocol_v4
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] heading-wow">
                Contact<br/>
                <span className="heading-tech">Matrix.</span>
              </h1>
              <div className="banner-pop bg-black p-8 shadow-2xl border-2 border-white/10 rounded-[2rem]">
                <DecodingText 
                  text="State your organizational constraints. Our neural dispatcher will categorize your intent and establish a secure tunnel to our architects."
                  className="text-lg text-white font-black leading-tight tracking-wide opacity-70 italic"
                  stagger={5}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <ShieldCheck className="text-neon-blue" />, label: "Security", val: "Sovereign Encryption Active" },
                { icon: <Cpu className="text-neon-purple" />, label: "Dispatcher", val: "Neural Intent Discovery Enabled" },
              ].map((node, i) => (
                <div key={i} className="orbital-tile p-8 bg-black border-2 border-white/5 shadow-2xl flex items-center gap-6">
                  <div className="p-4 bg-royal-950 rounded-2xl border border-white/5">{node.icon}</div>
                  <div>
                    <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1 font-mono">{node.label}</h4>
                    <p className="text-white text-[11px] font-black">{node.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Smart Form (UPDATED TO WHITE BACKGROUND) */}
          <div className="lg:col-span-7">
            <div className="orbital-tile p-10 md:p-16 shadow-[0_80px_160px_rgba(0,0,0,0.5)] relative overflow-hidden bg-white border-2 border-white min-h-[700px] flex flex-col transition-colors duration-500">
              {/* Sovereign Gradient Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-purple via-slate-300 to-neon-blue"></div>
              
              {!showHandshake ? (
                <div className="relative z-10 space-y-12 animate-in fade-in duration-700">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-4 text-slate-400">
                       <Activity size={16} className="text-neon-blue" />
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] font-mono">Inquiry_Payload_Mode</span>
                    </div>
                    <div className="hidden sm:flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); analyzeIntent(); }} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] font-mono">Operator Identity</label>
                        <input 
                          type="text" required placeholder="Full Name Required"
                          className="w-full bg-slate-50 border-2 border-slate-200 p-6 rounded-xl text-black focus:border-neon-blue focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black shadow-sm" 
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] font-mono">Response Node</label>
                        <input 
                          type="email" required placeholder="Work Email Required"
                          className="w-full bg-slate-50 border-2 border-slate-200 p-6 rounded-xl text-black focus:border-neon-blue focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black shadow-sm" 
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] font-mono">Inquiry Context</label>
                      <textarea 
                        required rows={6} placeholder="Describe the structural goals, barriers, or scaling requirements..."
                        className="w-full bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl text-black resize-none focus:border-neon-purple focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black text-lg shadow-sm" 
                        value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isAnalyzing || !formData.msg.trim()}
                      className="slim-orbital-btn w-full py-8 text-white bg-black font-black text-[12px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 group active:scale-95 shadow-2xl disabled:opacity-50 transition-all hover:bg-slate-900"
                    >
                      {isAnalyzing ? <Loader2 size={24} className="animate-spin text-neon-blue" /> : <Zap size={20} className="text-neon-purple group-hover:animate-pulse" />}
                      <span>{isAnalyzing ? 'Analyzing Intent...' : 'Initialize Logic Scan'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="relative z-10 space-y-12 animate-in slide-in-from-right-10 duration-700 flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-6">
                       <div className="p-4 bg-neon-purple/5 border border-neon-purple/10 rounded-xl">
                          <ShieldCheck className="text-neon-purple" size={32} />
                       </div>
                       <div>
                          <h3 className="text-3xl font-display font-black text-black uppercase tracking-tight">Neural Handshake</h3>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2 font-mono">Grounded for Sovereign Transmission</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-grow">
                     <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-black"><MessageSquare size={80} /></div>
                        <div className="text-[10px] font-black text-neon-blue uppercase tracking-widest mb-4">Structural Categorization</div>
                        <h4 className="text-2xl font-display font-black text-black uppercase tracking-tight mb-4">
                           {analysis?.category || 'Strategic Growth Node'}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed italic font-bold">
                           "{analysis?.intent || 'Transmission protocol ready to bridge your inquiry to our lead architects.'}"
                        </p>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                           <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Dispatch Node</div>
                           <div className="text-black text-xs font-black uppercase tracking-widest">{analysis?.recommendation || 'Consultancy'}</div>
                        </div>
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                           <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Priority Node</div>
                           <div className="text-neon-blue text-xs font-black uppercase tracking-widest animate-pulse">LOCKED</div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4 pt-8">
                     <button 
                        onClick={finalizeUplink}
                        className="slim-orbital-btn w-full py-8 text-white bg-neon-blue font-black text-[13px] tracking-[0.7em] uppercase flex items-center justify-center gap-6 shadow-[0_20px_60px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                     >
                        <Send size={24} />
                        <span>Deploy Uplink Now</span>
                     </button>
                     <button 
                        onClick={() => setShowHandshake(false)}
                        className="w-full py-4 text-slate-400 font-black text-[9px] uppercase tracking-[0.5em] hover:text-black transition-colors"
                     >
                        Revision Required // Back to Editor
                     </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] animate-pulse">
              AU_SECURE_GATEWAY // PROVISION_SUCCESS_10.13
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;