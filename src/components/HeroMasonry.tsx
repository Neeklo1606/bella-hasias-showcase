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

// Combined images: 4 hero photos + 8 portfolio works = 12 total
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
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Keyboard navigation for lightbox
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
    <section className="relative w-full bg-white animate-fade-in">
      {/* [2] Main Name Block */}
      <div className="w-full bg-white px-5 md:px-10 lg:px-10 py-12 md:py-16 lg:py-20">
        <h1 
          className="text-[50px] sm:text-[70px] md:text-[110px] lg:text-[140px] xl:text-[160px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#1a1a1a] mb-4 md:mb-5"
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
        >
          BELLA
          <br />
          HASIAS
        </h1>
        <p 
          className="text-base sm:text-lg md:text-xl font-normal tracking-[0.02em] text-[#1a1a1a]"
          style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}
        >
          Стилист / UGC / Креатор / Контент-Фотограф
        </p>
      </div>

      {/* [3] Filmstrip */}
      <div className="w-full bg-[#f5f5f5] border-t-2 border-b-2 border-[#FF3333]">
        <div 
          className="flex overflow-x-auto p-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {portfolioImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setActiveIndex(index);
                openLightbox(index);
              }}
              className={`flex-shrink-0 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[100px] relative overflow-hidden transition-all duration-[250ms] border border-[#e0e0e0] ${
                activeIndex === index 
                  ? 'ring-[3px] ring-[#FF3333] ring-inset scale-105 z-10' 
                  : 'hover:ring-[2px] hover:ring-[#FF3333] hover:ring-inset hover:scale-105'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1 text-[10px] font-semibold text-white bg-[#1a1a1a]/50 px-1.5 py-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* [4] Masonry Grid */}
      <div className="w-full bg-white px-5 md:px-10 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3.5 lg:gap-[18px] auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]">
          {portfolioImages.map((image, index) => {
            let gridClass = '';
            if (image.size === 'wide') {
              gridClass = 'md:col-span-2';
            } else if (image.size === 'tall') {
              gridClass = 'row-span-2';
            }

            return (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden group ${gridClass}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
                  loading="lazy"
                />
                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-[#FF3333]/0 group-hover:bg-[#FF3333]/[0.08] transition-all duration-300" />
                {/* Red border on hover */}
                <div className="absolute inset-0 ring-0 group-hover:ring-[3px] ring-[#FF3333] ring-inset transition-all duration-300" />
                {/* Shadow on hover */}
                <div className="absolute inset-0 shadow-none group-hover:shadow-[0_8px_24px_rgba(26,26,26,0.12)] transition-all duration-[350ms]" />
                {/* Number label */}
                <span className="absolute bottom-2 left-2 text-xs font-semibold text-white bg-[#1a1a1a]/80 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-[#FF3333] transition-colors duration-300 z-10"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white text-sm font-semibold tracking-[0.1em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span className="text-[#FF3333]">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{portfolioImages.length}</span>
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-[#FF3333] transition-colors duration-300"
            aria-label="Предыдущее фото"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-[#FF3333] transition-colors duration-300"
            aria-label="Следующее фото"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main image */}
          <div 
            className="max-w-[90vw] max-h-[85vh] overflow-hidden"
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

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HeroMasonry;
