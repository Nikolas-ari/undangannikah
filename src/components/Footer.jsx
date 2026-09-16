import React from 'react';
import { Heart } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

export const Footer = () => {
  const { coupleNames } = INVITATION_DATA.couple;

  return (
    <footer className="footer-section">
      {/* BACKGROUND PHOTO WITH CINEMATIC ZOOM ANIMATION */}
      <div
        className="footer-bg-photo"
        style={{ backgroundImage: `url('/assets/images/THE_4063.jpg')` }}
      />
      {/* DARK OVERLAY */}
      <div className="footer-bg-overlay" />

      {/* FLOATING SPARKLES LAYER */}
      <div className="footer-sparkles-layer">
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">♥</span>
        <span className="sparkle s3">✦</span>
        <span className="sparkle s4">♥</span>
      </div>

      <div className="container footer-content reveal">
        {/* ANIMATED FLOATING HEART ICON */}
        <div className="footer-icon-wrap">
          <Heart size={26} className="footer-heart-icon" />
        </div>

        <h2 className="footer-title">Terima Kasih</h2>

        <p className="footer-text footer-message">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        <div className="footer-divider-line" />

        <h1 className="footer-script-names">{coupleNames}</h1>

        <p className="footer-family">
          Beserta Keluarga Besar Wenggul Mukun & Ngkarang Wae Kara
        </p>
      </div>
    </footer>
  );
};
