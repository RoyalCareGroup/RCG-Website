
import React from 'react';
import { FileText, CheckCircle, Search, ShieldCheck } from 'lucide-react';

export const ComplianceScanner: React.FC = () => {
  return (
    <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem] perspective-[1000px]">
      
      {/* Background/Base */}
      <div className="absolute inset-0 bg-royal-800/40 backdrop-blur-sm rounded-2xl border border-royal-700 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        
        {/* Document Representation */}
        <div className="relative w-48 h-64 bg-slate-100 rounded-lg shadow-lg overflow-hidden flex flex-col p-4 animate-float">
          {/* Header Lines */}
          <div className="h-4 w-1/2 bg-slate-300 rounded mb-4"></div>
          <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
          <div className="h-2 w-3/4 bg-slate-200 rounded mb-2"></div>
          <div className="h-2 w-full bg-slate-200 rounded mb-6"></div>
          
          {/* Table Lines */}
          <div className="space-y-3">
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-300 rounded"></div>
                <div className="h-2 w-1/4 bg-slate-300 rounded"></div>
             </div>
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded"></div>
             </div>
             <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded"></div>
             </div>
          </div>
          
          {/* Total */}
          <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between">
            <div className="h-3 w-1/4 bg-slate-400 rounded"></div>
            <div className="h-3 w-1/3 bg-slate-400 rounded"></div>
          </div>

          {/* Icon Overlay */}
          <div className="absolute top-2 right-2">
             <FileText className="w-6 h-6 text-slate-300" />
          </div>
          
          {/* Laser Scanner Line */}
          <div className="absolute left-0 right-0 h-1 bg-neon-blue shadow-[0_0_15px_#06b6d4] animate-scan z-20"></div>
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-neon-blue/20 to-transparent animate-scan z-10 -mt-16 pointer-events-none"></div>
        </div>

        {/* Processing Badge (Bottom) */}
        <div className="absolute bottom-8 flex items-center space-x-2 px-4 py-2 bg-royal-900/90 rounded-full border border-royal-600 shadow-lg">
           <Search className="w-4 h-4 text-neon-purple animate-pulse" />
           <span className="text-xs font-mono text-neon-purple">ANALYZING LINE ITEMS...</span>
        </div>

      </div>

      {/* Floating Success Result - "The PASS" */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
         <div className="bg-royal-900 border border-green-500 rounded-xl p-4 shadow-[0_0_50px_rgba(34,197,94,0.3)] flex flex-col items-center">
            <div className="bg-green-500/10 p-3 rounded-full mb-2">
               <ShieldCheck className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-green-500 font-bold text-lg tracking-wider">COMPLIANT</h3>
            <p className="text-slate-400 text-[10px] uppercase">NDIS Pricing Standards</p>
         </div>
      </div>

    </div>
  );
};
