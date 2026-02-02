import { useState, useEffect, useCallback } from 'react';
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
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

const portfolioImages = [
  { id: 1, src: heroCenter, alt: 'Bella Hasias работа 1', size: 'tall' as const },
  { id: 2, src: heroLeft, alt: 'Bella Hasias работа 2', size: 'normal' as const },
  { id: 3, src: heroRight, alt: 'Bella Hasias работа 3', size: 'wide' as const },
  { id: 4, src: photo3, alt: 'Bella Hasias работа 4', size: 'normal' as const },
  { id: 5, src: work1, alt: 'Bella Hasias работа 5', size: 'normal' as const },
  { id: 6, src: work2, alt: 'Bella Hasias работа 6', size: 'tall' as const },
  { id: 7, src: work3, alt: 'Bella Hasias работа 7', size: 'normal' as const },
  { id: 8, src: work4, alt: 'Bella Hasias работа 8', size: 'wide' as const },
  { id: 9, src: work5, alt: 'Bella Hasias работа 9', size: 'normal' as const },
  { id: 10, src: work6, alt: 'Bella Hasias работа 10', size: 'normal' as const },
  { id: 11, src: work7, alt: 'Bella Hasias работа 11', size: 'normal' as const },
  { id: 12, src: work8, alt: 'Bella Hasias работа 12', size: 'normal' as const },
];

const HeroMasonry = () => {
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
    setLightboxIndex((prev) => (prev + 1) % portfolioImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
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
    <section className="relative w-full bg-background">
      {/* Hero Name Block */}
      <div className="w-full px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto">
        <h1 
          className="font-serif text-display font-medium text-foreground mb-6 animate-fade-in-up"
        >
          Bella
          <br />
          <span className="text-primary">Hasias</span>
        </h1>
        <p 
          className="font-sans text-lg md:text-xl text-muted-foreground max-w-md animate-fade-in-up animation-delay-200"
        >
          Стилист · UGC Креатор · Контент-Фотограф
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="w-full px-6 md:px-10 lg:px-16 pb-20 md:pb-28 lg:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[300px] max-w-7xl mx-auto">
          {portfolioImages.map((image, index) => {
            let gridClass = '';
            if (image.size === 'wide') {
              gridClass = 'sm:col-span-2';
            } else if (image.size === 'tall') {
              gridClass = 'row-span-2';
            }

            return (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden rounded-2xl group ${gridClass} animate-fade-in-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 ease-premium group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
                {/* Title reveal on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-serif text-white text-lg md:text-xl tracking-wide">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors duration-300 z-10 p-2 rounded-full hover:bg-white/10"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/80 text-sm font-sans font-medium tracking-widest">
            <span className="text-white">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/60">{portfolioImages.length}</span>
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
            aria-label="Предыдущее фото"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
            aria-label="Следующее фото"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main image */}
          <div 
            className="max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={portfolioImages[lightboxIndex].src}
              alt={portfolioImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroMasonry;
