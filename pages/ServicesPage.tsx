import React from 'react';
import { Briefcase, TrendingUp, ShieldCheck, FileSearch, Users, Code, ArrowRight, Zap, GraduationCap, Cpu, Terminal, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const businessServices = [
    {
      icon: <Terminal size={28} className="text-neon-blue" />,
      title: "Bespoke Tech Engineering",
      desc: "We don't use off-the-shelf software. Our Tech Division builds custom NDIS operating systems, private CRMs, and automated billing engines tailored to your specific organizational architecture."
    },
    {
      icon: <GraduationCap size={28} className="text-neon-purple" />,
      title: "National Training Protocols",
      desc: "Accredited, high-performance training for NDIS staff and leadership. From advanced compliance mastery to high-intensity support training protocols deployed across Australia."
    },
    {
      icon: <Database size={28} className="text-neon-blue" />,
      title: "Structural Intelligence",
      desc: "Elite business consultancy for national NDIS providers. We re-engineer your workflows to handle scale, ensuring your data infrastructure is audit-proof and highly efficient."
    },
    {
      icon: <TrendingUp size={28} className="text-neon-purple" />,
      title: "Acquisition & Tech Audit",
      desc: "Expert assistance in buying or selling NDIS entities. We provide technical due diligence and structural audits to ensure the assets you acquire are technically sound."
    },
    {
      icon: <ShieldCheck size={28} className="text-neon-blue" />,
      title: "Sovereign Compliance",
      desc: "Deploying automated compliance logic across your organization. We ensure every line item and case note aligns with the national NDIS Practice Standards in real-time."
    },
    {
      icon: <Code size={28} className="text-neon-purple" />,
      title: "SYNK Integration",
      desc: "The direct implementation of the SYNK AI Ecosystem. Automate your manual admin debt and transform into a high-tech, paperless NDIS operation."
    }
  ];

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-neon-blue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-28 relative z-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.4em] uppercase mb-8">
          <Briefcase size={14} className="mr-3" /> National Infrastructure
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 uppercase tracking-tighter text-spotlight leading-[0.85]">
          Strategic<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Solutions.</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Custom Tech Division • High-Performance Training • Australia-Wide Consultancy</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full">
              <div className="orbital-content p-12 flex flex-col h-full">
                <div className="mb-10 p-4 bg-royal-950 border border-royal-800 rounded-2xl w-fit group-hover:border-neon-blue transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 font-display uppercase tracking-tight leading-tight group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-12 flex-grow">
                  {service.desc}
                </p>
                <Link to="/contact" className="slim-orbital-btn py-5 w-full flex items-center justify-center text-white font-black text-[10px] tracking-widest uppercase">
                  <span>Enquire for Deployment <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" /></span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 glass p-16 md:p-24 rounded-[4rem] border border-royal-800 relative overflow-hidden text-center md:text-left">
           <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu size={300} className="text-neon-blue animate-spin-slow" />
           </div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tighter">Ready for Scale?</h2>
                <p className="text-xl text-slate-400 font-light mb-12">
                  Connect your existing software ecosystem to our SYNK Core and eliminate administrative debt instantly.
                </p>
                <Link to="/contact" className="inline-block px-14 py-7 bg-neon-purple text-white font-black text-[10px] tracking-[0.5em] uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(217,70,239,0.4)]">
                  Execute Integration
                </Link>
              </div>
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-neon-blue rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-royal-900 rounded-full border border-neon-blue/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                  <Cpu className="text-neon-blue" size={64} />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;