import React, { useState, useEffect } from 'react';
import { Send, MapPin, Mail, Zap, Globe, PhoneCall, ShieldCheck, Terminal, Activity, ArrowRight, ExternalLink } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', dept: 'hello', msg: '' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'ads_conversion_Contact_1', {
        'event_category': 'Engagement',
        'event_label': 'Contact Form Submission',
        'value': 1.0
      });
    }
    
    // Construct the direct mailto link
    const recipient = formData.dept === 'hello' ? COMPANY_DETAILS.emailGeneral : `${formData.dept}@royalcaregroup.com.au`;
    const subject = `Structural Enquiry: ${formData.name}`;
    const body = `Operator Name: ${formData.name}\nDepartment: ${formData.dept}\n\nMessage Payload:\n------------------\n${formData.msg}\n------------------\nSent via Royal Care Matrix`;
    
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const directMailto = () => {
    const subject = "Direct Uplink: Requesting Structural Intelligence";
    window.location.href = `mailto:${COMPANY_DETAILS.emailGeneral}?subject=${encodeURIComponent(subject)}`;
  };

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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 pt-48 pb-32">
        
        {/* Left Column: Context & Direct Uplink */}
        <div className="lg:col-span-5 space-y-12 animate-hero-reveal">
          <div className="space-y-8">
            <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-8 py-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Zap size={14} className="mr-4 animate-pulse text-neon-blue" /> Grid Connectivity Protocol Active
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] heading-wow">
              Contact<br/>
              <span className="heading-tech">Matrix.</span>
            </h1>
            <div className="banner-pop bg-black p-8 shadow-2xl border-2 border-white/10 rounded-[2rem]">
              <DecodingText 
                text="Communication with the RCG-SYNK architecture is strictly routed via visitors' native email clients to ensure data sovereignty."
                className="text-lg text-white font-black leading-tight tracking-wide opacity-70 italic"
                stagger={8}
              />
            </div>
          </div>

          {/* New Direct Action Node */}
          <div className="orbital-tile p-10 bg-black border-2 border-neon-blue shadow-[0_20px_60px_rgba(6,182,212,0.2)]">
             <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-5 bg-royal-950 border-2 border-neon-blue rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                   <Mail className="text-neon-blue" size={36} />
                </div>
                <div>
                   <h3 className="text-white text-2xl font-display font-black uppercase tracking-tight">Direct Neural Uplink</h3>
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2">Bypass composer // Instant Mailto</p>
                </div>
                <button 
                  onClick={directMailto}
                  className="slim-orbital-btn w-full py-5 bg-white text-black font-black text-[11px] tracking-[0.4em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
                >
                  Launch Email Client <ExternalLink size={16} />
                </button>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <MapPin className="text-neon-purple" />, label: "Grid Hub", val: COMPANY_DETAILS.address },
              { icon: <PhoneCall className="text-neon-blue" />, label: "Voice node", val: "AU_GRID_ENABLED" },
            ].map((node, i) => (
              <div key={i} className="orbital-tile p-8 bg-black border-2 border-white/5 shadow-2xl">
                <div className="mb-4 text-neon-blue">{node.icon}</div>
                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2 font-mono">{node.label}</h4>
                <p className="text-white text-[11px] font-black">{node.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: The Composer */}
        <div className="lg:col-span-7">
          <div className="orbital-tile p-10 md:p-16 shadow-[0_80px_160px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black border-2 border-white/10">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
              <ShieldCheck size={400} className="text-neon-blue" />
            </div>
            
            <div className="relative z-10">
              <div className="mb-12 border-l-8 border-neon-purple pl-8">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Payload Composer</h3>
                <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase italic font-mono">Syncing with SYNK_SECURE_GATEWAY_v4</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3 font-mono">
                       <Terminal size={12} className="text-neon-blue" /> Op Signature
                    </label>
                    <input 
                      type="text" 
                      placeholder="NAME_REQUIRED" 
                      required 
                      className="w-full bg-royal-950 border-2 border-white/10 p-6 rounded-xl text-white focus:border-white outline-none transition-all placeholder:text-slate-800 font-black shadow-inner" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3 font-mono">
                       <Activity size={12} className="text-neon-purple" /> Call-Back ID
                    </label>
                    <input 
                      type="email" 
                      placeholder="EMAIL_REQUIRED" 
                      required 
                      className="w-full bg-royal-950 border-2 border-white/10 p-6 rounded-xl text-white focus:border-white outline-none transition-all placeholder:text-slate-800 font-black shadow-inner" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3 font-mono">
                     <Globe size={12} className="text-neon-blue" /> Grid Department
                  </label>
                  <select 
                    className="w-full bg-royal-950 border-2 border-white/10 p-6 rounded-xl text-white focus:border-white outline-none transition-all font-black appearance-none cursor-pointer shadow-inner" 
                    value={formData.dept} 
                    onChange={e => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="hello">General Enquiries (Hello@)</option>
                    <option value="sales">Consultancy Architecture (Sales@)</option>
                    <option value="tech">Engineering Division (Tech@)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3 font-mono">
                     <ArrowRight size={12} className="text-neon-purple" /> Composition
                  </label>
                  <textarea 
                    placeholder="Describe structural constraints or requirements..." 
                    rows={5} 
                    required
                    className="w-full bg-royal-950 border-2 border-white/10 p-8 rounded-2xl text-white resize-none focus:border-white outline-none transition-all placeholder:text-slate-800 font-black text-lg shadow-inner" 
                    value={formData.msg} 
                    onChange={e => setFormData({...formData, msg: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="slim-orbital-btn w-full py-8 text-black bg-white font-black text-[11px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 group active:scale-95 shadow-3xl"
                >
                  <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  <span>Deploy to Email Client</span>
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.6em] animate-pulse">
            Neural link stable // Sovereign protection active
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;