import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhotographer from '@/assets/service-photographer.jpg';

// Service data with SEO-optimized titles and subtitles
const stylistServices = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки',
    subtitle: 'Каталог • Кампейн • Имидж',
    image: serviceStylist,
    href: '/services/brand-styling',
  },
  {
    id: 'client-shoot',
    title: 'Клиентская съёмка',
    subtitle: 'Персональный образ • Фотосессия',
    image: servicePhotographer,
    href: '/services/client-shoot',
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    subtitle: 'Анализ • Образы • Рекомендации',
    image: serviceStylist,
    href: '/services/wardrobe-audit',
  },
  {
    id: 'personal-shopping',
    title: 'Персональный шоппинг',
    subtitle: 'Шоп-лист • Совместные покупки',
    image: servicePhotographer,
    href: '/services/personal-shopping',
  },
  {
    id: 'capsule-wardrobe',
    title: 'Капсульный гардероб',
    subtitle: 'Сезон • Событие • Онлайн',
    image: serviceStylist,
    href: '/services/capsule-wardrobe',
  },
  {
    id: 'event-look',
    title: 'Образ на мероприятие',
    subtitle: 'Подбор лука • Стилизация',
    image: servicePhotographer,
    href: '/services/event-look',
  },
];

const creatorServices = [
  {
    id: 'ugc-content',
    title: 'UGC-контент',
    subtitle: 'User-Generated • Для брендов',
    image: serviceUgc,
    href: '/services/ugc',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    subtitle: 'Креатив • Блогеры • Бренды',
    image: servicePhotographer,
    href: '/services/photo-video',
  },
  {
    id: 'ai-content',
    title: 'AI-контент',
    subtitle: 'Digital • SMM • Визуалы',
    image: serviceUgc,
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
      className="section-luxury bg-secondary/30"
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
            className="font-display text-h2 text-foreground mb-8"
          >
            Услуги
          </h2>

          {/* Toggle Filter */}
          <ToggleGroup 
            type="single" 
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value as 'stylist' | 'creator')}
            className="inline-flex bg-muted/50 p-1.5 rounded-2xl"
          >
            <ToggleGroupItem 
              value="stylist" 
              className="px-6 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground"
            >
              Стилист
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="creator"
              className="px-6 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {currentServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <InteractiveTravelCard
                  title={service.title}
                  subtitle={service.subtitle}
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
          className="text-center mt-12"
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

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
        <Link
          to="/services"
          className="btn-luxury w-full flex items-center justify-center py-4 shadow-lg"
        >
          Все услуги
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
