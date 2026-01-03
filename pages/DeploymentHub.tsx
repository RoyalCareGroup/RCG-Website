import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Terminal, Activity, RefreshCcw,
  CheckCircle as SuccessIcon, Globe,
  ArrowRight, AlertTriangle,
  Lock, History, CheckCircle, Info, Eye, FileJson, SearchCode, Github
} from 'lucide-react';
import { BackupButton } from '../components/BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const DeploymentHub: React.FC = () => {
  const [diagnosticReport, setDiagnosticReport] = useState<string[]>([]);
  const [hostStatus, setHostStatus] = useState<'CLOUDFLARE' | 'GOOGLE' | 'LOCAL'>('LOCAL');
  const [liveVersion, setLiveVersion] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'SYNCED' | 'OUT_OF_SYNC' | 'UNKNOWN' | 'CORS_RESTRICTED'>('UNKNOWN');
  const [scrollY, setScrollY] = useState(0);

  const runDiagnostics = async () => {
    const report: string[] = [];
    const host = window.location.hostname;
    report.push(`[${new Date().toLocaleTimeString()}] Starting Structural Connectivity Audit...`);
    report.push(`[DETECTED_HOST]: ${host}`);
    if (host.includes('pages.dev') || host.includes('royalcaregroup.com.au')) setHostStatus('CLOUDFLARE');
    else if (host.includes('run.app')) setHostStatus('GOOGLE');
    else setHostStatus('LOCAL');
    setDiagnosticReport(report);
  };

  const forceRefresh = () => { window.location.reload(); };

  const verifyPipeline = async () => {
    setVerifying(true);
    setSyncStatus('UNKNOWN');
    try {
      const host = window.location.hostname;
      if (!host.includes('royalcaregroup.com.au')) {
        const response = await fetch(`${COMPANY_DETAILS.productionUrl}/version.json?cache_bust=${Date.now()}`, { mode: 'cors' });
        const data = await response.json();
        setLiveVersion(data.version);
        if (data.version === COMPANY_DETAILS.appVersion) setSyncStatus('SYNCED'); else setSyncStatus('OUT_OF_SYNC');
      }
    } catch (err) { setSyncStatus('CORS_RESTRICTED'); } finally { setVerifying(false); }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    runDiagnostics();
    const interval = setInterval(runDiagnostics, 30000);
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
        <div className="mb-24 animate-hero-reveal">
          <div className={`circuit-capsule mb-10 border-2 ${hostStatus === 'GOOGLE' ? 'border-amber-500 text-amber-500' : 'border-emerald-500 text-emerald-500'} bg-black px-10 py-4`}>
            <ShieldCheck size={14} className="mr-3 animate-pulse" /> {hostStatus} ACTIVE: v{COMPANY_DETAILS.appVersion}
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] heading-wow">
            Deployment<br/><span className="heading-tech">Pipeline.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <p className="text-2xl text-white font-bold leading-relaxed border-l-8 border-emerald-500 pl-12 max-w-2xl italic opacity-70">
              "Visualize and manage the structural synchronization between your development environment and the national Cloudflare edge."
            </p>
            <button onClick={forceRefresh} className="slim-orbital-btn px-10 py-6 text-black bg-white font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 transition-all shadow-3xl active:scale-95">
              <RefreshCcw size={18} className="text-neon-purple" /> Force System Refresh
            </button>
          </div>
        </div>

        <div className="mb-16 orbital-tile p-12 md:p-20 relative overflow-hidden bg-black border-2 border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.8)] group">
           <div className="absolute top-0 right-0 p-16 opacity-[0.01] group-hover:opacity-[0.04] transition-opacity duration-1000 pointer-events-none">
              <Github size={400} className="text-white" />
           </div>

           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-12">
                 <div className="flex items-center gap-8">
                    <div className="p-5 bg-royal-950 border-2 border-neon-blue rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                       <SearchCode className="text-neon-blue" size={40} />
                    </div>
                    <div>
                       <h3 className="text-slate-600 font-black text-[11px] uppercase tracking-[0.6em] mb-2">Node Verification</h3>
                       <p className="text-4xl font-display font-black text-white uppercase tracking-tight">Integrity Test</p>
                    </div>
                 </div>
                 <p className="text-white text-xl font-bold leading-relaxed max-w-xl italic opacity-60">
                    Run a cross-node audit to see if changes have successfully deployed to your live website at <span className="text-neon-blue underline decoration-neon-blue/30 underline-offset-8">royalcaregroup.com.au</span>.
                 </p>
                 <div className="flex flex-wrap gap-6">
                   <button onClick={verifyPipeline} disabled={verifying} className="slim-orbital-btn px-12 py-7 text-white font-black text-[12px] uppercase tracking-[0.5em] flex items-center gap-5 active:scale-95 disabled:opacity-50 border-2 border-white/80">
                      {verifying ? <RefreshCcw size={20} className="animate-spin" /> : <ShieldCheck size={20} className="text-neon-purple" />}
                      {verifying ? 'AUDITING GRID...' : 'Verify Cloudflare Sync'}
                   </button>
                   <a href={`${COMPANY_DETAILS.productionUrl}/version.json`} target="_blank" className="px-12 py-7 bg-royal-950 border-2 border-white/10 text-slate-500 font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:text-white hover:border-white transition-all shadow-inner flex items-center gap-4">
                      <Eye size={18} /> Inspect Live Node
                   </a>
                 </div>
              </div>

              <div className="lg:col-span-5">
                 <div className={`p-12 rounded-[2.5rem] border-2 ${syncStatus === 'SYNCED' ? 'border-neon-green/30 bg-neon-green/5' : syncStatus === 'OUT_OF_SYNC' || syncStatus === 'CORS_RESTRICTED' ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 bg-royal-950/40'} transition-all duration-1000 shadow-3xl`}>
                    <div className="space-y-10">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">Local Buffer</span>
                          <div className="flex flex-col items-end">
                            <span className="text-white font-mono font-black text-lg tracking-widest">{COMPANY_DETAILS.appVersion}</span>
                            <span className="text-[9px] text-slate-700 font-mono mt-2 font-black uppercase">DATE: {COMPANY_DETAILS.buildDate}</span>
                          </div>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">Live Node</span>
                          <span className={`font-mono font-black text-lg tracking-widest ${syncStatus === 'OUT_OF_SYNC' ? 'text-amber-500' : syncStatus === 'SYNCED' ? 'text-neon-green' : 'text-slate-800'}`}>
                             {syncStatus === 'CORS_RESTRICTED' ? 'BLOCKED' : (liveVersion || 'PENDING')}
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-20 flex justify-center scale-110">
           <BackupButton />
        </div>
      </div>
    </div>
  );
};

export default DeploymentHub;