import { Link } from 'react-router-dom';
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
      title: 'Контент Креатор / UGC',
      description: 'Создание видео-контента, UGC съёмки, реклама TikTok/Instagram',
      price: 'от 8000 ₽',
      priceLabel: 'за проект',
      link: '/services/ugc',
    },
    {
      id: 'photographer',
      image: photographerImage,
      title: 'Контент Фотограф',
      description: 'Fashion съёмка, lifestyle фото, портфолио фотосессии',
      price: 'от 7000 ₽',
      priceLabel: 'за съёмку',
      link: '/services/photographer',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Услуги
          </p>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl">
            Чем могу помочь
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card border border-border rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Image Container - 70% height */}
              <div className="relative h-[320px] md:h-[380px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-background font-sans text-base md:text-lg leading-relaxed mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {service.description}
                  </p>
                  <p className="text-magnolia font-serif text-2xl mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {service.price}
                  </p>
                  <p className="text-background/70 font-sans text-sm mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {service.priceLabel}
                  </p>
                  <Link
                    to={service.link}
                    className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase hover:bg-foreground transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 delay-150"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>

              {/* Text Content - 30% */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-sans text-grotto text-lg font-medium">
                  {service.price}
                </p>
                
                {/* Mobile Button - visible only on mobile */}
                <Link
                  to={service.link}
                  className="mt-4 w-full block text-center py-3 bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase hover:bg-foreground transition-colors duration-300 md:hidden"
                >
                  Подробнее
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
