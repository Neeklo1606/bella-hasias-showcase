import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import Footer from '@/components/Footer';

// User's own photos
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroCenter from '@/assets/hero/hero-center.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import user1 from '@/assets/portfolio/user-1.jpg';
import user2 from '@/assets/portfolio/user-2.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';

// All services (no filter)
const allServices = [
  {
    id: 'brand-styling',
    title: 'Стилизация съёмки',
    image: heroLeft,
    href: '/services/brand-styling',
  },
  {
    id: 'wardrobe-audit',
    title: 'Разбор гардероба',
    image: heroCenter,
    href: '/services/wardrobe-audit',
  },
  {
    id: 'personal-shopping',
    title: 'Персональный шоппинг',
    image: heroRight,
    href: '/services/personal-shopping',
  },
  {
    id: 'capsule-wardrobe',
    title: 'Капсульный гардероб',
    image: photo3,
    href: '/services/capsule-wardrobe',
  },
  {
    id: 'event-look',
    title: 'Образ на мероприятие',
    image: user1,
    href: '/services/event-look',
  },
  {
    id: 'client-shoot',
    title: 'Съёмка для клиента',
    image: user2,
    href: '/services/client-shoot',
  },
  {
    id: 'ugc-content',
    title: 'UGC-контент',
    image: work1,
    href: '/services/ugc',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    image: work2,
    href: '/services/photo-video',
  },
  {
    id: 'ai-content',
    title: 'AI-контент',
    image: work3,
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

const Services = () => {
  const navigate = useNavigate();

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
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
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
              className="btn-luxury text-xs py-2 px-4 min-h-[44px]"
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
              className="text-center mb-12"
            >
              <h1 className="font-display text-h1 text-foreground">
                Услуги
              </h1>
            </motion.div>

            {/* Services Grid - All services, no filter */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {allServices.map((service) => (
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-16"
            >
              <a
                href="https://t.me/Bella_hasias"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury inline-flex min-h-[48px]"
              >
                <Send size={16} className="mr-2" />
                Оставить заявку
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Services;
