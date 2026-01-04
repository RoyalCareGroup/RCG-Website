
import React from 'react';
import { AetherScout } from '../components/AetherScout.tsx';
import { ArrowLeft, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const AureliaPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neon-green transition-colors mb-8 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Disconnect Link
          </Link>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-neon-green/10 border border-neon-green/20 rounded-2xl">
              <Radio size={32} className="text-neon-green" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Presence.</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Neural Strategic Interface // AURELIA_v4</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
           <AetherScout />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.8em] italic">
            "Aurelia is optimized for organizational diagnosis and high-stakes strategy identification."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AureliaPage;
