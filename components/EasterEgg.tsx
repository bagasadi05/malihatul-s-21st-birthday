import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const EasterEgg: React.FC = () => {
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleLogoClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 7) {
            setShowEasterEgg(true);
            setClickCount(0);
        }
    };

    return (
        <>
            {/* Hidden trigger - click the sparkle icon 7 times */}
            <div
                onClick={handleLogoClick}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
                aria-label="Easter egg trigger"
            >
                <Sparkles className="w-6 h-6 text-rose-300 opacity-50 hover:opacity-100 transition-opacity" />
            </div>

            {/* Easter Egg Modal */}
            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setShowEasterEgg(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, rotate: 10 }}
                            className="bg-gradient-to-br from-rose-100 to-pink-100 p-8 rounded-3xl shadow-2xl text-center max-w-md border-4 border-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                                className="text-6xl mb-4"
                            >
                                🎉
                            </motion.div>

                            <h3 className="text-3xl font-script text-rose-600 mb-4">
                                Kamu menemukannya! 🎊
                            </h3>

                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Selamat! Kamu adalah orang yang sangat perhatian terhadap detail.
                                Sama seperti Uswaa yang selalu memperhatikan hal-hal kecil yang membuat hidup lebih indah.
                            </p>

                            <p className="text-rose-500 font-semibold text-lg font-script">
                                "Kebahagiaan ada di hal-hal sederhana" ✨
                            </p>

                            <button
                                onClick={() => setShowEasterEgg(false)}
                                className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EasterEgg;
