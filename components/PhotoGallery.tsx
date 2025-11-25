import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  caption: string;
  rotate: string;
}

const MEMORIES: Photo[] = [
  { id: 1, src: '/uswaa-photo-1.png', caption: 'Beautiful Memories ✨', rotate: 'rotate-2' },
  { id: 2, src: '/uswaa-photo-2.png', caption: 'Sweet Moments 🌸', rotate: '-rotate-1' },
  { id: 3, src: '/uswaa-photo-3.png', caption: 'Precious Times 💕', rotate: 'rotate-1' },
  { id: 4, src: '/uswaa-photo-4.png', caption: 'Happy Days 🌟', rotate: '-rotate-2' },
  { id: 5, src: '/uswaa-photo-5.jpg', caption: 'Joyful Laughter 😊', rotate: 'rotate-3' },
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // Get current photo index
  const getCurrentIndex = () => {
    if (!selectedPhoto) return -1;
    return MEMORIES.findIndex(p => p.id === selectedPhoto.id);
  };

  // Navigate to next/previous photo
  const navigatePhoto = (direction: 'next' | 'prev') => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // Loop around
    if (newIndex >= MEMORIES.length) newIndex = 0;
    if (newIndex < 0) newIndex = MEMORIES.length - 1;

    setSelectedPhoto(MEMORIES[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      } else if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Swipe gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigatePhoto('next');
    } else if (isRightSwipe) {
      navigatePhoto('prev');
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Download photo
  const handleDownload = async () => {
    if (!selectedPhoto) return;
    try {
      const response = await fetch(selectedPhoto.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedPhoto.caption}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Share photo
  const handleShare = async () => {
    if (!selectedPhoto) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday Malihatul!',
          text: selectedPhoto.caption,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle image load
  const handleImageLoad = (photoId: number) => {
    setLoadingStates(prev => ({ ...prev, [photoId]: false }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop";
    console.warn("Gambar lokal tidak ditemukan, menggunakan fallback.");
  };

  return (
    <>
      {/* Masonry Grid Layout */}
      <div className="columns-1 gap-3 space-y-3 p-2">
        {MEMORIES.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`break-inside-avoid group relative cursor-pointer transform transition-all duration-500 hover:z-10 ${photo.rotate} hover:rotate-0`}
            role="button"
            aria-label={`View ${photo.caption}`}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(photo)}
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-xl shadow-md border-4 border-white bg-white"
            >
              {loadingStates[photo.id] && (
                <div className="absolute inset-0 bg-rose-100 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-active:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <ZoomIn className="text-white w-8 h-8 opacity-0 group-active:opacity-100 transform scale-50 group-active:scale-100 transition-all duration-300" />
              </div>
              <img
                src={photo.src}
                alt={photo.caption}
                onError={handleImageError}
                onLoad={() => handleImageLoad(photo.id)}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-2 text-center"
            >
              <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-rose-500 shadow-lg">
                {photo.caption}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Lightbox with Navigation */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-label="Photo viewer"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Action Buttons Top */}
              <div className="absolute -top-12 md:-top-14 left-0 right-0 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="text-white hover:text-rose-400 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                    aria-label="Download photo"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="text-white hover:text-rose-400 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                    aria-label="Share photo"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-white hover:text-rose-400 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                  aria-label="Close viewer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('prev');
                }}
                className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors p-3 bg-white/10 rounded-full hover:bg-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('next');
                }}
                className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors p-3 bg-white/10 rounded-full hover:bg-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                onError={handleImageError}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border-4 border-white"
              />

              {/* Caption & Counter */}
              <div className="mt-6 space-y-2 text-center">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-2xl md:text-3xl font-script tracking-wide drop-shadow-lg"
                >
                  {selectedPhoto.caption}
                </motion.p>
                <p className="text-white/60 text-sm">
                  {getCurrentIndex() + 1} / {MEMORIES.length}
                </p>
              </div>

              {/* Swipe Hint */}
              <p className="mt-4 text-white/40 text-xs md:hidden">
                ← Swipe untuk navigasi →
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;