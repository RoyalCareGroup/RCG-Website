import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Send, Bot, User, Users, Loader2, Sparkles, 
  ShieldCheck, HelpCircle, ExternalLink, MapPin, 
  Zap, Activity, Search, FileText, BarChart3, 
  Globe, Navigation, TrendingUp, Cpu, History,
  AlertTriangle, CheckCircle2, ChevronRight, Gauge,
  PieChart as PieChartIcon, Briefcase, DollarSign, FileSearch,
  Command, Layers, Maximize2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatSender, ChatMessage } from '../types/index.ts';
import { BackupButton } from './BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const COMPLIANCE_TREND = [
  { name: 'Jan', score: 82 },
  { name: 'Feb', score: 85 },
  { name: 'Mar', score: 81 },
  { name: 'Apr', score: 88 },
  { name: 'May', score: 92 },
  { name: 'Jun', score: 94 },
  { name: 'Jul', score: 99 },
];

const RECOVERY_DATA = [
  { name: 'Slippage', value: 400, fill: '#ef4444' },
  { name: 'Recovered', value: 300, fill: '#06b6d4' },
  { name: 'Potential', value: 200, fill: '#d946ef' },
];

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="pt-40 pb-32 px-6 sm:px-16 lg:px-24 xl:px-32 min-h-screen bg-royal-950 flex flex-col items-center font-sans font-black">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-3 space-y-8 hidden lg:block">
          <div className="orbital-tile p-10 flex flex-col gap-10 bg-royal-900/40 border-2 border-white/10 shadow-3xl">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-neon-blue/15 rounded-xl border-2 border-neon-blue/30 shadow-2xl">
                <Globe className="text-neon-blue animate-pulse" size={28} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.5em] mb-2 leading-none">Grid Ops</div>
                <div className="text-[14px] text-white font-black uppercase tracking-tight">NODE_v10.12</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] text-slate-600 uppercase tracking-[0.6em] mb-6 pl-4 border-l-4 border-royal-800">Controls</div>
              {[
                { label: 'Monitor', id: 'monitor', icon: <Gauge size={18} /> },
                { label: 'Scout', id: 'chat', icon: <Terminal size={18} /> },
                { label: 'Audit', id: 'audit', icon: <ShieldCheck size={18} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-8 py-5 rounded-xl border-2 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                    activeTab === tab.id 
                      ? 'bg-neon-blue/20 border-neon-blue text-white shadow-3xl' 
                      : 'bg-black border-white/5 text-slate-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={activeTab === tab.id ? 'text-neon-blue' : 'text-slate-700'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <BackupButton />
        </div>

        <div className="lg:col-span-9 flex flex-col h-[850px]">
          <div className="flex-grow bg-black rounded-[3rem] border-2 border-white/10 flex flex-col overflow-hidden shadow-3xl relative">
            <div className="p-10 border-b-2 border-white/5 flex items-center justify-between bg-royal-950/80">
               <div className="flex items-center gap-10">
                  <div className="p-5 bg-black rounded-2xl border-2 border-white/10 shadow-2xl">
                    {activeTab === 'chat' ? <Terminal className="text-neon-purple" size={32} /> : activeTab === 'monitor' ? <Gauge className="text-neon-blue" size={32} /> : <ShieldCheck className="text-neon-purple" size={32} />}
                  </div>
                  <div>
                    <h2 className="text-white font-black uppercase text-2xl tracking-[0.5em] leading-none mb-2">
                      {activeTab === 'chat' ? 'Neural Node' : activeTab === 'monitor' ? 'Operational Hub' : 'Audit Engine'}
                    </h2>
                    <p className="text-[12px] text-slate-600 tracking-[0.4em] uppercase font-black">
                       RCG_INTELLIGENCE_LAYER_STABLE
                    </p>
                  </div>
               </div>
            </div>

            {activeTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 space-y-12 scrollbar-hide bg-[#010617]/40">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-10 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-5`}>
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-3xl border-2 ${
                        m.sender === ChatSender.USER ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'bg-royal-950 border-white/10 text-neon-purple'
                      }`}>
                        {m.sender === ChatSender.USER ? <User size={40} /> : <Bot size={40} />}
                      </div>
                      <div className={`max-w-[80%] p-12 rounded-[2.5rem] relative overflow-hidden transition-all duration-700 ${
                        m.sender === ChatSender.USER ? 'bg-royal-900 text-white border-2 border-white/10' : 'bg-black text-slate-200 border-2 border-white/10'
                      }`}>
                        <div className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-600 mb-8 border-b-2 border-white/5 pb-5">
                          {m.sender === ChatSender.USER ? 'OPERATOR_ACTIVE' : 'SYNK_CORE_UPLINK'}
                        </div>
                        <div className="text-xl leading-relaxed font-black italic">"{m.text}"</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-12 bg-black border-t-2 border-white/5">
                   <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto relative">
                      <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="INPUT_COMMAND_PAYLOAD..." 
                        className="w-full bg-royal-950 border-2 border-white/10 rounded-[2rem] py-10 pl-12 pr-44 focus:outline-none focus:border-neon-blue transition-all text-white text-2xl font-black shadow-inner" 
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                         <button type="submit" disabled={isLoading || !input.trim()} className="bg-white p-6 rounded-2xl text-black hover:bg-neon-blue hover:text-white transition-all shadow-2xl active:scale-95">
                          <Send size={32} />
                         </button>
                      </div>
                   </form>
                </div>
              </>
            )}
            {activeTab === 'monitor' && (
              <div className="flex-grow p-12 flex items-center justify-center text-center">
                 <h2 className="text-4xl text-slate-800 uppercase tracking-[0.5em] font-black italic animate-pulse">Live Grid Monitoring Active...</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IntelligenceHub;