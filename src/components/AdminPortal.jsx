import React, { useState } from 'react';
import { Lock, Save, RefreshCw, X, Edit3, Image as ImageIcon, DollarSign, Mail, Phone, CheckCircle, Shield } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const AdminPortal = ({ isOpen, onClose }) => {
  const { content, updateHeader, updateHero, updateDispatchSettings, updateService, isAdminLoggedIn, loginAdmin, logoutAdmin, resetToDefaults } = useCMS();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('header');

  // Form states initialized from context
  const [headerForm, setHeaderForm] = useState(content.header);
  const [heroForm, setHeroForm] = useState(content.hero);
  const [dispatchForm, setDispatchForm] = useState(content.dispatchSettings);
  const [servicesForm, setServicesForm] = useState(content.services);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleSaveAll = () => {
    updateHeader(headerForm);
    updateHero(heroForm);
    updateDispatchSettings(dispatchForm);
    servicesForm.forEach((s, idx) => updateService(idx, s));
    
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid var(--slate-100)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--navy-primary)', color: 'var(--orange-primary)', padding: '8px', borderRadius: '8px' }}>
              <Lock size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-primary)' }}>American Plumbing Client CMS Portal</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Edit Website Text, Phone Numbers, Prices & Images Without Touching Code</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--slate-600)' }}><X size={24} /></button>
        </div>

        {/* Login Screen if not authenticated */}
        {!isAdminLoggedIn ? (
          <div style={{ padding: '30px 20px', textAlign: 'center', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <Shield size={48} color="var(--orange-primary)" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-primary)' }}>Client Owner Passcode Required</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                Enter your client passcode (Default: <strong>american123</strong> or <strong>admin</strong>) to edit content.
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Enter passcode..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '2px' }}
                />
              </div>

              {loginError && (
                <div style={{ color: 'var(--red-emergency)', fontSize: '0.85rem', marginBottom: '14px', fontWeight: '700' }}>
                  Incorrect passcode. Please try 'american123'
                </div>
              )}

              <button type="submit" className="btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                Unlock CMS Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Logged In CMS Content Editor */
          <div>
            {/* Tabs Navigation */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--slate-300)', marginBottom: '24px' }}>
              <button 
                onClick={() => setActiveTab('header')}
                style={{
                  padding: '10px 16px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  borderBottom: activeTab === 'header' ? '3px solid var(--orange-primary)' : 'none',
                  color: activeTab === 'header' ? 'var(--orange-primary)' : 'var(--slate-600)',
                  background: 'none'
                }}
              >
                📞 Phone & Header Copy
              </button>

              <button 
                onClick={() => setActiveTab('hero')}
                style={{
                  padding: '10px 16px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  borderBottom: activeTab === 'hero' ? '3px solid var(--orange-primary)' : 'none',
                  color: activeTab === 'hero' ? 'var(--orange-primary)' : 'var(--slate-600)',
                  background: 'none'
                }}
              >
                🏠 Hero Headlines & Photo
              </button>

              <button 
                onClick={() => setActiveTab('services')}
                style={{
                  padding: '10px 16px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  borderBottom: activeTab === 'services' ? '3px solid var(--orange-primary)' : 'none',
                  color: activeTab === 'services' ? 'var(--orange-primary)' : 'var(--slate-600)',
                  background: 'none'
                }}
              >
                🛠️ Services & Prices
              </button>

              <button 
                onClick={() => setActiveTab('dispatch')}
                style={{
                  padding: '10px 16px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  borderBottom: activeTab === 'dispatch' ? '3px solid var(--orange-primary)' : 'none',
                  color: activeTab === 'dispatch' ? 'var(--orange-primary)' : 'var(--slate-600)',
                  background: 'none'
                }}
              >
                📬 Notification Email
              </button>
            </div>

            {/* TAB 1: Header */}
            {activeTab === 'header' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Tap-to-Call Display Phone Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={headerForm.displayPhone} 
                    onChange={e => setHeaderForm({ ...headerForm, displayPhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Dial Target (e.g., (216) 555-7586)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={headerForm.phone} 
                    onChange={e => setHeaderForm({ ...headerForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State License Badge Text</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={headerForm.licenseNumber} 
                    onChange={e => setHeaderForm({ ...headerForm, licenseNumber: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">24/7 Emergency Badge Text</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={headerForm.emergencyBadge} 
                    onChange={e => setHeaderForm({ ...headerForm, emergencyBadge: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Hero */}
            {activeTab === 'hero' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Main Hero Headline</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={heroForm.headline} 
                    onChange={e => setHeroForm({ ...heroForm, headline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Subheadline Paragraph</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3}
                    value={heroForm.subheadline} 
                    onChange={e => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Photo URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={heroForm.heroImage} 
                    onChange={e => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Services */}
            {activeTab === 'services' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {servicesForm.map((service, index) => (
                  <div key={service.id} style={{ background: 'var(--slate-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '8px' }}>
                      <div>
                        <label className="form-label">Service Title #{index + 1}</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={service.title}
                          onChange={e => {
                            const copy = [...servicesForm];
                            copy[index].title = e.target.value;
                            setServicesForm(copy);
                          }}
                        />
                      </div>

                      <div>
                        <label className="form-label">Price Range</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={service.price}
                          onChange={e => {
                            const copy = [...servicesForm];
                            copy[index].price = e.target.value;
                            setServicesForm(copy);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Service Description</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={service.description}
                        onChange={e => {
                          const copy = [...servicesForm];
                          copy[index].description = e.target.value;
                          setServicesForm(copy);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Dispatch Settings */}
            {activeTab === 'dispatch' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Plumber Email Address for Form Lead Notifications</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={dispatchForm.plumberEmail} 
                    onChange={e => setDispatchForm({ ...dispatchForm, plumberEmail: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Plumber SMS Mobile Phone Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={dispatchForm.plumberPhone} 
                    onChange={e => setDispatchForm({ ...dispatchForm, plumberPhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Callback Minutes Guarantee</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={dispatchForm.avgResponseMinutes} 
                    onChange={e => setDispatchForm({ ...dispatchForm, avgResponseMinutes: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Save Actions Bar */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '2px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={resetToDefaults} style={{ color: 'var(--red-emergency)', background: 'none', fontSize: '0.85rem', fontWeight: '700' }}>
                Reset All Fields to Default
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {savedSuccess && (
                  <span style={{ color: 'var(--green-success)', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={18} /> Changes Saved Live!
                  </span>
                )}

                <button onClick={handleSaveAll} className="btn-orange">
                  <Save size={16} /> Save Changes Live to Website
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
