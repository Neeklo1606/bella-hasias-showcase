import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// New service images
import serviceBrandStyling from '@/assets/service-brand-styling.jpg';
import serviceClientShoot from '@/assets/service-client-shoot.jpg';
import serviceWardrobe from '@/assets/service-wardrobe.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import ugcPreview from '@/assets/portfolio/IMG_1082.JPG';
import aiPreview from '@/assets/portfolio/IMG_1559.JPG';

type ServiceCategory = "stylist" | "creator";

const categoryLabels: Record<ServiceCategory, string> = {
  stylist: "Стилист",
  creator: "Креатор",
};

// Services array with categories
const services: Array<{
  id: string;
  title: string;
  image: string;
  href: string;
  category: ServiceCategory;
}> = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки для бренда',
    image: serviceBrandStyling,
    href: '/services/brand-styling',
    category: "stylist",
  },
  {
    id: 'client-shoot',
    title: 'Клиентская съёмка',
    image: serviceClientShoot,
    href: '/services/client-shoot',
    category: "creator",
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    image: serviceWardrobe,
    href: '/services/wardrobe-audit',
    category: "stylist",
  },
  {
    id: 'personal-shopping',
    title: 'Персональный шоппинг',
    image: heroRight,
    href: '/services/personal-shopping',
    category: "stylist",
  },
  {
    id: 'ugc-content',
    title: 'UGC-контент',
    image: ugcPreview,
    href: '/services/ugc',
    category: "creator",
  },
  {
    id: 'ai-content',
    title: 'AI-контент',
    image: aiPreview,
    href: '/services/ai-content',
    category: "creator",
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
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("stylist");

  const filteredServices = useMemo(
    () => services.filter((service) => service.category === activeCategory),
    [activeCategory]
  );

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

        {/* Category switcher */}
        <div className="flex justify-center mb-10">
          <ToggleGroup
            type="single"
            value={activeCategory}
            onValueChange={(value) => {
              if (value) setActiveCategory(value as ServiceCategory);
            }}
            variant="outline"
            className="w-full max-w-md flex-col sm:flex-row sm:w-auto gap-2 sm:gap-3"
            aria-label="Категории услуг"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className="w-full sm:w-auto min-w-[140px]"
              >
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Services Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {filteredServices.map((service) => (
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
