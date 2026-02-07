import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// User's own photos
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import user1 from '@/assets/portfolio/user-1.jpg';
import user2 from '@/assets/portfolio/user-2.jpg';

// User photos array to cycle through
const userPhotos = [heroLeft, heroCenter, heroRight, photo3, user1, user2];

// Stylist services
const stylistServices = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки',
    subtitle: 'Каталог • Кампейн • Имидж',
    image: userPhotos[0],
    href: '/services/brand-styling',
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    subtitle: 'Анализ • Образы • Рекомендации',
    image: userPhotos[1],
    href: '/services/wardrobe-audit',
  },
  {
    id: 'personal-shopping',
    title: 'Персональный шоппинг',
    subtitle: 'Шоп-лист • Совместные покупки',
    image: userPhotos[2],
    href: '/services/personal-shopping',
  },
  {
    id: 'capsule-wardrobe',
    title: 'Капсульный гардероб',
    subtitle: 'Универсальный • Стильный',
    image: userPhotos[3],
    href: '/services/capsule-wardrobe',
  },
  {
    id: 'event-look',
    title: 'Образ на мероприятие',
    subtitle: 'Вечерний • Деловой • Casual',
    image: userPhotos[4],
    href: '/services/event-look',
  },
  {
    id: 'client-shoot',
    title: 'Съёмка для клиента',
    subtitle: 'Портфолио • Личный бренд',
    image: userPhotos[5],
    href: '/services/client-shoot',
  },
];

// Content creator services
const creatorServices = [
  {
    id: 'ugc-content',
    title: 'UGC-контент',
    subtitle: 'User-Generated • Для брендов',
    image: userPhotos[3],
    href: '/services/ugc',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    subtitle: 'Креатив • Блогеры • Бренды',
    image: userPhotos[4],
    href: '/services/photo-video',
  },
  {
    id: 'ai-content',
    title: 'AI-контент',
    subtitle: 'Digital • SMM • Визуалы',
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

const Services = () => {
  const [activeFilter, setActiveFilter] = useState<'stylist' | 'creator'>('stylist');
  const navigate = useNavigate();

  const currentServices = activeFilter === 'stylist' ? stylistServices : creatorServices;

  return (
    <>
      <Helmet>
        <title>Услуги — Bella Hasias | Стилист и Контент-креатор</title>
        <meta name="description" content="Полный список услуг Bella Hasias: стилизация съёмок, разбор гардероба, персональный шоппинг, UGC-контент, фото и видео для брендов." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link
              to="/"
              className="font-display text-xl font-semibold text-foreground"
            >
              Bella Hasias
            </Link>
            <a
              href="https://t.me/Bella_hasias"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-xs py-2 px-4"
            >
              <Send size={14} className="mr-2" />
              Связаться
            </a>
          </div>
        </nav>

        {/* Content */}
        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h1 className="font-display text-h1 text-foreground mb-4">
                Услуги
              </h1>
              <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Выберите направление, которое вам подходит
              </p>

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

            {/* Services Grid - 3D Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-16"
            >
              <div className="card-luxury p-10 max-w-2xl mx-auto">
                <h3 className="font-display text-2xl text-foreground mb-3">
                  Не знаете, что выбрать?
                </h3>
                <p className="font-sans text-muted-foreground mb-6">
                  Напишите мне, и мы вместе определим, какая услуга подойдёт именно вам
                </p>
                <a
                  href="https://t.me/Bella_hasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex"
                >
                  <Send size={16} className="mr-2" />
                  Написать в Telegram
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;