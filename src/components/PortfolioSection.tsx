import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchCases, loadCases } from '@/admin/lib/casesStorage';
import { fetchMedia, loadMedia } from '@/admin/lib/mediaStorage';
import { useResolvedMediaItems } from '@/hooks/use-resolved-media';
import type { CaseItem } from '@/admin/types/case';
import type { MediaItem } from '@/admin/types/media';
import { buildPortfolioWorks } from '@/lib/portfolio';
import { FlipReveal, FlipRevealItem } from '@/components/ui/flip-reveal';

const PortfolioSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setCases(loadCases());
    setMediaItems(loadMedia());
    fetchCases().then(setCases).catch(() => undefined);
    fetchMedia().then(setMediaItems).catch(() => undefined);
  }, []);

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);
  const works = useMemo(
    () => buildPortfolioWorks(cases, resolvedMediaItems),
    [cases, resolvedMediaItems]
  );
  const visibleWorks = useMemo(() => works.slice(0, 8), [works]);
  const keys = useMemo(() => ["all"], []);

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
    setLightboxIndex((prev) => (prev + 1) % visibleWorks.length);
  }, [visibleWorks.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + visibleWorks.length) % visibleWorks.length);
  }, [visibleWorks.length]);

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
    <section id="portfolio" className="py-10 md:py-14 px-5 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-left mb-12"
        >
          <h2 className="font-display text-h2 text-foreground">
            Портфолио
          </h2>
        </motion.div>

        {/* Works Grid */}
        <FlipReveal
          keys={keys}
          showClass="block"
          hideClass="hidden"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {visibleWorks.map((work, index) => (
            <FlipRevealItem key={work.id} flipKey={work.caseId} className="block">
              <button
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full text-left"
              >
                <img
                  src={work.src}
                  alt={work.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </FlipRevealItem>
          ))}
        </FlipReveal>

        {visibleWorks.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            Нет работ в портфолио.
          </p>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-left mt-12"
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
          className="fixed inset-0 z-[1100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const target = e.currentTarget as HTMLDivElement & { startX?: number };
            target.startX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const target = e.currentTarget as HTMLDivElement & { startX?: number };
            const startX = target.startX ?? 0;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) nextImage();
              else prevImage();
            }
          }}
        >
          {/* Close button - positioned lower to avoid header */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-20 right-4 z-10 text-white/80 hover:text-white transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-20 left-4 font-sans text-sm text-white/60 z-10">
            <span className="text-white font-medium">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(visibleWorks.length).padStart(2, '0')}</span>
          </div>

          {/* Navigation arrows - hidden on mobile, swipe instead */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Предыдущая"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Следующая"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image */}
          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[92vw] max-h-[75vh] overflow-hidden rounded-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={visibleWorks[lightboxIndex]?.src}
              alt={visibleWorks[lightboxIndex]?.alt || "Портфолио"}
              className="max-w-full max-h-[75vh] object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Swipe hint on mobile */}
          <div className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            ← Свайп для навигации →
          </div>

          {/* Image title */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="font-display text-base md:text-lg text-white/80">
              {visibleWorks[lightboxIndex]?.alt || "Портфолио"}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PortfolioSection;
