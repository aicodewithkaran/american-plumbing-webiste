import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Star, DollarSign, Clock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const TrustBadges = () => {
  const { content } = useCMS();
  const { header, hero } = content;

  return (
    <section className="trust-strip" id="trust">
      <div className="container">
        <div className="trust-grid">
          
          <div className="trust-item">
            <div className="trust-icon-box">
              <HeartHandshake size={28} color="var(--orange-primary)" />
            </div>
            <div>
              <div className="trust-title">Family-Owned Since 1988</div>
              <div className="trust-desc">Serving Northeast Ohio families with integrity for over 35 years.</div>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={28} color="var(--orange-primary)" />
            </div>
            <div>
              <div className="trust-title">State Licensed & Insured</div>
              <div className="trust-desc">{header.licenseNumber} — Master Plumbing certified.</div>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <DollarSign size={28} color="var(--orange-primary)" />
            </div>
            <div>
              <div className="trust-title">No Surprise Pricing</div>
              <div className="trust-desc">Firm upfront quotes provided before any work begins.</div>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Star size={28} color="var(--orange-primary)" />
            </div>
            <div>
              <div className="trust-title">{hero.ratingScore} / 5 Stars Rating</div>
              <div className="trust-desc">{hero.totalReviews} verified Google & Angi home reviews.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
