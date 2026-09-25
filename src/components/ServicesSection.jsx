import React, { useState } from 'react';
import { Wrench, Flame, Droplets, ShieldAlert, CheckCircle, Calculator, ChevronRight, AlertTriangle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ServicesSection = () => {
  const { content } = useCMS();
  const { services, header } = content;

  // Interactive Price Calculator State
  const [selectedCategory, setSelectedCategory] = useState('water-heater');
  const [severity, setSeverity] = useState('moderate');
  const [isEmergencyTime, setIsEmergencyTime] = useState(false);

  const calculateEstimate = () => {
    let baseMin = 149;
    let baseMax = 399;

    if (selectedCategory === 'water-heater') { baseMin = 149; baseMax = 699; }
    if (selectedCategory === 'drain') { baseMin = 99; baseMax = 349; }
    if (selectedCategory === 'burst-pipe') { baseMin = 199; baseMax = 599; }
    if (selectedCategory === 'sewer') { baseMin = 249; baseMax = 899; }
    if (selectedCategory === 'gas-line') { baseMin = 199; baseMax = 649; }

    if (severity === 'severe') { baseMin *= 1.4; baseMax *= 1.5; }
    if (isEmergencyTime) { baseMin += 50; baseMax += 100; }

    return { min: Math.round(baseMin), max: Math.round(baseMax) };
  };

  const estimate = calculateEstimate();

  return (
    <section className="services-section" id="services">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Flat-Rate Upfront Pricing</span>
          <h2 className="section-title">Comprehensive Plumbing Services</h2>
          <p className="section-subtitle">
            No surprise diagnostic fees. Full written estimate before any work begins on your home or business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid" style={{ marginBottom: '80px' }}>
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div>
                {service.emergency && (
                  <span className="service-badge-emergency">
                    ⚡ 24/7 Emergency
                  </span>
                )}

                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-primary)', marginBottom: '10px' }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                  {service.description}
                </p>
              </div>

              <div>
                <div className="service-price-tag">
                  Estimated Range: {service.price}
                </div>

                <a href="#quote-form" className="btn-orange" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px' }}>
                  Book Service <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instant Cost Calculator Widget */}
        <div className="quote-card" id="calculator" style={{ background: 'var(--navy-primary)', color: '#fff', border: '3px solid var(--orange-primary)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 101, 0, 0.2)', color: 'var(--orange-primary)', padding: '6px 16px', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem', marginBottom: '12px' }}>
              <Calculator size={16} /> Free Online Estimator Tool
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Interactive Plumbing Price Estimator</h2>
            <p style={{ color: 'var(--slate-300)', maxWidth: '560px', margin: '0 auto' }}>
              Select your plumbing issue below to calculate an instant estimated range before scheduling an on-site visit.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'center' }}>
            
            {/* Controls */}
            <div>
              <div className="form-group">
                <label className="form-label" style={{ color: '#fff' }}>1. Select Plumbing Problem</label>
                <select 
                  className="form-select" 
                  value={selectedCategory} 
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="water-heater">Water Heater Repair or Replacement</option>
                  <option value="drain">Drain Clog & Main Line Cleaning</option>
                  <option value="burst-pipe">Burst Pipe Patching & Leak Repair</option>
                  <option value="sewer">Sewer Line Camera & Trenchless Repair</option>
                  <option value="gas-line">Gas Line Leak & Inspection</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#fff' }}>2. Issue Severity</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    type="button" 
                    className={`urgency-btn ${severity === 'moderate' ? 'active-standard' : ''}`}
                    onClick={() => setSeverity('moderate')}
                  >
                    Moderate Clog/Leak
                  </button>
                  <button 
                    type="button" 
                    className={`urgency-btn ${severity === 'severe' ? 'active-emergency' : ''}`}
                    onClick={() => setSeverity('severe')}
                  >
                    Severe / Active Flooding
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#fff' }}>3. Service Timeframe</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={isEmergencyTime} 
                    onChange={e => setIsEmergencyTime(e.target.checked)} 
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>
                    🚨 After-Hours / Weekend / Holiday Dispatch
                  </span>
                </label>
              </div>
            </div>

            {/* Display Estimate Result Card */}
            <div style={{ background: '#ffffff', color: 'var(--navy-primary)', padding: '32px', borderRadius: 'var(--radius-xl)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--slate-600)', marginBottom: '8px' }}>
                Estimated On-Site Inspection Range
              </div>

              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--orange-primary)', lineHeight: '1.1', marginBottom: '8px' }}>
                ${estimate.min} - ${estimate.max}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '20px' }}>
                Includes full diagnostic evaluation & written flat-rate quote before work starts.
              </div>

              <a href="#quote-form" className="btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                Lock In Estimate & Dispatch Technician
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
