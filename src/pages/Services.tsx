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
  {
    id: 'capsule-wardrobe',
    title: 'Капсульный гардероб',
    image: userPhotos[3],
    href: '/services/capsule-wardrobe',
  },
  {
    id: 'event-look',
    title: 'Образ на мероприятие',
    image: userPhotos[4],
    href: '/services/event-look',
  },
  {
    id: 'client-shoot',
    title: 'Съёмка для клиента',
    image: userPhotos[5],
    href: '/services/client-shoot',
  },
];

// Content creator services
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

const Services = () => {
  const [activeFilter, setActiveFilter] = useState<'stylist' | 'creator'>('stylist');
  const navigate = useNavigate();

  const currentServices = activeFilter === 'stylist' ? stylistServices : creatorServices;

  return (
    <>
      <Helmet>
        <title>Услуги стилиста и контент-креатора в Москве — Bella Hasias</title>
        <meta name="description" content="Услуги стилиста для брендов и съёмок, персональный шоппинг, разбор гардероба, UGC-контент и визуальный контент для брендов в Москве." />
        <meta name="keywords" content="стилист для бренда, стилист на съёмку, персональный шоппинг, визуальный контент для брендов, UGC-контент Москва, стилист контент-креатор" />
        <meta property="og:title" content="Услуги стилиста и контент-креатора — Bella Hasias" />
        <meta property="og:description" content="Стилизация съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bellahasias.com/services" />
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
              Написать в Telegram
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
              <h1 className="font-display text-h1 text-foreground mb-8">
                Услуги
              </h1>

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
                      imageUrl={service.image}
                      actionText="Подробнее"
                      href={service.href}
                      onActionClick={() => navigate(service.href)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
