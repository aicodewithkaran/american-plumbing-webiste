import React from 'react';
import { CheckCircle2, Clock, ShieldAlert, PhoneCall, ArrowRight, X, FileText, Image as ImageIcon } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ConfirmationModal = ({ leadData, onClose, onOpenDispatch }) => {
  const { content } = useCMS();
  if (!leadData) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-success)', fontWeight: '800' }}>
            <CheckCircle2 size={24} /> Dispatch Request Submitted
          </div>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--slate-600)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ textAlign: 'center', margin: '10px 0 20px 0' }}>
          <div style={{ background: 'var(--slate-100)', display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', color: 'var(--navy-primary)' }}>
            Tracking ID: <span style={{ color: 'var(--orange-primary)' }}>{leadData.id}</span>
          </div>
        </div>

        {/* MANDATORY ON-SCREEN NOTICE */}
        <div className="disclaimer-alert-box">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <ShieldAlert size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#B45309' }}>Important Notice:</strong>
              Thank you! Your request has been sent to our dispatch team. This is an initial estimate inquiry—a final accurate quote will be provided after an on-site inspection.
            </div>
          </div>
        </div>

        {/* Lead Details Summary */}
        <div style={{ background: 'var(--slate-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--slate-600)', display: 'block', fontSize: '0.75rem' }}>CUSTOMER NAME</span>
              <strong>{leadData.customerName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-600)', display: 'block', fontSize: '0.75rem' }}>PHONE NUMBER</span>
              <strong>{leadData.phone}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-600)', display: 'block', fontSize: '0.75rem' }}>REPORTED ISSUE</span>
              <strong style={{ color: 'var(--navy-primary)' }}>{leadData.issue}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-600)', display: 'block', fontSize: '0.75rem' }}>URGENCY</span>
              <strong style={{ color: leadData.urgency === 'Emergency' ? 'var(--red-emergency)' : 'var(--navy-primary)' }}>
                {leadData.urgency === 'Emergency' ? '🚨 24/7 Emergency' : '⚡ Standard Inquiry'}
              </strong>
            </div>
          </div>

          {leadData.photoUrl && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--slate-300)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ImageIcon size={18} color="var(--orange-primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>1 Photo Attachment Attached for Technician Review</span>
            </div>
          )}
        </div>

        {/* Callback Expectation Banner */}
        <div style={{ background: '#EBF1FF', padding: '14px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Clock size={24} color="var(--navy-primary)" />
          <div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--navy-primary)' }}>Guaranteed On-Call Dispatch Response</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
              An technician will call your number ({leadData.phone}) within {content.dispatchSettings.avgResponseMinutes} minutes to confirm arrival details.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={() => { onClose(); onOpenDispatch(); }}
            className="btn-orange" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Preview Plumber Notification & Dispatch Dashboard <ArrowRight size={16} />
          </button>
          
          <a 
            href={`tel:${content.header.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--navy-primary)',
              fontWeight: '800',
              padding: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            Need Immediate Help? Call {content.header.displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
};
