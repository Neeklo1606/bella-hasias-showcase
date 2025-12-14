import { Link } from 'react-router-dom';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

const Services = () => {
  const services = [
    {
      title: 'СТИЛИЗАЦИЯ',
      price: 'От ₽5,000',
      priceLabel: 'за сессию',
      description: 'Персональный стиль, подбор образов, создание капсульного гардероба и консультации по имиджу для любого случая.',
      image: serviceStylist,
      href: '/services/stylist',
    },
    {
      title: 'UGC КОНТЕНТ',
      price: 'От ₽8,000',
      priceLabel: 'за проект',
      description: 'Создание аутентичного контента для брендов: фото, видео, сторис и рекламные материалы высокого качества.',
      image: serviceUgc,
      href: '/services/ugc',
    },
    {
      title: 'ФОТОСЪЁМКА',
      price: 'От ₽7,000',
      priceLabel: 'за съёмку',
      description: 'Профессиональная фотосъёмка для портфолио, каталогов, лукбуков и рекламных кампаний любой сложности.',
      image: servicePhotographer,
      href: '/services/photographer',
    },
  ];

  return (
    <section 
      id="services" 
      className="py-16 md:py-20 lg:py-20 px-5 md:px-10 lg:px-10 bg-white border-t border-[#e8e8e8]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <span 
            className="text-[14px] font-semibold tracking-[0.05em] uppercase mb-8 md:mb-10 block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="text-[#FF3333]">03</span>
            <span className="text-[#1a1a1a]"> / УСЛУГИ</span>
          </span>
          <h2 
            className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
          >
            УСЛУГИ.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white border border-[#e8e8e8] transition-all duration-300 hover:border-[#FF3333] hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
            >
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-8">
                <h3 
                  className="text-[22px] font-semibold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.title}
                </h3>

                <p 
                  className="text-base font-medium text-[#FF3333] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.price}{' '}
                  <span className="text-[#666666] font-normal text-sm">
                    {service.priceLabel}
                  </span>
                </p>

                <p 
                  className="text-sm text-[#666666] leading-[1.7] mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.description}
                </p>

                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.05em] text-[#1a1a1a] border border-[#FF3333] rounded-full px-7 py-3 hover:bg-[#FF3333] hover:text-white transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>ПОДРОБНЕЕ</span>
                  <svg 
                    className="w-4 h-4" 
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
