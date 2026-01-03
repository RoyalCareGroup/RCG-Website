import React, { useState, useEffect } from 'react';
import { Send, MapPin, Mail, Zap, Globe, PhoneCall, ShieldCheck, Terminal, Activity, ArrowRight } from 'lucide-react';
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
    const recipient = formData.dept === 'hello' ? COMPANY_DETAILS.emailGeneral : `${formData.dept}@royalcaregroup.com.au`;
    window.location.href = `mailto:${recipient}?subject=Website Enquiry from ${formData.name}&body=${encodeURIComponent(formData.msg)}`;
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10 pt-48 pb-32">
        <div className="lg:col-span-5 space-y-16 animate-hero-reveal">
          <div>
            <div className="circuit-capsule border-2 border-white/80 bg-black text-white mb-10 px-10 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Zap size={14} className="mr-4 animate-pulse text-neon-blue" /> Communication Grid Node Active
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 heading-wow">
              Contact<br/>
              <span className="heading-tech">Matrix.</span>
            </h1>
            <div className="max-w-md relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10 mt-10">
              <DecodingText 
                text="Establish a secure uplink with our architectural division for strategic advisory and technical SYNK deployments."
                className="text-lg text-white font-black leading-tight tracking-wide opacity-80"
                stagger={8}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: <MapPin className="text-neon-purple" size={24} />, label: "Admin Hub", val: COMPANY_DETAILS.address },
              { icon: <Mail className="text-neon-blue" size={24} />, label: "Protocol Link", val: COMPANY_DETAILS.emailGeneral },
              { icon: <PhoneCall className="text-neon-purple" size={24} />, label: "Voice Node", val: "AU_GRID_ENABLED" },
              { icon: <Globe className="text-neon-blue" size={24} />, label: "Service Reach", val: "National_Sovereign" }
            ].map((node, i) => (
              <div key={i} className="orbital-tile p-10 group hover:border-white transition-all duration-700 bg-black border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <div className="p-5 bg-royal-950 rounded-2xl border-2 border-white/5 w-fit mb-8 group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-inner">
                  {node.icon}
                </div>
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 font-mono">{node.label}</h4>
                <p className="text-white text-xs leading-relaxed font-black tracking-tight">{node.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="orbital-tile p-12 md:p-20 shadow-[0_80px_160px_rgba(0,0,0,0.9)] relative overflow-hidden bg-black border-2 border-white/15">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
              <ShieldCheck size={400} className="text-neon-blue" />
            </div>
            
            <div className="relative z-10">
              <div className="mb-14 border-l-8 border-neon-purple pl-10">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-3">Initialize Enquiry Node</h3>
                <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase italic font-mono">Routing through SYNK_SECURE_GATEWAY_v4</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center gap-4 font-mono">
                       <Terminal size={14} className="text-neon-blue" /> Identity Signature
                    </label>
                    <input 
                      type="text" 
                      placeholder="FULL_NAME" 
                      required 
                      className="w-full bg-royal-950 border-2 border-white/10 p-8 rounded-[1.5rem] text-white focus:border-white outline-none transition-all placeholder:text-slate-800 font-black text-lg shadow-inner" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center gap-4 font-mono">
                       <Activity size={14} className="text-neon-purple" /> Return Protocol
                    </label>
                    <input 
                      type="email" 
                      placeholder="EMAIL_ADDRESS" 
                      required 
                      className="w-full bg-royal-950 border-2 border-white/10 p-8 rounded-[1.5rem] text-white focus:border-white outline-none transition-all placeholder:text-slate-800 font-black text-lg shadow-inner" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center gap-4 font-mono">
                     <ShieldCheck size={14} className="text-neon-blue" /> Department Routing
                  </label>
                  <select 
                    className="w-full bg-royal-950 border-2 border-white/10 p-8 rounded-[1.5rem] text-white focus:border-white outline-none transition-all font-black text-lg appearance-none cursor-pointer shadow-inner" 
                    value={formData.dept} 
                    onChange={e => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="hello">General Enquiries (Sovereign Node)</option>
                    <option value="sales">Consultancy Sales (Architectural Node)</option>
                    <option value="tech">Tech Division Support (Engineering Node)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center gap-4 font-mono">
                     <Zap size={14} className="text-neon-purple" /> Instruction Payload
                  </label>
                  <textarea 
                    placeholder="Describe structural requirements..." 
                    rows={6} 
                    className="w-full bg-royal-950 border-2 border-white/10 p-10 rounded-[2.5rem] text-white resize-none focus:border-white outline-none transition-all placeholder:text-slate-800 font-black text-xl shadow-inner" 
                    value={formData.msg} 
                    onChange={e => setFormData({...formData, msg: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="slim-orbital-btn w-full py-10 text-black bg-white font-black text-[12px] tracking-[0.8em] uppercase mt-10 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-6 group active:scale-95"
                >
                  <span>Deploy Enquiry Protocol</span>
                  <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;