import React, { useState } from 'react';
import { Wrench, Upload, AlertTriangle, CheckCircle, ShieldCheck, Star, Phone, ArrowRight, Camera } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const HeroSection = ({ onFormSubmitted }) => {
  const { content, addLead } = useCMS();
  const { hero, header } = content;

  const [issue, setIssue] = useState('Water Heater Repair & Leak');
  const [urgency, setUrgency] = useState('Emergency');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState('/images/hero_plumber.png');
  const [photoName, setPhotoName] = useState('plumbing_issue_photo.jpg');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Please enter your name and phone number so our plumber can reach you.");
      return;
    }

    const newLead = {
      id: `AP-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName || "Valued Customer",
      phone: phone || "(216) 555-0199",
      address: address || "Cleveland, OH",
      issue: issue,
      urgency: urgency,
      status: "New Lead",
      timestamp: "Just now",
      photoUrl: photoPreview,
      notes: notes || "Immediate inquiry submitted via website form."
    };

    addLead(newLead);
    onFormSubmitted(newLead);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-overlay-grid">
          
          {/* Left Column: Headlines & Trust Factors */}
          <div>
            <div className="hero-tagline-badge float-anim">
              <Star size={14} fill="var(--orange-primary)" /> {hero.ratingScore} / 5 Rating • Over {hero.totalReviews} Verified Local Reviews
            </div>

            <h1 className="hero-title">
              Northeast Ohio’s Most <span>Trusted Plumbers</span>
            </h1>

            <p className="hero-subtext">
              {hero.subheadline}
            </p>

            <div className="hero-bullets">
              <div className="hero-bullet-item">
                <div className="bullet-icon"><CheckCircle size={14} /></div>
                <span><strong>24/7 On-Call Emergency Service</strong> — Fast 30-Minute Local Arrival</span>
              </div>
              <div className="hero-bullet-item">
                <div className="bullet-icon"><CheckCircle size={14} /></div>
                <span><strong>100% Upfront Pricing Guarantee</strong> — No Surprise Diagnostic Fees</span>
              </div>
              <div className="hero-bullet-item">
                <div className="bullet-icon"><CheckCircle size={14} /></div>
                <span><strong>Family-Owned & State Licensed</strong> — OH License #{header.licenseNumber}</span>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="hero-image-wrap">
              <img 
                src={hero.heroImage} 
                alt="American Plumbing Certified Technician" 
                className="hero-main-img" 
              />
              <div className="hero-img-badge">
                <ShieldCheck size={32} color="var(--orange-primary)" />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Licensed & Master Certified</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-300)' }}>Background Checked • Drug Tested Technicians</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Inquiry & Dispatch Form */}
          <div className="quote-card" id="quote-form">
            <div className="quote-card-header">
              <h2 className="quote-card-title">
                <Wrench size={26} color="var(--orange-primary)" /> Request Fast Plumbing Service
              </h2>
              <p className="quote-card-subtitle">
                Fill out the form below for an instant dispatch inquiry callback within 15 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Issue Selector */}
              <div className="form-group">
                <label className="form-label">Select Plumbing Problem / Issue</label>
                <select 
                  className="form-select" 
                  value={issue} 
                  onChange={e => setIssue(e.target.value)}
                >
                  <option value="Leaking Water Heater">🔥 Leaking Water Heater / No Hot Water</option>
                  <option value="Clogged Drain / Sewer Backup">💧 Clogged Drain / Main Sewer Line Backup</option>
                  <option value="Burst Pipe Emergency">🚨 Burst Pipe Emergency / Water Shutoff</option>
                  <option value="Running Toilet / Sink Leak">🚽 Running Toilet / Bathroom Plumbing</option>
                  <option value="Gas Line Repair & Inspection">⚡ Gas Line Leak / Appliance Hookup</option>
                  <option value="Water Filtration System">🚰 Water Quality & Filtration System</option>
                </select>
              </div>

              {/* Urgency Selector */}
              <div className="form-group">
                <label className="form-label">Urgency Level</label>
                <div className="urgency-toggle">
                  <button 
                    type="button" 
                    className={`urgency-btn ${urgency === 'Emergency' ? 'active-emergency' : ''}`}
                    onClick={() => setUrgency('Emergency')}
                  >
                    <AlertTriangle size={16} /> 24/7 Emergency Dispatch
                  </button>
                  <button 
                    type="button" 
                    className={`urgency-btn ${urgency === 'Standard' ? 'active-standard' : ''}`}
                    onClick={() => setUrgency('Standard')}
                  >
                    <CheckCircle size={16} /> Standard Appointment
                  </button>
                </div>
              </div>

              {/* Photo Upload Attachment */}
              <div className="form-group">
                <label className="form-label">Upload Photo of Issue (Optional but Recommended)</label>
                <label className="photo-dropzone">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  <Camera size={24} color="var(--orange-primary)" style={{ margin: '0 auto 4px auto', display: 'block' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy-primary)' }}>
                    Click to Upload or Take Photo
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                    Helps our plumber prepare exact parts before arriving
                  </div>
                </label>

                {photoPreview && (
                  <div className="photo-preview-box">
                    <img src={photoPreview} alt="Issue thumbnail" className="photo-preview-img" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-primary)' }}>Photo Attached</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--slate-600)' }}>{photoName}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Inputs */}
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. John Smith" 
                  value={customerName} 
                  onChange={e => setCustomerName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (For Immediate Callback)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="(216) 555-0199" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Address / Zip Code</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Lakewood, OH 44107" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-orange" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Submit Inquiry & Request Dispatch <ArrowRight size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
