import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

const Services = () => {
  const services = [
    {
      title: 'Стилизация',
      price: 'От ₽5,000',
      priceLabel: 'за сессию',
      description: 'Персональный стиль, подбор образов, создание капсульного гардероба и консультации по имиджу.',
      image: serviceStylist,
      href: '/services/stylist',
    },
    {
      title: 'UGC Контент',
      price: 'От ₽8,000',
      priceLabel: 'за проект',
      description: 'Создание аутентичного контента для брендов: фото, видео, сторис и рекламные материалы.',
      image: serviceUgc,
      href: '/services/ugc',
    },
    {
      title: 'Фотосъёмка',
      price: 'От ₽7,000',
      priceLabel: 'за съёмку',
      description: 'Профессиональная фотосъёмка для портфолио, каталогов, лукбуков и рекламных кампаний.',
      image: servicePhotographer,
      href: '/services/photographer',
    },
  ];

  return (
    <section 
      id="services" 
      className="section-padding bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            Услуги
          </span>
          <h2 className="font-serif text-h2 text-foreground">
            Что я могу<br />
            <span className="text-primary">для вас сделать</span>
          </h2>
        </div>

        {/* Bento Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group card-premium overflow-hidden p-0 hover:shadow-medium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-premium group-hover:scale-105"
                />
                {/* Glassmorphism price badge */}
                <div className="absolute top-4 right-4 glass rounded-xl px-4 py-2">
                  <span className="font-sans text-sm font-semibold text-foreground">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                </div>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <span className="font-sans text-xs text-muted-foreground tracking-wide">
                  {service.priceLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
