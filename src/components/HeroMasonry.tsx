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
            
            <h1 className="font-serif text-cream text-3xl md:text-4xl lg:text-5xl italic font-light tracking-wide mb-6">
              Luxury Fashion Stylist
            </h1>
            
            <p className="font-sans text-cream/80 text-sm md:text-base max-w-md leading-relaxed mb-4">
              Interested in embarking on a customized style journey?
            </p>
            <p className="font-sans text-cream/60 text-xs md:text-sm max-w-lg leading-relaxed mb-10">
              Discover comprehensive insights into our process, pricing structure, and outlined strategy below.
            </p>
            
            <a
              href="#services"
              className="inline-block px-8 py-3 bg-graphite/80 hover:bg-graphite text-cream font-sans text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300"
            >
              View Our Services
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
