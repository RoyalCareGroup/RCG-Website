
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
      text: 'Neural interface established. RCG Structural Intelligence Node v9.9.5 online.\n\nIndustry Grounding Status: [ACTIVE]\nRegulatory Parity: [2024/25 GUIDEBOARD]\n\nI am authorized to assist with organizational re-engineering and national NDIS strategy. State your inquiry protocol.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'chat' | 'audit'>('monitor');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Strategy Generator State
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
    <div className="pt-32 pb-32 px-6 min-h-screen bg-royal-950 flex flex-col items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.06)_0%,transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-3 space-y-6 hidden lg:block">
          {/* Node Operations Protocol */}
          <div className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col gap-10 shadow-2xl bg-royal-900/40">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-neon-blue/10 rounded-2xl border border-neon-blue/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Globe className="text-neon-blue animate-pulse" size={28} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-2">Grid Operations</div>
                <div className="text-[14px] font-mono text-white font-bold">AU-EAST_MAIN_NODE</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4 opacity-40">System Protocols</div>
              {[
                { label: 'Grid Monitor', id: 'monitor', icon: <Gauge size={18} /> },
                { label: 'Neural Scout', id: 'chat', icon: <Terminal size={18} /> },
                { label: 'TFix Diagnostic', id: 'audit', icon: <ShieldCheck size={18} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                    activeTab === tab.id 
                      ? 'bg-neon-blue/15 border-neon-blue/50 text-white shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                      : 'bg-royal-950/60 border-white/5 text-slate-600 hover:text-slate-300 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={activeTab === tab.id ? 'text-neon-blue' : 'text-slate-700'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                  {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_10px_#06b6d4]"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Infrastructure Telemetry */}
          <div className="glass p-10 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl bg-royal-900/40">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-neon-purple animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Grid Telemetry</span>
                </div>
                <div className="text-[9px] font-mono text-neon-green font-bold animate-pulse">OPTIMIZED</div>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">Neural Load</span>
                      <span className="text-[11px] text-neon-blue font-mono font-bold">12%</span>
                   </div>
                   <div className="w-full h-1.5 bg-royal-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-neon-blue w-[12%] shadow-[0_0_10px_#06b6d4]"></div>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">Grid Integrity</span>
                      <span className="text-[11px] text-neon-purple font-mono font-bold">99.98%</span>
                   </div>
                   <div className="w-full h-1.5 bg-royal-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-neon-purple w-[99.9%] shadow-[0_0_10px_#d946ef]"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-white/5 text-center shadow-2xl bg-royal-900/40">
             <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-6">Structural Export</div>
             <BackupButton />
          </div>
        </div>

        {/* Main Operational Interface */}
        <div className="lg:col-span-9 flex flex-col h-[850px]">
          <div className="flex-grow glass rounded-[4rem] border border-white/10 flex flex-col overflow-hidden shadow-3xl relative bg-royal-950/70 backdrop-blur-3xl">
            
            {/* INTERFACE HEADER PROTOCOL */}
            <div className="p-10 md:p-12 border-b border-white/5 flex items-center justify-between bg-royal-900/40 relative">
               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"></div>
               <div className="flex items-center gap-8">
                  <div className="p-5 bg-royal-950 rounded-3xl border border-white/10 shadow-inner group cursor-pointer hover:border-neon-blue/40 transition-colors">
                    {activeTab === 'chat' ? <Terminal className="text-neon-purple" size={28} /> : activeTab === 'monitor' ? <Gauge className="text-neon-blue" size={28} /> : <ShieldCheck className="text-neon-purple" size={28} />}
                  </div>
                  <div>
                    <h2 className="text-white font-black uppercase text-base tracking-[0.6em] leading-none mb-2">
                      {activeTab === 'chat' ? 'NEURAL_INTELLIGENCE_NODE' : activeTab === 'monitor' ? 'NATIONAL_ANALYTICS_GRID' : 'STRUCTURAL_DIAGNOSTIC_NODE'}
                    </h2>
                    <p className="text-[11px] font-mono text-slate-500 tracking-[0.4em] uppercase font-bold">
                       SYNK_CORE v9.9.5 // GROUNDING: [ACTIVE] // PROTOCOL: [SECURED]
                    </p>
                  </div>
               </div>
               <div className="hidden sm:flex items-center gap-4 glass px-6 py-3 rounded-2xl border border-white/10 bg-royal-900/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]"></div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">SYSTEM_STABLE</span>
                  <div className="w-px h-4 bg-royal-800 ml-2"></div>
                  <Maximize2 size={14} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
               </div>
            </div>

            {/* TAB CONTENT: MONITOR (ANALYTICS) */}
            {activeTab === 'monitor' && (
              <div className="flex-grow overflow-y-auto p-12 space-y-14 scrollbar-hide">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    {/* Compliance Analytics Chassis */}
                    <div className="glass p-10 rounded-[3.5rem] border border-white/5 flex flex-col gap-8 bg-royal-900/30">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-neon-blue/10 rounded-xl border border-neon-blue/20">
                               <ShieldCheck className="text-neon-blue" size={20} />
                             </div>
                             <div>
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Compliance Adherence</span>
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">National Standards Parity</p>
                             </div>
                          </div>
                          <div className="text-[11px] font-mono text-neon-green font-black bg-neon-green/10 px-3 py-1 rounded-md">+14.2% MoM</div>
                       </div>
                       <div className="h-56 w-full mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={COMPLIANCE_TREND}>
                                <defs>
                                   <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '10px' }}
                                  cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} animationDuration={2000} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                       <p className="text-[11px] text-slate-500 font-light leading-relaxed border-l-2 border-royal-800 pl-6">
                          Visualizing the aggregate structural adherence of organizational documentation nodes against NDIS Commission audit guideboards.
                       </p>
                    </div>

                    {/* Yield Optimization Chassis */}
                    <div className="glass p-10 rounded-[3.5rem] border border-white/5 flex flex-col gap-8 bg-royal-900/30">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
                               <DollarSign className="text-neon-purple" size={20} />
                             </div>
                             <div>
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Revenue Recovery Vector</span>
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Leakage Identification Node</p>
                             </div>
                          </div>
                          <span className="text-[9px] font-black text-neon-purple uppercase tracking-[0.3em] bg-neon-purple/10 px-3 py-1 rounded-md animate-pulse">Live Tracking</span>
                       </div>
                       <div className="h-56 w-full flex items-center justify-center mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie
                                   data={RECOVERY_DATA}
                                   innerRadius={65}
                                   outerRadius={85}
                                   paddingAngle={8}
                                   dataKey="value"
                                   stroke="none"
                                >
                                   {RECOVERY_DATA.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                   ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                             </PieChart>
                          </ResponsiveContainer>
                       </div>
                       <div className="grid grid-cols-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 border-t border-royal-800 pt-6">
                          <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#06b6d4]"></div> RECOVERED</div>
                          <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div> SLIPPAGE</div>
                          <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_8px_#d946ef]"></div> POTENTIAL</div>
                       </div>
                    </div>
                 </div>

                 {/* Real-time Diagnostic Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                       { label: 'Slippage Detected', value: '412 Units', icon: <FileSearch size={24} className="text-neon-blue" />, sub: "Diagnostic ID: X-84" },
                       { label: 'Neural Latency', value: '14.2ms', icon: <Activity size={24} className="text-neon-purple" />, sub: "Grid Sync: OPTIMAL" },
                       { label: 'Recoverable Assets', value: '$84,200', icon: <Zap size={24} className="text-neon-green" />, sub: "Yield Increase: +22%" }
                    ].map((stat, i) => (
                       <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-8 bg-royal-900/20 group hover:border-white/10 transition-all duration-500 shadow-xl">
                          <div className="p-4 bg-royal-950 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:border-neon-blue/20 transition-all shadow-inner">
                             {stat.icon}
                          </div>
                          <div>
                             <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">{stat.label}</div>
                             <div className="text-2xl font-display font-black text-white mb-1">{stat.value}</div>
                             <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{stat.sub}</div>
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Audit Initialization Node */}
                 <div className="orbital-tile p-14 flex flex-col md:flex-row items-center justify-between gap-12 bg-royal-900/30 border-white/5 shadow-2xl">
                    <div className="space-y-6">
                       <h3 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-tight">Manifest Structural Strategy</h3>
                       <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto border-l-2 border-neon-blue pl-8 leading-relaxed">
                          Initialize the TFix Diagnostic Node to generate a high-fidelity organizational audit. We synthesize your parameters against national NDIS pricing and compliance gridboards.
                       </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('audit')}
                      className="px-12 py-6 bg-white text-black font-black text-[11px] tracking-[0.6em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-2xl flex items-center gap-4 group active:scale-95"
                    >
                       Initialize Diagnostic <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            )}

            {/* TAB CONTENT: NEURAL SCOUT (CHAT TERMINAL) */}
            {activeTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 space-y-12 scrollbar-hide relative bg-[#01040f]/40">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#01040f] to-transparent pointer-events-none opacity-40"></div>
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-10 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                      <div className={`w-16 h-16 rounded-[1.75rem] flex items-center justify-center flex-shrink-0 shadow-2xl relative group ${
                        m.sender === ChatSender.USER ? 'bg-neon-blue/10 border border-neon-blue/30 text-neon-blue' : 'bg-royal-900 border border-white/5 text-neon-purple shadow-inner'
                      }`}>
                        <div className={`absolute inset-0 bg-current opacity-5 rounded-[1.75rem] blur-xl group-hover:opacity-20 transition-opacity`}></div>
                        {m.sender === ChatSender.USER ? <User size={32} className="relative z-10" /> : <Bot size={32} className="relative z-10" />}
                      </div>
                      
                      <div className={`max-w-[85%] p-10 rounded-[3rem] relative overflow-hidden transition-all duration-500 hover:border-white/10 ${
                        m.sender === ChatSender.USER 
                          ? 'bg-royal-900/90 text-white rounded-tr-none border border-white/5 shadow-2xl' 
                          : 'bg-royal-800/40 text-slate-200 rounded-tl-none border border-white/5 shadow-inner backdrop-blur-3xl'
                      }`}>
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-6 flex justify-between border-b border-white/5 pb-4">
                          <span className="flex items-center gap-3">
                             <div className={`w-1.5 h-1.5 rounded-full ${m.sender === ChatSender.USER ? 'bg-neon-blue' : 'bg-neon-purple'} animate-pulse`}></div>
                             {m.sender === ChatSender.USER ? 'OPERATOR_MAIN_ID' : 'RCG_STRUCTURAL_INTELLIGENCE'}
                          </span>
                          <span className="font-mono">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>
                        <div className="text-lg leading-relaxed whitespace-pre-wrap font-light tracking-wide text-slate-200 selection:bg-neon-blue/40">{m.text}</div>
                        
                        {/* SOPHISTICATED GROUNDING NODES */}
                        {m.sources && m.sources.length > 0 && (
                          <div className="mt-12 pt-10 border-t border-white/5 bg-royal-950/30 -mx-10 -mb-10 px-10 pb-10">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-4 mb-6">
                               <Globe size={16} className="text-neon-blue" /> Verified Sovereignty Nodes
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {m.sources.map((source, idx) => source.web && (
                                <a key={idx} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-8 py-5 bg-royal-900/60 border border-white/5 rounded-2xl text-[11px] text-slate-400 hover:text-white hover:border-neon-blue/40 transition-all shadow-xl hover:translate-y-[-2px]">
                                  <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-royal-950 rounded-xl border border-white/5 group-hover:bg-neon-blue/10 transition-colors">
                                       <Search size={14} className="text-neon-blue" />
                                    </div>
                                    <span className="font-bold tracking-[0.1em] truncate max-w-[220px] uppercase">{source.web.title || 'Regulatory Node'}</span>
                                  </div>
                                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-30 group-hover:opacity-100 text-neon-blue" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-10 animate-pulse">
                      <div className="w-16 h-16 rounded-[1.75rem] bg-royal-900 flex items-center justify-center border border-white/5 shadow-inner">
                        <Loader2 size={32} className="text-neon-purple animate-spin" />
                      </div>
                      <div className="bg-royal-800/20 p-12 rounded-[3rem] rounded-tl-none border border-white/5 w-96 flex flex-col gap-5">
                        <div className="h-5 bg-white/5 rounded-full w-4/5"></div>
                        <div className="h-5 bg-white/5 rounded-full w-full"></div>
                        <div className="h-5 bg-white/5 rounded-full w-2/3"></div>
                        <div className="mt-4 flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"></div>
                           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Decrypting NDIS Guideboards...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#01040f] to-transparent pointer-events-none opacity-40"></div>
                </div>

                {/* TERMINAL INPUT PROTOCOL */}
                <div className="p-12 bg-royal-900/50 border-t border-white/5 backdrop-blur-3xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent"></div>
                   <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
                      <div className="relative">
                        <input 
                          value={input} 
                          onChange={(e) => setInput(e.target.value)} 
                          placeholder="Command core intelligence node..." 
                          className="w-full bg-royal-950 border border-white/10 rounded-[2.5rem] py-8 pl-12 pr-36 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all text-slate-100 font-mono text-base placeholder:text-slate-700 shadow-inner" 
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-4">
                           <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest hidden md:block">ENTER_TO_DECODE</div>
                           <button type="submit" disabled={isLoading || !input.trim()} className="bg-white p-5 rounded-[1.5rem] text-black disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-3xl flex items-center justify-center group-hover:bg-neon-blue group-hover:text-white">
                            <Send size={28} />
                           </button>
                        </div>
                      </div>
                   </form>
                </div>
              </>
            )}

            {/* TAB CONTENT: TFIX DIAGNOSTIC (AUDIT GENERATOR) */}
            {activeTab === 'audit' && (
              <div className="flex-grow overflow-y-auto p-12 space-y-14 scrollbar-hide">
                <div className="max-w-5xl mx-auto">
                  {!strategyResult ? (
                    <div className="space-y-14 animate-fade-in py-10">
                       <div className="text-center space-y-6">
                          <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">Initialize Structural Audit</h3>
                          <p className="text-slate-500 font-light text-xl max-w-2xl mx-auto border-t border-royal-800 pt-6">Manifest high-fidelity organizational yield and compliance strategy protocols.</p>
                       </div>

                       <form onSubmit={handleGenerateStrategy} className="space-y-12 glass p-12 md:p-16 rounded-[4rem] border border-white/5 bg-royal-900/40 relative shadow-3xl">
                          <div className="absolute top-0 left-10 p-4 bg-royal-950 border border-white/5 rounded-b-2xl shadow-xl">
                             <Command size={20} className="text-neon-blue" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                             <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 flex items-center gap-3">
                                   <Users size={14} className="text-neon-blue" /> Participant Load
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="e.g., 65 Participants (SIL/CORE)" 
                                  className="w-full bg-royal-950/80 border border-royal-800 rounded-2xl p-6 text-white focus:border-neon-blue outline-none transition-all shadow-inner text-lg" 
                                  value={auditData.participants}
                                  onChange={e => setAuditData({...auditData, participants: e.target.value})}
                                />
                             </div>
                             <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 flex items-center gap-3">
                                   <Briefcase size={14} className="text-neon-purple" /> Staff Capacity
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="e.g., 18 FTE / 24 Casual" 
                                  className="w-full bg-royal-950/80 border border-royal-800 rounded-2xl p-6 text-white focus:border-neon-blue outline-none transition-all shadow-inner text-lg" 
                                  value={auditData.staff}
                                  onChange={e => setAuditData({...auditData, staff: e.target.value})}
                                />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 flex items-center gap-3">
                                <Activity size={14} className="text-neon-red" /> Critical Operational Bottleneck
                             </label>
                             <textarea 
                               placeholder="e.g., Our SIL documentation process is manual, causing 12 hours of administrative debt per week and high audit anxiety..."
                               rows={7}
                               className="w-full bg-royal-950/80 border border-royal-800 rounded-3xl p-8 text-white focus:border-neon-blue outline-none resize-none font-light text-lg shadow-inner"
                               value={auditData.mainPain}
                               onChange={e => setAuditData({...auditData, mainPain: e.target.value})}
                             />
                          </div>

                          <button 
                            type="submit" 
                            disabled={isLoading || !auditData.mainPain}
                            className="w-full py-8 bg-gradient-to-r from-neon-purple via-indigo-600 to-neon-blue text-white font-black text-[12px] tracking-[0.7em] uppercase rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(217,70,239,0.2)] disabled:opacity-30 flex items-center justify-center gap-6"
                          >
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                            {isLoading ? 'Synthesizing Strategic Logic...' : 'Manifest Compliance Strategy'}
                          </button>
                       </form>
                    </div>
                  ) : (
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 py-10">
                       <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-12 gap-8">
                          <div className="flex items-center gap-8">
                             <div className="p-6 bg-neon-green/10 rounded-[2.5rem] border border-neon-green/30 text-neon-green shadow-[0_0_30px_rgba(16,187,129,0.15)]">
                                <ShieldCheck size={48} />
                             </div>
                             <div>
                                <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none mb-3">Strategic Blueprint Manifest</h3>
                                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.5em] font-bold">Status: [STRUCTURAL_INTEGRITY_VERIFIED]</p>
                             </div>
                          </div>
                          <button onClick={() => setStrategyResult(null)} className="px-8 py-4 border border-royal-800 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:border-white transition-all active:scale-95 bg-royal-900/50 shadow-xl">Reset Diagnostic</button>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="glass p-10 rounded-[3.5rem] border border-white/5 flex flex-col gap-6 bg-royal-900/40 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-neon-red/5 blur-3xl rounded-full"></div>
                             <div className="flex items-center gap-4 text-neon-purple mb-4">
                                <AlertTriangle size={24} />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em]">Risk Analysis Node</span>
                             </div>
                             <div className="text-slate-300 font-light leading-relaxed prose-invert text-base border-l-2 border-neon-purple pl-8 py-2">
                                {strategyResult.text.split('1. RISK VECTORS:')[1]?.split('2. SYNK DEPLOYMENT:')[0] || 'Analyzing vectors...'}
                             </div>
                          </div>
                          <div className="glass p-10 rounded-[3.5rem] border border-white/5 flex flex-col gap-6 bg-royal-900/40 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl rounded-full"></div>
                             <div className="flex items-center gap-4 text-neon-blue mb-4">
                                <Zap size={24} />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em]">SYNK Module Selection</span>
                             </div>
                             <div className="text-slate-300 font-light leading-relaxed text-base border-l-2 border-neon-blue pl-8 py-2">
                                {strategyResult.text.split('2. SYNK DEPLOYMENT:')[1]?.split('3. SCALE PROTOCOL:')[0] || 'Mapping solutions...'}
                             </div>
                          </div>
                       </div>

                       <div className="glass p-12 rounded-[4rem] border border-neon-blue/20 bg-neon-blue/5 relative shadow-3xl">
                          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 px-8 py-3 bg-neon-blue text-black font-black text-[10px] tracking-[0.5em] uppercase rounded-full shadow-[0_0_30px_#06b6d4]">
                             Execution Roadmap
                          </div>
                          <h4 className="text-white font-black text-base uppercase tracking-[0.5em] mb-10 flex items-center justify-center">
                             <Gauge className="mr-5 text-neon-blue" size={28} /> Scale Protocol Sequence
                          </h4>
                          <div className="text-slate-100 font-light leading-[2] text-xl text-center max-w-4xl mx-auto italic opacity-90">
                             {strategyResult.text.split('3. SCALE PROTOCOL:')[1]?.split('4. REVENUE RECOVERY:')[0] || 'Calculating roadmap...'}
                          </div>
                       </div>

                       <div className="bg-royal-900/30 p-12 rounded-[3rem] border border-white/5 relative group">
                          <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[3rem]"></div>
                          <div className="text-[11px] font-black text-slate-600 uppercase tracking-[0.6em] mb-6 flex items-center gap-3">
                             <History size={16} /> Grounded Regulatory Context
                          </div>
                          <div className="text-slate-400 text-sm italic font-light leading-relaxed border-l border-royal-800 pl-8">
                             {strategyResult.text.split('5. NDIS GROUNDING:')[1] || 'Syncing current pricing guidelines from national grid...'}
                          </div>
                       </div>

                       {/* COMPREHENSIVE GROUNDING CITATIONS */}
                       {strategyResult.sources && strategyResult.sources.length > 0 && (
                          <div className="space-y-8">
                             <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6">
                                <Globe size={18} className="text-neon-blue animate-pulse" /> Verifiable Regulatory Grounds
                             </h5>
                             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {strategyResult.sources.map((s: any, i: number) => s.web && (
                                  <a key={i} href={s.web.uri} target="_blank" className="px-8 py-6 glass border border-white/5 rounded-[2rem] text-[11px] text-slate-400 hover:text-white hover:border-neon-blue/40 transition-all flex items-center justify-between group shadow-xl bg-royal-900/20 active:scale-95">
                                     <div className="flex items-center gap-5">
                                        <div className="p-3 bg-royal-950 rounded-xl border border-white/5 group-hover:border-neon-blue/30 transition-all">
                                           <Search size={16} className="text-neon-blue" />
                                        </div>
                                        <span className="font-bold tracking-[0.1em] truncate max-w-[140px] uppercase">{s.web.title}</span>
                                     </div>
                                     <ExternalLink size={14} className="opacity-20 group-hover:opacity-100 text-neon-blue transition-opacity" />
                                  </a>
                                ))}
                             </div>
                          </div>
                       )}

                       <div className="flex justify-center pt-12">
                          <button onClick={() => window.print()} className="px-16 py-7 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5 group active:scale-95">
                             <FileText size={20} className="group-hover:animate-pulse" /> Export Strategic Protocol (.pdf)
                          </button>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* INTEGRATED HUB HUD FOOTER */}
            <div className="p-10 md:p-12 bg-royal-900/60 border-t border-white/5 backdrop-blur-3xl mt-auto relative">
               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"></div>
               <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-16 text-[10px] font-black text-slate-600 uppercase tracking-[0.6em]">
                  <div className="flex items-center group cursor-help"><ShieldCheck size={14} className="mr-3 text-neon-blue group-hover:animate-pulse" /> AES-256 SECURED</div>
                  <div className="flex items-center group cursor-help"><Activity size={14} className="mr-3 text-neon-purple group-hover:animate-pulse" /> CORE LOAD: 12.4%</div>
                  <div className="flex items-center group cursor-help"><Sparkles size={14} className="mr-3 text-neon-green group-hover:animate-pulse" /> NDIS GROUNDED</div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceHub;
