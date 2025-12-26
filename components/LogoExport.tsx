import React, { useRef, useState } from 'react';
import { Download, Crown, Image as ImageIcon, Package, Loader2, Palette } from 'lucide-react';
import JSZip from 'jszip';
import { SynkIconType } from './SynkProductIcon.tsx';
import { COMPANY_DETAILS } from '../config.ts';

interface AssetDef {
  id: string;
  name: string;
  type: 'branding' | 'tech' | 'synk' | 'listing';
  synkType?: SynkIconType;
  phase?: 1 | 2 | 3 | 4;
}

const ASSETS: AssetDef[] = [
  { id: 'google-listing', name: 'Google Listing Square', type: 'listing' },
  { id: 'crown-purple', name: 'Royal Crown (Purple)', type: 'branding' },
  { id: 'crown-blue', name: 'Royal Crown (Blue)', type: 'branding' },
  { id: 'full-logo', name: 'Full Brand Logo', type: 'branding' },
  { id: 'tech-mini', name: 'Tech Division Mini', type: 'tech' },
  { id: 'synk-core', name: 'SYNK Core Logo', type: 'tech' },
  { id: 'claim', name: 'ClaimSYNK', type: 'synk', synkType: 'claim', phase: 1 },
  { id: 'report', name: 'ReportSYNK', type: 'synk', synkType: 'report', phase: 2 },
  { id: 'service', name: 'ServiceSYNK', type: 'synk', synkType: 'service', phase: 2 },
  { id: 'charge', name: 'ChargeSYNK', type: 'synk', synkType: 'chat', phase: 1 },
];

export const LogoExport: React.FC = () => {
  const [isExportingAll, setIsExportingAll] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawToCanvas = async (asset: AssetDef, canvas: HTMLCanvasElement, size = 1024): Promise<string> => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, size, size);

    const isPurple = asset.id.includes('purple') || asset.phase === 1;
    const glowColor = !isPurple ? 'rgba(6, 182, 212, 0.15)' : 'rgba(217, 70, 239, 0.15)';
    const radial = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.6);
    radial.addColorStop(0, glowColor);
    radial.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, size, size);

    if (asset.id === 'google-listing') {
      ctx.save();
      ctx.translate(size/2 - (size*0.2), size/2 - (size*0.3));
      ctx.scale(size*0.4/24, size*0.4/24);
      const p = new Path2D("m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14");
      ctx.strokeStyle = '#d946ef';
      ctx.lineWidth = 1.5;
      ctx.stroke(p);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${size * 0.06}px Outfit, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText("ROYAL CARE GROUP", size / 2, size * 0.75);
      ctx.fillStyle = '#06b6d4';
      ctx.font = `bold ${size * 0.02}px Inter, sans-serif`;
      ctx.fillText("TECH DIVISION & CONSULTANCY", size / 2, size * 0.82);
    } else if (asset.id.includes('crown')) {
      const padding = size * 0.25;
      const drawScale = (size - padding * 2) / 24;
      ctx.save();
      ctx.translate(padding, padding);
      ctx.scale(drawScale, drawScale);
      const p = new Path2D("m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14");
      ctx.strokeStyle = asset.id.includes('blue') ? '#06b6d4' : '#d946ef';
      ctx.lineWidth = 1.5;
      ctx.stroke(p);
      ctx.restore();
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${size * 0.04}px Outfit, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(asset.name.toUpperCase(), size / 2, size / 2);
    }

    return canvas.toDataURL('image/png');
  };

  const downloadAll = async () => {
    if (!canvasRef.current) return;
    setIsExportingAll(true);
    const zip = new JSZip();
    const folder = zip.folder("RoyalCare_Brand_Kit");

    // 1. Export PNGs
    for (const asset of ASSETS) {
      const dataUrl = await drawToCanvas(asset, canvasRef.current);
      const base64Data = dataUrl.split(',')[1];
      folder?.file(`logos/${asset.id}.png`, base64Data, { base64: true });
    }

    // 2. Export Brand Manifest
    const manifest = {
      brand: COMPANY_DETAILS.name,
      legal: COMPANY_DETAILS.legalName,
      division: COMPANY_DETAILS.techDivisionName,
      colors: COMPANY_DETAILS.colors,
      typography: COMPANY_DETAILS.typography,
      version: COMPANY_DETAILS.appVersion
    };
    folder?.file("brand-identity.json", JSON.stringify(manifest, null, 2));

    // 3. Export Typography Guide
    const typeGuide = `# ROYAL CARE GROUP TYPOGRAPHY GUIDE
- Primary Display: ${COMPANY_DETAILS.typography.display} (Google Fonts)
- Body Sans: ${COMPANY_DETAILS.typography.body} (Google Fonts)
- System Mono: JetBrains Mono / Inter Mono

## Implementation:
h1, h2, h3 { font-family: 'Outfit', sans-serif; font-weight: 800; }
body { font-family: 'Inter', sans-serif; font-weight: 300; }`;
    folder?.file("typography-guide.md", typeGuide);

    // 4. Export CSS Variables
    const cssVars = `:root {
  --royal-neon-purple: ${COMPANY_DETAILS.colors.neonPurple};
  --royal-neon-blue: ${COMPANY_DETAILS.colors.neonBlue};
  --royal-bg: ${COMPANY_DETAILS.colors.royal950};
  --royal-surface: ${COMPANY_DETAILS.colors.royal900};
  --royal-layer: ${COMPANY_DETAILS.colors.royal800};
  --royal-status-green: ${COMPANY_DETAILS.colors.statusGreen};
  --font-display: '${COMPANY_DETAILS.typography.display}', sans-serif;
  --font-body: '${COMPANY_DETAILS.typography.body}', sans-serif;
}`;
    folder?.file("styles/brand-variables.css", cssVars);

    const content = await zip.generateAsync({ type: "blob" });
    const url = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RoyalCare_Identity_Manifest_v${COMPANY_DETAILS.appVersion}.zip`;
    link.click();
    window.URL.revokeObjectURL(url);
    setIsExportingAll(false);
  };

  return (
    <div className="bg-royal-900/50 border border-royal-800 rounded-[3rem] p-10 md:p-16 mb-20 relative overflow-hidden backdrop-blur-3xl">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <Palette size={200} className="text-neon-blue" />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 relative z-10">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-neon-purple/10 rounded-2xl border border-neon-purple/20">
              <Package className="text-neon-purple w-6 h-6" />
            </div>
            <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">Identity Node Downloader</h3>
          </div>
          <p className="text-slate-400 text-lg font-light max-w-xl">
            Export production-ready high-resolution assets, typography documentation, and structural CSS variables for organizational integration.
          </p>
        </div>
        
        <button 
          onClick={downloadAll}
          disabled={isExportingAll}
          className="flex items-center space-x-4 px-10 py-6 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] transition-all disabled:opacity-50 group active:scale-95"
        >
          {isExportingAll ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />}
          <span>{isExportingAll ? 'Compiling Kit...' : 'Download Identity Manifest (.zip)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
        {ASSETS.map((asset) => (
          <div key={asset.id} className="group bg-royal-950/80 border border-royal-800 rounded-[2rem] p-8 flex flex-col items-center hover:border-neon-blue transition-all shadow-xl">
            <div className="mb-8 p-8 bg-royal-900/50 rounded-3xl group-hover:scale-110 transition-transform border border-royal-800">
              {asset.id === 'google-listing' ? <ImageIcon className="text-neon-blue w-12 h-12" /> : <Crown className={asset.id.includes('blue') ? 'text-neon-blue w-12 h-12' : 'text-neon-purple w-12 h-12'} />}
            </div>
            <h4 className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] text-center">{asset.name}</h4>
            <div className="mt-auto px-4 py-1.5 bg-royal-900 rounded-full text-[9px] text-neon-blue font-mono border border-neon-blue/20">PNG / 1024px</div>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};