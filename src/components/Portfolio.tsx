import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
      <section id="portfolio" className="bg-white py-0 border-t-2 border-[#FF3333]">
        {/* Filmstrip */}
        <div className="w-full bg-[#f5f5f5] border-b-2 border-[#FF3333]">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-end gap-0 min-w-max">
              {portfolioItems.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px] relative overflow-hidden transition-all duration-300 ${
                    activeIndex === index 
                      ? 'ring-[3px] ring-[#FF3333] ring-inset z-10' 
                      : 'hover:ring-[2px] hover:ring-[#FF3333] hover:ring-inset opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-semibold text-white bg-[#1a1a1a]/70 px-1 py-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Typography */}
            <div className="flex flex-col justify-between order-1">
              {/* Counter */}
              <div className="mb-4">
                <span 
                  className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#666666]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[#FF3333]">02</span> / ПОРТФОЛИО
                </span>
              </div>

              {/* Big Title */}
              <div className="mb-6 md:mb-8">
                <h2 
                  className="text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] xl:text-[130px] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#1a1a1a]"
                  style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
                >
                  ПОРТ
                  <br />
                  ФОЛИО.
                </h2>
              </div>

              {/* Stats */}
              <p 
                className="text-sm text-[#666666] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {portfolioItems.length} РАБОТ
              </p>

              {/* Button */}
              <button
                onClick={() => setSelectedImage(activeIndex)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#FF3333] hover:bg-[#FF3333] hover:text-white px-5 py-3 transition-all duration-300 border-2 border-[#FF3333] self-start"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>Смотреть галерею</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Right Column - Main Image */}
            <div className="order-2">
              <div 
                className="relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(activeIndex)}
              >
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#f0f0f0]">
                  <img
                    key={activeIndex}
                    src={portfolioItems[activeIndex].src}
                    alt={portfolioItems[activeIndex].title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#FF3333]/0 group-hover:bg-[#FF3333]/10 transition-all duration-300 pointer-events-none" />
                  
                  {/* Red border on hover */}
                  <div className="absolute inset-0 ring-0 group-hover:ring-[3px] ring-[#FF3333] ring-inset transition-all duration-300 pointer-events-none" />
                  
                  {/* Counter */}
                  <span 
                    className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-[#1a1a1a]/80 px-3 py-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')} / {portfolioItems.length}
                  </span>
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
              className="absolute top-4 right-4 z-20 p-3 text-white/60 hover:text-[#FF3333] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-[#FF3333] transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-[#FF3333] transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {selectedImage !== null && portfolioItems[selectedImage] && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={portfolioItems[selectedImage].src}
                  alt={portfolioItems[selectedImage].title}
                  className="w-full max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1a1a] to-transparent">
                  <p 
                    className="font-bold text-white text-lg md:text-xl text-center uppercase tracking-wide"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {portfolioItems[selectedImage].title}
                  </p>
                  <p 
                    className="text-[#FF3333] text-xs tracking-[0.15em] uppercase text-center mt-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
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
