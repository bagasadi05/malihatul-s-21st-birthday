import React, { useState } from 'react';
import { generateBirthdayWish } from '../services/geminiService';
import { Heart, Smile, Feather, Wand2, Copy, Check } from 'lucide-react';

const WishGenerator: React.FC = () => {
  const [wish, setWish] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<'romantic' | 'funny' | 'poetic'>('romantic');

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateBirthdayWish(mood);
    setWish(result);
    setLoading(false);
  };

  const moodConfig = {
    romantic: { label: 'Romantis', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100' },
    funny: { label: 'Lucu', icon: Smile, color: 'text-orange-500', bg: 'bg-orange-100' },
    poetic: { label: 'Puitis', icon: Feather, color: 'text-purple-500', bg: 'bg-purple-100' }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto border-2 border-rose-pink">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        ✨ Minta Ucapan Ajaib ✨
      </h3>
      <p className="text-gray-500 text-sm text-center mb-4">
        Pilih suasana hati dan buat pesan spesial untuk Uswaa.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {(Object.keys(moodConfig) as Array<keyof typeof moodConfig>).map((m) => {
          const Icon = moodConfig[m].icon;
          const isActive = mood === m;
          return (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 border-2 ${isActive
                ? `border-${moodConfig[m].color.split('-')[1]}-400 bg-${moodConfig[m].color.split('-')[1]}-50 shadow-md scale-105`
                : 'border-transparent bg-gray-50 hover:bg-gray-100 text-gray-400 grayscale hover:grayscale-0'
                }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? moodConfig[m].color : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {moodConfig[m].label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <>
              <Wand2 className="w-5 h-5 animate-spin" />
              <span>Merangkai Kata...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Buat Ucapan Ajaib</span>
            </>
          )}
        </button>
      </div>

      {wish && (
        <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 animate-[fadeIn_0.5s_ease-out] relative group">
          <p className="text-gray-700 italic font-medium text-center leading-relaxed pr-8">
            "{wish}"
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(wish);
              alert('Ucapan berhasil disalin!');
            }}
            className="absolute top-2 right-2 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            title="Salin Ucapan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishGenerator;