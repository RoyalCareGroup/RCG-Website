import React from 'react';
import { Shield, Lock, FileText, Gavel, Scale, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Terms: React.FC = () => {
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
            <Gavel size={14} className="mr-3" /> Operational Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Terms of<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Service.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10">
            Legal framework governing the use of the {COMPANY_DETAILS.legalName} ecosystem and SYNK technical assets.
          </p>
        </div>

        <div className="space-y-12">
          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-purple/10 rounded-2xl text-neon-purple">
                  <Scale size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">1. Acceptable Use Node</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol: USER_ENGAGEMENT_v1</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                By accessing the {COMPANY_DETAILS.name} platform, including the Intelligence Hub and SYNK Suite, you agree to utilize these structural assets solely for legitimate NDIS organizational improvement. Any attempt to reverse-engineer proprietary binary logic or bypass security layers is a critical protocol violation.
              </p>
            </div>
          </div>

          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-blue/10 rounded-2xl text-neon-blue">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">2. Professional Disclaimer</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Logic: ADVISORY_ONLY</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-6">
                While our TFix Engine and consultancy provide high-fidelity structural logic, ultimate responsibility for NDIS regulatory compliance and participant outcomes rests with the provider. Our tools are designed to augment, not replace, organizational governance.
              </p>
            </div>
          </div>

          <div className="orbital-tile p-10 md:p-16 group">
            <div className="orbital-content">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-neon-green/10 rounded-2xl text-neon-green">
                  <FileText size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">3. Intellectual Property</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Ownership: SOVEREIGN_ASSETS</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                The SYNK ecosystem, including ClaimSYNK, ReportSYNK, and FormSYNK, along with all associated source code and structural methodologies, remain the exclusive property of {COMPANY_DETAILS.legalName}. Deployment does not constitute a transfer of ownership node.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 glass rounded-[3rem] border border-royal-800 text-center">
           <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6">Legal Query?</h3>
           <p className="text-slate-500 text-sm mb-10 font-light max-w-xl mx-auto tracking-wide">
             If you require clarification on the structural terms of engagement or have specific contractual inquiries, contact our Legal Architect.
           </p>
           <a href={`mailto:${COMPANY_DETAILS.email}`} className="px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all inline-block">
             Contact Legal Node
           </a>
        </div>
        
        <div className="mt-16 text-center text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">
           Last Revision: 2024.Q4 // Version: {COMPANY_DETAILS.appVersion}
        </div>
      </div>
    </div>
  );
};

export default Terms;