
import React from 'react';
import { TFixSandbox } from '../components/TFixSandbox.tsx';
import { ArrowLeft, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const SandboxPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neon-purple transition-colors mb-8 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Exit Sandbox
          </Link>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-neon-purple/10 border border-neon-purple/20 rounded-2xl">
              <FileSearch size={32} className="text-neon-purple" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Audit Node.</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Logic Calibration Hub // TFIX_v5</p>
            </div>
          </div>
        </div>
        <TFixSandbox />
      </div>
    </div>
  );
};

export default SandboxPage;
