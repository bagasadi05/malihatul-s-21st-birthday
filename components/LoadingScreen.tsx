import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 3000); // 3 seconds loading

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] bg-gradient-to-br from-rose-100 via-pink-50 to-cream flex flex-col items-center justify-center"
        >
            {/* Animated Logo/Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="relative"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sparkles className="w-20 h-20 text-rose-400 opacity-30" />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                >
                    <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
                </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-3xl font-script text-rose-600"
            >
                Menyiapkan kejutan...
            </motion.h2>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.8, duration: 2 }}
                className="mt-6 h-1 bg-rose-400 rounded-full"
            />

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 text-rose-400 text-sm"
            >
                ✨ Sesuatu yang spesial ✨
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;
