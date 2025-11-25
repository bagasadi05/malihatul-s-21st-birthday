import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        size: 20 + Math.random() * 20
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{
                        y: '-20vh',
                        opacity: [0, 0.6, 0.6, 0],
                        x: [0, 30, -30, 0]
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        left: heart.left,
                        fontSize: `${heart.size}px`
                    }}
                    className="text-rose-300/40"
                >
                    ❤️
                </motion.div>
            ))}

            {/* Sparkles */}
            {Array.from({ length: 10 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            })).map((sparkle) => (
                <motion.div
                    key={`sparkle-${sparkle.id}`}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 3,
                        delay: sparkle.id * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        left: sparkle.left,
                        top: sparkle.top,
                    }}
                    className="text-2xl"
                >
                    ✨
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
