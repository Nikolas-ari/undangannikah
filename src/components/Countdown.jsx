import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

export const Countdown = () => {
  const { targetDate, verseTitle, verseText } = INVITATION_DATA.countdown;

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const handleSaveTheDate = () => {
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Pian+%26+Rista&dates=20260923T070000Z/20260923T140000Z&details=Acara+Pernikahan+Pian+%26+Rista+(Kristianus+Kurniawan+%26+Daflora+Ratnasari)&location=Halaman+Kampung+Ngkarang`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <section 
      className="countdown-section"
      style={{ backgroundImage: `url('/assets/images/THE_4068.jpg')` }}
    >
      <div className="countdown-bg-overlay" />

      <div className="countdown-content container">
        {/* SHADOWED DOUBLE TITLE COUNTDOWN (Ref 3) */}
        <div className="shadow-title-wrapper reveal">
          <h2 className="shadow-title-main">COUNTDOWN</h2>
          <span className="shadow-title-bg">COUNTDOWN</span>
        </div>

        {/* 4-COLUMN TIMER GRID WITH STAGGERED ENTRANCE ANIMATION */}
        <div className="countdown-grid reveal">
          <div className="count-box stagger-1">
            <div className="count-number">{formatNumber(timeLeft.days)}</div>
            <div className="count-label">Hari</div>
          </div>
          <div className="count-box stagger-2">
            <div className="count-number">{formatNumber(timeLeft.hours)}</div>
            <div className="count-label">Jam</div>
          </div>
          <div className="count-box stagger-3">
            <div className="count-number">{formatNumber(timeLeft.minutes)}</div>
            <div className="count-label">Menit</div>
          </div>
          <div className="count-box stagger-4">
            <div className="count-number pulse-tick">{formatNumber(timeLeft.seconds)}</div>
            <div className="count-label">Detik</div>
          </div>
        </div>

        {/* SAVE THE DATE BUTTON */}
        <button className="btn-save-date reveal" onClick={handleSaveTheDate}>
          <Calendar size={16} /> Save The Date
        </button>

        {/* BIBLE QUOTE KOLOSE 3:14 WITH ENTRANCE REVEAL */}
        <div className="verse-box reveal">
          <h4 className="verse-title">{verseTitle}</h4>
          <p className="verse-text">"{verseText}"</p>
        </div>
      </div>
    </section>
  );
};
