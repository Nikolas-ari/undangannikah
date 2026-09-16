import React, { useState, useEffect } from 'react';
import { INVITATION_DATA } from '../config/invitationData';
const formatImgUrl = (url) => {
  if (!url) return '';
  return url.replace(/^public\/?/, '/');
};

export const Gallery = () => {
  const galleryItems = INVITATION_DATA.gallery;
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="gallery-section">
      <div className="container">

        {/* SHADOWED TITLE WEDDING GALLERY (Ref 1) */}
        <div className="shadow-title-wrapper">
          <h2 className="shadow-title-main">WEDDING GALLERY</h2>
          <span className="shadow-title-bg">WEDDING GALLERY</span>
        </div>

        {/* DYNAMIC GALLERY GRID (Sejajar 3 kolom & Berbentuk Persegi 2 kolom) */}
        <div className="gallery-grid">
          {galleryItems.map((item, idx) => {
            const cardType = item.type || (idx >= 9 ? 'square' : 'portrait');
            const cleanSrc = formatImgUrl(item.src);

            return (
              <div
                key={item.id || idx}
                className={`gallery-card card-${cardType} reveal`}
                onClick={() => setSelectedImg(cleanSrc)}
              >
                <img src={cleanSrc} alt={item.alt || `Photo ${idx + 1}`} loading="lazy" />
              </div>
            );
          })}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImg && (
        <div className="lightbox-modal" onClick={() => setSelectedImg(null)}>
          <span className="lightbox-close">&times;</span>
          <img src={selectedImg} className="lightbox-img" alt="Gallery Preview" />
        </div>
      )}
    </section>
  );
};
