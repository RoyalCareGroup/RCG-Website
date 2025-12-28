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
  BarChart, Bar, Cell, PieChart, Pie, RadialBarChart, RadialBar
} from 'recharts';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatSender, ChatMessage } from '../types/index.ts';
import { BackupButton } from '../components/BackupButton.tsx';
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
      text: `Neural interface established. RCG Structural Intelligence Node v${COMPANY_DETAILS.appVersion} online.\n\nIndustry Grounding Status: [ACTIVE]\nRegulatory Parity: [2024/25 GUIDEBOARD]\n\nI am authorized to assist with organizational re-engineering and national NDIS strategy. State your inquiry protocol.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'chat' | 'audit'>('monitor');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [auditData, setAuditData] = useState({ participants: '', staff: '', mainPain: '' });
  const [strategyResult, setStrategyResult] = useState<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const userMsgObj: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsgObj]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === ChatSender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const { text, sources } = await sendChatMessage(userMessage, history, true);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: ChatSender.BOT,
        timestamp: new Date(),
        sources: sources
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error('Intelligence Error:', error);
      setMessages(prev => [...prev, { 
        id: 'err-' + Date.now(),
        sender: ChatSender.BOT, 
        text: "CRITICAL: Link Failure. Logic bridge destabilized. Re-deploying neural node...",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditData.mainPain.trim() || isLoading) return;

    setIsLoading(true);
    setStrategyResult(null);

    try {
      const prompt = `Perform a TFix Structural Audit & Claim Audit. 
      Organization Parameters: ${auditData.participants} participants, ${auditData.staff} staff. 
      Primary Operational Burden: ${auditData.mainPain}.
      
      Generate a structural AI Compliance & Scale Protocol. 
      Format requirements:
      1. RISK VECTORS: Critical compliance slippage points.
      2. SYNK DEPLOYMENT: Solution mapping via module chassis.
      3. SCALE PROTOCOL: Sequence for 40%+ efficiency gain.
      4. REVENUE RECOVERY: Yield optimization projection.
      5. NDIS GROUNDING: Current industry contextual implications.
      
      Maintain an elite, technical, RCG-standard tone.`;

      const { text, sources } = await sendChatMessage(prompt, [], true);
      setStrategyResult({ text, sources });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen bg-royal-950 flex flex-col items-center overflow-hidden">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-neon-purple/5 rounded-full blur-[180px]"></div>
      </div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-3 space-y-8 hidden lg:block">
          <div className="orbital-tile p-8 flex flex-col gap-8 bg-royal-900/40 border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-blue/15 rounded-xl border border-neon-blue/30 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                <Globe className="text-neon-blue animate-pulse" size={24} />
              </div>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-1.5">Grid Operations</div>
                <div className="text-[12px] font-mono text-white font-bold uppercase">NODE_v{COMPANY_DETAILS.appVersion.split('-')[0]}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.6em] mb-4 pl-2 border-l-2 border-royal-800">Interface Controls</div>
              {[
                { label: 'Grid Monitor', id: 'monitor', icon: <Gauge size={16} /> },
                { label: 'Neural Scout', id: 'chat', icon: <Terminal size={16} /> },
                { label: 'TFix Diagnostic', id: 'audit', icon: <ShieldCheck size={16} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-[1rem] border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                    activeTab === tab.id 
                      ? 'bg-neon-blue/20 border-neon-blue/50 text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)]' 
                      : 'bg-royal-950/60 border-white/5 text-slate-500 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={activeTab === tab.id ? 'text-neon-blue' : 'text-slate-700'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="orbital-tile p-8 bg-royal-900/30 border-white/5 shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-neon-purple animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Grid Pulse</span>
                </div>
                <div className="text-[8px] font-mono text-neon-green font-bold animate-pulse">OPTIMIZED</div>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[8px] text-slate-500 uppercase tracking-[0.4em] font-black">Neural Load</span>
                      <span className="text-[10px] text-neon-blue font-mono font-bold">12%</span>
                   </div>
                   <div className="w-full h-1.5 bg-royal-950 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <div className="h-full bg-neon-blue w-[12%] shadow-[0_0_15px_#06b6d4] rounded-full"></div>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[8px] text-slate-500 uppercase tracking-[0.4em] font-black">Grid Integrity</span>
                      <span className="text-[10px] text-neon-purple font-mono font-bold">99.98%</span>
                   </div>
                   <div className="w-full h-1.5 bg-royal-950 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <div className="h-full bg-neon-purple w-[99.9%] shadow-[0_0_15px_#d946ef] rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 text-center bg-royal-900/20 rounded-[2rem] border border-white/5 shadow-inner">
             <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-6">Structural Transfer</div>
             <BackupButton />
          </div>
        </div>

        {/* Main Operational Interface */}
        <div className="lg:col-span-9 flex flex-col h-[850px]">
          <div className="flex-grow glass rounded-[3rem] border border-white/10 flex flex-col overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative bg-royal-950/80 backdrop-blur-3xl">
            
            <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between bg-royal-900/40 relative">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-60"></div>
               <div className="flex items-center gap-8">
                  <div className="p-4 bg-royal-950 rounded-2xl border border-white/10 shadow-3xl hover:border-neon-blue transition-colors cursor-help">
                    {activeTab === 'chat' ? <Terminal className="text-neon-purple" size={28} /> : activeTab === 'monitor' ? <Gauge className="text-neon-blue" size={28} /> : <ShieldCheck className="text-neon-purple" size={28} />}
                  </div>
                  <div>
                    <h2 className="text-white font-black uppercase text-lg tracking-[0.5em] leading-none mb-2">
                      {activeTab === 'chat' ? 'Intelligence Node' : activeTab === 'monitor' ? 'National Grid' : 'Diagnostic Node'}
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 tracking-[0.4em] uppercase font-black opacity-60">
                       SYNK_CORE_v{COMPANY_DETAILS.appVersion.split('-')[0]}
                    </p>
                  </div>
               </div>
               <div className="hidden sm:flex items-center gap-5 glass px-6 py-3 rounded-xl border border-white/10 bg-royal-900/60 shadow-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_12px_#10b981]"></div>
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">SYSTEM_STABLE</span>
                  <Maximize2 size={14} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
               </div>
            </div>

            {activeTab === 'monitor' && (
              <div className="flex-grow overflow-y-auto p-10 space-y-12 scrollbar-hide">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="orbital-tile p-10 flex flex-col gap-8 bg-royal-900/30">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-neon-blue/15 rounded-xl border border-neon-blue/30 shadow-inner">
                               <ShieldCheck className="text-neon-blue" size={20} />
                             </div>
                             <div>
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Adherence Index</span>
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Regulatory Sync Protocol</p>
                             </div>
                          </div>
                          <div className="text-[10px] font-mono text-neon-green font-black bg-neon-green/10 px-3 py-1 rounded-lg border border-neon-green/20">+14.2% MoM</div>
                       </div>
                       <div className="h-56 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={COMPLIANCE_TREND}>
                                <defs>
                                   <linearGradient id="colorScoreHub" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#020817', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '10px' }} />
                                <Area type="monotone" dataKey="score" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScoreHub)" strokeWidth={4} animationDuration={2000} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="orbital-tile p-10 flex flex-col gap-8 bg-royal-900/30">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-neon-purple/15 rounded-xl border border-neon-purple/30 shadow-inner">
                               <DollarSign className="text-neon-purple" size={20} />
                             </div>
                             <div>
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Yield Recovery Node</span>
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Leakage Suppression v2</p>
                             </div>
                          </div>
                          <span className="text-[9px] font-black text-neon-purple uppercase tracking-[0.4em] bg-neon-purple/10 px-3 py-1 rounded-lg border border-neon-purple/30 animate-pulse">Live Uplink</span>
                       </div>
                       <div className="h-56 w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie data={RECOVERY_DATA} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                                   {RECOVERY_DATA.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-70 transition-opacity cursor-crosshair" />
                                   ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020817', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }} />
                             </PieChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                       { label: 'Slippage Detected', value: '412 Units', icon: <FileSearch size={24} className="text-neon-blue" />, sub: "X-84" },
                       { label: 'Neural Latency', value: '14.2ms', icon: <Activity size={24} className="text-neon-purple" />, sub: "OPTIMAL" },
                       { label: 'Recoverable Assets', value: '$84,200', icon: <Zap size={24} className="text-neon-green" />, sub: "+22%" }
                    ].map((stat, i) => (
                       <div key={i} className="orbital-tile p-8 flex items-center gap-8 bg-royal-900/20 hover:scale-105 transition-all shadow-3xl">
                          <div className="p-4 bg-royal-950 rounded-xl border border-white/5 shadow-inner text-white">
                             {stat.icon}
                          </div>
                          <div>
                             <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-1.5">{stat.label}</div>
                             <div className="text-2xl font-display font-black text-white mb-1.5">{stat.value}</div>
                             <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">{stat.sub}</div>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="orbital-tile p-12 flex flex-col md:flex-row items-center justify-between gap-12 bg-royal-900/40 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                    <div className="space-y-6">
                       <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">Execute Structural Audit.</h3>
                       <p className="text-slate-300 font-light text-lg max-w-2xl border-l-4 border-neon-blue pl-8 leading-relaxed italic">
                          "Identify critical organizational debt. Manifest high-fidelity strategies for immediate scale."
                       </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('audit')}
                      className="px-12 py-6 bg-white text-black font-black text-[11px] tracking-[0.7em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-2xl flex items-center gap-5 group active:scale-95"
                    >
                       Initialize Diagnostic <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-neon-purple" />
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-12 scrollbar-hide relative bg-[#010617]/50">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-8 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-5 duration-1000`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-3xl relative group ${
                        m.sender === ChatSender.USER ? 'bg-neon-blue/15 border border-neon-blue/40 text-neon-blue' : 'bg-royal-900 border border-white/5 text-neon-purple shadow-inner'
                      }`}>
                        {m.sender === ChatSender.USER ? <User size={32} /> : <Bot size={32} />}
                      </div>
                      
                      <div className={`max-w-[80%] p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-700 ${
                        m.sender === ChatSender.USER 
                          ? 'bg-royal-900/90 text-white rounded-tr-none border border-white/10 shadow-3xl' 
                          : 'bg-royal-800/50 text-slate-200 rounded-tl-none border border-white/10 shadow-inner backdrop-blur-3xl'
                      }`}>
                        <div className="text-[10px] font-black uppercase tracking-[0.6em] opacity-50 mb-6 flex justify-between border-b border-white/5 pb-4">
                          <span className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${m.sender === ChatSender.USER ? 'bg-neon-blue' : 'bg-neon-purple'} animate-pulse shadow-[0_0_8px_currentColor]`}></div>
                             {m.sender === ChatSender.USER ? 'OPERATOR' : 'RCG_ENGINE'}
                          </span>
                          <span className="font-mono">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="text-lg leading-[1.7] whitespace-pre-wrap font-light tracking-wide text-slate-200">{m.text}</div>
                        
                        {m.sources && m.sources.length > 0 && (
                          <div className="mt-10 pt-8 border-t border-white/10 bg-black/20 -mx-10 -mb-10 px-10 pb-10">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center gap-4 mb-6">
                               <Globe size={16} className="text-neon-blue" /> Grounded Regulatory Links
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {m.sources.map((source, idx) => source.web && (
                                <a key={idx} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-8 py-5 bg-royal-900/60 border border-white/5 rounded-xl text-[11px] text-slate-400 hover:text-white hover:border-neon-blue/50 transition-all shadow-2xl">
                                  <span className="font-bold tracking-[0.1em] truncate max-w-[150px] uppercase">{source.web.title || 'Regulatory Node'}</span>
                                  <ExternalLink size={14} className="opacity-30 group-hover:opacity-100 text-neon-blue" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-10 bg-royal-900/60 border-t border-white/10 backdrop-blur-3xl">
                   <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto relative group">
                      <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Command core logic layer..." 
                        className="w-full bg-royal-950 border border-white/10 rounded-[2rem] py-8 pl-10 pr-40 focus:outline-none focus:border-neon-blue transition-all text-slate-100 font-mono text-lg shadow-inner" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                         <button type="submit" disabled={isLoading || !input.trim()} className="bg-white p-5 rounded-[1.5rem] text-black hover:bg-neon-blue hover:text-white transition-all shadow-xl active:scale-95">
                          <Send size={24} />
                         </button>
                      </div>
                   </form>
                </div>
              </>
            )}

            {activeTab === 'audit' && (
              <div className="flex-grow overflow-y-auto p-10 space-y-12 scrollbar-hide">
                <div className="max-w-4xl mx-auto">
                  {!strategyResult ? (
                    <div className="space-y-12 animate-fade-in py-8">
                       <div className="text-center space-y-6">
                          <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none text-spotlight">Initialize Diagnostic.</h3>
                          <p className="text-slate-500 font-light text-xl max-w-2xl mx-auto border-t border-royal-800 pt-6 italic leading-relaxed">
                            "Manifest organizational yield and compliance strategy tailored to your scale."
                          </p>
                       </div>

                       <form onSubmit={handleGenerateStrategy} className="space-y-12 orbital-tile p-12 md:p-16 bg-royal-900/40 border-white/10 relative shadow-3xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                             <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] ml-2">
                                   Participant Node
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="e.g., 65 Participants" 
                                  className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-white focus:border-neon-blue outline-none transition-all shadow-inner text-lg font-light" 
                                  value={auditData.participants}
                                  onChange={e => setAuditData({...auditData, participants: e.target.value})}
                                />
                             </div>
                             <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] ml-2">
                                   Staff Capacity
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="e.g., 18 FTE" 
                                  className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-white focus:border-neon-blue outline-none transition-all shadow-inner text-lg font-light" 
                                  value={auditData.staff}
                                  onChange={e => setAuditData({...auditData, staff: e.target.value})}
                                />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] ml-2">
                                Operational Bottleneck (Payload)
                             </label>
                             <textarea 
                               placeholder="Describe your primary operational burden..."
                               rows={4}
                               className="w-full bg-royal-950 border border-royal-800 rounded-[2rem] p-8 text-white focus:border-neon-blue outline-none resize-none font-light text-lg shadow-inner"
                               value={auditData.mainPain}
                               onChange={e => setAuditData({...auditData, mainPain: e.target.value})}
                             />
                          </div>

                          <button type="submit" disabled={isLoading || !auditData.mainPain} className="w-full py-8 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-black text-[12px] tracking-[0.8em] uppercase rounded-[2rem] hover:scale-102 active:scale-95 transition-all shadow-xl disabled:opacity-30 flex items-center justify-center gap-6">
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                            Synthesize Strategy
                          </button>
                       </form>
                    </div>
                  ) : (
                    <div className="space-y-16 py-8 animate-in fade-in duration-700">
                       <div className="flex items-center justify-between border-b border-white/10 pb-10">
                          <div className="flex items-center gap-8">
                             <div className="p-6 bg-neon-green/10 rounded-[2rem] border border-neon-green/30 text-neon-green">
                                <ShieldCheck size={40} />
                             </div>
                             <div>
                                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none mb-2">Diagnostic Manifest.</h3>
                                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.6em] font-black italic">VERIFIED_INTEGRITY</p>
                             </div>
                          </div>
                          <button onClick={() => setStrategyResult(null)} className="px-8 py-4 border border-royal-800 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] rounded-xl hover:text-white hover:border-white transition-all bg-royal-900/40">Re-Initialize</button>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="orbital-tile p-10 flex flex-col gap-6 bg-royal-900/40 relative overflow-hidden">
                             <div className="flex items-center gap-4 text-neon-purple mb-2">
                                <AlertTriangle size={24} />
                                <span className="text-[11px] font-black uppercase tracking-[0.6em]">Risk Analysis Node</span>
                             </div>
                             <div className="text-slate-300 font-light leading-[1.7] text-base border-l-4 border-neon-purple pl-8 italic">
                                {strategyResult.text.split('1. RISK VECTORS:')[1]?.split('2. SYNK DEPLOYMENT:')[0] || 'Analyzing...'}
                             </div>
                          </div>
                          <div className="orbital-tile p-10 flex flex-col gap-6 bg-royal-900/40 relative overflow-hidden">
                             <div className="flex items-center gap-4 text-neon-blue mb-2">
                                <Zap size={24} />
                                <span className="text-[11px] font-black uppercase tracking-[0.6em]">SYNK Module Matrix</span>
                             </div>
                             <div className="text-slate-300 font-light leading-[1.7] text-base border-l-4 border-neon-blue pl-8 italic">
                                {strategyResult.text.split('2. SYNK DEPLOYMENT:')[1]?.split('3. SCALE PROTOCOL:')[0] || 'Mapping...'}
                             </div>
                          </div>
                       </div>

                       <div className="orbital-tile p-12 bg-neon-blue/5 border-neon-blue/20 text-center shadow-3xl">
                          <h4 className="text-white font-black text-lg uppercase tracking-[0.6em] mb-8 flex items-center justify-center">
                             <Gauge className="mr-4 text-neon-blue animate-pulse" size={28} /> Sequence Roadmap
                          </h4>
                          <div className="text-slate-100 font-light leading-[1.8] text-xl italic opacity-95">
                             {strategyResult.text.split('3. SCALE PROTOCOL:')[1]?.split('4. REVENUE RECOVERY:')[0] || 'Calculating...'}
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="p-10 md:p-12 bg-royal-900/70 border-t border-white/5 backdrop-blur-3xl mt-auto">
               <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">
                  <div className="flex items-center"><ShieldCheck size={14} className="mr-3 text-neon-blue" /> AES-256 SECURED</div>
                  <div className="flex items-center"><Activity size={14} className="mr-3 text-neon-purple" /> GRID_CORE: ACTIVE</div>
                  <div className="flex items-center"><Sparkles size={14} className="mr-3 text-neon-green" /> NDIS_GROUNDED</div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceHub;