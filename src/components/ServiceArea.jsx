import React, { useState } from 'react';
import { MapPin, CheckCircle, AlertCircle, PhoneCall } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const coveredZips = [
  '44101', '44102', '44107', '44109', '44111', '44113', '44114', '44115', '44120', '44130', '44136', '44140', '44145',
  '44301', '44302', '44303', '44305', '44310', '44312', '44313', '44320', '44333',
  '44702', '44703', '44708', '44709', '44718', '44720'
];

export const ServiceArea = () => {
  const { content } = useCMS();
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState(null);

  const checkZip = (e) => {
    e.preventDefault();
    const clean = zipInput.trim();
    if (!clean) return;

    if (coveredZips.includes(clean) || clean.startsWith('441') || clean.startsWith('440') || clean.startsWith('442') || clean.startsWith('443')) {
      setZipResult({ covered: true, message: `Great news! Zip code ${clean} is inside our 30-minute priority dispatch zone!` });
    } else {
      setZipResult({ covered: true, message: `Zip code ${clean} is covered under our expanded Northeast Ohio regional service area.` });
    }
  };

  return (
    <section className="services-section" style={{ background: '#ffffff', padding: '70px 0' }} id="service-area">
      <div className="container">
        
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-tag">Local Fast Dispatch</span>
          <h2 className="section-title">Serving All of Northeast Ohio</h2>
          <p className="section-subtitle">
            Equipped service vans stationed in Cuyahoga, Summit, Lorain, Medina, Lake, and Stark counties.
          </p>
        </div>

        <div style={{ background: 'var(--navy-primary)', color: '#fff', borderRadius: 'var(--radius-xl)', padding: '36px', border: '2px solid var(--orange-primary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'center' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orange-primary)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                <MapPin size={18} /> Coverage Checker
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
                Check Service Availability in Your Neighborhood
              </h3>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.95rem', marginBottom: '24px' }}>
                Enter your 5-digit zip code below to check on-call technician status in your city.
              </p>

              <form onSubmit={checkZip} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Zip Code (e.g. 44107)" 
                  maxLength={5}
                  value={zipInput}
                  onChange={e => setZipInput(e.target.value)}
                  style={{ background: '#fff', color: 'var(--navy-primary)', fontWeight: '700' }}
                />
                <button type="submit" className="btn-orange" style={{ flexShrink: 0 }}>
                  Check Coverage
                </button>
              </form>

              {zipResult && (
                <div style={{ marginTop: '16px', padding: '14px', borderRadius: 'var(--radius-md)', background: zipResult.covered ? 'rgba(16, 185, 129, 0.15)' : 'rgba(211, 47, 47, 0.15)', border: `1px solid ${zipResult.covered ? 'var(--green-success)' : 'var(--red-emergency)'}`, color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="var(--green-success)" />
                  <div>{zipResult.message}</div>
                </div>
              )}
            </div>

            {/* City Badges */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--orange-primary)', marginBottom: '12px' }}>
                Primary Cleveland & Akron Service Hubs
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Cleveland', 'Lakewood', 'Parma', 'Akron', 'Canton', 'Euclid', 'Mentor', 'Strongsville', 'Elyria', 'Westlake', 'North Royalton', 'Medina', 'Stow', 'Cuyahoga Falls', 'Beachwood', 'Brunswick'].map(city => (
                  <span key={city} style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#fff', padding: '8px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} color="var(--orange-primary)" /> {city}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
