
import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Send, Bot, User, Users, Loader2, Sparkles, 
  ShieldCheck, HelpCircle, ExternalLink, MapPin, 
  Zap, Activity, Search, FileText, BarChart3, 
  Globe, Navigation, TrendingUp, Cpu, History,
  AlertTriangle, CheckCircle2, ChevronRight, Gauge,
  PieChart as PieChartIcon, Briefcase, DollarSign, FileSearch,
  Command, Layers, Maximize2, Microscope, Mail
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatSender, ChatMessage } from '../types/index.ts';
import { BackupButton } from './BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from './DecodingText.tsx';

const IntelligenceHub: React.FC = () => {
  const operatorName = localStorage.getItem('rcg_visitor_name') || 'Authorized Operator';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0',
      sender: ChatSender.BOT, 
      text: `Welcome back, ${operatorName}. Neural interface established. RCG Structural Intelligence Node v${COMPANY_DETAILS.appVersion} online.\n\nIndustry Grounding Status: ACTIVE\nRegulatory Parity: 2024/25 GUIDEBOARD\n\nI am authorized to assist with Systematizing Your NDIS Knowledge (SYNK). State your protocol.`,
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

  const transmitTranscript = () => {
    const email = prompt("To route this blueprint to our human architects, please provide your return identification (Email Address):");
    if (!email || !email.includes('@')) return;

    const opName = localStorage.getItem('rcg_visitor_name') || 'Authorized Operator';
    const body = `ROYAL CARE GROUP - NEURAL CHAT TRANSCRIPT\n` +
      `-----------------------------------------------\n` +
      `OPERATOR: ${opName}\n` +
      `VISITOR EMAIL: ${email}\n` +
      `TIMESTAMP: ${new Date().toLocaleString()}\n\n` +
      `TRANSCRIPT PAYLOAD:\n` +
      messages.map(m => `[${m.sender === ChatSender.USER ? 'OPERATOR' : 'SYNK_CORE'}]: ${m.text}`).join('\n\n') +
      `\n-----------------------------------------------\n` +
      `TRANSMITTED VIA NEURAL HUB HUB v10.12`;

    const subject = `Hello@royalcaregroup.com.au, you have a new enquiry`;
    const mailto = `mailto:${COMPANY_DETAILS.email}?cc=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-4 sm:px-12 lg:px-16 xl:px-24 font-sans font-bold relative">
      
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

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10 pt-24 lg:pt-32 pb-12 lg:pb-24">
        
        {/* Sidebar Controls - Condensed */}
        <div className="lg:col-span-3 space-y-4 lg:space-y-6 animate-hero-reveal">
          <div className="orbital-tile p-5 lg:p-8 flex flex-col gap-4 lg:gap-6 bg-black border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="p-2.5 lg:p-3 bg-royal-950 rounded-lg border-2 border-white/5 shadow-2xl">
                <Globe className="text-neon-blue animate-spin-slow" size={20} />
              </div>
              <div>
                <div className="text-[8px] lg:text-[9px] text-slate-600 uppercase tracking-[0.4em] mb-0.5 font-black">Grid Ops</div>
                <div className="text-[11px] lg:text-[13px] text-white font-black uppercase tracking-tight">NODE_v10.12</div>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              {[
                { label: 'Monitor', id: 'monitor', icon: <Gauge size={14} /> },
                { label: 'Scout', id: 'chat', icon: <Terminal size={14} /> },
                { label: 'Audit', id: 'audit', icon: <ShieldCheck size={14} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[100px] lg:w-full flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 rounded-lg lg:rounded-xl border-2 transition-all duration-500 text-[9px] font-black uppercase tracking-[0.3em] ${
                    activeTab === tab.id 
                      ? 'bg-white text-black border-white shadow-3xl' 
                      : 'bg-black border-white/5 text-slate-600 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <span className={activeTab === tab.id ? 'text-black' : 'text-slate-700'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
            
            {messages.length > 2 && (
              <button 
                onClick={transmitTranscript}
                className="w-full mt-4 py-4 bg-royal-950 border border-neon-blue/40 text-neon-blue rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neon-blue hover:text-white transition-all shadow-xl"
              >
                <Mail size={14} /> Transmit Logic
              </button>
            )}
          </div>
          <div className="opacity-50 hover:opacity-100 transition-opacity flex justify-center lg:block scale-90">
            <BackupButton />
          </div>
        </div>

        {/* Main Interface Hub - Condensed height and padding */}
        <div className="lg:col-span-9 flex flex-col min-h-[450px] lg:h-[650px] animate-hero-reveal">
          <div className="flex-grow bg-black rounded-[1.5rem] lg:rounded-[2rem] border-2 border-white/10 flex flex-col overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] relative">
            <div className="p-5 lg:p-8 border-b-2 border-white/5 flex items-center justify-between bg-[#050505]">
               <div className="flex items-center gap-4 lg:gap-8">
                  <div className="p-3 lg:p-4 bg-royal-950 rounded-lg lg:rounded-[1.2rem] border-2 border-white/10 shadow-2xl group hover:border-neon-blue transition-all">
                    {activeTab === 'chat' ? <Terminal className="text-neon-purple animate-pulse" size={24} /> : activeTab === 'monitor' ? <Gauge className="text-neon-blue" size={24} /> : <ShieldCheck className="text-neon-purple" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-white font-black uppercase text-lg lg:text-xl tracking-tighter leading-none mb-1">
                      {activeTab === 'chat' ? 'Neural Node' : activeTab === 'monitor' ? 'Operational Hub' : 'Audit Engine'}
                    </h2>
                    <p className="text-[8px] lg:text-[9px] text-slate-600 tracking-[0.4em] uppercase font-black italic">
                       RCG_LAYER_STABLE // AU_EAST_CLOUD
                    </p>
                  </div>
               </div>
            </div>

            {activeTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 lg:p-10 space-y-6 lg:space-y-8 scrollbar-hide bg-[#020617]/30">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 lg:gap-8 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-5 duration-700`}>
                      <div className={`w-10 h-10 lg:w-16 lg:h-16 rounded-lg lg:rounded-[1rem] flex items-center justify-center flex-shrink-0 shadow-3xl border-2 transition-all ${
                        m.sender === ChatSender.USER ? 'bg-black border-neon-blue text-neon-blue shadow-[0_0_40px_rgba(6,182,212,0.2)]' : 'bg-black border-white/10 text-neon-purple'
                      }`}>
                        {m.sender === ChatSender.USER ? <User size={20} /> : <Bot size={20} />}
                      </div>
                      <div className={`max-w-[90%] lg:max-w-[80%] p-4 lg:p-8 rounded-[1.2rem] lg:rounded-[1.8rem] relative overflow-hidden transition-all duration-1000 ${
                        m.sender === ChatSender.USER ? 'bg-[#080808] text-white border-2 border-white/20' : 'bg-black text-slate-300 border-2 border-white/5 shadow-inner'
                      }`}>
                        <div className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-3 lg:mb-6 border-b-2 border-white/5 pb-3 lg:pb-4 flex items-center gap-2 lg:gap-3">
                          <Activity size={8} className={m.sender === ChatSender.USER ? 'text-neon-blue' : 'text-neon-purple'} />
                          {m.sender === ChatSender.USER ? 'OPERATOR' : 'SYNK_CORE'}
                        </div>
                        <div className="text-sm lg:text-lg leading-relaxed font-bold italic opacity-90 break-words">
                           <DecodingText text={m.text} stagger={4} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 lg:gap-8 animate-pulse">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-lg lg:rounded-[1rem] bg-black border-2 border-white/10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-neon-blue" size={20} />
                      </div>
                      <div className="bg-black border-2 border-white/5 p-4 lg:p-8 rounded-[1.2rem] lg:rounded-[1.8rem] w-40 lg:w-56 flex items-center justify-center">
                         <div className="flex gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-bounce"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 lg:p-8 bg-[#050505] border-t-2 border-white/5">
                   <form onSubmit={handleSendMessage} className="max-w-6xl mx-auto relative group">
                      <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="INPUT_COMMAND..." 
                        className="w-full bg-black border-2 border-white/10 rounded-lg lg:rounded-[1.5rem] py-4 lg:py-7 pl-4 lg:pl-10 pr-20 lg:pr-32 focus:outline-none focus:border-white transition-all text-white text-base lg:text-xl font-black shadow-inner placeholder:text-slate-900" 
                      />
                      <div className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2">
                         <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()} 
                            className="bg-white p-3 lg:p-5 rounded-lg lg:rounded-[1.2rem] text-black hover:bg-neon-blue hover:text-white transition-all shadow-3xl active:scale-95 disabled:opacity-20"
                         >
                            <Send size={18} lg:size={24} />
                         </button>
                      </div>
                   </form>
                </div>
              </>
            )}
            {activeTab === 'monitor' && (
              <div className="flex-grow p-6 lg:p-10 flex flex-col items-center justify-center text-center space-y-6 lg:space-y-10">
                 <div className="relative">
                    <div className="w-24 h-24 lg:w-36 lg:h-36 border-4 lg:border-6 border-dashed border-white/5 rounded-full animate-spin-slow"></div>
                    <Microscope className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={36} lg:size={56} />
                 </div>
                 <h2 className="text-xl lg:text-3xl text-slate-800 uppercase tracking-[0.6em] lg:tracking-[0.8em] font-black italic animate-pulse">Monitoring Active...</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IntelligenceHub;
