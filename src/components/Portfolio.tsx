import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface PortfolioItem {
  src: string;
  title: string;
}

const portfolioItems: PortfolioItem[] = [
  { src: work1, title: 'Стилизация образа' },
  { src: work2, title: 'Редакционная съёмка' },
  { src: work3, title: 'Fashion портрет' },
  { src: work4, title: 'Персональный стиль' },
  { src: work5, title: 'Контент для бренда' },
  { src: work6, title: 'Студийная сессия' },
  { src: work7, title: 'Капсульный гардероб' },
  { src: work8, title: 'Лукбук' },
  { src: work9, title: 'Beauty редакционная' },
  { src: work10, title: 'Социальная кампания' },
  { src: work11, title: 'Лайфстайл съёмка' },
  { src: work12, title: 'Коммерческая работа' },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedImage === null) return;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : portfolioItems.length - 1;
    setSelectedImage(prevIndex);
  }, [selectedImage]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    const nextIndex = selectedImage < portfolioItems.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(nextIndex);
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrev, handleNext]);

  return (
    <>
      <section id="portfolio" className="bg-white py-0">
        {/* Filmstrip */}
        <div className="w-full bg-[#fafafa] border-b border-[#1a1a1a]/10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-end gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-6 min-w-max">
              {portfolioItems.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="flex flex-col items-center group"
                >
                  {/* Thumbnail number */}
                  <span className="text-[10px] md:text-xs font-sans text-[#666666] mb-1 md:mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Thumbnail image */}
                  <div
                    className={`
                      w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]
                      overflow-hidden transition-all duration-300
                      ${activeIndex === index 
                        ? 'ring-2 md:ring-[3px] ring-[#FF3333] scale-105' 
                        : 'opacity-70 hover:opacity-100 hover:ring-2 hover:ring-[#FF3333]/50'
                      }
                    `}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* Left Column - Typography */}
            <div className="flex flex-col justify-between order-1">
              {/* Counter */}
              <div className="mb-4 md:mb-6">
                <span className="text-sm md:text-base font-sans text-[#666666]">
                  <span className="text-[#1a1a1a] font-medium">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="text-[#666666]">/{portfolioItems.length}</span>
                </span>
              </div>

              {/* Big Title */}
              <div className="mb-8 md:mb-12">
                <h2 
                  className="text-[48px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#1a1a1a]"
                  style={{ fontFamily: "'Montserrat', 'Franklin Gothic', 'Impact', sans-serif" }}
                >
                  ПОРТ
                  <br />
                  ФОЛИО.
                </h2>
              </div>

              {/* Subtitle & Button */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <p className="text-sm md:text-base font-sans text-[#666666] uppercase tracking-wide">
                  {portfolioItems[activeIndex].title}
                </p>
                
                <button
                  onClick={() => setSelectedImage(activeIndex)}
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#FF3333] hover:bg-[#FF3333] hover:text-white px-4 py-2 transition-all duration-300 border border-[#FF3333] group"
                >
                  <span>Смотреть всё</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column - Main Image */}
            <div className="order-2 lg:order-2">
              <div 
                className="relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(activeIndex)}
              >
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:h-[500px] xl:h-[600px] bg-[#f0f0f0]">
                  <img
                    key={activeIndex}
                    src={portfolioItems[activeIndex].src}
                    alt={portfolioItems[activeIndex].title}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#FF3333]/0 group-hover:bg-[#FF3333]/5 transition-all duration-300 pointer-events-none" />
                  
                  {/* Red border on hover */}
                  <div className="absolute inset-0 border-0 group-hover:border-[3px] border-[#FF3333] transition-all duration-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom scrollbar hide styles */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl lg:max-w-6xl p-0 bg-[#1a1a1a] border-none">
          <div className="relative min-h-[50vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-3 text-white/60 hover:text-white transition-colors bg-[#1a1a1a]/50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-[#FF3333] transition-colors bg-[#1a1a1a]/50 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-[#FF3333] transition-colors bg-[#1a1a1a]/50 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {selectedImage !== null && portfolioItems[selectedImage] && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={portfolioItems[selectedImage].src}
                  alt={portfolioItems[selectedImage].title}
                  className="w-full max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent">
                  <p className="font-sans font-bold text-white text-lg md:text-xl text-center uppercase tracking-wide">
                    {portfolioItems[selectedImage].title}
                  </p>
                  <p className="font-sans text-white/50 text-xs tracking-[0.15em] uppercase text-center mt-2">
                    {selectedImage + 1} / {portfolioItems.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Portfolio;
