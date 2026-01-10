import React, { useEffect, useState } from 'react';
import { Shield, Gavel, Scale, ShieldAlert, Cpu, Database, ArrowLeft, FileText, Globe, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

const Compliance: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* Atmosphere Nodes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.05] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.05] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-20 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          <div className="circuit-capsule mb-8 border-2 border-white/80 bg-black text-white px-10 py-4 shadow-2xl inline-flex items-center gap-3">
            <Shield size={16} className="text-neon-blue animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Sovereign Compliance Node</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Legal &<br/><span className="text-neon-purple">Governance.</span>
          </h1>
          <div className="mt-8 border-l-4 border-neon-blue pl-8">
            <DecodingText 
              text="Authoritative documentation for the Royal Care Group ecosystem."
              className="text-lg text-slate-400 font-bold italic"
              stagger={5}
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Section: Liability Node */}
          <div className="orbital-tile p-10 bg-black border-2 border-white/10 shadow-2xl group">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-royal-950 rounded-2xl border border-neon-red/30 text-neon-red shadow-inner group-hover:scale-110 transition-transform">
                <AlertOctagon size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">Environmental Liability</h2>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Ref: SYNK_HW_PROT_01</p>
              </div>
            </div>
            <div className="space-y-6 text-slate-300 text-base font-bold italic leading-relaxed">
              <p>
                {COMPANY_DETAILS.legalName} ("RCG") provides a high-fidelity structural intelligence grid. By accessing this grid, the user acknowledges and agrees that RCG assumes no responsibility or liability for any direct, indirect, or consequential damage, data loss, or performance degradation to the user's local software, third-party firmware, or hardware environments.
              </p>
              <p>
                Utilization of high-performance rendering nodes (Visual Synthesis, Kinetic Engine) is conducted at the user's own risk. RCG maintains the structural integrity of its core sovereign servers but provides no warranty regarding local device compatibility, overheating, or circuit failure during data-intensive neural uplink sessions.
              </p>
            </div>
          </div>

          {/* Section: AU Conduct Node */}
          <div className="orbital-tile p-10 bg-black border-2 border-white/10 shadow-2xl group">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-royal-950 rounded-2xl border border-neon-green/30 text-neon-green shadow-inner group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">AU Conduct Standards</h2>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Ref: REG_AU_ETHICS_10</p>
              </div>
            </div>
            <div className="space-y-6 text-slate-300 text-base font-bold italic leading-relaxed">
              <p>
                Royal Care Group operates in strict adherence to the <span className="text-white underline decoration-neon-green">Australian Guidelines for Electronic Commerce</span> and the <span className="text-white underline decoration-neon-green">Privacy Act 1988 (Cth)</span>. Our digital operations are grounded in the principles of transparency, sovereignty, and ethical data management.
              </p>
              <p>
                We abide by all Australian website codes of conduct and digital operations standards. As a national NDIS technology partner, we maintain the highest level of professional conduct, ensuring our structural AI nodes (Aurelia, TFix) do not substitute for mandatory legal or clinical oversight required by Australian regulatory bodies.
              </p>
            </div>
          </div>

          {/* Section: Privacy Node */}
          <div className="orbital-tile p-10 bg-black border-2 border-white/10 shadow-2xl group">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-royal-950 rounded-2xl border border-neon-purple/30 text-neon-purple shadow-inner group-hover:scale-110 transition-transform">
                <Database size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">Privacy Architecture</h2>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Ref: APP_SOVEREIGNTY_v4</p>
              </div>
            </div>
            <p className="text-slate-300 text-base font-bold italic leading-relaxed">
              We collect structural data only to optimize NDIS scaling logic and system telemetry. All information is managed under the Australian Privacy Principles (APPs). We do not sell or trade neural analytics to unauthorized third-party nodes. Your data sovereignty is our primary directive.
            </p>
          </div>
        </div>

        <div className="mt-20 p-12 bg-royal-950 border border-white/10 rounded-[3rem] text-center shadow-inner">
           <CheckCircle2 className="text-neon-blue mx-auto mb-6" size={48} />
           <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4">Regulatory Parity</h3>
           <p className="text-slate-500 text-sm font-bold italic mb-10 max-w-xl mx-auto">
             For specific legal inquiries or requests regarding organizational data deletion or structural audit logs, please contact our Compliance Architect.
           </p>
           <a href={`mailto:${COMPANY_DETAILS.email}`} className="px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl inline-block">
             Contact Compliance Node
           </a>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.6em] font-black">
            RCG_LEGAL_DOSSIER // VERSION_{COMPANY_DETAILS.appVersion} // SECURED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compliance;