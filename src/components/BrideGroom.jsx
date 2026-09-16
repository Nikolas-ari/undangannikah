import React, { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';
export const BrideGroom = () => {
  const { groom, bride } = INVITATION_DATA.couple;

  // Photo arrays from INVITATION_DATA
  const groomPhotos = groom.photos;
  const bridePhotos = bride.photos;

  // Animated Slideshow index state for Groom & Bride
  const [groomPhotoIndex, setGroomPhotoIndex] = useState(0);
  const [bridePhotoIndex, setBridePhotoIndex] = useState(0);

  // Auto-switch photos for Groom card every 3.5 seconds
  useEffect(() => {
    if (groomPhotos.length === 0) return;
    const timer = setInterval(() => {
      setGroomPhotoIndex((prev) => (prev + 1) % groomPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [groomPhotos.length]);

  // Auto-switch photos for Bride card every 3.5 seconds
  useEffect(() => {
    if (bridePhotos.length === 0) return;
    const timer = setInterval(() => {
      setBridePhotoIndex((prev) => (prev + 1) % bridePhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [bridePhotos.length]);

  return (
    <section className="mempelai-section">
      <div className="container">

        {/* GROOM CARD (PIAN) - Ref 4 */}
        <div className="mempelai-card reveal">
          
          {/* ANIMATED SLIDESHOW PHOTO CONTAINER */}
          <div className="mempelai-photo-container">
            {groomPhotos.map((photo, idx) => (
              <div
                key={idx}
                className={`mempelai-photo-slide ${idx === groomPhotoIndex ? 'active' : ''}`}
              >
                <img src={photo} alt={`${groom.shortName} ${idx + 1}`} />
              </div>
            ))}

            {/* SCRIPT OVERLAY NAME ON PHOTO (Ref 4) */}
            <div className="photo-script-overlay right">{groom.shortName}</div>

            {/* SLIDESHOW INDICATOR DOTS */}
            <div className="slideshow-dots">
              {groomPhotos.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === groomPhotoIndex ? 'active' : ''}`}
                  onClick={() => setGroomPhotoIndex(idx)}
                />
              ))}
            </div>
          </div>

          <h3 className="mempelai-fullname">{groom.fullName}</h3>
          <p className="mempelai-parents">{groom.parentInfo}</p>

          <a
            href={groom.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>

        {/* MONOGRAM ICON DIVIDER (Ref 4) */}
        <div className="text-center" style={{ margin: '30px 0' }}>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15 C35 30 15 35 15 55 C15 75 35 85 50 85 C65 85 85 75 85 55 C85 35 65 30 50 15 Z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
            <path d="M40 45 Q50 30 60 45 T50 75" stroke="#ffffff" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* BRIDE CARD (RISTA) - Ref 2 */}
        <div className="mempelai-card reveal">

          {/* ANIMATED SLIDESHOW PHOTO CONTAINER */}
          <div className="mempelai-photo-container">
            {bridePhotos.map((photo, idx) => (
              <div
                key={idx}
                className={`mempelai-photo-slide ${idx === bridePhotoIndex ? 'active' : ''}`}
              >
                <img src={photo} alt={`${bride.shortName} ${idx + 1}`} />
              </div>
            ))}

            {/* SCRIPT OVERLAY NAME ON PHOTO (Ref 2) */}
            <div className="photo-script-overlay">{bride.shortName}</div>

            {/* SLIDESHOW INDICATOR DOTS */}
            <div className="slideshow-dots">
              {bridePhotos.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === bridePhotoIndex ? 'active' : ''}`}
                  onClick={() => setBridePhotoIndex(idx)}
                />
              ))}
            </div>
          </div>

          <h3 className="mempelai-fullname">{bride.fullName}</h3>
          <p className="mempelai-parents">{bride.parentInfo}</p>

          <a
            href={bride.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>

      </div>
    </section>
  );
};
