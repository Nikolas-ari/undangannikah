import React, { useState, useEffect } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { CoverScreen } from './components/CoverScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroHeader } from './components/HeroHeader';
import { BrideGroom } from './components/BrideGroom';
import { Countdown } from './components/Countdown';
import { WeddingEvent } from './components/WeddingEvent';
import { Gallery } from './components/Gallery';
import { RsvpForm } from './components/RsvpForm';
import { DigitalGift } from './components/DigitalGift';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // IntersectionObserver for smooth scroll reveal animations
  useEffect(() => {
    if (!isUnlocked) return;

    let observer;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));
    }, 80);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isUnlocked]);

  return (
    <div className="app-viewport">
      {/* BACKGROUND FLOATING PETALS ANIMATION */}
      <PetalCanvas />

      {/* FULLSCREEN COVER SCREEN */}
      <CoverScreen isUnlocked={isUnlocked} onOpen={handleOpenInvitation} />

      {/* FLOATING MUSIC PLAYER */}
      <MusicPlayer isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />

      {/* MAIN INVITATION CONTENT */}
      <main style={{ filter: isUnlocked ? 'none' : 'blur(5px)' }}>
        <HeroHeader />
        <BrideGroom />
        <Countdown />
        <WeddingEvent />
        <Gallery />
        <RsvpForm onShowToast={handleShowToast} />
        <DigitalGift onShowToast={handleShowToast} />
        <Footer />
      </main>

      {/* TOAST POPUP */}
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
