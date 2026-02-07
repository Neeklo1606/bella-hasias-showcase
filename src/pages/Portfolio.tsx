import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';
import work4 from '@/assets/portfolio/work-4.jpg';
import work5 from '@/assets/portfolio/work-5.jpg';
import work6 from '@/assets/portfolio/work-6.jpg';
import work7 from '@/assets/portfolio/work-7.jpg';
import work8 from '@/assets/portfolio/work-8.jpg';
import work9 from '@/assets/portfolio/work-9.jpg';
import work10 from '@/assets/portfolio/work-10.jpg';
import work11 from '@/assets/portfolio/work-11.jpg';
import work12 from '@/assets/portfolio/work-12.jpg';

const allWorks = [
  { id: 1, src: heroLeft, title: 'Editorial Portrait', category: 'styling' },
  { id: 2, src: heroRight, title: 'Fashion Story', category: 'photo' },
  { id: 3, src: heroCenter, title: 'Brand Identity', category: 'ugc' },
  { id: 4, src: photo3, title: 'Personal Style', category: 'styling' },
  { id: 5, src: work1, title: 'Brand Campaign', category: 'ugc' },
  { id: 6, src: work2, title: 'Content Creation', category: 'photo' },
  { id: 7, src: work3, title: 'Studio Session', category: 'photo' },
  { id: 8, src: work4, title: 'Lifestyle Shoot', category: 'ugc' },
  { id: 9, src: work5, title: 'Fashion Editorial', category: 'styling' },
  { id: 10, src: work6, title: 'Product Story', category: 'ugc' },
  { id: 11, src: work7, title: 'Portrait Session', category: 'photo' },
  { id: 12, src: work8, title: 'Brand Collab', category: 'ugc' },
  { id: 13, src: work9, title: 'Style Guide', category: 'styling' },
  { id: 14, src: work10, title: 'Mood Board', category: 'styling' },
  { id: 15, src: work11, title: 'Visual Story', category: 'photo' },
  { id: 16, src: work12, title: 'Creative Direction', category: 'ugc' },
];

const categories = [
  { id: 'all', label: 'Все работы' },
  { id: 'styling', label: 'Стилизация' },
  { id: 'ugc', label: 'UGC' },
  { id: 'photo', label: 'Фото' },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredWorks = activeCategory === 'all' 
    ? allWorks 
    : allWorks.filter(work => work.category === activeCategory);

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
    setLightboxIndex((prev) => (prev + 1) % filteredWorks.length);
  }, [filteredWorks.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredWorks.length) % filteredWorks.length);
  }, [filteredWorks.length]);

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
    <>
      <Helmet>
        <title>Портфолио — Bella Hasias | Стилизация, UGC и фотосъёмка</title>
        <meta name="description" content="Портфолио Bella Hasias: стилизация для брендов, UGC-контент и профессиональная фотосъёмка в Москве." />
        <meta name="keywords" content="портфолио стилиста, UGC-контент примеры, визуальный контент для брендов, стилист контент-креатор" />
        <meta property="og:title" content="Портфолио — Bella Hasias" />
        <meta property="og:description" content="Стилизация, UGC-контент и фотосъёмка для брендов." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bellahasias.com/portfolio" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link
              to="/"
              className="font-display text-xl font-semibold text-foreground"
            >
              Bella Hasias
            </Link>
            <a
              href="https://t.me/bellahasias"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-xs py-2 px-4"
            >
              <Send size={14} className="mr-2" />
              Telegram
            </a>
          </div>
        </nav>

        {/* Content */}
        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-h1 text-foreground">
                Портфолио
              </h1>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-sans text-sm transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Works Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredWorks.map((work, index) => (
                <motion.button
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary"
                >
                  <img
                    src={work.src}
                    alt={work.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end p-4">
                    <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {work.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-16"
            >
              <div className="card-luxury p-8 max-w-lg mx-auto">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Больше работ и жизни
                </h2>
                <a
                  href="https://t.me/bellahasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex"
                >
                  <Send size={16} className="mr-2" />
                  Подписаться на канал
                </a>
              </div>
            </motion.div>
          </div>
        </section>

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
              aria-label="Закрыть"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-6 left-6 font-sans text-sm text-white/60">
              <span className="text-white">{String(lightboxIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(filteredWorks.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              aria-label="Предыдущее"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              aria-label="Следующее"
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
              className="max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredWorks[lightboxIndex].src}
                alt={filteredWorks[lightboxIndex].title}
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
};

export default Portfolio;
