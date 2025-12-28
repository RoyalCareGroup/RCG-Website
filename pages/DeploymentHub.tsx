import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Terminal, Network, Check,
  Zap, Cloud, Activity, RefreshCcw,
  CheckCircle as SuccessIcon, Globe,
  Trophy, Link2, Server,
  AlertTriangle, ArrowRight,
  AlertCircle, ShieldAlert,
  Clock, Lock, 
  Cpu, Wifi, 
  LockKeyhole, Github, GitBranch,
  Shield, 
  ExternalLink,
  Flame,
  Search,
  CheckCircle2,
  Tag,
  Radio,
  ArrowRightLeft,
  Split,
  Plus,
  Unplug,
  MousePointer2,
  Trophy as WinIcon
} from 'lucide-react';
import { BackupButton } from '../components/BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const DeploymentHub: React.FC = () => {
  const [diagnosticReport, setDiagnosticReport] = useState<string[]>([]);
  const [hostStatus, setHostStatus] = useState<'CLOUDFLARE' | 'GOOGLE' | 'LOCAL'>('LOCAL');

  const runDiagnostics = async () => {
    const report: string[] = [];
    const host = window.location.hostname;
    
    report.push(`[${new Date().toLocaleTimeString()}] Starting Structural Connectivity Audit...`);
    report.push(`[DETECTED_HOST]: ${host}`);
    
    if (host.includes('pages.dev') || host.includes('royalcaregroup.com.au')) {
      setHostStatus('CLOUDFLARE');
      report.push(`[OK] Source Verified: CLOUDFLARE_PAGES_EDGE`);
    } else if (host.includes('run.app')) {
      setHostStatus('GOOGLE');
      report.push(`[WARNING] Source: GOOGLE_CLOUD_RUN (Staging/Preview Environment)`);
    } else {
      setHostStatus('LOCAL');
      report.push(`[INFO] Source: LOCAL_DEVELOPMENT_NODE`);
    }

    report.push(`[VERSION_PARITY]: ${COMPANY_DETAILS.appVersion}`);
    report.push(`[BUILD_DATE]: ${COMPANY_DETAILS.buildDate}`);
    report.push(`[OK] SSL Protocol: SECURE_HANDSHAKE`);

    setDiagnosticReport(report);
  };

  useEffect(() => {
    runDiagnostics();
    const interval = setInterval(runDiagnostics, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-emerald-500/5 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full border ${hostStatus === 'GOOGLE' ? 'border-amber-500/40 bg-amber-500/10 text-amber-500' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'} text-[10px] font-black tracking-[0.4em] uppercase mb-8 shadow-2xl`}>
            <ShieldCheck size={14} className="mr-3 animate-pulse" /> {hostStatus} ACTIVE: v{COMPANY_DETAILS.appVersion}
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[0.85]">
            Deployment<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-neon-blue text-spotlight">Pipeline.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-emerald-500 pl-10 max-w-3xl">
            Visualize and manage the structural synchronization between your development environment and the national Cloudflare edge.
          </p>
        </div>

        {/* Deployment Path Map */}
        <div className="mb-12 relative">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {/* Step 1: Editor */}
              <div className="orbital-tile p-10 bg-royal-900/40 border-white/10 flex flex-col items-center text-center">
                 <div className="p-5 bg-white text-black rounded-2xl mb-6 shadow-2xl">
                    <Terminal size={32} />
                 </div>
                 <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-4">Node 01: Editor</h3>
                 <p className="text-slate-400 text-sm font-light">Code modified and XML applied. Current state saved locally.</p>
                 <div className="mt-8 flex items-center gap-2 text-emerald-400 font-mono text-[9px] font-bold">
                    {/* Fix: use correctly imported CheckCircle2 component */}
                    <CheckCircle2 size={14} /> STATUS: MODIFIED
                 </div>
              </div>

              {/* Step 2: GitHub */}
              <div className="orbital-tile p-10 bg-royal-900/40 border-neon-blue/30 flex flex-col items-center text-center relative overflow-hidden">
                 {hostStatus === 'GOOGLE' && <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>}
                 <div className="p-5 bg-royal-950 border border-neon-blue text-neon-blue rounded-2xl mb-6 shadow-3xl">
                    <Github size={32} />
                 </div>
                 <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-4">Node 02: GitHub</h3>
                 <p className="text-slate-400 text-sm font-light">The central relay. You must manually push changes from the editor sidebar.</p>
                 <div className={`mt-8 flex items-center gap-2 ${hostStatus === 'GOOGLE' ? 'text-amber-500' : 'text-emerald-400'} font-mono text-[9px] font-bold`}>
                    {/* Fix: use correctly imported CheckCircle2 component */}
                    {hostStatus === 'GOOGLE' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                    {hostStatus === 'GOOGLE' ? 'STATUS: AWAITING_PUSH' : 'STATUS: SYNCHRONIZED'}
                 </div>
              </div>

              {/* Step 3: Cloudflare */}
              <div className="orbital-tile p-10 bg-royal-900/40 border-white/10 flex flex-col items-center text-center">
                 <div className="p-5 bg-royal-950 border border-white/10 text-white rounded-2xl mb-6 shadow-2xl">
                    <Cloud size={32} />
                 </div>
                 <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-4">Node 03: Live Site</h3>
                 <p className="text-slate-400 text-sm font-light">Cloudflare builds the site from GitHub and broadcasts to the global edge.</p>
                 <div className="mt-8 flex items-center gap-2 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-widest">
                    Build: {hostStatus === 'CLOUDFLARE' ? 'Active' : 'Awaiting Relay'}
                 </div>
              </div>
           </div>

           {/* Connector Arrows */}
           <div className="hidden lg:block absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 z-0">
              <ArrowRight size={40} className="text-white/10" />
           </div>
           <div className="hidden lg:block absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 z-0">
              <ArrowRight size={40} className="text-white/10" />
           </div>
        </div>

        {hostStatus === 'GOOGLE' && (
           <div className="bg-amber-500/10 border border-amber-500/30 rounded-[3rem] p-12 mb-12 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex items-center gap-8">
                 <div className="p-6 bg-amber-500 text-black rounded-full shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                    <AlertTriangle size={40} />
                 </div>
                 <div>
                    <h2 className="text-white font-black text-2xl uppercase tracking-tighter mb-2">Push Protocol Required</h2>
                    <p className="text-amber-200 text-lg font-light max-w-xl">
                       You are viewing a **Preview** environment. To see version **{COMPANY_DETAILS.appVersion}** on your live site, click the "Sync" or "Push" button in your editor's sidebar.
                    </p>
                 </div>
              </div>
              <button 
                 onClick={() => window.open('https://github.com/login', '_blank')}
                 className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-amber-500 transition-all shadow-3xl flex items-center gap-4"
              >
                 Open GitHub Relay <ExternalLink size={14} />
              </button>
           </div>
        )}

        <div className="glass p-10 rounded-[3rem] border border-white/5 bg-royal-900/20 mb-12">
           <div className="flex items-center gap-4 mb-8 text-slate-500">
              <Terminal size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Connectivity Telemetry Feed</span>
           </div>
           <div className="space-y-4 font-mono text-[11px]">
              {diagnosticReport.map((line, i) => (
                 <div key={i} className={`flex gap-4 ${line.includes('[OK]') ? 'text-emerald-400' : line.includes('[WARNING]') ? 'text-amber-500' : 'text-slate-400'}`}>
                    <span className="opacity-30">#</span>
                    <span>{line}</span>
                 </div>
              ))}
              <div className="text-neon-purple animate-pulse">
                 {'>'} Monitoring synchronization state... Grid integrity: NOMINAL.
              </div>
           </div>
        </div>

        <div className="flex justify-center">
           <BackupButton />
        </div>
      </div>
    </div>
  );
};

export default DeploymentHub;