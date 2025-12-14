import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';

const HeroMasonry = () => {
  return (
    <section className="relative min-h-screen w-full bg-white">
      {/* Three Column Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        {/* Left Image */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={heroLeft}
            alt="Работа стилиста"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Red accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF3333] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        {/* Center Image with Text Overlay */}
        <div className="relative overflow-hidden h-screen md:h-auto">
          <img
            src={heroCenter}
            alt="Bella Hasias стилист"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {/* Red accent line */}
            <div className="w-16 h-[3px] bg-[#FF3333] mb-10" />
            
            {/* Name - Bold Editorial */}
            <h1 
              className="text-white text-[40px] sm:text-[60px] md:text-[70px] lg:text-[90px] font-black uppercase leading-[0.9] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'Montserrat', 'Franklin Gothic', 'Impact', sans-serif" }}
            >
              BELLA
              <br />
              HASIAS.
            </h1>
            
            {/* Subtitle */}
            <p className="font-sans text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-8">
              Стилист & Креатор
            </p>
            
            {/* Description */}
            <p className="font-sans text-white/60 text-sm md:text-base max-w-md leading-relaxed mb-10">
              Создаю уникальный визуальный образ для брендов и личностей
            </p>
            
            {/* CTA Button - Red accent */}
            <a
              href="#services"
              className="inline-flex items-center gap-3 px-8 py-3 border border-[#FF3333] text-[#FF3333] hover:bg-[#FF3333] hover:text-white font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 group"
            >
              <span>Смотреть услуги</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block relative overflow-hidden group">
          <img
            src={heroRight}
            alt="Редакционная мода"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Red accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF3333] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroMasonry;
