
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Terminal, Activity, RefreshCcw,
  Globe, ArrowRight, AlertTriangle,
  Server, Wifi, Command, Copy, Zap, Heart
} from 'lucide-react';
import { BackupButton } from '../components/BackupButton.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const DeploymentHub: React.FC = () => {
  const [diagnosticReport, setDiagnosticReport] = useState<string[]>([]);
  const [liveVersion, setLiveVersion] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'SYNCED' | 'OUT_OF_SYNC' | 'UNKNOWN' | 'CORS_RESTRICTED'>('UNKNOWN');

  const runDiagnostics = async () => {
    const report: string[] = [];
    const host = window.location.hostname;
    const timestamp = new Date().toLocaleTimeString();
    
    report.push(`[${timestamp}] INITIALIZING_STRUCTURAL_AUDIT...`);
    report.push(`[NODE_ID]: ${host}`);
    report.push(`[LOCAL_VER]: ${COMPANY_DETAILS.appVersion}`);
    report.push(`[GATEWAY]: ${host.includes('royalcaregroup') ? 'PRODUCTION_NODE' : 'DEVELOPMENT_SANDBOX'}`);
    
    setDiagnosticReport(report);
  };

  const verifyPipeline = async () => {
    setVerifying(true);
    setSyncStatus('UNKNOWN');
    const timestamp = new Date().toLocaleTimeString();
    setDiagnosticReport(prev => [...prev, `[${timestamp}] ATTEMPTING_PRODUCTION_HANDSHAKE...`]);
    
    try {
      const response = await fetch(`${COMPANY_DETAILS.productionUrl}/version.json?cb=${Date.now()}`, { 
        mode: 'cors',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      
      const data = await response.json();
      setLiveVersion(data.version);
      
      if (data.version === COMPANY_DETAILS.appVersion) {
        setSyncStatus('SYNCED');
        setDiagnosticReport(prev => [...prev, `[SUCCESS] NODES_IN_SYNC: v${data.version}`]);
      } else {
        setSyncStatus('OUT_OF_SYNC');
        setDiagnosticReport(prev => [...prev, `[WARNING] VERSION_MISMATCH: Local(v${COMPANY_DETAILS.appVersion}) != Live(v${data.version})`]);
      }
    } catch (err: any) {
      setSyncStatus('CORS_RESTRICTED');
      setDiagnosticReport(prev => [...prev, `[FAILURE] Handshake rejected. Check network or propagation.`]);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
    verifyPipeline();
  }, []);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        <div className="mb-24 animate-hero-reveal">
          <div className="circuit-capsule mb-10 border-2 border-neon-purple text-neon-purple bg-black px-10 py-4 shadow-2xl flex items-center gap-4">
            <Zap size={14} className="animate-pulse" /> 
            UPLINK_PROTOCOL_STABLE // v{COMPANY_DETAILS.appVersion}
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] heading-wow">
            Sovereign<br/><span className="heading-tech">Uplink.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
            <p className="text-2xl text-white font-bold leading-relaxed border-l-8 border-neon-purple pl-12 max-w-2xl italic opacity-70">
              "Unified deployment control. Monitor node synchronization and force manual commit cycles across the national grid."
            </p>
            <div className="bg-black/60 p-8 rounded-3xl border border-white/10 backdrop-blur-xl flex items-center gap-6 shadow-3xl">
               <div className={`p-4 rounded-2xl ${syncStatus === 'SYNCED' ? 'bg-green-500/20' : 'bg-neon-purple/20'}`}>
                  <Heart className={`${syncStatus === 'SYNCED' ? 'text-green-500' : 'text-neon-purple'} animate-pulse`} size={32} />
               </div>
               <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">Grid Heartbeat</div>
                  <div className={`text-2xl font-display font-black ${syncStatus === 'SYNCED' ? 'text-green-500' : 'text-neon-purple'}`}>
                    {syncStatus === 'SYNCED' ? 'SYNCHRONIZED' : 'ASYNC_PENDING'}
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-8 orbital-tile p-10 lg:p-16 bg-black border-2 border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-6">
                      <div className="p-4 bg-royal-950 border-2 border-neon-blue rounded-xl shadow-2xl">
                         <Wifi className="text-neon-blue animate-pulse" size={32} />
                      </div>
                      <div>
                         <h3 className="text-white text-3xl font-display font-black uppercase tracking-tight">Sync Diagnostic</h3>
                         <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Real-time Pipeline Audit</p>
                      </div>
                   </div>
                   <button 
                     onClick={verifyPipeline} 
                     disabled={verifying}
                     className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                   >
                     <RefreshCcw size={20} className={verifying ? 'animate-spin' : ''} />
                   </button>
                </div>

                <div className="bg-royal-950/80 border border-royal-800 rounded-2xl p-8 mb-10 flex-grow font-mono text-[12px] space-y-3 overflow-y-auto shadow-inner max-h-[300px]">
                   {diagnosticReport.map((line, i) => (
                     <div key={i} className="flex gap-4">
                        <span className="text-neon-blue opacity-50">{" >> "}</span>
                        <span className={line.includes('FAILURE') ? 'text-neon-red' : line.includes('SUCCESS') ? 'text-neon-green' : 'text-slate-400'}>
                          {line}
                        </span>
                     </div>
                   ))}
                </div>

                <div className="flex flex-wrap gap-4">
                   <div className="flex-1 px-8 py-5 bg-royal-900/50 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Live Production Ver</span>
                      <span className="text-white font-mono">{liveVersion || 'UPLINKING...'}</span>
                   </div>
                   <div className="flex-1 px-8 py-5 bg-royal-900/50 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Local Workspace Ver</span>
                      <span className="text-neon-blue font-mono">{COMPANY_DETAILS.appVersion}</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
             <div className="orbital-tile p-10 bg-black border-2 border-white/5 flex flex-col items-center justify-center text-center shadow-3xl flex-grow">
                <BackupButton />
                <p className="text-[9px] text-slate-600 mt-6 uppercase tracking-[0.4em] font-black">Generate Local Backup</p>
             </div>
             <div className="orbital-tile p-8 bg-black border-2 border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <Server className="text-neon-purple" size={18} />
                   <span className="text-[10px] text-white uppercase tracking-widest">Active Server Nodes</span>
                </div>
                <div className="flex gap-2">
                   {[1,2,3,4].map(n => (
                     <div key={n} className="h-1 flex-1 bg-green-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-pulse w-full"></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Unified Deployment Terminal Center */}
        <div className="orbital-tile p-12 bg-black border-2 border-neon-purple shadow-[0_0_50px_rgba(217,70,239,0.2)] mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[80px] rounded-full pointer-events-none"></div>
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 border-b border-white/5 pb-10">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-royal-950 border border-neon-purple rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                   <Command className="text-neon-purple" size={24} />
                </div>
                <div>
                   <h3 className="text-white text-2xl font-display font-black uppercase tracking-tight">TERMINAL: One-Click Force Deployment</h3>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Open Terminal tab below and run these commands</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20">
                 <AlertTriangle className="text-red-500" size={16} />
                 <span className="text-[9px] text-red-500 uppercase font-black tracking-widest">Protocol Override Active</span>
              </div>
           </div>
           
           <div className="space-y-4">
              {[
                { cmd: 'git add .', desc: 'Stage all structural updates' },
                { cmd: `git commit -m "fix: temporal_gesture_sync // v${COMPANY_DETAILS.appVersion}"`, desc: 'Audit log creation' },
                { cmd: 'git push origin main', desc: 'Push to Cloudflare Edge' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-stretch md:items-center gap-4 group">
                   <div className="flex-1 bg-royal-950 p-6 rounded-xl border border-white/10 font-mono text-neon-blue text-sm flex items-center justify-between group-hover:border-neon-blue transition-all shadow-inner">
                      <span className="truncate pr-4">{item.cmd}</span>
                      <button 
                        onClick={() => copyCommand(item.cmd)}
                        className="p-3 bg-black hover:bg-neon-purple rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-2 active:scale-95"
                      >
                         <Copy size={14} />
                         <span className="text-[8px] font-black uppercase tracking-widest">COPY</span>
                      </button>
                   </div>
                   <div className="md:w-64 text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-3">
                      <ArrowRight size={12} className="text-neon-purple" /> {item.desc}
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-8 bg-royal-950/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic max-w-xl">
                * Note: The Cloudflare build cycle will initialize automatically upon the final push command.
              </div>
              <div className="flex items-center gap-4">
                 <div className="px-5 py-2 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg text-[9px] font-black tracking-widest uppercase">
                    Edge_Uplink_Ready
                 </div>
                 <div className="w-3 h-3 rounded-full bg-neon-purple animate-ping"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentHub;
