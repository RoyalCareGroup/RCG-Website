
import React from 'react';
import { Cpu, ShieldCheck, Zap, BarChart3, Users, Settings, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const serviceNodes = [
    { title: "Bespoke Tech Engineering", desc: "Custom NDIS operating systems, private CRMs, and automated billing engines built for national scale." },
    { title: "Structural Intelligence", desc: "Elite consultancy re-engineering your internal architecture for scale and audit-readiness." },
    { title: "National Training Protocols", desc: "High-performance training for NDIS leadership and support staff across all Australian states." },
    { title: "Sovereign Compliance", desc: "Deploying automated logic to ensure every line item matches NDIS standards in real-time." },
    { title: "Acquisition & Tech Audit", desc: "Technical due diligence for those buying or selling NDIS entities." },
    { title: "SYNK Implementation", desc: "Direct deployment of our proprietary AI ecosystem to automate manual administrative debt." }
  ];

  return (
    <section className="pt-48 pb-32 px-6 animate-fade-in bg-royal-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 uppercase tracking-tighter">Service Nodes</h1>
          <p className="text-slate-500 uppercase tracking-[0.7em] text-[10px] font-black">Elite Strategy • National Scale • Compliance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {serviceNodes.map((s, i) => (
            <div key={i} className="group bg-royal-900/50 p-14 rounded-[4rem] border border-royal-800 hover:border-neon-purple transition-all flex flex-col h-full shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-purple/5 to-transparent"></div>
              
              <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter font-display leading-tight group-hover:text-neon-purple transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg flex-grow mb-12">
                {s.desc}
              </p>
              
              <button className="w-full py-6 bg-royal-950 text-white border border-royal-700 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                Initialize Query
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-40 glass p-20 rounded-[5rem] border border-royal-800 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tighter">Automate Your NDIS Compliance</h2>
                <p className="text-xl text-slate-400 font-light mb-12">
                  Connect your existing software ecosystem to our SYNK Core and eliminate administrative debt instantly.
                </p>
                <button className="px-12 py-6 bg-neon-purple text-white font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                  Connect My Systems
                </button>
              </div>
              <div className="relative">
                <div className="w-64 h-64 border-4 border-neon-blue rounded-full animate-spin-slow opacity-20"></div>
                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-blue" size={80} />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
