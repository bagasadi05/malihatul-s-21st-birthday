import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Heart, Music, Stars, Gift, Sparkles, ArrowUp } from 'lucide-react';
import Confetti from './components/Confetti';
import Fireworks from './components/Fireworks';
import FloatingHearts from './components/FloatingHearts';
import PoeticMessage from './components/PoeticMessage';
import BirthdayCake from './components/BirthdayCake';
import WishGenerator from './components/WishGenerator';
import BackgroundMusic from './components/BackgroundMusic';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import LoadingScreen from './components/LoadingScreen';
import EasterEgg from './components/EasterEgg';
import BackgroundParticles from './components/BackgroundParticles';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [cakeDone, setCakeDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPoeticMessage, setShowPoeticMessage] = useState(false);
  const messageShownRef = React.useRef(false); // Track if message has been shown

  const handleStart = () => {
    setStarted(true);
  };

  const handleCakeFinish = () => {
    setCakeDone(true);
    // Show poetic message after a short delay, but only once
    if (!messageShownRef.current) {
      messageShownRef.current = true;
      setTimeout(() => {
        setShowPoeticMessage(true);
      }, 3000); // 3 seconds after candles are blown
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showMusic = cakeDone || scrolled;

  // Number counter animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView && started) {
      const controls = animate(count, 21, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [isInView, started, count]);

  return (
    <div className="min-h-screen bg-cream font-sans overflow-x-hidden">
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Easter Egg */}
      {!isLoading && <EasterEgg />}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="max-w-lg w-full bg-white/30 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center border border-white/50 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <Gift className="w-16 h-16 text-rose-500" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl font-script text-rose-600 mb-6 drop-shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {/* Letter by letter animation */}
                {"Untuk Uswaa".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <br />
                {"yang Spesial".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="text-gray-700 mb-10 text-lg tracking-wide"
              >
                Sebuah kejutan spesial telah menanti...
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "#f43f5e" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="bg-rose-500 text-white text-xl font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
              >
                <span>Buka Undangan</span>
                <Heart className="w-5 h-5 fill-current" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti active={cakeDone} />
      <Fireworks active={cakeDone} />
      {started && <FloatingHearts />}
      {started && <BackgroundParticles />}
      <BackgroundMusic show={showMusic} />
      <div onClick={() => setShowPoeticMessage(false)}>
        <PoeticMessage show={showPoeticMessage} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Header Section */}
        <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-100 via-pink-50 to-cream" />
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          {/* Animated Background Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-gold rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />

          <div className="text-center z-10 p-6 relative">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <h2 className="text-xl md:text-2xl font-sans text-rose-400 tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5" /> Selamat Ulang Tahun <Sparkles className="w-5 h-5" />
              </h2>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-5xl md:text-9xl font-script mb-6 pb-2"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #f43f5e, #ef4444, #f97316, #f43f5e)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                className="drop-shadow-sm"
              >
                Uswaa
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              onViewportEnter={() => setIsInView(true)}
              className="inline-block bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full shadow-lg border border-white"
            >
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                <motion.span>{rounded}</motion.span> Tahun ✨
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-rose-400"
          >
            <p className="text-sm tracking-widest">SCROLL DOWN</p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 md:-mt-32 z-20 relative space-y-12 md:space-y-24 pb-12 md:pb-20">

          {/* Cake Section */}
          <motion.section
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-xl text-center border border-white/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300" />

            <h3 className="text-3xl md:text-4xl font-script text-gray-800 mb-3">Make a Wish, Uswaa!</h3>
            <p className="text-gray-500 mb-6 md:mb-8 text-base md:text-lg">Pejamkan mata, ucapkan doa, lalu tiup lilinnya.</p>

            <div className="py-4">
              <BirthdayCake onAllCandlesOut={handleCakeFinish} />
            </div>

            <AnimatePresence>
              {cakeDone && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-8"
                >
                  <p className="text-2xl text-rose-500 font-bold font-script">
                    Semoga semua impianmu tercapai, Uswaa! ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Message & Gallery Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Stars className="text-gold w-6 h-6" />
                <span className="text-rose-400 font-bold tracking-widest text-sm uppercase">Tentang Kamu</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-script text-rose-600 leading-tight">
                Kenapa Uswaa<br />Istimewa
              </h3>
              <div className="prose prose-base md:prose-lg text-gray-600 font-sans leading-relaxed">
                <p>
                  Untuk gadis yang selalu mencerahkan suasana di mana pun dia berada.
                  Menginjak usia 21 adalah pencapaian besar, awal dari babak paling seru dalam hidupmu.
                </p>
                <p>
                  Senyummu, kebaikanmu, dan semangat ceriamu membuat dunia ini menjadi tempat yang lebih indah.
                  Tetaplah menjadi Uswaa yang luar biasa!
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-400 p-6 rounded-r-xl shadow-sm"
              >
                <p className="italic text-gray-700 text-lg font-serif">
                  "Jangan hitung usiamu dari angka tahun, tapi hitung dari seberapa banyak kebahagiaan dan kenangan indah yang kamu punya."
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="bg-white p-2 md:p-4 rounded-2xl md:rounded-3xl shadow-lg">
                <PhotoGallery />
              </div>
            </motion.div>
          </section>

          {/* Timeline Section */}
          <motion.section
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Timeline />
          </motion.section>

          {/* Wish Generator */}
          <motion.section
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative py-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 transform -skew-y-2 rounded-[3rem] -z-10 shadow-inner" />
            <div className="px-4">
              <WishGenerator />
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="text-center py-12 border-t border-rose-100">
            <div className="flex justify-center items-center gap-2 mb-4 text-rose-400">
              <Music className="w-5 h-5 animate-bounce" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Dibuat dengan ❤️ untuk Uswaa</p>
            <p className="text-rose-300 text-xs mt-2">© 2025 Edisi Spesial Ulang Tahun ke-21</p>
          </footer>

        </main>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-rose-500 text-white p-3 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
};

export default App;