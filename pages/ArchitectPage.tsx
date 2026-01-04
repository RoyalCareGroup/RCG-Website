
import React from 'react';
import { FutureStateArchitect } from '../components/FutureStateArchitect.tsx';
import { ArrowLeft, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchitectPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neon-blue transition-colors mb-8 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Exit Laboratory
          </Link>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-2xl">
              <Layout size={32} className="text-neon-blue" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Vision Lab.</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Structural Synthesis Node // GND_v10</p>
            </div>
          </div>
        </div>
        <FutureStateArchitect />
      </div>
    </div>
  );
};

export default ArchitectPage;
