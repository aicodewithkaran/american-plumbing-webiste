import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const reviewsData = [
  {
    id: 1,
    name: "Michael R.",
    location: "Lakewood, OH",
    service: "Burst Pipe Emergency",
    rating: 5,
    date: "2 days ago",
    comment: "Our basement pipe burst at 2 AM on a Sunday. American Plumbing was at our house in under 25 minutes! Fixed the line quickly and charged exact upfront price quoted. True lifesavers."
  },
  {
    id: 2,
    name: "David & Karen M.",
    location: "Parma, OH",
    service: "Tankless Water Heater Installation",
    rating: 5,
    date: "1 week ago",
    comment: "Upgraded our old leaking 50-gallon tank to a new Rinnai tankless. The technician wore shoe covers inside, explained everything clearly, and left our basement spotless."
  },
  {
    id: 3,
    name: "Robert T.",
    location: "Westlake, OH",
    service: "Main Drain Clog Cleared",
    rating: 5,
    date: "3 weeks ago",
    comment: "Hydro-jetted our main sewer line after another company tried to upsell us a $6,000 replacement. American Plumbing fixed it for a fraction of the cost. Honest, rugged, dependable team!"
  }
];

export const ReviewsSection = () => {
  const { content } = useCMS();
  const { hero } = content;

  return (
    <section className="services-section" id="reviews" style={{ background: 'var(--slate-100)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Verified Homeowner Feedback</span>
          <h2 className="section-title">What Your Neighbors Are Saying</h2>
          <p className="section-subtitle">
            Rated {hero.ratingScore} out of 5 stars with over {hero.totalReviews} verified reviews across Northeast Ohio.
          </p>
        </div>

        <div className="services-grid" style={{ marginBottom: '60px' }}>
          {reviewsData.map(rev => (
            <div key={rev.id} className="service-card" style={{ padding: '28px' }}>
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFB300" color="#FFB300" />
                  ))}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--slate-800)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--navy-primary)', display: 'block' }}>{rev.name}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)' }}>{rev.location} • {rev.service}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--green-success)', fontWeight: '800' }}>Verified Customer</span>
              </div>
            </div>
          ))}
        </div>

        {/* 100% Satisfaction Guarantee Box */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#fff', padding: '32px', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', border: '2px solid var(--orange-primary)' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--orange-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, margin: '0 auto' }}>
            <ShieldCheck size={36} color="#fff" />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '6px' }}>
              The American Plumbing Ironclad Guarantee
            </h3>
            <p style={{ color: 'var(--slate-300)', fontSize: '0.925rem' }}>
              If you aren't 100% satisfied with our workmanship, parts, or technician cleanliness, we will return and fix it at zero additional charge to you.
            </p>
          </div>

          <a href="#quote-form" className="btn-orange" style={{ flexShrink: 0 }}>
            Schedule Service Now
          </a>
        </div>

      </div>
    </section>
  );
};
