import { Link } from 'react-router-dom';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

const Services = () => {
  const services = [
    {
      title: 'Стилизация',
      price: 'от ₽5,000',
      priceLabel: 'за сессию',
      description: 'Персональный стиль, подбор образов, создание капсульного гардероба и консультации по имиджу.',
      image: serviceStylist,
      href: '/services/stylist',
    },
    {
      title: 'UGC Контент',
      price: 'от ₽8,000',
      priceLabel: 'за проект',
      description: 'Создание аутентичного контента для брендов: фото, видео, сторис и рекламные материалы.',
      image: serviceUgc,
      href: '/services/ugc',
    },
    {
      title: 'Фотосъёмка',
      price: 'от ₽7,000',
      priceLabel: 'за съёмку',
      description: 'Профессиональная фотосъёмка для портфолио, каталогов, лукбуков и рекламных кампаний.',
      image: servicePhotographer,
      href: '/services/photographer',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-5 md:px-8 lg:px-12 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header - Left aligned */}
        <div className="mb-10 md:mb-14">
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-deep-black tracking-[-0.01em] font-normal">
            Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-[#fefbf8] border border-[#e8e3d8] p-7 md:p-9 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)] hover:border-gold"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl text-deep-black mb-3 tracking-wide">
                {service.title}
              </h3>

              {/* Price */}
              <p className="font-sans text-base font-medium text-gold mb-4">
                {service.price}{' '}
                <span className="text-graphite/60 font-normal text-sm">
                  {service.priceLabel}
                </span>
              </p>

              {/* Description */}
              <p className="font-sans text-sm text-graphite leading-[1.7] mb-6">
                {service.description}
              </p>

              {/* Button */}
              <Link
                to={service.href}
                className="inline-block w-full md:w-auto text-center px-7 py-3 border border-gold text-deep-black font-sans text-xs tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-gold hover:text-white"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
