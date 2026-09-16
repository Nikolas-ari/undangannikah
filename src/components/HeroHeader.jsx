import React from 'react';
import { INVITATION_DATA } from '../config/invitationData';

export const HeroHeader = () => {
  const { couple, gallery } = INVITATION_DATA;

  // Quadruple items array to guarantee smooth seamless infinite looping animation
  const marqueeItems = [...gallery, ...gallery];

  return (
    <section className="hero-section">
      {/* TRANSPARENT WATERMARK PHOTO BACKGROUND LAYER */}
      <div
        className="hero-bg-photo"
        style={{ backgroundImage: `url(${couple.heroBg || '/assets/images/berdua2.jpeg'})` }}
      />
      <div className="hero-bg-gradient-overlay" />

      <div className="hero-content-wrapper">
        <p className="hero-subtitle animate-fade-down">{couple.title}</p>
        <h1 className="hero-couple-title animate-title-glow">{couple.coupleNames}</h1>
        <p className="hero-date-badge animate-fade-up">{couple.weddingDateDisplay}</p>

        {/* ENDLESS CONTINUOUS MARQUEE CAROUSEL TO THE LEFT */}
        <div className="hero-marquee-container animate-fade-in">
          <div className="hero-marquee-track">
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="hero-photo-card">
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION TITLE BRIDE & GROOM WITH SHADOW TEXT (Ref 5) */}
        <div className="shadow-title-wrapper reveal" style={{ marginTop: '28px' }}>
          <h2 className="shadow-title-main">BRIDE & GROOM</h2>
          <span className="shadow-title-bg">BRIDE & GROOM</span>
        </div>

        <p className="hero-subtext reveal">{couple.heroSubtext}</p>
      </div>
    </section>
  );
};
