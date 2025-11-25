import React, { useState, useRef, useEffect } from 'react';

interface BackgroundMusicProps {
  show: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ show }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // URL Lagu - Menggunakan file lokal dari folder public
  const AUDIO_URL = "/background-music.mp3";
  // Alternatif lainnya (uncomment untuk menggunakan):
  // const AUDIO_URL = "https://www.bensound.com/bensound-music/bensound-ukulele.mp3"; // Fun & Playful
  // const AUDIO_URL = "https://www.bensound.com/bensound-music/bensound-littleidea.mp3"; // Positive vibes

  // Set volume untuk musik (0.0 - 1.0, default 0.4 = 40%)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Volume 40%
    }
  }, []);

  useEffect(() => {
    if (show && !hasInteracted && audioRef.current) {
      // Mencoba autoplay saat tombol muncul pertama kali
      // Catatan: Browser mungkin memblokir autoplay jika belum ada interaksi yang cukup
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            console.log("Autoplay dicegah browser, menunggu interaksi pengguna:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [show, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
    >
      <audio ref={audioRef} src={AUDIO_URL} loop />

      <button
        onClick={togglePlay}
        className={`flex items-center space-x-3 px-5 py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 ${isPlaying
          ? 'bg-rose-500 text-white shadow-rose-300/50'
          : 'bg-white text-rose-500 border-2 border-rose-500'
          }`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isPlaying ? 'bg-white/20' : 'bg-rose-100'}`}>
          {isPlaying ? (
            // Icon Pause
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Icon Play
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        <span className="font-sans font-semibold text-sm">
          {isPlaying ? "Matikan Musik" : "Putar Musik 🎵"}
        </span>

        {/* Visualisasi gelombang suara sederhana saat bermain */}
        {isPlaying && (
          <div className="flex items-end space-x-1 h-4">
            <div className="w-1 bg-white/70 animate-[bounce_1s_infinite] h-2"></div>
            <div className="w-1 bg-white/70 animate-[bounce_1.2s_infinite] h-4"></div>
            <div className="w-1 bg-white/70 animate-[bounce_0.8s_infinite] h-3"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;