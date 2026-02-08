import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import type { ComponentType } from 'react';

const portfolioImages = import.meta.glob(
  '@/assets/portfolio/IMG_*.{JPG,jpg,PNG,png,WEBP,webp}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const isPortfolioCandidate = (filename: string, src: string) => {
  const lower = `${filename} ${src}`.toLowerCase();
  if (lower.includes("/icons/") || lower.includes("favicon")) return false;
  if (lower.includes("placeholder")) return false;
  if (lower.includes("og-image") || lower.includes("hero")) return false;
  if (lower.includes("/videos/")) return false;
  return true;
};

const Portfolio = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const allWorks = useMemo(() => {
    const entries = Object.entries(portfolioImages)
      .map(([path, src]) => {
        const filename = path.split('/').pop() ?? '';
        return {
          id: filename,
          src,
          alt: filename.replace(/\.[^.]+$/, ''),
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
    return entries;
  }, []);

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
  }, [allWorks.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allWorks.length) % allWorks.length);
  }, [allWorks.length]);

  useEffect(() => {
    if (lightboxIndex >= allWorks.length) {
      setLightboxIndex(0);
    }
  }, [allWorks.length, lightboxIndex]);

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
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Портфолио' },
          ]}
        />

        {/* Content */}
        <section className="pt-32 md:pt-36 pb-20 px-6 md:px-10">
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

            {allWorks.length === 0 && (
              <div className="py-16 text-center text-sm text-muted-foreground">
                Нет фотографий в портфолио. Добавьте файлы в `src/assets/portfolio/` с префиксом `IMG_`.
              </div>
            )}

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
                <a
                  href="https://t.me/bellahasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-sans mb-6 hover:text-foreground transition-colors"
                >
                  Telegram-канал
                </a>
                <a
                  href="https://t.me/bellahasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex min-h-[48px]"
                >
                  Связаться
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
            className="fixed inset-0 z-[1100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as any).startX = touch.clientX;
            }}
            onTouchEnd={(e) => {
              const startX = (e.currentTarget as any).startX;
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) nextImage();
                else prevImage();
              }
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20 min-w-[48px] min-h-[48px]"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-6 left-6 font-sans text-sm text-white/60 z-10">
              <span className="text-white">{String(lightboxIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(allWorks.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px]"
              aria-label="Предыдущее"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px]"
              aria-label="Следующее"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {allWorks[lightboxIndex] && (
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-[92vw] max-h-[80vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={allWorks[lightboxIndex].src}
                  alt={allWorks[lightboxIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>
            )}

            {/* Swipe hint on mobile */}
            <div className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              ← Свайп для навигации →
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
};

export default Portfolio;
