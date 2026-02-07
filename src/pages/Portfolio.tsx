import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Footer from '@/components/Footer';
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
  { id: 1, src: heroLeft, alt: 'Стилизация для бренда — портретная съёмка' },
  { id: 2, src: heroRight, alt: 'Fashion-съёмка для каталога одежды' },
  { id: 3, src: heroCenter, alt: 'Визуальный контент для бренда' },
  { id: 4, src: photo3, alt: 'Персональный стиль — образ для клиента' },
  { id: 5, src: work1, alt: 'UGC-контент для рекламной кампании' },
  { id: 6, src: work2, alt: 'Контент-съёмка для социальных сетей' },
  { id: 7, src: work3, alt: 'Студийная съёмка в Москве' },
  { id: 8, src: work4, alt: 'Lifestyle-съёмка для бренда' },
  { id: 9, src: work5, alt: 'Fashion editorial — стилизация образа' },
  { id: 10, src: work6, alt: 'Продуктовая съёмка для каталога' },
  { id: 11, src: work7, alt: 'Портретная сессия — персональный стиль' },
  { id: 12, src: work8, alt: 'Коллаборация с брендом — UGC-контент' },
  { id: 13, src: work9, alt: 'Стайл-гайд для клиента' },
  { id: 14, src: work10, alt: 'Мудборд и концепция съёмки' },
  { id: 15, src: work11, alt: 'Визуальная история для бренда' },
  { id: 16, src: work12, alt: 'Креативная направление съёмки' },
];

const Portfolio = () => {
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
    setLightboxIndex((prev) => (prev + 1) % allWorks.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allWorks.length) % allWorks.length);
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
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
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
              className="btn-luxury text-xs py-2 px-4 min-h-[44px]"
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

            {/* Works Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {allWorks.map((work, index) => (
                <motion.button
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary min-h-[200px]"
                >
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500" />
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
                <h2 className="font-display text-2xl text-foreground mb-4">
                  Больше работ из жизни
                </h2>
                <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-sans mb-6">
                  Telegram-канал
                </span>
                <a
                  href="https://t.me/bellahasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex min-h-[48px]"
                >
                  <Send size={16} className="mr-2" />
                  Подписаться на канал
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />

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
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px]"
              aria-label="Закрыть"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-6 left-6 font-sans text-sm text-white/60">
              <span className="text-white">{String(lightboxIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(allWorks.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px]"
              aria-label="Предыдущее"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px]"
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
                src={allWorks[lightboxIndex].src}
                alt={allWorks[lightboxIndex].alt}
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
