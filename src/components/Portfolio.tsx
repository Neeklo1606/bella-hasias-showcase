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

type AspectRatio = 'portrait' | 'square' | 'landscape';

interface PortfolioItem {
  src: string;
  category: string;
  alt: string;
  title: string;
  aspect: AspectRatio;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'styling', label: 'Стилистика' },
    { id: 'editorial', label: 'Редакционная' },
    { id: 'ugc', label: 'UGC' },
    { id: 'photo', label: 'Фотография' },
  ];

  const portfolioItems: PortfolioItem[] = [
    { src: work1, category: 'styling', alt: 'Работа стилиста', title: 'Деловой образ', aspect: 'portrait' },
    { src: work2, category: 'editorial', alt: 'Редакционная съёмка', title: 'Редакционная кампания', aspect: 'square' },
    { src: work3, category: 'photo', alt: 'Фотография', title: 'Fashion портрет', aspect: 'portrait' },
    { src: work4, category: 'styling', alt: 'Fashion стилистика', title: 'Персональный стиль', aspect: 'landscape' },
    { src: work5, category: 'ugc', alt: 'UGC контент', title: 'Контент для бренда', aspect: 'portrait' },
    { src: work6, category: 'photo', alt: 'Редакционное фото', title: 'Студийная сессия', aspect: 'portrait' },
    { src: work7, category: 'styling', alt: 'Персональный стиль', title: 'Капсульный гардероб', aspect: 'square' },
    { src: work8, category: 'editorial', alt: 'Контент для бренда', title: 'Лукбук', aspect: 'portrait' },
    { src: work9, category: 'photo', alt: 'Портретная съёмка', title: 'Beauty редакционная', aspect: 'portrait' },
    { src: work10, category: 'ugc', alt: 'Социальный контент', title: 'Социальная кампания', aspect: 'landscape' },
    { src: work11, category: 'editorial', alt: 'Лайфстайл портрет', title: 'Лайфстайл съёмка', aspect: 'portrait' },
    { src: work12, category: 'photo', alt: 'Fashion фотография', title: 'Коммерческая работа', aspect: 'square' },
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handlePrev = useCallback(() => {
    if (selectedImage === null) return;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : filteredItems.length - 1;
    setSelectedImage(prevIndex);
  }, [selectedImage, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    const nextIndex = selectedImage < filteredItems.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(nextIndex);
  }, [selectedImage, filteredItems.length]);

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

  const getAspectClass = (aspect: AspectRatio): string => {
    switch (aspect) {
      case 'portrait': return 'aspect-[3/4]';
      case 'square': return 'aspect-square';
      case 'landscape': return 'aspect-[16/10]';
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <>
      <section id="portfolio" className="py-20 md:py-28 px-5 md:px-8 lg:px-12 bg-lavender/30">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-10 md:mb-12">
            <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-deep-black tracking-[-0.01em] font-normal">
              Портфолио
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 font-sans text-xs tracking-[0.08em] uppercase transition-all duration-300 rounded-full ${
                  activeFilter === filter.id
                    ? 'bg-lemon text-deep-black'
                    : 'bg-white text-deep-black border border-border-light hover:border-deep-black/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-5">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                onClick={() => setSelectedImage(index)}
                className="group relative mb-4 md:mb-5 break-inside-avoid cursor-pointer overflow-hidden rounded-xl"
              >
                {!loadedImages.has(index) && (
                  <div className={`absolute inset-0 bg-mint/20 ${getAspectClass(item.aspect)}`} />
                )}
                
                <div className={`${getAspectClass(item.aspect)} overflow-hidden`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className={`w-full h-full object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03] ${
                      loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-lavender/0 group-hover:bg-lavender/20 transition-all duration-300 pointer-events-none rounded-xl" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 md:mt-20">
            <a
              href="#contact"
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-deep-black border-b border-deep-black pb-1 hover:text-graphite hover:border-graphite transition-colors duration-300"
            >
              Заказать съёмку
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl lg:max-w-6xl p-0 bg-deep-black border-none">
          <div className="relative min-h-[50vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-3 text-white/60 hover:text-white transition-colors bg-deep-black/50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors bg-deep-black/50 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors bg-deep-black/50 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {selectedImage !== null && filteredItems[selectedImage] && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={filteredItems[selectedImage].src}
                  alt={filteredItems[selectedImage].alt}
                  className="w-full max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-black/80 to-transparent">
                  <p className="font-serif text-white text-lg md:text-xl text-center">
                    {filteredItems[selectedImage].title}
                  </p>
                  <p className="font-sans text-white/50 text-xs tracking-[0.15em] uppercase text-center mt-2">
                    {selectedImage + 1} / {filteredItems.length}
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
