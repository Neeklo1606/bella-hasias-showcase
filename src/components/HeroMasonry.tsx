import { useState } from 'react';
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
  { id: 1, src: heroCenter, alt: 'Bella Hasias работа 1', size: 'tall' },
  { id: 2, src: heroLeft, alt: 'Bella Hasias работа 2', size: 'normal' },
  { id: 3, src: heroRight, alt: 'Bella Hasias работа 3', size: 'wide' },
  { id: 4, src: photo3, alt: 'Bella Hasias работа 4', size: 'normal' },
  { id: 5, src: work1, alt: 'Bella Hasias работа 5', size: 'normal' },
  { id: 6, src: work2, alt: 'Bella Hasias работа 6', size: 'tall' },
  { id: 7, src: work3, alt: 'Bella Hasias работа 7', size: 'normal' },
  { id: 8, src: work4, alt: 'Bella Hasias работа 8', size: 'wide' },
  { id: 9, src: work5, alt: 'Bella Hasias работа 9', size: 'normal' },
  { id: 10, src: work6, alt: 'Bella Hasias работа 10', size: 'normal' },
  { id: 11, src: work7, alt: 'Bella Hasias работа 11', size: 'normal' },
  { id: 12, src: work8, alt: 'Bella Hasias работа 12', size: 'normal' },
];

const HeroMasonry = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  return (
    <section className="relative w-full bg-white">
      {/* [1] Top Info Bar */}
      <div className="w-full bg-[#f5f5f5] border-b-2 border-[#FF3333]">
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-3">
          <span 
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#1a1a1a]"
            style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}
          >
            EDITORIAL BY BELLA HASIAS
          </span>
          <span 
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#FF3333]"
            style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}
          >
            {String(activeIndex + 1).padStart(2, '0')} / {portfolioImages.length}
          </span>
        </div>
      </div>

      {/* [2] Main Name Block */}
      <div className="w-full bg-white px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
        <h1 
          className="text-[50px] sm:text-[80px] md:text-[110px] lg:text-[140px] xl:text-[160px] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#1a1a1a] mb-4 md:mb-6"
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
        >
          BELLA
          <br />
          HASIAS
        </h1>
        <p 
          className="text-sm sm:text-base md:text-lg lg:text-xl font-normal tracking-[0.02em] text-[#1a1a1a]"
          style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}
        >
          Стилист / Креатор / UGC
        </p>
      </div>

      {/* [3] Filmstrip */}
      <div className="w-full bg-[#f5f5f5] border-t-2 border-b-2 border-[#FF3333]">
        <div 
          className="flex overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {portfolioImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setActiveIndex(index);
                openLightbox(index);
              }}
              className={`flex-shrink-0 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[100px] relative overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                  ? 'ring-[3px] ring-[#FF3333] ring-inset z-10' 
                  : 'hover:ring-[2px] hover:ring-[#FF3333] hover:ring-inset'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  activeIndex === index ? 'scale-105' : 'hover:scale-105'
                }`}
              />
              <span className="absolute bottom-1 right-1 text-[9px] font-semibold text-white bg-[#1a1a1a]/70 px-1 py-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* [4] Masonry Grid */}
      <div className="w-full bg-white px-4 md:px-6 lg:px-10 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]">
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
                <div className="absolute inset-0 bg-[#FF3333]/0 group-hover:bg-[#FF3333]/10 transition-all duration-300" />
                <div className="absolute inset-0 ring-0 group-hover:ring-[3px] ring-[#FF3333] ring-inset transition-all duration-300" />
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
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-[#FF3333] transition-colors duration-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-6 left-6 text-white text-sm font-semibold tracking-[0.1em]">
            <span className="text-[#FF3333]">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{portfolioImages.length}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-[#FF3333] transition-colors duration-300"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-[#FF3333] transition-colors duration-300"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HeroMasonry;
