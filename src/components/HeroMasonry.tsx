import { useState } from 'react';
import heroPhoto from '@/assets/hero/photo-3.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';
import work4 from '@/assets/portfolio/work-4.jpg';
import work5 from '@/assets/portfolio/work-5.jpg';
import work6 from '@/assets/portfolio/work-6.jpg';

const HeroMasonry = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const images = [
    { src: heroPhoto, alt: 'Bella Hasias styling work', span: 'col-span-2 row-span-2' },
    { src: work1, alt: 'Fashion editorial', span: 'col-span-1 row-span-1' },
    { src: work2, alt: 'Personal styling session', span: 'col-span-1 row-span-2' },
    { src: work3, alt: 'Content creation', span: 'col-span-1 row-span-1' },
    { src: work4, alt: 'Editorial photography', span: 'col-span-1 row-span-1' },
    { src: work5, alt: 'Style consultation', span: 'col-span-2 row-span-1' },
    { src: work6, alt: 'Fashion photography', span: 'col-span-1 row-span-1' },
  ];

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <section className="pt-20 md:pt-24 pb-8 md:pb-16 px-4 md:px-8 lg:px-12 bg-cream">
      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[280px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden cursor-pointer ${image.span} ${
              // Mobile: simpler grid
              index > 4 ? 'hidden md:block' : ''
            } ${
              // Adjust spans for mobile
              index === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
            } ${
              index === 2 ? 'col-span-1 row-span-1 md:col-span-1 md:row-span-2' : ''
            } ${
              index === 5 ? 'md:col-span-2 md:row-span-1' : ''
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
                loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/10 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Subtle CTA below grid */}
      <div className="mt-12 md:mt-20 text-center animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-graphite/60 mb-4">
          Стилист & Контент-Креатор
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-deep-black tracking-tight mb-6">
          BELLA HASIAS
        </h1>
        <a
          href="#contact"
          className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-deep-black border-b border-deep-black pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
        >
          Начать сотрудничество
        </a>
      </div>
    </section>
  );
};

export default HeroMasonry;
