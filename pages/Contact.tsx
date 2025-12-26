import React, { useState } from 'react';
import { Send, MapPin, Mail, Zap, Phone, Globe, PhoneCall, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', dept: 'hello', msg: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = formData.dept === 'hello' ? COMPANY_DETAILS.emailGeneral : `${formData.dept}@royalcaregroup.com.au`;
    window.location.href = `mailto:${recipient}?subject=Website Enquiry from ${formData.name}&body=${encodeURIComponent(formData.msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#01040f] py-40 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-12 animate-fade-in">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.4em] uppercase mb-8">
              <Zap size={14} className="mr-3 animate-pulse" /> Communication Grid
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter text-spotlight leading-[0.85] mb-6">
              Contact<br/>Matrix.
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">National Tech & Training Infrastructure</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="orbital-tile p-8 group">
              <div className="orbital-content">
                <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="text-neon-purple" size={20} />
                </div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Administrative Hub</h4>
                <p className="text-white text-xs leading-relaxed italic opacity-80 mb-3">Mailing & Corporate Governance</p>
                <p className="text-white text-xs leading-relaxed font-light">{COMPANY_DETAILS.address}<br/>{COMPANY_DETAILS.cityStateZip}</p>
              </div>
            </div>
            <div className="orbital-tile p-8 group">
              <div className="orbital-content">
                <div className="p-3 bg-neon-blue/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="text-neon-blue" size={20} />
                </div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Protocol Link</h4>
                <p className="text-white text-xs font-light">{COMPANY_DETAILS.emailGeneral}</p>
              </div>
            </div>
            <div className="orbital-tile p-8 group">
              <div className="orbital-content">
                <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <PhoneCall className="text-neon-purple" size={20} />
                </div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Secure Voice Node</h4>
                <p className="text-white text-[10px] italic opacity-50 font-mono">NODE_PENDING_DEPLOYMENT...</p>
              </div>
            </div>
            <div className="orbital-tile p-8 group">
              <div className="orbital-content">
                <div className="p-3 bg-neon-blue/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="text-neon-blue" size={20} />
                </div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Service Reach</h4>
                <p className="text-white text-xs font-light tracking-wide">Coverage: Australia Wide (National)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="orbital-tile p-10 md:p-16 animate-fade-in shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <ShieldCheck size={300} className="text-neon-blue" />
            </div>
            
            <div className="orbital-content relative z-10">
              <div className="mb-12">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-2">Initialize Enquiry Node</h3>
                <p className="text-slate-500 text-xs font-light tracking-widest uppercase">Routing through SYNK_SECURE_GATEWAY_v4</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Identity Signature</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      className="w-full bg-royal-950 border border-royal-800 p-5 rounded-2xl text-white focus:border-neon-blue outline-none transition-all placeholder:text-slate-800 font-light" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Secure Return Email</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="w-full bg-royal-950 border border-royal-800 p-5 rounded-2xl text-white focus:border-neon-blue outline-none transition-all placeholder:text-slate-800 font-light" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Department Routing</label>
                  <select 
                    className="w-full bg-royal-950 border border-royal-800 p-5 rounded-2xl text-white focus:border-neon-purple outline-none transition-all font-light appearance-none cursor-pointer" 
                    value={formData.dept} 
                    onChange={e => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="hello">General Enquiries (Sovereign Node)</option>
                    <option value="sales">Consultancy Sales (Architectural Node)</option>
                    <option value="tech">Tech Division Support (Engineering Node)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Instruction Payload</label>
                  <textarea 
                    placeholder="Describe your structural requirements..." 
                    rows={6} 
                    className="w-full bg-royal-950 border border-royal-800 p-5 rounded-2xl text-white resize-none focus:border-neon-blue outline-none transition-all placeholder:text-slate-800 font-light" 
                    value={formData.msg} 
                    onChange={e => setFormData({...formData, msg: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="slim-orbital-btn w-full py-6 text-white font-black text-[11px] tracking-[0.6em] uppercase mt-8 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all"
                >
                  <span>Deploy Enquiry Protocol <Send size={16} className="ml-4 inline animate-pulse" /></span>
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-10 flex items-center justify-center space-x-12 opacity-30">
            <div className="flex items-center space-x-3 grayscale">
              <ShieldCheck size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">AES-256 Secured</span>
            </div>
            <div className="w-px h-4 bg-royal-800"></div>
            <div className="flex items-center space-x-3 grayscale">
              <Zap size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Instant Uplink</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;