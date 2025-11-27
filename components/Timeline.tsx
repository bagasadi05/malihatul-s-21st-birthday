import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Sparkles, Gift, Star } from 'lucide-react';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const Timeline: React.FC = () => {
    const milestones: TimelineItem[] = [
        {
            year: '2004',
            title: 'Lahir ke Dunia',
            description: 'Awal dari kisah luar biasa dimulai',
            icon: <Star className="w-5 h-5" />,
            color: 'from-purple-400 to-pink-400'
        },
        {
            year: 'Masa Kecil',
            title: 'Tumbuh Berkembang',
            description: 'Penuh keceriaan dan senyuman',
            icon: <Sparkles className="w-5 h-5" />,
            color: 'from-pink-400 to-rose-400'
        },
        {
            year: 'Remaja',
            title: 'Petualangan Dimulai',
            description: 'Menemukan passion dan mimpi',
            icon: <Gift className="w-5 h-5" />,
            color: 'from-rose-400 to-orange-400'
        },
        {
            year: '2025',
            title: '21 Tahun! 🎉',
            description: 'Pencapaian besar, masa depan cerah',
            icon: <Heart className="w-5 h-5" />,
            color: 'from-orange-400 to-rose-500'
        }
    ];

    return (
        <div className="py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar className="text-rose-500 w-6 h-6" />
                    <h3 className="text-4xl font-script text-rose-600">Perjalanan Hidup</h3>
                </div>
                <p className="text-gray-600">21 tahun penuh warna dan kebahagiaan</p>
            </motion.div>

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-200 via-rose-200 to-orange-200" />

                {/* Timeline Items */}
                <div className="space-y-12">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`flex items-center gap-8 md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                } flex-row`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left pl-20 md:pl-0`}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-block"
                                >
                                    <div className={`bg-gradient-to-r ${item.color} text-white px-4 py-1 rounded-full inline-block mb-2 shadow-lg`}>
                                        <span className="font-bold text-sm">{item.year}</span>
                                    </div>
                                    <h4 className="text-2xl font-script text-gray-800 mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            </div>

                            {/* Icon Circle */}
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`absolute left-0 md:relative md:left-auto w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl z-10 border-4 border-white`}
                            >
                                {item.icon}
                            </motion.div>

                            {/* Spacer for alignment */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
