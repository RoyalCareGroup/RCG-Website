import React, { useEffect } from 'react';
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
import LiveStatusHUD from './components/LiveStatusHUD.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Scanline = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#01040f] text-slate-200 selection:bg-neon-blue/30 selection:text-white flex flex-col">
        <Scanline />
        <LiveStatusHUD />
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/intelligence" element={<IntelligenceHub />} />
            <Route path="/creative" element={<CreativeStudio />} />
            <Route path="/weblab" element={<WebLab />} />
            <Route path="/video" element={<VideoStudio />} />
            <Route path="/audio" element={<AudioStudio />} />
            <Route path="/about" element={<About />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/deploy" element={<DeploymentHub />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;