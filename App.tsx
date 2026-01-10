
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import LiveStatusHUD from './components/LiveStatusHUD.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { NeuralBackground } from './components/NeuralBackground.tsx';
import { SovereignGrid } from './components/SovereignGrid.tsx';
import { RefractiveLens } from './components/RefractiveLens.tsx';
import { SovereignProvider, useSovereign } from './context/SovereignContext.tsx';
import { SovereignConsent } from './components/SovereignConsent.tsx';
import { MatrixXRay } from './components/MatrixXRay.tsx';
import { NeuralPassport } from './components/NeuralPassport.tsx';
import { AlertTriangle, Loader2 } from 'lucide-react';

// --- LAZY LOADED NODES ---
const Home = lazy(() => import('./pages/Home.tsx'));
const Tech = lazy(() => import('./pages/Tech.tsx'));
const IntelligenceHub = lazy(() => import('./pages/IntelligenceHub.tsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Privacy = lazy(() => import('./pages/Privacy.tsx'));
const Terms = lazy(() => import('./pages/Terms.tsx'));
const Compliance = lazy(() => import('./pages/Compliance.tsx'));
const Socials = lazy(() => import('./pages/Socials.tsx'));
const Consultancy = lazy(() => import('./pages/Consultancy.tsx'));
const Governance = lazy(() => import('./pages/Governance.tsx'));
const DeploymentHub = lazy(() => import('./pages/DeploymentHub.tsx'));
const CommandCenter = lazy(() => import('./pages/CommandCenter.tsx'));
const AdminLogin = lazy(() => import('./components/AdminLogin.tsx'));
const DesignSystem = lazy(() => import('./pages/DesignSystem.tsx'));
const CreativeStudio = lazy(() => import('./pages/CreativeStudio.tsx'));
const WebLab = lazy(() => import('./pages/WebLab.tsx'));
const VideoStudio = lazy(() => import('./pages/VideoStudio.tsx'));
const AudioStudio = lazy(() => import('./pages/AudioStudio.tsx'));
const ArchitectPage = lazy(() => import('./pages/ArchitectPage.tsx'));
const SandboxPage = lazy(() => import('./pages/SandboxPage.tsx'));
const AureliaPage = lazy(() => import('./pages/AureliaPage.tsx'));
const EasyRead = lazy(() => import('./pages/EasyRead.tsx'));
const WebsiteMakeovers = lazy(() => import('./pages/WebsiteMakeovers.tsx'));
const MemberVault = lazy(() => import('./pages/MemberVault.tsx'));

const NeuralFallback = () => (
  <div className="fixed inset-0 z-[9999] bg-royal-950 flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="w-24 h-24 rounded-full border-4 border-dashed border-neon-blue animate-spin-slow"></div>
      <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-blue animate-pulse" size={32} />
    </div>
    <div className="text-center space-y-2">
      <div className="text-[10px] font-black text-white uppercase tracking-tight">Synchronizing_Node</div>
      <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest italic">Fetching neural assets...</div>
    </div>
  </div>
);

const MemberRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isMember, setShowPassportModal } = useSovereign();
  const location = useLocation();
  
  if (!isMember) {
    useEffect(() => { setShowPassportModal(true); }, []);
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const SovereignRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAuthorized = !!localStorage.getItem('rcg_auth_token');
  const location = useLocation();
  if (!isAuthorized) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

const PageTransitionScanner = () => {
  const { pathname } = useLocation();
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 1500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isScanning) return null;
  return <div className="scanning-freznel animate-scan-line" />;
};

const GridInteractionLayer = ({ children }: { children?: React.ReactNode }) => {
  const { triggerPulse } = useSovereign();
  const handleInteraction = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON' && target.tagName !== 'A' && !target.closest('button') && !target.closest('a')) {
      triggerPulse(e.clientX, e.clientY);
    }
  };
  return <div onClick={handleInteraction} className="min-h-screen flex flex-col bg-transparent relative">{children}</div>;
};

const AppContent: React.FC = () => {
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  return (
    <GridInteractionLayer>
      <NeuralBackground />
      <MatrixXRay />
      <SovereignGrid />
      <RefractiveLens />
      <CustomCursor />
      <NeuralPassport />

      {!isGridInitialized ? (
        <SovereignConsent onAccepted={() => setIsGridInitialized(true)} />
      ) : (
        <div className="relative z-10 min-h-screen flex flex-col selection:bg-neon-blue/30 selection:text-white animate-in fade-in duration-1000 bg-transparent">
          <PageTransitionScanner />
          <LiveStatusHUD />
          
          <div className="flex-grow flex flex-col bg-transparent">
            <Header />
            <main className="flex-grow bg-transparent">
              <Suspense fallback={<NeuralFallback />}>
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
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/socials" element={<Socials />} />
                  <Route path="/architect" element={<ArchitectPage />} />
                  <Route path="/sandbox" element={<SandboxPage />} />
                  <Route path="/aurelia" element={<AureliaPage />} />
                  <Route path="/easy-read" element={<EasyRead />} />
                  <Route path="/makeovers" element={<WebsiteMakeovers />} />
                  <Route path="/vault" element={<MemberRoute><MemberVault /></MemberRoute>} />
                  <Route path="/command" element={<SovereignRoute><CommandCenter /></SovereignRoute>} />
                  <Route path="/deploy" element={<SovereignRoute><DeploymentHub /></SovereignRoute>} />
                  <Route path="/design-system" element={<SovereignRoute><DesignSystem /></SovereignRoute>} />
                  <Route path="/creative" element={<SovereignRoute><CreativeStudio /></SovereignRoute>} />
                  <Route path="/weblab" element={<SovereignRoute><WebLab /></SovereignRoute>} />
                  <Route path="/video" element={<SovereignRoute><VideoStudio /></SovereignRoute>} />
                  <Route path="/audio" element={<SovereignRoute><AudioStudio /></SovereignRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      )}
    </GridInteractionLayer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <SovereignProvider>
        <AppContent />
      </SovereignProvider>
    </Router>
  );
};

export default App;
