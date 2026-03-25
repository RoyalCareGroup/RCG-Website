import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Network, ShieldCheck, Activity, 
  Database, Terminal, Shield, Workflow, Wrench, 
  ArrowRight, Gauge, Command, Layers,
  Boxes, Code2, Globe, Search, CheckCircle2,
  AlertCircle, Layout, Plus, Minus
} from 'lucide-react';
import { SynkCrmLogo } from '../components/logos/SynkCrmLogo.tsx';
import { ClaimSynkLogo } from '../components/logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from '../components/logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from '../components/logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from '../components/logos/ChargeSynkLogo.tsx';
import { LaunchCountdown } from '../components/LaunchCountdown.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const Tech: React.FC = () => {
  const [activeMatrix, setActiveMatrix] = useState<string | null>('compliance');

  const tools = [
    { 
      id: 'crm', 
      name: 'SynkCRM', 
      version: 'v1.2',
      status: 'STABLE', 
      logo: <SynkCrmLogo width={200} height={45} />, 
      desc: 'Smart client management. Automated lifecycle tracking and predictive analytics to scale your business with confidence.',
      capabilities: ['Client Management', 'Plan Tracking', 'Integrations', 'Churn Prevention'],
      color: 'text-neon-blue'
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={50} isStable={true} />, 
      desc: 'Invoicing and claims made simple. Real-time validation, batch processing, and automatic error detection to protect your revenue.',
      capabilities: ['Real-time Checks', 'Error Detection', 'Batch Processing', 'Revenue Recovery'],
      color: 'text-neon-blue'
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={50} isStable={true} />, 
      desc: 'Turn voice notes into professional reports in seconds. AI-powered documentation that saves hours every week.',
      capabilities: ['Voice to Text', 'Smart Templates', 'Instant Reports', 'AI Assistance'],
      color: 'text-neon-purple'
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={50} isStable={false} />, 
      desc: 'Smart intake forms with automated risk flagging, agreement generation, and digital signatures built in.',
      capabilities: ['Risk Flagging', 'Auto-Fill', 'Secure Storage', 'Smart Logic'],
      color: 'text-neon-purple'
    },
    { 
      id: 'charge', 
      name: 'ChargeSYNK', 
      version: 'v1.0',
      status: 'PREVIEW', 
      logo: <ChargeSynkLogo size={50} isStable={true} />, 
      desc: 'Billing and payroll automation. Multi-location support with real-time reconciliation and revenue tracking.',
      capabilities: ['Payroll Sync', 'Multi-Location', 'Revenue Tracking', 'Reconciliation'],
      color: 'text-neon-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-royal-950 pt-24 pb-20 relative overflow-x-hidden">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-blue/5 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-neon-purple/5 rounded-full blur-[200px] animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HORIZONTAL PRODUCT PILLS */}
        <div className="flex flex-col gap-3 mb-20">
          {tools.map((tool) => (
            <div key={tool.id} className="p-4 rounded-xl border border-white/10 hover:border-neon-gold/40 hover:shadow-[0_0_15px_rgba(229,199,139,0.08)] bg-black/20 transition-all flex items-center gap-6">
              <div className="shrink-0 flex items-center justify-center w-[120px]">
                <div className="h-[30px] flex items-center">
                  {tool.logo}
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-mono font-black text-lg text-white uppercase tracking-tighter">{tool.name}</h3>
                  <span className="text-slate-400 text-sm font-mono truncate hidden sm:inline">{tool.desc}</span>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg border text-[9px] font-black tracking-[0.3em] bg-black/60 ${tool.status === 'STABLE' ? 'text-neon-blue border-neon-blue/40' : 'text-neon-purple border-neon-purple/40'}`}>
                  {tool.status}
                </span>
                <div className="hidden md:flex gap-1.5">
                  {tool.capabilities.map((cap, i) => (
                    <span key={i} className="px-2.5 py-1 bg-royal-950/80 border border-royal-800 rounded-lg text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <Link to="/contact" className="text-slate-500 hover:text-neon-gold transition-all text-[10px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-2">
              Need something custom? <span className="underline">Start a conversation</span> <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* SYNK Ecosystem Section */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 bg-neon-purple/3 pointer-events-none blur-[200px]"></div>
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center px-5 py-2 rounded-xl bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-[10px] font-black tracking-[0.6em] uppercase mb-6 shadow-2xl">
              <Layers size={16} className="mr-4 animate-pulse" /> Coming Soon
            </div>
            <h2 className="text-5xl md:text-7xl font-mono font-black text-white uppercase tracking-tighter leading-none mb-8 text-spotlight">
              The Full SYNK<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue">Ecosystem.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
              Every tool we're building — some launched, some on the way.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8 relative z-10">
            {[
              { name: 'SynkCRM', desc: 'Client relationship management', status: 'LIVE' as const },
              { name: 'ClaimSYNK', desc: 'Invoice validation & claims', status: 'LIVE' as const },
              { name: 'ReportSYNK', desc: 'AI-powered documentation', status: 'LIVE' as const },
              { name: 'FormSYNK', desc: 'Smart intake forms', status: 'BETA' as const },
              { name: 'ChargeSYNK', desc: 'Billing & payroll automation', status: 'BETA' as const },
              { name: 'NoteSYNK', desc: 'NDIS compliance notes', status: 'COMING SOON' as const },
              { name: 'TextSYNK', desc: 'SMS to business logging', status: 'COMING SOON' as const },
              { name: 'CallSYNK', desc: 'Automatic call tracking', status: 'COMING SOON' as const },
              { name: 'mySYNK', desc: 'Participant self-management', status: 'COMING SOON' as const },
              { name: 'TrainSYNK', desc: 'Custom training packages', status: 'COMING SOON' as const },
              { name: 'SignSYNK', desc: 'Digital signatures & agreements', status: 'COMING SOON' as const },
              { name: 'BudgetSYNK', desc: 'Financial planning tools', status: 'COMING SOON' as const },
              { name: 'StoreSYNK', desc: 'Document vault & storage', status: 'COMING SOON' as const },
              { name: 'MapSYNK', desc: 'Service area mapping', status: 'COMING SOON' as const },
            ].map((product) => (
              <div
                key={product.name}
                className={`orbital-tile !bg-transparent !border !border-white/10 !shadow-none hover:!border-neon-gold/40 hover:!shadow-[0_0_20px_rgba(229,199,139,0.1)] p-5 rounded-2xl relative overflow-hidden group/eco transition-all duration-500 hover:scale-[1.03] ${
                  product.status === 'COMING SOON' ? 'opacity-70 hover:opacity-100' : ''
                }`}
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[8px] font-black tracking-[0.3em] uppercase mb-3 border ${
                  product.status === 'LIVE'
                    ? 'text-green-400 border-green-400/40 bg-green-400/10'
                    : product.status === 'BETA'
                    ? 'text-neon-blue border-neon-blue/40 bg-neon-blue/10'
                    : 'text-neon-purple border-neon-purple/40 bg-neon-purple/10'
                }`}>
                  {product.status}
                </div>
                <h4 className="text-white font-black text-sm uppercase tracking-tight mb-1.5 group-hover/eco:text-neon-blue transition-colors">
                  {product.name}
                </h4>
                <p className="text-slate-500 text-[11px] leading-relaxed font-light">
                  {product.desc}
                </p>
                <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-transparent ${
                  product.status === 'LIVE'
                    ? 'via-green-400'
                    : product.status === 'BETA'
                    ? 'via-neon-blue'
                    : 'via-neon-purple'
                } opacity-40`}></div>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <LaunchCountdown />
          </div>
        </div>

        {/* How We Solve It Section */}
        <div className="bg-royal-900/30 border border-white/5 rounded-[5rem] p-8 md:p-12 relative overflow-hidden group mb-20 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 p-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none">
            <Layers size={600} className="text-neon-purple animate-spin-slow" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-mono font-black text-white uppercase tracking-tighter leading-[1] mb-8 text-spotlight">
                    How We<br/>Solve It.
                  </h2>
                  <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-purple pl-10 italic">
                    "Select a business challenge to see how our tools solve it."
                  </p>
               </div>
               
               <div className="space-y-4">
                  {[
                    { id: 'compliance', label: 'Compliance Gaps', desc: 'Manual processes leading to missed audits, inconsistent records, and compliance risks.' },
                    { id: 'leakage', label: 'Revenue Leakage', desc: 'Unbilled services, missed invoices, and payment gaps eating into your bottom line.' },
                    { id: 'debt', label: 'Admin Overload', desc: 'Too much paperwork slowing your team down and limiting your capacity to grow.' }
                  ].map(matrix => (
                    <button
                      key={matrix.id}
                      onClick={() => setActiveMatrix(matrix.id)}
                      className={`w-full p-8 rounded-[2rem] border text-left transition-all duration-700 group/btn shadow-xl ${
                        activeMatrix === matrix.id 
                          ? 'bg-neon-purple/20 border-neon-purple/50 shadow-[0_20px_50_rgba(217,70,239,0.2)] scale-105' 
                          : 'bg-royal-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[12px] font-black uppercase tracking-[0.5em] ${activeMatrix === matrix.id ? 'text-white' : 'text-slate-600'}`}>{matrix.label}</span>
                        {activeMatrix === matrix.id ? <Minus size={18} className="text-neon-purple" /> : <Plus size={18} className="text-slate-800" />}
                      </div>
                      <p className={`text-[11px] leading-relaxed font-light ${activeMatrix === matrix.id ? 'text-slate-300' : 'text-slate-700'}`}>{matrix.desc}</p>
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-7 flex items-center justify-center">
               <div className="w-full glass border border-white/10 rounded-[3rem] p-6 relative min-h-[480px] flex flex-col items-center justify-center text-center bg-royal-950/80 shadow-3xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-40"></div>
                  {activeMatrix === 'compliance' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-1000">
                       <div className="flex justify-center gap-8">
                          <div className="hover:scale-110 transition-transform duration-500"><ReportSynkLogo size={100} isStable={true} /></div>
                          <div className="h-24 w-px bg-royal-800 self-center opacity-40"></div>
                          <div className="hover:scale-110 transition-transform duration-500"><FormSynkLogo size={100} isStable={false} /></div>
                       </div>
                       <h4 className="text-3xl font-mono font-black text-white uppercase tracking-tighter">Complete Compliance Solution</h4>
                       <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg mx-auto italic">
                          "Combining **ReportSYNK** automated documentation with **FormSYNK** smart intake creates a seamless, error-free compliance pipeline."
                       </p>
                       <div className="flex flex-wrap justify-center gap-4">
                          {['AUDIT-READY', 'AUTOMATED', 'ERROR-FREE'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-neon-blue bg-neon-blue/15 px-5 py-2.5 rounded-full border border-neon-blue/40 shadow-xl">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
                  {activeMatrix === 'leakage' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-1000">
                       <div className="flex justify-center gap-8">
                          <div className="hover:scale-110 transition-transform duration-500"><ClaimSynkLogo size={100} isStable={true} /></div>
                          <div className="h-24 w-px bg-royal-800 self-center opacity-40"></div>
                          <div className="hover:scale-110 transition-transform duration-500"><ChargeSynkLogo size={100} isStable={true} /></div>
                       </div>
                       <h4 className="text-3xl font-mono font-black text-white uppercase tracking-tighter">Revenue Protection</h4>
                       <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg mx-auto italic">
                          "**ClaimSYNK** audits your history to find missed income, while **ChargeSYNK** ensures every future invoice is billed accurately."
                       </p>
                       <div className="flex flex-wrap justify-center gap-4">
                          {['REVENUE-SECURE', 'AUTO-RECOVERY', 'OPTIMISED'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-neon-purple bg-neon-purple/15 px-5 py-2.5 rounded-full border border-neon-purple/40 shadow-xl">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
                  {activeMatrix === 'debt' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-1000">
                       <div className="flex justify-center hover:scale-105 transition-transform duration-700">
                          <SynkCrmLogo width={350} height={80} />
                       </div>
                       <h4 className="text-3xl font-mono font-black text-white uppercase tracking-tighter">Operations Hub</h4>
                       <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg mx-auto italic">
                          "**SynkCRM** acts as your central operations layer, automating the entire flow from client onboarding to billing."
                       </p>
                       <div className="flex flex-wrap justify-center gap-4">
                          {['PAPERLESS', 'AUTOMATED', 'SCALABLE'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-green-500 bg-green-500/15 px-5 py-2.5 rounded-full border border-green-500/40 shadow-xl">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center py-16 border-t border-white/5 relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none"></div>
           <Link to="/contact" className="inline-flex flex-col items-center gap-6 group p-8 hover:scale-[1.02] transition-all duration-700">
              <span className="text-slate-600 text-[12px] font-mono uppercase tracking-[1.5em] font-black group-hover:text-neon-blue transition-colors animate-pulse">Ready to Get Started?</span>
              <div className="text-4xl md:text-5xl font-mono font-black text-white uppercase tracking-tighter group-hover:text-neon-blue transition-colors leading-none flex items-center gap-6">
                 Launch. 
                 <div className="p-6 md:p-8 rounded-full border-[6px] border-neon-blue group-hover:bg-neon-blue group-hover:text-white transition-all text-neon-blue shadow-[0_0_80px_rgba(6,182,212,0.3)]">
                    <ArrowRight size={36} className="group-hover:translate-x-6 transition-transform duration-700" />
                 </div>
              </div>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Tech;
