import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { ServicesSection } from './components/ServicesSection';
import { ServiceArea } from './components/ServiceArea';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MobileCallBar } from './components/MobileCallBar';
import { ConfirmationModal } from './components/ConfirmationModal';
import { PlumberDispatchDashboard } from './components/PlumberDispatchDashboard';
import { AdminPortal } from './components/AdminPortal';

export function AppContent() {
  const [activeModalLead, setActiveModalLead] = useState(null);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash for direct /admin or #admin access
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
        setIsAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleFormSubmitted = (leadData) => {
    setActiveModalLead(leadData);
  };

  return (
    <div className="app-main-wrapper">
      <Header 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenDispatch={() => setIsDispatchOpen(true)} 
      />

      <main>
        <HeroSection onFormSubmitted={handleFormSubmitted} />
        <TrustBadges />
        <ServicesSection />
        <ServiceArea />
        <ReviewsSection />
      </main>

      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenDispatch={() => setIsDispatchOpen(true)} 
      />

      <MobileCallBar />

      {/* Confirmation Popup Modal with On-Screen Disclaimer */}
      {activeModalLead && (
        <ConfirmationModal 
          leadData={activeModalLead} 
          onClose={() => setActiveModalLead(null)} 
          onOpenDispatch={() => setIsDispatchOpen(true)} 
        />
      )}

      {/* Plumber Lead Alert & Dispatch Simulator Modal */}
      <PlumberDispatchDashboard 
        isOpen={isDispatchOpen} 
        onClose={() => setIsDispatchOpen(false)} 
      />

      {/* Client Admin CMS Portal Modal */}
      <AdminPortal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
