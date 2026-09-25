import React from 'react';
import { PhoneCall, Wrench } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const MobileCallBar = () => {
  const { content } = useCMS();
  const { header } = content;

  return (
    <div className="mobile-sticky-bar">
      <div className="mobile-sticky-grid">
        <a href={`tel:${header.phone}`} className="mobile-call-btn pulse-emergency">
          <PhoneCall size={20} /> CALL NOW - {header.displayPhone}
        </a>
        <a href="#quote-form" className="mobile-quote-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Get Instant Quote
        </a>
      </div>
    </div>
  );
};
