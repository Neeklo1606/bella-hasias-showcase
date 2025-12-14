import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

const Services = () => {
  const services = [
    {
      title: 'Стилист',
      description: 'Персональный стиль, подбор образов и создание уникального гардероба для вашей индивидуальности.',
      image: serviceStylist,
      href: '/services/stylist',
    },
    {
      title: 'UGC Креатор',
      description: 'Создание аутентичного контента для брендов: фото, видео и сторис, которые вызывают доверие.',
      image: serviceUgc,
      href: '/services/ugc',
    },
    {
      title: 'Фотограф',
      description: 'Профессиональная фотосъёмка для портфолио, каталогов и рекламных кампаний.',
      image: servicePhotographer,
      href: '/services/photographer',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-5 md:px-8 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-graphite/50 mb-4">
            Чем я могу помочь
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-deep-black tracking-tight">
            Услуги
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/10 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-deep-black mb-2 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-graphite leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight 
                  size={20} 
                  className="text-graphite/40 group-hover:text-gold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
