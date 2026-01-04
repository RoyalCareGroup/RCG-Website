
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
    setDiagnosticReport(report);
  };

  const verifyPipeline = async () => {
    setVerifying(true);
    setSyncStatus('UNKNOWN');
    try {
      const response = await fetch(`${COMPANY_DETAILS.productionUrl}/version.json?cb=${Date.now()}`, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      const data = await response.json();
      setLiveVersion(data.version);
      setSyncStatus(data.version === COMPANY_DETAILS.appVersion ? 'SYNCED' : 'OUT_OF_SYNC');
    } catch (err: any) {
      setSyncStatus('CORS_RESTRICTED');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
    verifyPipeline();
  }, []);

  const copyCommand = (cmd: string) => navigator.clipboard.writeText(cmd);

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        <div className="mb-24 animate-hero-reveal">
          <div className="circuit-capsule mb-10 border-2 border-neon-purple text-neon-purple bg-black px-10 py-4 flex items-center gap-4 shadow-2xl">
            <Zap size={14} className="animate-pulse" /> UPLINK_PROTOCOL_STABLE // v{COMPANY_DETAILS.appVersion}
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] heading-wow">Sovereign<br/><span className="heading-tech">Uplink.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-8 orbital-tile p-10 lg:p-16 bg-black border-2 border-white/10 relative shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                   <div className="p-4 bg-royal-950 border-2 border-neon-blue rounded-xl shadow-2xl"><Wifi className="text-neon-blue animate-pulse" size={32} /></div>
                   <h3 className="text-white text-3xl font-display font-black uppercase tracking-tight">Sync Diagnostic</h3>
                </div>
                <button onClick={verifyPipeline} disabled={verifying} className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all hover:border-white transition-all"><RefreshCcw size={20} className={verifying ? 'animate-spin' : ''} /></button>
             </div>
             <div className="bg-royal-950/80 border border-royal-800 rounded-2xl p-8 mb-10 font-mono text-[12px] space-y-3 overflow-y-auto max-h-[300px]">
                {diagnosticReport.map((line, i) => (<div key={i} className="flex gap-4"><span className="text-neon-blue opacity-50">{" >> "}</span><span className="text-slate-400">{line}</span></div>))}
             </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-8">
             <div className="orbital-tile p-10 bg-black border-2 border-white/5 flex flex-col items-center justify-center shadow-3xl flex-grow"><BackupButton /></div>
          </div>
        </div>

        <div className="orbital-tile p-12 bg-black border-2 border-neon-purple shadow-[0_0_50px_rgba(217,70,239,0.2)] mb-16 relative">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 border-b border-white/5 pb-10">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-royal-950 border border-neon-purple rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.4)]"><Command className="text-neon-purple" size={24} /></div>
                <h3 className="text-white text-2xl font-display font-black uppercase tracking-tight">TERMINAL: One-Click Force Deployment</h3>
              </div>
           </div>
           
           <div className="space-y-4">
              {[
                { cmd: 'git add .', desc: 'Stage all structural updates' },
                { cmd: `git commit -m "fix: holographic_pulse_handshake // v${COMPANY_DETAILS.appVersion}"`, desc: 'Audit log creation' },
                { cmd: 'git push origin main', desc: 'Push to Cloudflare Edge' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-4 group">
                   <div className="flex-1 bg-royal-950 p-6 rounded-xl border border-white/10 font-mono text-neon-blue text-sm flex items-center justify-between group-hover:border-neon-blue transition-all">
                      <span>{item.cmd}</span>
                      <button onClick={() => copyCommand(item.cmd)} className="p-3 bg-black hover:bg-neon-purple rounded-lg text-slate-400 hover:text-white transition-all"><Copy size={14} /></button>
                   </div>
                   <div className="md:w-64 text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-3"><ArrowRight size={12} className="text-neon-purple" /> {item.desc}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentHub;
