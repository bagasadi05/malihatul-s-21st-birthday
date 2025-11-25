import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PoeticMessageProps {
    show: boolean;
}

const PoeticMessage: React.FC<PoeticMessageProps> = ({ show }) => {
    const poem = [
        "Untuk Uswaa, cinta yang menerangi hariku,",
        "21 tahun perjalananmu penuh makna,",
        "Setiap detik bersamamu adalah anugerah,",
        "Setiap senyummu adalah keajaiban.",
        "",
        "Di hari istimewa ini, aku ingin kamu tahu,",
        "Bahwa kehadiranmu membuat dunia lebih indah,",
        "Bahwa cintamu memberiku kekuatan,",
        "Dan masa depan kita penuh harapan.",
        "",
        "Selamat ulang tahun, sayangku.",
        "Semoga Allah selalu melindungimu,",
        "Semoga semua impianmu terwujud,",
        "Dan semoga kita selalu bersama.",
        "",
        "Dengan cinta yang tak terbatas,",
        "- Bagas ❤️"
    ];

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl border-4 border-white/50 pointer-events-auto relative overflow-hidden"
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400" />

                        {/* Floating hearts decoration */}
                        <div className="absolute top-8 right-8 opacity-20">
                            <Heart className="w-16 h-16 text-rose-500 fill-current" />
                        </div>
                        <div className="absolute bottom-8 left-8 opacity-20">
                            <Heart className="w-12 h-12 text-rose-500 fill-current" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            {poem.map((line, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                                    className={`
                    ${line === "" ? "h-4" : ""}
                    ${line.includes("Bagas") ? "text-2xl font-script text-rose-600 mt-6" : "text-lg text-gray-700 leading-relaxed"}
                    ${line.includes("Untuk Uswaa") ? "text-2xl font-script text-rose-500 font-bold mb-4" : ""}
                    ${line.includes("Selamat ulang tahun") ? "text-xl font-bold text-rose-600 mt-4" : ""}
                  `}
                                >
                                    {line}
                                </motion.p>
                            ))}

                            {/* Animated hearts */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ delay: 3.5, duration: 0.5 }}
                                className="mt-8 flex justify-center gap-2"
                            >
                                <Heart className="w-6 h-6 text-rose-500 fill-current animate-pulse" />
                                <Heart className="w-8 h-8 text-rose-500 fill-current animate-pulse" style={{ animationDelay: "0.2s" }} />
                                <Heart className="w-6 h-6 text-rose-500 fill-current animate-pulse" style={{ animationDelay: "0.4s" }} />
                            </motion.div>

                            {/* Close hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 4, duration: 0.8 }}
                                className="text-xs text-gray-400 mt-8"
                            >
                                Klik di mana saja untuk melanjutkan
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PoeticMessage;
