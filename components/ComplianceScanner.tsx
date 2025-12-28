import React from 'react';
import { FileText, CheckCircle, Search, ShieldCheck, Box } from 'lucide-react';

export const ComplianceScanner: React.FC = () => {
  return (
    <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem] perspective-[1000px]">
      
      {/* Background/Base - Angular */}
      <div className="absolute inset-0 bg-royal-800/40 backdrop-blur-sm rounded-[2rem] border border-royal-700 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        
        {/* Document Representation - Architectural */}
        <div className="relative w-48 h-64 bg-slate-100 rounded-lg shadow-lg overflow-hidden flex flex-col p-5 animate-float">
          {/* Header Lines */}
          <div className="h-4 w-1/2 bg-slate-300 rounded-[2px] mb-4"></div>
          <div className="h-2 w-full bg-slate-200 rounded-[2px] mb-2"></div>
          <div className="h-2 w-3/4 bg-slate-200 rounded-[2px] mb-2"></div>
          <div className="h-2 w-full bg-slate-200 rounded-[2px] mb-6"></div>
          
          {/* Table Lines */}
          <div className="space-y-3">
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-300 rounded-[1px]"></div>
                <div className="h-2 w-1/4 bg-slate-300 rounded-[1px]"></div>
             </div>
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-200 rounded-[1px]"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded-[1px]"></div>
             </div>
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-200 rounded-[1px]"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded-[1px]"></div>
             </div>
          </div>
          
          {/* Total */}
          <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between">
            <div className="h-3 w-1/4 bg-slate-400 rounded-[1px]"></div>
            <div className="h-3 w-1/3 bg-slate-400 rounded-[1px]"></div>
          </div>

          {/* Icon Overlay */}
          <div className="absolute top-4 right-4">
             <FileText className="w-6 h-6 text-slate-300" />
          </div>
          
          {/* Laser Scanner Line */}
          <div className="absolute left-0 right-0 h-1 bg-neon-blue shadow-[0_0_20px_#06b6d4] animate-scan z-20"></div>
          <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-neon-blue/20 to-transparent animate-scan z-10 -mt-24 pointer-events-none"></div>
        </div>

        {/* Processing Badge - Octagonal Influence */}
        <div className="absolute bottom-8 flex items-center space-x-3 px-6 py-2.5 bg-royal-900/90 rounded-xl border border-neon-purple/40 shadow-lg">
           <Search className="w-4 h-4 text-neon-purple animate-pulse" />
           <span className="text-[10px] font-black font-mono text-neon-purple uppercase tracking-[0.2em]">INTEGRITY_SCAN_ACTIVE</span>
        </div>

      </div>

      {/* Floating Success Result - Angular Node */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
         <div className="bg-royal-950 border border-green-500 rounded-3xl p-8 shadow-[0_0_80px_rgba(34,197,94,0.4)] flex flex-col items-center">
            <div className="bg-green-500/10 p-4 rounded-xl mb-4 border border-green-500/20">
               <ShieldCheck className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-green-500 font-black text-2xl tracking-tighter uppercase font-display">VERIFIED</h3>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-2">PROTOCOL: SYNK_GND</p>
         </div>
      </div>

    </div>
  );
};