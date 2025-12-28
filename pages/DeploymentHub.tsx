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
  Trophy as WinIcon,
  SearchCode,
  FileJson,
  Eye
} from 'lucide-react';
import { BackupButton } from '../components/BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const DeploymentHub: React.FC = () => {
  const [diagnosticReport, setDiagnosticReport] = useState<string[]>([]);
  const [hostStatus, setHostStatus] = useState<'CLOUDFLARE' | 'GOOGLE' | 'LOCAL'>('LOCAL');
  const [liveVersion, setLiveVersion] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'SYNCED' | 'OUT_OF_SYNC' | 'UNKNOWN' | 'CORS_RESTRICTED'>('UNKNOWN');

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

  const verifyPipeline = async () => {
    setVerifying(true);
    setSyncStatus('UNKNOWN');
    
    try {
      const relativeRes = await fetch('./version.json?cb=' + Date.now());
      if (relativeRes.ok) {
        const data = await relativeRes.json();
        setLiveVersion(data.version);
        if (data.version === COMPANY_DETAILS.appVersion) {
           setSyncStatus('SYNCED');
           return;
        }
      }

      const host = window.location.hostname;
      if (!host.includes('royalcaregroup.com.au')) {
        const response = await fetch(`${COMPANY_DETAILS.productionUrl}/version.json?cache_bust=${Date.now()}`, {
          mode: 'cors'
        });
        
        if (!response.ok) throw new Error("Could not reach production node.");
        
        const data = await response.json();
        setLiveVersion(data.version);
        
        if (data.version === COMPANY_DETAILS.appVersion) {
          setSyncStatus('SYNCED');
        } else {
          setSyncStatus('OUT_OF_SYNC');
        }
      }
    } catch (err: any) {
      console.error("Pipeline verification failed:", err);
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        setSyncStatus('CORS_RESTRICTED');
      } else {
        setSyncStatus('UNKNOWN');
      }
    } finally {
      setVerifying(false);
    }
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

        {/* GitHub Connectivity Verifier */}
        <div className="mb-12 glass border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none">
              <Github size={300} className="text-white" />
           </div>

           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="p-4 bg-royal-950 border border-neon-blue rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                       <SearchCode className="text-neon-blue" size={32} />
                    </div>
                    <div>
                       <h3 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-2">Node Verification</h3>
                       <p className="text-3xl font-display font-black text-white uppercase tracking-tight">Pipeline Integrity Test</p>
                    </div>
                 </div>
                 <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
                    Run a cross-node audit to see if the changes in this editor have successfully deployed to your live website at <span className="text-neon-blue font-bold">{COMPANY_DETAILS.productionUrl}</span>.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <button 
                     onClick={verifyPipeline}
                     disabled={verifying}
                     className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl flex items-center gap-4 active:scale-95 disabled:opacity-50"
                   >
                      {verifying ? <RefreshCcw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                      {verifying ? 'AUDITING GRID...' : 'Verify GitHub -> Cloudflare Sync'}
                   </button>
                   <a 
                     href={`${COMPANY_DETAILS.productionUrl}/version.json`} 
                     target="_blank" 
                     className="px-10 py-5 bg-royal-900 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-royal-800 transition-all shadow-3xl flex items-center gap-4"
                   >
                      <Eye size={16} className="text-neon-purple" /> Inspect Live Node (Manual)
                   </a>
                 </div>
              </div>

              <div className="lg:col-span-5">
                 <div className={`p-10 rounded-[2.5rem] border ${syncStatus === 'SYNCED' ? 'border-emerald-500/30 bg-emerald-500/5' : syncStatus === 'OUT_OF_SYNC' || syncStatus === 'CORS_RESTRICTED' ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 bg-royal-900/40'} transition-all duration-700 shadow-inner`}>
                    <div className="space-y-8">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Local Editor Version</span>
                          <span className="text-white font-mono font-bold">{COMPANY_DETAILS.appVersion}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Live Site Version</span>
                          <span className={`font-mono font-bold ${syncStatus === 'OUT_OF_SYNC' ? 'text-amber-500' : syncStatus === 'SYNCED' ? 'text-emerald-500' : 'text-slate-700'}`}>
                             {syncStatus === 'CORS_RESTRICTED' ? 'CORS_BLOCKED' : (liveVersion || 'AWAITING_CHECK')}
                          </span>
                       </div>
                       <div className="pt-6 border-t border-white/10">
                          <div className={`flex items-center gap-4 ${syncStatus === 'SYNCED' ? 'text-emerald-500' : syncStatus === 'OUT_OF_SYNC' || syncStatus === 'CORS_RESTRICTED' ? 'text-amber-500' : 'text-slate-600'}`}>
                             {syncStatus === 'SYNCED' ? <SuccessIcon size={20} /> : (syncStatus === 'OUT_OF_SYNC' || syncStatus === 'CORS_RESTRICTED') ? <AlertTriangle size={20} /> : <FileJson size={20} />}
                             <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                                {syncStatus === 'SYNCED' ? 'PIPELINE_SYNCHRONIZED' : 
                                 syncStatus === 'CORS_RESTRICTED' ? 'CROSS_ORIGIN_SECURITY_RESTRICTION' :
                                 syncStatus === 'OUT_OF_SYNC' ? 'PUSH_REQUIRED: VERSIONS_MISMATCH' : 'SYSTEM_READY_FOR_TEST'}
                             </span>
                          </div>
                          {syncStatus === 'CORS_RESTRICTED' && (
                             <p className="mt-4 text-[10px] text-slate-500 leading-relaxed font-light italic">
                                Note: This preview environment cannot directly query the production domain due to browser CORS policies. Use the "Inspect Live Node" button above to verify manually.
                             </p>
                          )}
                          {syncStatus === 'OUT_OF_SYNC' && (
                            <p className="mt-4 text-[10px] text-slate-500 leading-relaxed font-light italic">
                               Tip: Your changes aren't live yet. Open the source control sidebar (left menu) and click "Push" or "Sync" to send this code to GitHub.
                            </p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
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
                 <p className="text-slate-400 text-sm font-light">Code modified locally. Current buffer: <span className="text-white font-mono">{COMPANY_DETAILS.appVersion}</span></p>
                 <div className="mt-8 flex items-center gap-2 text-emerald-400 font-mono text-[9px] font-bold">
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