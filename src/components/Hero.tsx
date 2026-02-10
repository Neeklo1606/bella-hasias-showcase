import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  // User's own video
  const videoUrl = "/videos/hero-video.mp4";
  const videoPoster = "/og-image.jpg";

  // Close modal with escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isVideoOpen) {
      setIsVideoOpen(false);
    }
  }, [isVideoOpen]);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoOpen, handleKeyDown]);

  // Stop video when modal closes
  useEffect(() => {
    if (!isVideoOpen && modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, [isVideoOpen]);

  const closeVideo = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  return (
    <section className="relative bg-background overflow-hidden lg:min-h-[90vh]">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left - Typography */}
          <div className="order-2 lg:order-1 px-5 sm:px-6 md:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-10 pt-14 sm:pt-16 lg:pt-20 pb-12 lg:pb-0 text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
            >
              Стилист · UGC · Контент
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans lg:font-display text-display text-foreground mb-8 mt-6 sm:mt-8 leading-[0.95]"
            >
              Bella Hasias
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Услуги стилиста в Москве. Консультации, шоппинг сопровождение и разбор гардероба.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contacts"
                className="btn-luxury"
              >
                Связаться
              </Link>
              <Link
                to="/portfolio"
                className="btn-ghost-luxury inline-flex items-center"
              >
                Смотреть работы
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>

          </div>

          {/* Right - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative overflow-hidden h-[58vh] sm:h-[70vh] lg:h-[90vh]">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={videoPoster}
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95"
            onClick={closeVideo}
          >
            {/* Close button - clearly visible */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeVideo();
              }}
              className="absolute top-6 right-6 z-[1102] flex items-center justify-center w-14 h-14 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              aria-label="Закрыть видео"
            >
              <X size={28} />
            </button>

            {/* Tap to close hint on mobile */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs md:hidden">
              Нажмите на фон, чтобы закрыть
            </div>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl px-4 md:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                autoPlay
                controls
                playsInline
                preload="auto"
                poster={videoPoster}
                className="w-full rounded-2xl shadow-2xl"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;