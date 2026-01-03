import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, FileCheck, Scale, 
  Database, Shield, Globe, Activity, Terminal, 
  ArrowRight, Search, Cpu, Lock, CheckCircle2,
  ChevronRight, Gauge, Command, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { DecodingText } from '../components/DecodingText.tsx';

const RISK_VECTOR_DATA = [
  { subject: 'Privacy', A: 95, fullMark: 100 },
  { subject: 'Billing', A: 99, fullMark: 100 },
  { subject: 'Service Delivery', A: 92, fullMark: 100 },
  { subject: 'HR Compliance', A: 85, fullMark: 100 },
  { subject: 'Data Integrity', A: 98, fullMark: 100 },
];

const Governance: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const messages = [
      "Syncing with NDIS Practice Standards v5.4.2...",
      "Validating logic against National Quality Indicators...",
      "Diagnostic: Zero-gap documentation integrity verified.",
      "Structural Alert: Minor training node pending update.",
      "Policy Node: Automated protocol synchronization complete.",
      "Grid Integrity: STATUS_OPTIMAL_v10.9",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i % messages.length]}`].slice(-6));
      i++;
    }, 4500);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
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

      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-32 animate-hero-reveal">
          <div className="circuit-capsule mb-10 border-2 border-white/80 bg-black px-10 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Shield size={16} className="mr-4 animate-pulse text-neon-blue" /> National Sovereign Layer
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-10 uppercase leading-[0.85] tracking-tighter heading-wow">
            Sovereign<br/>
            <span className="heading-tech">Governance.</span>
          </h1>
          <div className="max-w-2xl relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10 mt-10">
            <DecodingText 
              text="Automating regulatory adherence through high-fidelity binary logic. We shift NDIS compliance from a human risk to a systemic certainty."
              className="text-xl md:text-2xl text-white font-black leading-tight tracking-wide opacity-100 italic"
              stagger={8}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-40 items-stretch">
           <div className="lg:col-span-7 orbital-tile p-12 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-16">
                 <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Integrity Matrix</h3>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] mt-3 font-mono">Live_Regulatory_Adherence_v10.9</p>
                 </div>
                 <div className="p-5 bg-royal-950 rounded-[1.2rem] text-neon-blue border-2 border-white/10 shadow-2xl animate-pulse">
                    <Gauge size={28} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                 <div className="h-[320px] w-full group">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_VECTOR_DATA}>
                          <PolarGrid stroke="#1e293b" strokeWidth={2} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: '900' }} />
                          <Radar
                             name="Compliance"
                             dataKey="A"
                             stroke="#06b6d4"
                             fill="#06b6d4"
                             fillOpacity={0.4}
                             strokeWidth={4}
                          />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Document Fidelity", val: "99.2%", color: "text-neon-blue" },
                      { label: "Risk Mitigation", val: "LEVEL 5", color: "text-neon-purple" },
                      { label: "Audit Readiness", val: "OPTIMAL", color: "text-neon-green" }
                    ].map((m, i) => (
                      <div key={i} className="p-8 bg-royal-950 border-2 border-white/5 rounded-[1.5rem] flex items-center justify-between shadow-inner hover:border-white transition-all group/item">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] group-hover/item:text-white transition-colors">{m.label}</span>
                         <span className={`text-2xl font-display font-black ${m.color} drop-shadow-[0_0_12px_currentColor]`}>{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="orbital-tile p-10 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex-grow flex flex-col">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                    <Terminal size={250} className="text-white" />
                 </div>
                 <div className="flex items-center gap-5 mb-10">
                    <div className="p-3 bg-royal-950 rounded-xl text-neon-purple border-2 border-white/5 shadow-2xl animate-pulse">
                       <Activity size={20} />
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Policy Node Real-time</span>
                 </div>
                 <div className="space-y-5 font-mono text-[13px] h-64 overflow-hidden flex-grow scrollbar-hide">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-5 text-slate-500 group/log">
                          <span className="text-neon-blue opacity-40 font-black">#</span>
                          <span className="group-hover/log:text-white transition-colors leading-relaxed font-bold">{log}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Protocol: SYNK_GND_v10.9</div>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-black text-neon-green uppercase tracking-widest">Grid_Live</span>
                       <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_20px_#10b981]"></div>
                    </div>
                 </div>
              </div>

              <div className="orbital-tile p-10 bg-black border-2 border-white/5 flex items-center gap-8 group hover:border-white transition-all shadow-3xl">
                 <div className="p-5 bg-royal-950 rounded-2xl border-2 border-white/10 text-neon-blue shadow-inner group-hover:scale-110 transition-transform">
                    <Lock size={28} />
                 </div>
                 <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-2">Data Sovereignty Node</div>
                    <p className="text-[12px] text-white font-black leading-relaxed italic opacity-60">"AES-256 encryption active across clusters."</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
           {[
             { 
               icon: <Scale size={32} className="text-neon-blue" />, 
               title: "Regulatory Parity", 
               desc: "Dynamic policy architecture that updates your organizational guideboards in real-time as NDIS standards evolve."
             },
             { 
               icon: <ShieldCheck size={32} className="text-neon-purple" />, 
               title: "Automated Auditing", 
               desc: "Deep-scan algorithms for support logs and financial trails. We catch discrepancies at the logic layer."
             },
             { 
               icon: <Layers size={32} className="text-neon-blue" />, 
               title: "Executive Oversight", 
               desc: "Board-level dashboards providing 100% visibility into national service delivery nodes. Data-driven governance."
             }
           ].map((pillar, i) => (
             <div key={i} className="orbital-tile p-14 group hover:border-white bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col min-h-[480px]">
                <div className="mb-12 p-6 bg-royal-950 border-2 border-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-2xl">
                   {pillar.icon}
                </div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-none group-hover:text-neon-blue transition-colors">{pillar.title}</h3>
                <p className="text-white text-lg leading-relaxed font-black mb-12 flex-grow italic opacity-80 group-hover:opacity-100 transition-opacity">"{pillar.desc}"</p>
                <div className="mt-auto flex items-center gap-4 text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] font-black group-hover:text-neon-blue transition-colors">
                   <CheckCircle2 size={16} className="text-neon-green" /> Standard {i + 1}.4 Certified
                </div>
             </div>
           ))}
        </div>

        <div className="banner-pop bg-black border-2 border-white/10 rounded-[5rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-0 p-32 opacity-[0.01] group-hover:opacity-[0.04] transition-opacity duration-1000 pointer-events-none">
            <Command size={500} className="animate-spin-slow text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-16">
            <div className="circuit-capsule border-2 border-white/80 text-white bg-black px-12 py-5 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <AlertTriangle size={24} className="mr-4 animate-pulse text-neon-purple" /> Risk Mitigation Protocol Active
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter heading-wow">
              Structural<br/>
              <span className="heading-tech">Integrity.</span>
            </h2>
            <p className="text-2xl text-white font-black leading-relaxed max-w-4xl italic opacity-70">
              "We identify Governance Debt—the accumulated risk of manual oversight—and replace it with high-fidelity SYNK sovereign logic."
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 pt-10">
               <Link to="/contact" className="slim-orbital-btn px-16 py-7 text-black bg-white font-black text-[12px] tracking-[0.8em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-4">
                 Execute Governance Audit <ShieldCheck size={20} className="text-neon-blue" />
               </Link>
               <Link to="/tech" className="slim-orbital-btn px-16 py-7 border-2 border-white/30 text-white font-black text-[12px] tracking-[0.8em] uppercase transition-all hover:bg-white/5">
                 Explore Ecosystem
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;