import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import stylistImage from '@/assets/service-stylist.jpg';
import ugcImage from '@/assets/service-ugc.jpg';
import photographerImage from '@/assets/service-photographer.jpg';

const Services = () => {
  const services = [
    {
      id: 'stylist',
      image: stylistImage,
      title: 'Стилист',
      description: 'Персональная стилизация, подбор образов, консультации',
      price: 'от 5000 ₽',
      priceLabel: 'за сессию',
      link: '/services/stylist',
    },
    {
      id: 'ugc',
      image: ugcImage,
      title: 'UGC Креатор',
      description: 'Создание видео-контента, UGC съёмки, реклама TikTok/Instagram',
      price: 'от 8000 ₽',
      priceLabel: 'за проект',
      link: '/services/ugc',
    },
    {
      id: 'photographer',
      image: photographerImage,
      title: 'Фотограф',
      description: 'Fashion съёмка, lifestyle фото, портфолио фотосессии',
      price: 'от 7000 ₽',
      priceLabel: 'за съёмку',
      link: '/services/photographer',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-5">
            Услуги
          </p>
          <h2 className="font-serif text-deep-black text-3xl md:text-4xl lg:text-5xl tracking-[0.05em]">
            Чем могу помочь
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-background rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-hover"
            >
              {/* Image Container */}
              <div className="relative h-[340px] md:h-[400px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-cream/90 font-sans text-sm leading-relaxed text-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="btn-primary rounded-full px-8 py-3 text-xs tracking-[0.15em] uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
                  >
                    Подробнее
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-foreground tracking-wide mb-2">
                  {service.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-gold text-lg font-medium">
                    {service.price}
                  </span>
                  <span className="font-sans text-muted-foreground text-sm">
                    {service.priceLabel}
                  </span>
                </div>
                
                {/* Mobile Button */}
                <Link
                  to={service.link}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-gold text-deep-black font-sans text-sm tracking-wider rounded-full hover:bg-gold/90 transition-colors duration-300 md:hidden"
                >
                  Подробнее
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
