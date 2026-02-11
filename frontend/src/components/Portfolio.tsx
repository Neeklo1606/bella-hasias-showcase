import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';
import work4 from '@/assets/portfolio/work-4.jpg';
import work5 from '@/assets/portfolio/work-5.jpg';
import work6 from '@/assets/portfolio/work-6.jpg';
import work7 from '@/assets/portfolio/work-7.jpg';
import work8 from '@/assets/portfolio/work-8.jpg';

interface PortfolioItem {
  src: string;
  title: string;
}

const portfolioItems: PortfolioItem[] = [
  { src: heroCenter, title: 'Editorial портрет' },
  { src: heroLeft, title: 'Стилизация образа' },
  { src: heroRight, title: 'Fashion съёмка' },
  { src: photo3, title: 'Персональный стиль' },
  { src: work1, title: 'Редакционная съёмка' },
  { src: work2, title: 'Контент для бренда' },
  { src: work3, title: 'Студийная сессия' },
  { src: work4, title: 'Капсульный гардероб' },
  { src: work5, title: 'Лукбук' },
  { src: work6, title: 'Beauty редакционная' },
  { src: work7, title: 'Социальная кампания' },
  { src: work8, title: 'Коммерческая работа' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : portfolioItems.length - 1);
  }, [selectedImage]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage < portfolioItems.length - 1 ? selectedImage + 1 : 0);
  }, [selectedImage]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrev, handleNext, closeLightbox]);

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
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Портфолио
          </p>
          <h2 className="font-display text-h2 text-foreground">
            Все работы
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {portfolioItems.map((item, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-secondary"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105 group-hover:blur-[2px]"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500 flex items-center justify-center">
                <span className="font-display text-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
                  {item.title}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
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
            <span className="text-white">{String(selectedImage + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(portfolioItems.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={portfolioItems[selectedImage].src}
              alt={portfolioItems[selectedImage].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <p className="font-display text-white text-lg">{portfolioItems[selectedImage].title}</p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;
