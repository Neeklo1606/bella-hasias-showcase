import { useState } from 'react';
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

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'styling', label: 'Стилистика' },
    { id: 'content', label: 'Контент' },
    { id: 'photo', label: 'Фото' },
  ];

  const portfolioItems = [
    { src: work1, category: 'styling', alt: 'Styling work', title: 'Деловой образ' },
    { src: work2, category: 'content', alt: 'Content creation', title: 'Контент для бренда' },
    { src: work3, category: 'photo', alt: 'Photography', title: 'Editorial Look' },
    { src: work4, category: 'styling', alt: 'Fashion styling', title: 'Консультация по стилю' },
    { src: work5, category: 'content', alt: 'UGC content', title: 'TikTok контент' },
    { src: work6, category: 'photo', alt: 'Editorial photo', title: 'Fashion портрет' },
    { src: work7, category: 'styling', alt: 'Personal styling', title: 'Beauty съёмка' },
    { src: work8, category: 'content', alt: 'Brand content', title: 'Студийная съёмка' },
    { src: work9, category: 'photo', alt: 'Portrait photography', title: 'Капсульный гардероб' },
    { src: work10, category: 'styling', alt: 'Wardrobe styling', title: 'Unboxing видео' },
    { src: work11, category: 'content', alt: 'Social media content', title: 'Lifestyle портрет' },
    { src: work12, category: 'photo', alt: 'Fashion photography', title: 'Коммерческая съёмка' },
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : filteredItems.length - 1;
    setSelectedImage(prevIndex);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const nextIndex = selectedImage < filteredItems.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(nextIndex);
  };

  return (
    <>
      <section id="portfolio" className="py-20 md:py-28 px-5 md:px-8 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-graphite/50 mb-4">
              Мои работы
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-deep-black tracking-tight">
              Портфолио
            </h2>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-6 md:gap-8 mb-12 md:mb-16 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`font-sans text-xs md:text-sm tracking-[0.1em] uppercase pb-1 border-b transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'text-deep-black border-deep-black'
                    : 'text-graphite/50 border-transparent hover:text-deep-black hover:border-deep-black/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/10 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-12 md:mt-16">
            <a
              href="#contact"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-deep-black border-b border-deep-black pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
            >
              Заказать съёмку
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl lg:max-w-5xl p-0 bg-deep-black/95 border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-cream/70 hover:text-cream transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-cream/70 hover:text-cream transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-cream/70 hover:text-cream transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {selectedImage !== null && filteredItems[selectedImage] && (
              <div className="flex flex-col">
                <img
                  src={filteredItems[selectedImage].src}
                  alt={filteredItems[selectedImage].alt}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="p-4 md:p-6 text-center">
                  <p className="font-serif text-cream text-xl md:text-2xl">
                    {filteredItems[selectedImage].title}
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
