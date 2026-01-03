import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Send, Bot, User, Users, Loader2, Sparkles, 
  ShieldCheck, HelpCircle, ExternalLink, MapPin, 
  Zap, Activity, Search, FileText, BarChart3, 
  Globe, Navigation, TrendingUp, Cpu, History,
  AlertTriangle, CheckCircle2, ChevronRight, Gauge,
  PieChart as PieChartIcon, Briefcase, DollarSign, FileSearch,
  Command, Layers, Maximize2, Microscope
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatSender, ChatMessage } from '../types/index.ts';
import { BackupButton } from '../components/BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

const IntelligenceHub: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0',
      sender: ChatSender.BOT, 
      text: `Neural interface established. RCG Structural Intelligence Node v${COMPANY_DETAILS.appVersion} online.\n\nIndustry Grounding Status: ACTIVE\nRegulatory Parity: 2024/25 GUIDEBOARD\n\nI am authorized to assist with Systematizing Your NDIS Knowledge (SYNK). State your protocol.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'chat' | 'audit'>('monitor');
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    return () => window.removeEventListener('scroll', handleScroll);
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: ChatSender.USER, text: input.trim(), timestamp: new Date() };
    setInput('');
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.sender === ChatSender.USER ? 'user' : 'model', parts: [{ text: m.text }] }));
      const { text, sources } = await sendChatMessage(userMsg.text, history, true);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text, sender: ChatSender.BOT, timestamp: new Date(), sources }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', sender: ChatSender.BOT, text: "CRITICAL: Link Failure.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pt-48 pb-40">
        
        <div className="lg:col-span-3 space-y-10 hidden lg:block animate-hero-reveal">
          <div className="orbital-tile p-10 flex flex-col gap-10 bg-black border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-royal-950 rounded-2xl border-2 border-white/5 shadow-2xl">
                <Globe className="text-neon-blue animate-spin-slow" size={28} />
              </div>
              <div>
                <div className="text-[10px] text-slate-600 uppercase tracking-[0.4em] mb-2 leading-none font-black">Grid Ops</div>
                <div className="text-[14px] text-white font-black uppercase tracking-tight">NODE_v10.12</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Monitor', id: 'monitor', icon: <Gauge size={18} /> },
                { label: 'Scout', id: 'chat', icon: <Terminal size={18} /> },
                { label: 'Audit', id: 'audit', icon: <ShieldCheck size={18} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl border-2 transition-all duration-500 text-[11px] font-black uppercase tracking-[0.4em] ${
                    activeTab === tab.id 
                      ? 'bg-white text-black border-white shadow-3xl' 
                      : 'bg-black border-white/5 text-slate-600 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={activeTab === tab.id ? 'text-black' : 'text-slate-700'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="opacity-50 hover:opacity-100 transition-opacity flex justify-center">
            <BackupButton />
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col h-[850px] animate-hero-reveal">
          <div className="flex-grow bg-black rounded-[3rem] border-2 border-white/10 flex flex-col overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] relative">
            <div className="p-10 border-b-2 border-white/5 flex items-center justify-between bg-[#050505]">
               <div className="flex items-center gap-10">
                  <div className="p-5 bg-royal-950 rounded-[1.5rem] border-2 border-white/10 shadow-2xl group hover:border-neon-blue transition-all">
                    {activeTab === 'chat' ? <Terminal className="text-neon-purple animate-pulse" size={36} /> : activeTab === 'monitor' ? <Gauge className="text-neon-blue" size={36} /> : <ShieldCheck className="text-neon-purple" size={36} />}
                  </div>
                  <div>
                    <div className="brand-heading-group cursor-default">
                      <h2 className="tracking-tighter leading-none mb-1">
                        <span className="heading-specular heading-structural-test text-xl mb-1">Neural</span>
                        <span className="heading-specular heading-intelligence-test text-3xl">Interface.</span>
                      </h2>
                    </div>
                    <p className="text-[11px] text-slate-600 tracking-[0.5em] uppercase font-black italic">
                       RCG_INTELLIGENCE_LAYER_STABLE // AU_EAST_CLOUD
                    </p>
                  </div>
               </div>
            </div>

            {activeTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 space-y-12 scrollbar-hide bg-[#020617]/30">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-10 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-5 duration-700`}>
                      <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 shadow-3xl border-2 transition-all ${
                        m.sender === ChatSender.USER ? 'bg-black border-neon-blue text-neon-blue shadow-[0_0_40px_rgba(6,182,212,0.2)]' : 'bg-black border-white/10 text-neon-purple'
                      }`}>
                        {m.sender === ChatSender.USER ? <User size={40} /> : <Bot size={40} />}
                      </div>
                      <div className={`max-w-[75%] p-12 rounded-[2.5rem] relative overflow-hidden transition-all duration-1000 ${
                        m.sender === ChatSender.USER ? 'bg-[#080808] text-white border-2 border-white/20' : 'bg-black text-slate-300 border-2 border-white/5 shadow-inner'
                      }`}>
                        <div className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-600 mb-8 border-b-2 border-white/5 pb-5 flex items-center gap-4">
                          <Activity size={12} className={m.sender === ChatSender.USER ? 'text-neon-blue' : 'text-neon-purple'} />
                          {m.sender === ChatSender.USER ? 'OPERATOR_ACTIVE' : 'SYNK_CORE_UPLINK'}
                        </div>
                        <div className="text-xl leading-relaxed font-bold italic opacity-90">
                           <DecodingText text={m.text} stagger={4} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-12 bg-[#050505] border-t-2 border-white/5">
                   <form onSubmit={handleSendMessage} className="max-w-6xl mx-auto relative group">
                      <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="INPUT_COMMAND_PAYLOAD..." 
                        className="w-full bg-black border-2 border-white/10 rounded-[2rem] py-10 pl-14 pr-48 focus:outline-none focus:border-white transition-all text-white text-2xl font-black shadow-inner placeholder:text-slate-900" 
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                         <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()} 
                            className="bg-white p-7 rounded-[1.5rem] text-black hover:bg-neon-blue hover:text-white transition-all shadow-3xl active:scale-95 disabled:opacity-20"
                         >
                            <Send size={36} />
                         </button>
                      </div>
                   </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IntelligenceHub;