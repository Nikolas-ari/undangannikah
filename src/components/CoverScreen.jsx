import React from 'react';
import { MailOpen } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

export const CoverScreen = ({ isUnlocked, onOpen }) => {
  // Get guest name from URL query parameter if available e.g. ?to=Bapak+John
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || 'Keluarga & Sahabat';

  return (
    <div className={`cover-screen ${isUnlocked ? 'unlocked' : ''}`}>
      <div
        className="cover-bg"
        style={{ backgroundImage: `url('/assets/images/coklat4.jpg')` }}
      />
      <div className="cover-overlay" />

      <div className="cover-content">
        <p className="cover-subtitle animate-fade-down">{INVITATION_DATA.couple.title}</p>
        <h1 className="cover-couple animate-title-glow">{INVITATION_DATA.couple.coupleNames}</h1>
        <p className="cover-date animate-fade-up">{INVITATION_DATA.couple.weddingDateDisplay}</p>

        <div className="cover-guest-card animate-scale-in">
          <p className="guest-to">Kepada Yth.</p>
          <p className="guest-to">Bapak / Ibu / Saudara / i</p>
          <h2 className="guest-name">{guestName}</h2>
          <p className="guest-invitation-text">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia pernikahan kami.
          </p>
        </div>

        <button className="btn-open animate-bounce-gentle" onClick={onOpen}>
          <MailOpen size={18} /> BUKA UNDANGAN
        </button>
      </div>
    </div>
  );
};
