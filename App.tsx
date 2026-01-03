import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Tech from './pages/Tech.tsx';
import IntelligenceHub from './pages/IntelligenceHub.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import CreativeStudio from './pages/CreativeStudio.tsx';
import WebLab from './pages/WebLab.tsx';
import VideoStudio from './pages/VideoStudio.tsx';
import AudioStudio from './pages/AudioStudio.tsx';
import About from './pages/About.tsx';
import CaseStudies from './pages/CaseStudies.tsx';
import Contact from './pages/Contact.tsx';
import DesignSystem from './pages/DesignSystem.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import Socials from './pages/Socials.tsx';
import Consultancy from './pages/Consultancy.tsx';
import Governance from './pages/Governance.tsx';
import DeploymentHub from './pages/DeploymentHub.tsx';
import CommandCenter from './pages/CommandCenter.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import LiveStatusHUD from './components/LiveStatusHUD.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { COMPANY_DETAILS } from './config.ts';
import { AlertTriangle } from 'lucide-react';

const FaviconPulse = () => {
  useEffect(() => {
    const phases = [
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d946ef' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14'/></svg>",
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d946efcc' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14'/></svg>"
    ];
    let step = 0;
    const interval = setInterval(() => {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = phases[step % phases.length];
      step++;
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return null;
};

const SovereignSync = () => {
  const [envStatus, setEnvStatus] = useState<'LIVE' | 'STAGING' | 'LOCAL'>('LOCAL');
  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes('run.app')) setEnvStatus('STAGING');
    else if (host.includes('royalcaregroup.com.au') || host.includes('pages.dev')) setEnvStatus('LIVE');
    else setEnvStatus('LOCAL');
  }, []);
  if (envStatus === 'STAGING') {
    return (
      <div className="bg-amber-500 text-black py-2 px-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] relative z-[9999] shadow-2xl">
        <AlertTriangle size={14} />
        <span>Staging Mode Node Active // v{COMPANY_DETAILS.appVersion}</span>
      </div>
    );
  }
  return null;
};

const SovereignRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAuthorized = !!localStorage.getItem('rcg_auth_token');
  const location = useLocation();
  if (!isAuthorized) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

const GoogleTagTracker = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'AW-17820482706', { 'page_path': pathname + hash });
    }
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <SovereignSync />
      <FaviconPulse />
      <GoogleTagTracker />
      <CustomCursor />
      <div className="min-h-screen bg-royal-950 text-slate-200 flex flex-col selection:bg-neon-blue/30 selection:text-white">
        <LiveStatusHUD />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/intelligence" element={<IntelligenceHub />} />
            <Route path="/about" element={<About />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/command" element={<SovereignRoute><CommandCenter /></SovereignRoute>} />
            <Route path="/deploy" element={<SovereignRoute><DeploymentHub /></SovereignRoute>} />
            <Route path="/design-system" element={<SovereignRoute><DesignSystem /></SovereignRoute>} />
            <Route path="/creative" element={<SovereignRoute><CreativeStudio /></SovereignRoute>} />
            <Route path="/weblab" element={<SovereignRoute><WebLab /></SovereignRoute>} />
            <Route path="/video" element={<SovereignRoute><VideoStudio /></SovereignRoute>} />
            <Route path="/audio" element={<SovereignRoute><AudioStudio /></SovereignRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;