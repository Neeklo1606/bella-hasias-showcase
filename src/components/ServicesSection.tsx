import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// User's own photos - lazy load
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import user1 from '@/assets/portfolio/user-1.jpg';
import user2 from '@/assets/portfolio/user-2.jpg';

// User photos array to cycle through
const userPhotos = [heroLeft, heroCenter, heroRight, photo3, user1, user2];

// Only 3 services per category - using user's photos
const stylistServices = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки',
    image: userPhotos[0],
    href: '/services/brand-styling',
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    image: userPhotos[1],
    href: '/services/wardrobe-audit',
  },
  {
    id: 'personal-shopping',
    title: 'Персональный шоппинг',
    image: userPhotos[2],
    href: '/services/personal-shopping',
  },
];

const creatorServices = [
  {
    id: 'ugc-content',
    title: 'UGC-контент',
    image: userPhotos[3],
    href: '/services/ugc',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    image: userPhotos[4],
    href: '/services/photo-video',
  },
  {
    id: 'ai-content',
    title: 'AI-контент',
    image: userPhotos[5],
    href: '/services/ai-content',
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
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
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
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState<'stylist' | 'creator'>('stylist');
  const navigate = useNavigate();

  const currentServices = activeFilter === 'stylist' ? stylistServices : creatorServices;

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
          className="text-center mb-8"
        >
          <h2 
            id="services-heading"
            className="font-display text-h2 text-foreground mb-6"
          >
            Услуги
          </h2>

          {/* Toggle Filter */}
          <ToggleGroup 
            type="single" 
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value as 'stylist' | 'creator')}
            className="inline-flex bg-muted/50 p-1 rounded-xl"
          >
            <ToggleGroupItem 
              value="stylist" 
              className="px-5 py-2.5 rounded-lg font-sans text-sm font-medium transition-all duration-300 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground"
            >
              Стилист
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="creator"
              className="px-5 py-2.5 rounded-lg font-sans text-sm font-medium transition-all duration-300 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground"
            >
              Контент-креатор
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {currentServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <InteractiveTravelCard
                  title={service.title}
                  imageUrl={service.image}
                  actionText="Подробнее"
                  href={service.href}
                  onActionClick={() => navigate(service.href)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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
