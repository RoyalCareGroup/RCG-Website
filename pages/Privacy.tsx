import React from 'react';
import { Shield, Lock, Eye, Database, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-20 px-6 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-neon-blue transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Shield size={14} className="mr-3" /> Data Sovereignty Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Privacy<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Architecture.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10">
            Official privacy framework for {COMPANY_DETAILS.legalName}. We architect systems with zero-compromise security layers.
          </p>
        </div>

        <div className="space-y-12">
          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-purple/10 rounded-2xl text-neon-purple">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">1. Commitment Node</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol: PRIV_ACT_1988</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                {COMPANY_DETAILS.legalName} is committed to protecting your organizational and participant data in strict accordance with the <strong>Privacy Act 1988 (Cth)</strong> and the Australian Privacy Principles. Our infrastructure is built to exceed these standards.
              </p>
            </div>
          </div>

          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-blue/10 rounded-2xl text-neon-blue">
                  <Database size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">2. Data Acquisition</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Input Vector: Diagnostic Nodes</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-6">
                We collect information necessary to facilitate elite business consultancy and high-performance tech engineering, including:
              </p>
              <ul className="space-y-4">
                {[
                  "Organizational diagnostic parameters",
                  "Contact identification for administrative leads",
                  "System telemetry for SYNK Suite optimization",
                  "NDIS provider registration metadata"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-slate-300 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-blue"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-green/10 rounded-2xl text-neon-green">
                  <Lock size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">3. Sovereignty & Security</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol: AES-256_ENCRYPTED</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Our SYNK infrastructure utilizes proprietary security logic. Data is stored on sovereign servers with multi-factor authentication and real-time threat detection via the TFix Engine. We ensure your NDIS data remains within secure national boundaries.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 glass rounded-[3rem] border border-royal-800 text-center">
           <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6">Compliance Query?</h3>
           <p className="text-slate-500 text-sm mb-10 font-light max-w-xl mx-auto tracking-wide">
             If you require a deep-scan of our privacy protocols or have a data-access request, contact our Privacy Architect.
           </p>
           <a href={`mailto:${COMPANY_DETAILS.email}`} className="px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all inline-block">
             Contact Compliance Node
           </a>
        </div>
        
        <div className="mt-16 text-center text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">
           Last Revision: 2024.Q4 // Version: {COMPANY_DETAILS.appVersion}
        </div>
      </div>
    </div>
  );
};

export default Privacy;