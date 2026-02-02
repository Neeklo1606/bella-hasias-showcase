import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';

const featuredWorks = [
  { id: 1, src: heroLeft, title: 'Editorial Portrait' },
  { id: 2, src: heroRight, title: 'Fashion Story' },
  { id: 3, src: photo3, title: 'Personal Style' },
  { id: 4, src: work1, title: 'Brand Campaign' },
  { id: 5, src: work2, title: 'Content Creation' },
  { id: 6, src: work3, title: 'Studio Session' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const FeaturedWorks = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % featuredWorks.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  return (
    <section id="works" className="section-luxury bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Избранное
          </p>
          <h2 className="font-display text-h2 text-foreground">
            Последние работы
          </h2>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredWorks.map((work, index) => (
            <motion.button
              key={work.id}
              variants={itemVariants}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-secondary"
            >
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105 group-hover:blur-[2px]"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500 flex items-center justify-center">
                <span className="font-display text-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {work.title}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#portfolio"
            className="font-sans text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
          >
            Смотреть все работы
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-6 left-6 font-sans text-sm text-white/60">
            <span className="text-white">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(featuredWorks.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={featuredWorks[lightboxIndex].src}
              alt={featuredWorks[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedWorks;
