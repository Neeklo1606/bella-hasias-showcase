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
      number: '01',
    },
    {
      title: 'UGC Контент',
      price: 'от ₽8,000',
      priceLabel: 'за проект',
      description: 'Создание аутентичного контента для брендов: фото, видео, сторис и рекламные материалы.',
      image: serviceUgc,
      href: '/services/ugc',
      number: '02',
    },
    {
      title: 'Фотосъёмка',
      price: 'от ₽7,000',
      priceLabel: 'за съёмку',
      description: 'Профессиональная фотосъёмка для портфолио, каталогов, лукбуков и рекламных кампаний.',
      image: servicePhotographer,
      href: '/services/photographer',
      number: '03',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-5 md:px-8 lg:px-16 bg-[#fafafa]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header - Bold Editorial */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-sm font-sans text-[#666666] mb-4 block">
              <span className="text-[#1a1a1a] font-medium">03</span>/УСЛУГИ
            </span>
            <h2 
              className="text-[48px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#1a1a1a]"
              style={{ fontFamily: "'Montserrat', 'Franklin Gothic', 'Impact', sans-serif" }}
            >
              УСЛУ
              <br className="md:hidden" />
              ГИ.
            </h2>
          </div>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#FF3333] hover:bg-[#FF3333] hover:text-white px-4 py-2 transition-all duration-300 border border-[#FF3333] group self-start md:self-auto"
          >
            <span>Связаться</span>
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white border border-[#e5e5e5] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(26,26,26,0.1)] hover:border-[#FF3333]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                />
                {/* Number overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-sans text-white/80 tracking-wider">{service.number}</span>
                </div>
                {/* Red accent overlay on hover */}
                <div className="absolute inset-0 bg-[#FF3333]/0 group-hover:bg-[#FF3333]/5 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-3 uppercase tracking-wide"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.title}
                </h3>

                {/* Price */}
                <p className="font-sans text-base font-semibold text-[#FF3333] mb-4">
                  {service.price}{' '}
                  <span className="text-[#666666] font-normal text-sm">
                    {service.priceLabel}
                  </span>
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-[#666666] leading-[1.7] mb-6">
                  {service.description}
                </p>

                {/* Button */}
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#FF3333] transition-all duration-300 group/btn"
                >
                  <span>Подробнее</span>
                  <svg 
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
