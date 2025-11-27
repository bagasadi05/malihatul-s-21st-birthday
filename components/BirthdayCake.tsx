import React, { useState, useEffect } from 'react';

interface BirthdayCakeProps {
  onAllCandlesOut: () => void;
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onAllCandlesOut }) => {
  const [candles, setCandles] = useState([true, true, true]); // 3 candles

  const toggleCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  useEffect(() => {
    if (candles.every((c) => c === false)) {
      onAllCandlesOut();
    }
  }, [candles, onAllCandlesOut]);

  return (
    <div className="relative w-64 h-64 mx-auto mt-10">
      {/* Cake Base */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-rose-300 to-rose-400 rounded-lg shadow-2xl flex items-end justify-center overflow-hidden border-b-4 border-rose-600">
        <div className="w-full text-center text-white font-script text-xl opacity-90 mb-4 z-10 drop-shadow-md">Uswaa</div>
        {/* Frosting drips */}
        <div className="absolute top-0 w-8 h-8 bg-white rounded-full -mt-4 -ml-20 shadow-sm"></div>
        <div className="absolute top-0 w-8 h-8 bg-white rounded-full -mt-4 -ml-4 shadow-sm"></div>
        <div className="absolute top-0 w-8 h-8 bg-white rounded-full -mt-4 ml-12 shadow-sm"></div>
        <div className="absolute top-0 w-8 h-8 bg-white rounded-full -mt-4 ml-28 shadow-sm"></div>
        <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-white to-rose-100"></div>
      </div>

      {/* Candles Container */}
      <div className="absolute bottom-32 w-full flex justify-center space-x-8">
        {candles.map((isLit, index) => (
          <div
            key={index}
            onClick={() => toggleCandle(index)}
            className="flex flex-col items-center cursor-pointer transition-all hover:scale-110 hover:-translate-y-1"
            title="Klik untuk meniup lilin!"
          >
            {/* Flame with realistic animation */}
            {isLit && (
              <div className="relative mb-1">
                {/* Outer glow */}
                <div className="absolute inset-0 w-6 h-8 bg-orange-400 opacity-30 blur-md rounded-full animate-pulse"></div>

                {/* Main flame */}
                <div className="relative w-5 h-7 animate-[wiggle_0.5s_ease-in-out_infinite]">
                  {/* Flame layers for depth */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-7 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 rounded-t-full rounded-b-lg opacity-90"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-t from-yellow-200 via-yellow-300 to-orange-300 rounded-t-full rounded-b-lg"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-white rounded-full"></div>
                </div>

                {/* Light rays */}
                <div className="absolute inset-0 w-8 h-8 -left-1.5 -top-1">
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-gradient-to-t from-yellow-400 to-transparent opacity-60"></div>
                  <div className="absolute top-1 left-1/4 w-px h-1.5 bg-gradient-to-t from-orange-400 to-transparent opacity-40 rotate-45"></div>
                  <div className="absolute top-1 right-1/4 w-px h-1.5 bg-gradient-to-t from-orange-400 to-transparent opacity-40 -rotate-45"></div>
                </div>
              </div>
            )}

            {/* Wick when candle is out */}
            {!isLit && (
              <div className="mb-1 relative">
                <div className="w-0.5 h-3 bg-gray-700 rounded-t-sm mx-auto"></div>
                {/* Smoke */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-gray-400 to-transparent opacity-50 animate-pulse"></div>
              </div>
            )}

            {/* Candle Stick with 3D effect */}
            <div className="relative">
              {/* Shadow/3D effect */}
              <div className="absolute inset-0 w-5 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-sm translate-x-0.5 translate-y-0.5 opacity-50"></div>

              {/* Main candle */}
              <div className="relative w-5 h-14 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 border-2 border-blue-100 rounded-sm shadow-lg">
                {/* Highlight */}
                <div className="absolute top-1 left-0.5 w-1 h-8 bg-white opacity-40 rounded-full"></div>
                {/* Wax drip effect */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-blue-300 rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="absolute -bottom-10 w-full text-center text-sm text-pink-500 font-semibold animate-pulse">
        {candles.some(c => c) ? "Klik api lilin untuk make a wish!" : "Hore! Selamat Ulang Tahun!"}
      </p>
    </div>
  );
};

export default BirthdayCake;