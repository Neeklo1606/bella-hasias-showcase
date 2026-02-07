import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';
import heroCenter from '@/assets/hero/hero-center.jpg';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // User's own video
  const videoUrl = "/videos/hero-video.mp4";

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
              {/* Video Element - stretches to right edge */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={heroCenter}
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
                {/* Fallback to image if video doesn't load */}
                <img
                  src={heroCenter}
                  alt="Bella Hasias"
                  className="w-full h-full object-cover"
                />
              </video>
              
              {/* Gradient overlay for text readability - smoother blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Mobile - Static Image Preview */}
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
              <img
                src={heroCenter}
                alt="Bella Hasias"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
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

      {/* Video Modal (Mobile) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
              aria-label="Закрыть видео"
            >
              <X size={24} />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                autoPlay
                controls
                playsInline
                poster={heroCenter}
                className="w-full rounded-2xl"
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