import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';

const HeroMasonry = () => {
  return (
    <section className="relative min-h-screen w-full">
      {/* Three Column Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        {/* Left Image */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={heroLeft}
            alt="Fashion styling work"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Center Image with Text Overlay */}
        <div className="relative overflow-hidden h-screen md:h-auto">
          <img
            src={heroCenter}
            alt="Bella Hasias styling"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-deep-black/40" />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {/* Decorative line */}
            <div className="w-10 h-[2px] bg-cream/60 mb-8" />
            
            {/* Name */}
            <p className="font-sans text-cream/70 text-xs tracking-[0.4em] uppercase mb-4">
              BELLA HASIAS
            </p>
            
            <h1 className="font-sans text-cream text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] uppercase mb-6">
              Стилист & Креатор
            </h1>
            
            <p className="font-sans text-cream/80 text-sm md:text-base max-w-md leading-relaxed mb-4">
              Готовы к персональному стилю?
            </p>
            <p className="font-sans text-cream/60 text-xs md:text-sm max-w-lg leading-relaxed mb-10">
              Создаю уникальный визуальный образ для брендов и личностей
            </p>
            
            <a
              href="#services"
              className="inline-block px-8 py-3 bg-graphite/80 hover:bg-graphite text-cream font-sans text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300"
            >
              Смотреть услуги
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={heroRight}
            alt="Editorial fashion"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroMasonry;
