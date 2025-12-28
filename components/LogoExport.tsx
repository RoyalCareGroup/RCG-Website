import React, { useRef, useState } from 'react';
import { Download, Crown, Image as ImageIcon, Package, Loader2, Palette, Share2 } from 'lucide-react';
import JSZip from 'jszip';
import { SynkIconType } from './SynkProductIcon.tsx';
import { COMPANY_DETAILS } from '../config.ts';

interface AssetDef {
  id: string;
  name: string;
  type: 'branding' | 'tech' | 'synk' | 'listing';
  synkType?: SynkIconType;
  phase?: 1 | 2 | 3 | 4;
  dimensions?: { w: number, h: number };
}

const ASSETS: AssetDef[] = [
  { id: 'social-graphic', name: 'Sovereign Social Graphic', type: 'listing', dimensions: { w: 1200, h: 630 } },
  { id: 'google-listing', name: 'Google Listing Square', type: 'listing', dimensions: { w: 1024, h: 1024 } },
  { id: 'crown-purple', name: 'Royal Crown (Purple)', type: 'branding', dimensions: { w: 1024, h: 1024 } },
  { id: 'crown-blue', name: 'Royal Crown (Blue)', type: 'branding', dimensions: { w: 1024, h: 1024 } },
  { id: 'full-logo', name: 'Full Brand Logo', type: 'branding', dimensions: { w: 2048, h: 512 } },
  { id: 'tech-mini', name: 'Tech Division Mini', type: 'tech', dimensions: { w: 1024, h: 1024 } },
  { id: 'synk-core', name: 'SYNK Core Logo', type: 'tech', dimensions: { w: 1024, h: 1024 } },
  { id: 'claim', name: 'ClaimSYNK', type: 'synk', synkType: 'claim', phase: 1, dimensions: { w: 1024, h: 1024 } },
  { id: 'report', name: 'ReportSYNK', type: 'synk', synkType: 'report', phase: 2, dimensions: { w: 1024, h: 1024 } },
  { id: 'service', name: 'ServiceSYNK', type: 'synk', synkType: 'service', phase: 2, dimensions: { w: 1024, h: 1024 } },
];

export const LogoExport: React.FC = () => {
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawToCanvas = async (asset: AssetDef, canvas: HTMLCanvasElement): Promise<string> => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const width = asset.dimensions?.w || 1024;
    const height = asset.dimensions?.h || 1024;
    canvas.width = width;
    canvas.height = height;

    // 1. BASE BACKGROUND
    ctx.fillStyle = '#01040f';
    ctx.fillRect(0, 0, width, height);

    if (asset.id === 'social-graphic') {
      // --- START SOVEREIGN GRAPHIC ENGINE ---
      
      // A. STRUCTURAL GRID
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // B. SOVEREIGN GLOW FIELDS
      const purpleGlow = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.5);
      purpleGlow.addColorStop(0, 'rgba(217, 70, 239, 0.15)');
      purpleGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, width, height);

      const blueGlow = ctx.createRadialGradient(width/2, height/2 + 50, 0, width/2, height/2 + 50, width*0.4);
      blueGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      blueGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);

      // C. HOLOGRAPHIC FLOOR
      const floorGrad = ctx.createLinearGradient(0, height * 0.7, 0, height);
      floorGrad.addColorStop(0, 'transparent');
      floorGrad.addColorStop(1, 'rgba(6, 182, 212, 0.05)');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      // D. CROWN IDENTITY NODE
      ctx.save();
      const crownScale = 6;
      ctx.translate(width/2 - (24 * crownScale / 2), height/2 - 160);
      ctx.scale(crownScale, crownScale);
      
      const p = new Path2D("m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14");
      
      // Shadow/Glow behind crown
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(217, 70, 239, 0.8)';
      ctx.strokeStyle = '#d946ef';
      ctx.lineWidth = 1.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke(p);
      ctx.restore();

      // E. NEURAL CHIP SUB-NODE
      ctx.save();
      ctx.translate(width/2 + 55, height/2 - 45);
      // Chip Box
      ctx.fillStyle = '#01040f';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(0, 0, 48, 48, 12); else ctx.rect(0, 0, 48, 48);
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Chip Icon
      ctx.translate(8, 8);
      ctx.scale(32/24, 32/24);
      const chip = new Path2D("M4 4h16v16H4V4zm4 5h8v6H8V9zm1-5V2m3 2V2m3 2V2m3 2V2M4 8H2m2 3H2m2 3H2m2 3H2m16-9h2m-2 3h2m-2 3h2m-2 3h2m-1 5v2m-3-2v2m-3-2v2m-3-2v2");
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.stroke(chip);
      ctx.restore();

      // F. BRAND TYPOGRAPHY
      ctx.textAlign = 'center';
      ctx.font = 'black 84px Outfit, sans-serif';
      ctx.textBaseline = 'top';
      ctx.letterSpacing = '-2px';
      
      // Measure text for gradient placement
      const t1 = "ROYAL CARE ";
      const t2 = "GROUP.";
      const fullWidth = ctx.measureText(t1 + t2).width;
      const startX = (width - fullWidth) / 2;

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(t1, startX, height/2 + 40);
      
      ctx.fillStyle = '#06b6d4';
      ctx.fillText(t2, startX + ctx.measureText(t1).width, height/2 + 40);

      // G. SUBTEXT NODE
      ctx.font = 'bold 15px Inter, sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '12px';
      ctx.fillText("NATIONAL STRUCTURAL INTELLIGENCE", width/2, height/2 + 155);

      // H. DECORATIVE BORDER
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const pad = 32;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(pad, pad, width - pad*2, height - pad*2, 40);
      ctx.stroke();

      // I. METADATA TAGS
      ctx.font = 'bold 10px monospace';
      ctx.letterSpacing = '5px';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText(`SYNK_CORE_STABLE_v${COMPANY_DETAILS.appVersion}`, width - 60, height - 50);
      
      ctx.textAlign = 'left';
      ctx.fillText("AU_EAST_NODE_1", 60, height - 50);

    } else if (asset.id === 'google-listing') {
      // Simplified Square Listing
      ctx.save();
      ctx.translate(width/2 - (width*0.2), height/2 - (height*0.3));
      ctx.scale(width*0.4/24, width*0.4/24);
      const p = new Path2D("m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14");
      ctx.strokeStyle = '#d946ef';
      ctx.lineWidth = 1.5;
      ctx.stroke(p);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${width * 0.06}px Outfit, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText("ROYAL CARE GROUP", width / 2, height * 0.75);
      ctx.fillStyle = '#06b6d4';
      ctx.font = `bold ${width * 0.02}px Inter, sans-serif`;
      ctx.fillText("TECH DIVISION & CONSULTANCY", width / 2, height * 0.82);
    } else if (asset.id.includes('crown')) {
      const padding = width * 0.25;
      const drawScale = (width - padding * 2) / 24;
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
      ctx.font = `bold ${width * 0.04}px Outfit, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(asset.name.toUpperCase(), width / 2, height / 2);
    }

    return canvas.toDataURL('image/png');
  };

  const downloadSingle = async (assetId: string) => {
    if (!canvasRef.current) return;
    const asset = ASSETS.find(a => a.id === assetId);
    if (!asset) return;

    setExportingId(assetId);
    const dataUrl = await drawToCanvas(asset, canvasRef.current);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `RCG_${asset.id}_${Date.now()}.png`;
    link.click();
    setExportingId(null);
  };

  const downloadAll = async () => {
    if (!canvasRef.current) return;
    setIsExportingAll(true);
    const zip = new JSZip();
    const folder = zip.folder("RoyalCare_Brand_Kit");

    for (const asset of ASSETS) {
      const dataUrl = await drawToCanvas(asset, canvasRef.current);
      const base64Data = dataUrl.split(',')[1];
      folder?.file(`logos/${asset.id}.png`, base64Data, { base64: true });
    }

    const manifest = {
      brand: COMPANY_DETAILS.name,
      legal: COMPANY_DETAILS.legalName,
      division: COMPANY_DETAILS.techDivisionName,
      colors: COMPANY_DETAILS.colors,
      typography: COMPANY_DETAILS.typography,
      version: COMPANY_DETAILS.appVersion
    };
    folder?.file("brand-identity.json", JSON.stringify(manifest, null, 2));

    const typeGuide = `# ROYAL CARE GROUP TYPOGRAPHY GUIDE\n- Primary Display: ${COMPANY_DETAILS.typography.display}\n- Body Sans: ${COMPANY_DETAILS.typography.body}`;
    folder?.file("typography-guide.md", typeGuide);

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
        
        <div className="flex gap-4">
           <button 
              id="trigger-social-graphic"
              onClick={() => downloadSingle('social-graphic')}
              disabled={exportingId === 'social-graphic'}
              className="flex items-center space-x-4 px-8 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-neon-blue hover:text-white transition-all shadow-xl group active:scale-95"
           >
              {exportingId === 'social-graphic' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
              <span>Export Social Graphic</span>
           </button>
           <button 
              onClick={downloadAll}
              disabled={isExportingAll}
              className="flex items-center space-x-4 px-8 py-5 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] transition-all disabled:opacity-50 group active:scale-95"
           >
              {isExportingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
              <span>Download Full Kit (.zip)</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
        {ASSETS.map((asset) => (
          <div key={asset.id} className="group bg-royal-950/80 border border-royal-800 rounded-[2rem] p-8 flex flex-col items-center hover:border-neon-blue transition-all shadow-xl">
            <div className="mb-6 p-6 bg-royal-900/50 rounded-3xl group-hover:scale-110 transition-transform border border-royal-800 flex items-center justify-center min-h-[120px] w-full">
              {asset.id === 'social-graphic' ? <Share2 className="text-neon-purple w-12 h-12" /> : asset.id === 'google-listing' ? <ImageIcon className="text-neon-blue w-12 h-12" /> : <Crown className={asset.id.includes('blue') ? 'text-neon-blue w-12 h-12' : 'text-neon-purple w-12 h-12'} />}
            </div>
            <h4 className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] text-center">{asset.name}</h4>
            <button 
              onClick={() => downloadSingle(asset.id)}
              className="mt-auto px-4 py-2 bg-royal-900 hover:bg-neon-blue hover:text-white rounded-full text-[8px] text-neon-blue font-black uppercase tracking-widest border border-neon-blue/20 transition-all"
            >
               Download PNG
            </button>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};