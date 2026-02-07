import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

const PortfolioSection = () => {
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
    <section id="portfolio" className="section-luxury bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
          >
            <Images className="w-7 h-7 text-primary" />
          </motion.div>
          <p className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Портфолио
          </p>
          <h2 className="font-display text-h2 text-foreground mb-4">
            Избранные работы
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto">
            Коллекция лучших проектов — стилизация, контент и фотосъёмка
          </p>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {featuredWorks.map((work, index) => (
            <motion.button
              key={work.id}
              variants={itemVariants}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4] bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-center justify-center">
                <span className="font-display text-base md:text-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-4 text-center">
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
          <Link
            to="/portfolio"
            className="btn-luxury inline-flex items-center"
          >
            Смотреть все работы
            <ArrowRight size={16} className="ml-2" />
          </Link>
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
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-6 left-6 font-sans text-sm text-white/60">
            <span className="text-white font-medium">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(featuredWorks.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Предыдущая"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Следующая"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={featuredWorks[lightboxIndex].src}
              alt={featuredWorks[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>

          {/* Image title */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="font-display text-lg text-white/80">
              {featuredWorks[lightboxIndex].title}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PortfolioSection;
