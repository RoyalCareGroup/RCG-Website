import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Send, Bot, User, Loader2, 
  ShieldCheck, Activity, Globe, Gauge, Mail, Microscope
} from 'lucide-react';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatSender, ChatMessage } from '../types/index.ts';
import { BackupButton } from './BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from './DecodingText.tsx';

const IntelligenceHub: React.FC = () => {
  const operatorName = localStorage.getItem('rcg_visitor_name') || 'Authorized Operator';
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', sender: ChatSender.BOT, text: `Neural baseline v${COMPANY_DETAILS.appVersion} established. SYNK_CORE standing by.`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'chat'>('chat');
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
      const { text } = await sendChatMessage(userMsg.text, history, true);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text, sender: ChatSender.BOT, timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', sender: ChatSender.BOT, text: "Link Failure.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col bg-[#334155] min-h-screen px-4 sm:px-12 lg:px-16 xl:px-24 relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-24 lg:pt-32 pb-12">
        <div className="lg:col-span-3 space-y-4">
          <div className="orbital-tile p-5 bg-black border-2 border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-neon-blue animate-spin-slow" size={20} />
              <div className="text-[11px] text-white font-black uppercase">CORE_UPLINK</div>
            </div>
            <div className="flex lg:flex-col gap-2">
              <button onClick={() => setActiveTab('chat')} className={`px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest ${activeTab === 'chat' ? 'bg-white text-black' : 'bg-royal-950 text-slate-500'}`}>
                <Terminal className="inline-block mr-2" size={12} /> Chat Node
              </button>
            </div>
          </div>
          <BackupButton />
        </div>

        <div className="lg:col-span-9 flex flex-col h-[600px] bg-black rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl">
          {activeTab === 'chat' ? (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-4 ${m.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 ${m.sender === ChatSender.USER ? 'border-neon-blue text-neon-blue' : 'border-white/10 text-neon-purple'}`}>
                      {m.sender === ChatSender.USER ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${m.sender === ChatSender.USER ? 'bg-royal-900 border-2 border-white/10' : 'bg-black border-2 border-white/5'}`}>
                      <p className="text-sm text-white font-bold italic">{m.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="animate-spin text-neon-blue mx-auto" />}
              </div>
              <form onSubmit={handleSendMessage} className="p-6 border-t-2 border-white/5 bg-[#050505] flex gap-4">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="INPUT_COMMAND..." className="flex-grow bg-black border-2 border-white/10 rounded-xl px-6 py-4 text-white font-black" />
                <button type="submit" className="bg-white p-4 rounded-xl text-black hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center">
                  <Send className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center opacity-20 space-y-4">
              <Microscope className="w-12 h-12 lg:w-16 lg:h-16" />
              <span className="font-black uppercase tracking-widest text-xs">Standby...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default IntelligenceHub;