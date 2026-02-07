import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';

// New service images
import serviceBrandStyling from '@/assets/service-brand-styling.jpg';
import serviceClientShoot from '@/assets/service-client-shoot.jpg';
import serviceWardrobe from '@/assets/service-wardrobe.jpg';

// Services array with new images and order
const services = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки для бренда',
    image: serviceBrandStyling,
    href: '/services/brand-styling',
  },
  {
    id: 'client-shoot',
    title: 'Клиентская съёмка',
    image: serviceClientShoot,
    href: '/services/client-shoot',
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    image: serviceWardrobe,
    href: '/services/wardrobe-audit',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="services" 
      className="py-16 md:py-20 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 
            id="services-heading"
            className="font-display text-h2 text-foreground"
          >
            Услуги
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <InteractiveTravelCard
                title={service.title}
                imageUrl={service.image}
                href={service.href}
                onActionClick={() => navigate(service.href)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="btn-luxury inline-flex items-center"
          >
            Все услуги
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
