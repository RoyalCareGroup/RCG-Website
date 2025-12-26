
import React, { useState } from 'react';
import { Loader2, CheckCircle, ArrowRightLeft } from 'lucide-react';
import JSZip from 'jszip';
import { COMPANY_DETAILS } from '../config.ts';

export const BackupButton: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'zipping' | 'done'>('idle');

  const handleDownload = async () => {
    setStatus('zipping');
    const zip = new JSZip();

    // --- PROJECT METADATA ---
    zip.file("MIGRATION_GUIDE.md", `# ROYAL CARE GROUP - CORPORATE HANDOVER MANIFEST
Version: ${COMPANY_DETAILS.appVersion}
Generated: ${new Date().toLocaleString()}

## Instructions for New Account:
1. Create a new project in Google AI Studio or your preferred IDE.
2. Upload all files from this ZIP.
3. Ensure the environment variable 'API_KEY' is set in your new hosting provider.
4. The config.ts file contains all organization-specific metadata.

## Structural Nodes included:
- TFix Diagnostic Engine
- SYNK Product Suite UI
- Intelligence Hub
- NDIS Pricing Grounding Core`);

    // --- ROOT FILES ---
    zip.file("package.json", JSON.stringify({
      "name": "royal-care-group-web",
      "version": COMPANY_DETAILS.appVersion,
      "private": true,
      "type": "module",
      "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
      "dependencies": {
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "lucide-react": "^0.468.0",
        "react-router-dom": "^7.1.1",
        "@google/genai": "^1.34.0",
        "jszip": "^3.10.1"
      },
      "devDependencies": {
        "vite": "^6.0.3",
        "@vitejs/plugin-react": "^4.3.4",
        "tailwindcss": "^3.4.16",
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.49",
        "typescript": "^5.7.2",
        "@types/react": "^19.0.1",
        "@types/react-dom": "^19.0.1"
      }
    }, null, 2));

    zip.file("config.ts", `export const COMPANY_DETAILS = ${JSON.stringify(COMPANY_DETAILS, null, 2)};`);

    try {
      const blob = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `RoyalCare_Corporate_Manifest_v${COMPANY_DETAILS.appVersion}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={status === 'zipping'}
      className={`flex items-center space-x-3 px-6 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
        status === 'done' 
          ? 'bg-green-600 border-green-500 text-white' 
          : 'bg-royal-800 border-neon-purple/50 text-white hover:border-neon-purple hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]'
      }`}
    >
      {status === 'zipping' ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === 'done' ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <ArrowRightLeft className="w-4 h-4 text-neon-purple" />
      )}
      <span>
        {status === 'zipping' ? 'PACKAGING MANIFEST...' : status === 'done' ? 'MANIFEST DOWNLOADED!' : 'Generate Corporate Handover ZIP'}
      </span>
    </button>
  );
};