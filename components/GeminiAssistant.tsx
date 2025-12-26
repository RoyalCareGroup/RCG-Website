
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Bot, User, Loader2, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Systems online. SYNK Neural interface established. How can I assist your NDIS strategy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...messages
            .filter((_, idx) => idx > 0)
            .map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are the Royal Care Intelligence Engine. 
          Identity: National NDIS Technical Consultant & Neural Interface. 
          Expertise: SYNK Product Suite (ClaimSYNK, ReportSYNK, FormSYNK), TFix Diagnostic Engine, NDIS Price Guide 2024/25, and structural business intelligence. 
          Tone: Elite, high-tech, precise, professional.
          
          Context: 
          Royal Care Group is the leader in NDIS technical consultancy. 
          We specialize in architectural re-engineering of provider systems.
          
          Guidelines:
          - Use technical terminology where appropriate (latency, architecture, protocols, slippage).
          - Be extremely precise with NDIS policy advice.
          - If a query is high-stakes (e.g., severe audit failure), suggest a manual sync with a human RCG architect.
          - Maintain a futuristic, "interface" persona.`,
          temperature: 0.6,
        }
      });

      const aiText = response.text || "Interface error. Link failure. Re-establishing secure tunnel...";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL: Link Failure. Neural nodes unreachable. Re-deploying gateway..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col h-[85vh] animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neon-purple/20 rounded-2xl border border-neon-purple/30 text-neon-purple">
            <Terminal size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-white">Neural Node Interface</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Protocol: SYNK_NEURAL_v4 // Encrypted Link</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 glass px-3 py-1 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Link</span>
        </div>
      </div>

      <div className="flex-grow glass rounded-[3rem] border border-royal-700 flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse"></div>
        
        {/* Chat History */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-thin"
        >
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                m.role === 'user' ? 'bg-neon-blue/20 border border-neon-blue/40' : 'bg-royal-800 border border-royal-700 shadow-lg'
              }`}>
                {m.role === 'user' ? <User size={24} className="text-neon-blue" /> : <Bot size={24} className="text-neon-purple" />}
              </div>
              <div className={`max-w-[80%] p-6 rounded-3xl ${
                m.role === 'user' 
                  ? 'bg-royal-900/80 text-white rounded-tr-none border border-white/5 shadow-xl' 
                  : 'bg-royal-800/40 text-slate-300 rounded-tl-none border border-royal-700 shadow-inner backdrop-blur-sm'
              }`}>
                <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-3">
                  {m.role === 'user' ? 'OPERATOR' : 'SYNK_CORE'}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">{m.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-6 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-royal-800 flex items-center justify-center border border-royal-700">
                <Loader2 size={24} className="text-neon-purple animate-spin" />
              </div>
              <div className="bg-royal-800/20 p-6 rounded-3xl rounded-tl-none border border-royal-700 w-48 flex items-center justify-center">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Command Nodes */}
        <div className="px-8 pb-4 flex flex-wrap gap-3">
           {[
             { label: 'Audit Diagnostic', icon: <ShieldCheck size={14} /> },
             { label: 'ClaimSYNK Protocol', icon: <Sparkles size={14} /> },
             { label: 'Architecture Query', icon: <HelpCircle size={14} /> },
           ].map(suggest => (
             <button 
              key={suggest.label}
              onClick={() => setInput(suggest.label)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-xl glass border border-royal-700 hover:border-neon-blue transition-all text-slate-400 hover:text-white"
             >
               {suggest.icon}
               {suggest.label}
             </button>
           ))}
        </div>

        {/* Input Terminal Area */}
        <form onSubmit={handleSendMessage} className="p-8 bg-royal-900/50 border-t border-royal-700">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Command the core engine..."
              className="w-full bg-royal-950 border border-royal-800 rounded-2xl py-5 pl-8 pr-20 focus:outline-none focus:border-neon-blue transition-all text-slate-200 font-mono text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-neon-purple p-4 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg shadow-neon-purple/20"
            >
              <Send size={24} />
            </button>
          </div>
        </form>
      </div>
      <p className="text-center text-[10px] text-slate-600 mt-8 uppercase tracking-[0.6em] font-black">
        SYNK Neural Protocol • Restricted Access • Royal Care Group 2024
      </p>
    </div>
  );
};

export default GeminiAssistant;
