
import React from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Shield, Lock, X, Layout, Monitor, Smartphone, Tablet } from 'lucide-react';

interface BrowserMockupProps {
  children: React.ReactNode;
  onClose: () => void;
  url?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({ children, onClose, url = "https://www.royalcaregroup.com.au" }) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getWidth = () => {
    if (viewMode === 'mobile') return 'max-w-[375px]';
    if (viewMode === 'tablet') return 'max-w-[768px]';
    return 'max-w-full';
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-royal-950/98 backdrop-blur-2xl flex flex-col animate-fade-in">
      {/* Mockup Controls Header */}
      <div className="bg-royal-950 border-b border-royal-800 p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="h-6 w-px bg-royal-800"></div>
          <div className="flex bg-royal-900 rounded-lg p-1 border border-royal-700">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-neon-blue text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setViewMode('tablet')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'tablet' ? 'bg-neon-blue text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Tablet size={16} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-neon-blue text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-2xl mx-10 items-center bg-royal-900 border border-royal-700 rounded-xl px-4 py-2 space-x-4">
          <div className="flex items-center space-x-3 text-slate-500">
            <ArrowLeft size={14} />
            <ArrowRight size={14} />
            <RotateCw size={14} />
          </div>
          <div className="flex-1 flex items-center bg-royal-950/50 rounded-lg px-3 py-1.5 border border-royal-800">
            <Lock size={10} className="text-green-500 mr-2" />
            <span className="text-[10px] text-slate-400 font-mono tracking-wider truncate">{url}</span>
          </div>
          <Shield size={14} className="text-neon-blue" />
        </div>

        <button 
          onClick={onClose}
          className="bg-royal-900 hover:bg-royal-800 text-slate-400 hover:text-white px-4 py-2 rounded-xl border border-royal-700 flex items-center space-x-2 transition-all"
        >
          <X size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Exit Preview</span>
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-royal-950 overflow-hidden flex justify-center p-4 sm:p-8">
        <div className={`w-full ${getWidth()} bg-white shadow-[0_0_100px_rgba(6,182,212,0.15)] rounded-2xl overflow-hidden transition-all duration-500 border border-royal-800`}>
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="bg-royal-950 border-t border-royal-800 p-3 flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            Browser Protocol Active • Preview Version 1.0.4 • <span className="text-neon-blue">Sovereign Layer Enabled</span>
          </span>
        </div>
      </div>
    </div>
  );
};
