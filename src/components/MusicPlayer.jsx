import React, { useEffect, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import { INVITATION_DATA } from '../config/invitationData';

export const MusicPlayer = ({ isPlaying, onTogglePlay }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log('Autoplay blocked:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="music-controller">
      <button 
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={onTogglePlay}
        title={isPlaying ? "Hentikan Musik" : "Putar Musik"}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>

      <audio ref={audioRef} loop preload="auto" src={INVITATION_DATA.audioUrl}>
        <source src="/assets/audio/David-bayu-segalanya-itu-kamu.mp3" type="audio/mpeg" />
        <source src="/assets/audio/David-bayu-segalanya-itu-kamu.m4a" type="audio/mp4" />
        <source src="/assets/audio/David-bayu-segalanya-itu-kamu.mp4" type="audio/mp4" />
      </audio>
    </div>
  );
};
