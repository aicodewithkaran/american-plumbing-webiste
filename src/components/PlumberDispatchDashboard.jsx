import React, { useState } from 'react';
import { Mail, Phone, Clock, AlertTriangle, CheckCircle, ShieldCheck, Camera, ArrowRight, UserCheck, Calendar, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const PlumberDispatchDashboard = ({ isOpen, onClose }) => {
  const { content, leads, updateLeadStatus } = useCMS();
  const { dispatchSettings } = content;
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id);

  if (!isOpen) return null;

  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '920px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ color: 'var(--orange-primary)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>
              Plumber Dispatch Center & Lead Notifications
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-primary)' }}>
              Live Incoming Inquiry Lead Tracker
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--slate-600)' }}><X size={24} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
          
          {/* Left Column: Lead Inbox */}
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', color: 'var(--slate-700)' }}>
              Received Inquiries ({leads.length})
            </h3>
            <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
              {leads.map(lead => (
                <div 
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: lead.id === activeLead?.id ? '#EBF1FF' : 'var(--slate-50)',
                    border: lead.id === activeLead?.id ? '2px solid var(--navy-primary)' : '1px solid var(--slate-300)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--navy-primary)' }}>{lead.customerName}</strong>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      background: lead.urgency === 'Emergency' ? 'var(--red-light)' : 'var(--slate-200)',
                      color: lead.urgency === 'Emergency' ? 'var(--red-emergency)' : 'var(--slate-700)'
                    }}>
                      {lead.urgency === 'Emergency' ? '🚨 Emergency' : '⚡ Standard'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', fontWeight: '700' }}>{lead.issue}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>ID: {lead.id}</span>
                    <span>{lead.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated Email/SMS Notification & Follow-up Card */}
          {activeLead ? (
            <div style={{ background: 'var(--slate-900)', color: '#fff', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--slate-700)' }}>
              
              {/* Notification Header Badge */}
              <div style={{ background: 'var(--navy-light)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Mail size={16} color="var(--orange-primary)" />
                  <span>Simulated Plumber Alert Sent to: <strong>{dispatchSettings.plumberEmail}</strong></span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--green-success)', fontWeight: '800' }}>DISPATCH DELIVERED</span>
              </div>

              {/* Lead Details */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--orange-primary)' }}>{activeLead.issue}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-300)' }}>Lead Ref: #{activeLead.id}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-300)' }}>Customer:</span>
                    <div style={{ fontWeight: '800' }}>{activeLead.customerName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-300)' }}>Phone:</span>
                    <div style={{ fontWeight: '800', color: 'var(--orange-primary)' }}>{activeLead.phone}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-300)' }}>Location:</span>
                    <div style={{ fontWeight: '700' }}>{activeLead.address}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-300)' }}>Current Status:</span>
                    <div style={{ fontWeight: '800', color: '#6EE7B7' }}>{activeLead.status}</div>
                  </div>
                </div>

                {/* Uploaded Customer Photo Preview */}
                {activeLead.photoUrl && (
                  <div style={{ marginTop: '14px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-300)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Camera size={14} color="var(--orange-primary)" /> Uploaded Damage Photo:
                    </div>
                    <img 
                      src={activeLead.photoUrl} 
                      alt="Customer upload" 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} 
                    />
                  </div>
                )}
              </div>

              {/* Plumber Action Workflow Controls */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-300)', marginBottom: '10px' }}>
                  Plumber Action Protocol: Update Lead Status
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                  <button 
                    onClick={() => updateLeadStatus(activeLead.id, 'Callback Placed')}
                    style={{ background: activeLead.status === 'Callback Placed' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}
                  >
                    📞 Callback Placed
                  </button>

                  <button 
                    onClick={() => updateLeadStatus(activeLead.id, 'On-site Inspection Scheduled')}
                    style={{ background: activeLead.status === 'On-site Inspection Scheduled' ? 'var(--green-success)' : 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}
                  >
                    📅 On-site Visit Scheduled
                  </button>
                </div>

                <a 
                  href={`tel:${activeLead.phone}`} 
                  className="btn-orange" 
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, var(--green-success), #059669)' }}
                >
                  <Phone size={16} /> Click to Call Customer ({activeLead.phone})
                </a>
              </div>

            </div>
          ) : (
            <div>No leads selected</div>
          )}

        </div>
      </div>
    </div>
  );
};
