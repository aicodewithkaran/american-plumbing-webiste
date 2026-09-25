import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Footer = () => {
  const { content } = useCMS();
  const { header, dispatchSettings } = content;

  return (
    <footer style={{ background: 'var(--navy-dark)', color: '#ffffff', padding: '60px 0 30px 0', borderTop: '4px solid var(--orange-primary)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--orange-primary)', padding: '8px', borderRadius: '8px' }}>
                <Wrench size={22} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.5px' }}>AMERICAN PLUMBING</span>
            </div>

            <p style={{ color: 'var(--slate-300)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Northeast Ohio’s rugged, trusted, and fast 24/7 emergency plumbing service provider. Family-owned and operated for over 35 years.
            </p>

            <div style={{ fontSize: '0.8rem', color: 'var(--orange-primary)', fontWeight: '700' }}>
              <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} /> {header.licenseNumber} • Bonded & Fully Insured
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', borderBottom: '2px solid var(--orange-primary)', paddingBottom: '6px', display: 'inline-block' }}>
              Services & Repair
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--slate-300)' }}>
              <li><a href="#services" style={{ color: 'var(--slate-300)', textDecoration: 'none' }}>Water Heater Repair & Tankless</a></li>
              <li><a href="#services" style={{ color: 'var(--slate-300)', textDecoration: 'none' }}>Drain Cleaning & Hydro-Jetting</a></li>
              <li><a href="#services" style={{ color: 'var(--slate-300)', textDecoration: 'none' }}>Burst Pipe Emergency Repairs</a></li>
              <li><a href="#services" style={{ color: 'var(--slate-300)', textDecoration: 'none' }}>Sewer Line Video Camera Inspection</a></li>
              <li><a href="#services" style={{ color: 'var(--slate-300)', textDecoration: 'none' }}>Gas Leak Inspection & Piping</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', borderBottom: '2px solid var(--orange-primary)', paddingBottom: '6px', display: 'inline-block' }}>
              24/7 Dispatch Hotline
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <a href={`tel:${header.phone}`} style={{ color: 'var(--orange-primary)', fontWeight: '900', fontSize: '1.25rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={20} /> {header.displayPhone}
              </a>

              <div style={{ color: 'var(--slate-300)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--orange-primary)" /> {dispatchSettings.plumberEmail}
              </div>

              <div style={{ color: 'var(--slate-300)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--orange-primary)" /> Serving Cleveland, Akron, Canton & Surrounding Counties
              </div>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: 'var(--slate-600)' }}>
          <div>© {new Date().getFullYear()} American Plumbing LLC. All rights reserved.</div>
          <div>Northeast Ohio's Most Trusted Plumbing & Emergency Services</div>
        </div>

      </div>
    </footer>
  );
};
