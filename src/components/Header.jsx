import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, Clock, Wrench, ChevronRight, Menu, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Header = () => {
  const { content } = useCMS();
  const { header } = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Top Alert & Brand Bar */}
      <div className="top-bar">
        <div className="container top-bar-flex">
          
          {/* Top Left: Brand Logo & Tagline */}
          <div className="top-bar-left">
            <a href="#" className="logo-brand-top">
              <div className="logo-icon-wrap-top">
                <Wrench size={20} color="#ffffff" />
              </div>
              <div>
                <div className="logo-text-title-top">AMERICAN PLUMBING</div>
                <div className="logo-text-sub-top">{header.tagline}</div>
              </div>
            </a>

            {/* Separator Line */}
            <div className="top-divider" />

            {/* Emergency & License Badges */}
            <div className="top-badge-group">
              <span className="badge-247 pulse-emergency">
                <Clock size={11} /> {header.emergencyBadge}
              </span>
              <span className="top-license-badge">
                <ShieldCheck size={13} color="var(--green-success)" /> {header.licenseNumber} • Bonded & Insured
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="main-header">
        <div className="container header-flex">
          
          {/* Navigation Tabs */}
          <nav className="nav-links">
            <li><a href="#services" className="nav-link">Services & Pricing</a></li>
            <li><a href="#calculator" className="nav-link">Instant Cost Estimator</a></li>
            <li><a href="#trust" className="nav-link">Why Choose Us</a></li>
            <li><a href="#service-area" className="nav-link">Service Area</a></li>
            <li><a href="#reviews" className="nav-link">Customer Reviews</a></li>
          </nav>

          {/* Right Action CTA Group (25% Smaller) */}
          <div className="header-cta-group">
            <a href={`tel:${header.phone}`} className="phone-btn-header-compact pulse-orange-glow">
              <PhoneCall size={14} color="var(--orange-primary)" />
              <div className="phone-text-wrap">
                <div style={{ fontSize: '0.55rem', color: 'var(--slate-300)', textTransform: 'uppercase', lineHeight: 1, fontWeight: '700' }}>Call Dispatch Now</div>
                <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.3px' }}>{header.displayPhone}</div>
              </div>
            </a>

            <a href="#quote-form" className="btn-orange-compact blink-btn-orange">
              Get Instant Quote <ChevronRight size={13} />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button className="mobile-hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <ul className="mobile-nav-list">
              <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services & Pricing</a></li>
              <li><a href="#calculator" onClick={() => setMobileMenuOpen(false)}>Instant Cost Estimator</a></li>
              <li><a href="#trust" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a></li>
              <li><a href="#service-area" onClick={() => setMobileMenuOpen(false)}>Service Area</a></li>
              <li><a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Customer Reviews</a></li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};
