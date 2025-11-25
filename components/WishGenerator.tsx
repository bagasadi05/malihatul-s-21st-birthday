import React, { useState } from 'react';
import { generateBirthdayWish } from '../services/geminiService';

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

  const moodLabels = {
    romantic: 'Romantis',
    funny: 'Lucu',
    poetic: 'Puitis'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto border-2 border-rose-pink">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        ✨ Minta Ucapan Ajaib ✨
      </h3>
      <p className="text-gray-500 text-sm text-center mb-4">
        Pilih suasana hati dan buat pesan spesial untuk Malihatul.
      </p>

      <div className="flex justify-center space-x-2 mb-6">
        {(['romantic', 'funny', 'poetic'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mood === m
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-rose-100'
            }`}
          >
            {moodLabels[m]}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Merangkai Kata...
            </span>
          ) : (
            "Buat Ucapan"
          )}
        </button>
      </div>

      {wish && (
        <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 animate-[fadeIn_0.5s_ease-out]">
          <p className="text-gray-700 italic font-medium text-center leading-relaxed">
            "{wish}"
          </p>
        </div>
      )}
    </div>
  );
};

export default WishGenerator;