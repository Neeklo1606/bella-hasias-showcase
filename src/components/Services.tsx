import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

const services = [
  {
    title: 'Стилизация',
    price: 'от 5,000 ₽',
    description: 'Персональный стиль, подбор образов и создание капсульного гардероба',
    image: serviceStylist,
    href: '/services/stylist',
  },
  {
    title: 'UGC Контент',
    price: 'от 8,000 ₽',
    description: 'Аутентичный контент для брендов: фото, видео и рекламные материалы',
    image: serviceUgc,
    href: '/services/ugc',
  },
  {
    title: 'Фотосъёмка',
    price: 'от 7,000 ₽',
    description: 'Профессиональная съёмка для портфолио и рекламных кампаний',
    image: servicePhotographer,
    href: '/services/photographer',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const Services = () => {
  return (
    <section id="services" className="section-luxury bg-secondary/50">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Услуги
          </p>
          <h2 className="font-display text-h2 text-foreground">
            Что я могу для вас сделать
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
            >
              <Link
                to={service.href}
                className="group card-luxury block overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-[280px] md:h-[320px] overflow-hidden rounded-t-3xl -mx-0 -mt-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105"
                  />
                  {/* Glassmorphism price badge */}
                  <div className="absolute top-4 right-4 glass rounded-2xl px-4 py-2">
                    <span className="font-sans text-sm font-semibold text-foreground">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
