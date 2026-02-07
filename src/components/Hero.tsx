import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoPoster, setVideoPoster] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // User's own video
  const videoUrl = "/videos/hero-video.mp4";

  // Generate poster from video first frame
  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 0.1;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setVideoPoster(canvas.toDataURL('image/jpeg', 0.8));
      }
    };
    
    video.load();
  }, [videoUrl]);

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
    <section className="min-h-[90vh] flex items-center bg-background overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left - Typography */}
          <div className="order-2 lg:order-1 py-12 lg:py-0 px-6 md:px-12 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-12">
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
              className="font-display text-display text-foreground mb-8"
            >
              Bella
              <br />
              Hasias
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Создаю визуальный контент и стиль, который рассказывает вашу уникальную историю
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

            {/* Mobile Video Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => setIsVideoOpen(true)}
              className="mt-6 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Play size={20} className="ml-0.5" />
              </span>
              <span className="font-sans text-sm font-medium">Посмотреть видео</span>
            </motion.button>
          </div>

          {/* Right - Video (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 hidden lg:block relative"
          >
            <div className="relative overflow-hidden h-[90vh]">
              {/* Video Element with lazy loading */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={videoPoster || undefined}
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Mobile - Video Preview (first frame) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:hidden"
          >
            <div 
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => setIsVideoOpen(true)}
            >
              {videoPoster ? (
                <img
                  src={videoPoster}
                  alt="Видео-превью Bella Hasias"
                  loading="lazy"
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[400px] bg-secondary animate-pulse" />
              )}
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-opacity group-hover:bg-foreground/30">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-background/90 text-foreground shadow-lg">
                  <Play size={28} className="ml-1" />
                </span>
              </div>
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
                poster={videoPoster || undefined}
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