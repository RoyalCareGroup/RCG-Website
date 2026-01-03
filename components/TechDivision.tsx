import React, { useState, useEffect } from 'react';
import { Activity, Settings, Wrench, ShieldCheck, Gauge, Cpu, Network } from 'lucide-react';
import { ClaimSynkLogo } from './logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from './logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from './logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from './logos/ChargeSynkLogo.tsx';
import { SynkCrmLogo } from './logos/SynkCrmLogo.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const TelemetryValue = () => {
  const [val, setVal] = useState("00.00");
  useEffect(() => {
    const int = setInterval(() => {
      setVal((Math.random() * 100).toFixed(2));
    }, 2000);
    return () => clearInterval(int);
  }, []);
  return <span>{val}</span>;
};

const SynkModuleChassis: React.FC<{ 
  id: string;
  title: string;
  status: string;
  icon: React.ReactNode;
  desc: string;
  specs: string[];
  isStable: boolean;
}> = ({ id, title, status, icon, desc, specs, isStable }) => {
  const accent = isStable ? 'text-neon-blue' : 'text-neon-purple';
  const border = isStable ? 'border-neon-blue/30 group-hover:border-neon-blue' : 'border-neon-purple/30 group-hover:border-neon-purple';
  
  return (
    <div className="relative group transition-all duration-700 h-full">
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${isStable ? 'from-neon-blue/20 to-transparent' : 'from-neon-purple/20 to-transparent'} rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000`}></div>
      
      <div className={`relative bg-royal-950/80 backdrop-blur-xl border ${border} rounded-3xl p-10 h-full flex flex-col shadow-2xl overflow-hidden`}>
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.3em]">MODULE ID</span>
            <span className="text-[10px] font-mono text-white tracking-widest">RC-SYNK-{id.toUpperCase()}</span>
          </div>
          <div className={`px-4 py-1 rounded-lg border text-[8px] font-black tracking-[0.2em] bg-black/40 ${accent} ${isStable ? 'border-neon-blue/50' : 'border-neon-purple/50'}`}>
            {status}
          </div>
        </div>

        <div className="mb-8">
          <div className={`mb-6 group-hover:scale-105 transition-transform origin-left`}>
            {icon}
          </div>
          <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">{title}</h3>
          <p className="text-slate-200 text-sm leading-relaxed font-bold mb-8">{desc}</p>
        </div>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {specs.map((spec, i) => (
              <div key={i} className="px-3 py-1 bg-royal-950 border border-royal-800 rounded text-[9px] font-mono text-slate-300 uppercase tracking-widest flex items-center">
                <div className="w-1 h-1 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                {spec}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-royal-800/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity size={12} className={accent} />
              <span className="text-[8px] font-mono text-slate-400 tracking-widest uppercase">LATENCY: <TelemetryValue />ms</span>
            </div>
            <span className="text-[8px] font-mono text-slate-400 tracking-widest">AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechDivision: React.FC = () => {
  const modules = [
    { 
      id: 'crm', 
      title: 'SynkCRM v1', 
      status: 'PREVIEW', 
      isStable: true,
      icon: <SynkCrmLogo width={180} height={48} />, 
      desc: 'The relational backbone of the SYNK ecosystem. Features automated participant lifecycle mapping, plan utilization tracking, and predictive churn analysis for large providers.',
      specs: ['Lifecycle Engine', 'Plan Analytics', 'Direct Integration']
    },
    { 
      id: 'claim', 
      title: 'ClaimSYNK v5', 
      status: 'STABLE', 
      isStable: true,
      icon: <ClaimSynkLogo size={64} isStable={true} />, 
      desc: 'Automated invoice auditing and NDIS price guide compliance verification. Designed to eliminate rejected claims and identify revenue leakage through historical data analysis.',
      specs: ['Real-time Validation', 'Leakage Detection', 'Batch Processing']
    },
    { 
      id: 'report', 
      title: 'ReportSYNK AI', 
      status: 'STABLE', 
      isStable: true,
      icon: <ReportSynkLogo size={64} isStable={true} />, 
      desc: 'Neural documentation assistant utilizing proprietary NDIS-grounded LLMs. Translates verbal support logs into high-compliance, audit-proof case notes in seconds.',
      specs: ['Neural Processing', 'Policy Grounding', 'Voice-to-JSON']
    },
    { 
      id: 'form', 
      title: 'FormSYNK Core', 
      status: 'BETA', 
      isStable: false,
      icon: <FormSynkLogo size={64} isStable={false} />, 
      desc: 'High-speed participant intake engines with automated risk flagging, service agreement generation, and digital signature nodes with policy-aware logic.',
      specs: ['Risk Engine', 'Auto-Populate', 'Sovereign Storage']
    }
  ];

  return (
    <div className="pt-24 pb-32 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40">
          <div className="inline-flex items-center space-x-4 mb-10 p-4 bg-royal-900 border border-royal-800 rounded-3xl">
             <Cpu className="text-neon-blue" size={32} />
             <div className="text-left">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block">Status Check</span>
                <span className="text-white font-mono text-sm tracking-widest">SYNK_CORE_VERSION_{COMPANY_DETAILS.appVersion}: OPTIMAL</span>
             </div>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85]">SYNK Suite</h1>
          <p className="text-slate-400 uppercase tracking-[0.8em] text-[11px] font-black">Royal Care Tech Division // Translating Regulation into Binary</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
          {modules.map((item) => (
            <SynkModuleChassis key={item.id} {...item} />
          ))}
        </div>

        <div className="bg-royal-900 border border-royal-800 rounded-[5rem] p-16 md:p-32 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
            <Settings size={300} className="animate-spin-slow text-neon-blue" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-4 mb-14 text-neon-blue">
              <Wrench size={40} />
              <span className="text-sm font-black uppercase tracking-[0.6em]">Diagnostic Infrastructure</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-12 uppercase tracking-tighter">The TFix Engine</h2>
            <p className="text-2xl text-slate-200 leading-relaxed font-bold mb-16 border-l-4 border-neon-blue pl-12">
              The TFix Core is the foundational intelligence behind every Royal Care deployment. It actively scans your organizational architecture to identify "Compliance Slippage" and "Revenue Leakage" before they impact your NDIS bottom line.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-royal-950 p-12 rounded-[2.5rem] border border-royal-800 hover:border-neon-purple transition-all shadow-xl">
                 <div className="flex items-center space-x-4 mb-8">
                   <ShieldCheck className="text-neon-purple" size={32} />
                   <h4 className="text-white font-black text-xl uppercase tracking-tight">Self-Healing Protocols</h4>
                 </div>
                 <p className="text-slate-300 text-lg leading-relaxed font-bold">
                   Automated identification and correction of support documentation errors in real-time. TFix bridges the gap between field-staff input and commission requirements.
                 </p>
              </div>
              <div className="bg-royal-950 p-12 rounded-[2.5rem] border border-royal-800 hover:border-neon-blue transition-all shadow-xl">
                 <div className="flex items-center space-x-4 mb-8">
                   <Gauge className="text-neon-blue" size={32} />
                   <h4 className="text-white font-black text-xl uppercase tracking-tight">Predictive Compliance</h4>
                 </div>
                 <p className="text-slate-300 text-lg leading-relaxed font-bold">
                   Forecasting audit risk based on historical operational telemetry. We identify patterns of non-compliance and automate the retraining cycle for your organization.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechDivision;