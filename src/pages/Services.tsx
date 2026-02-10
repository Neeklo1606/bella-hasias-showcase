import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { fetchServices, loadServices } from '@/admin/lib/servicesStorage';
import { fetchMedia, loadMedia } from '@/admin/lib/mediaStorage';
import { useResolvedMediaItems } from '@/hooks/use-resolved-media';
import type { Service } from '@/admin/types/service';
import type { MediaItem } from '@/admin/types/media';

type ServiceCategory = "stylist" | "creator";

const categoryLabels: Record<ServiceCategory, string> = {
  stylist: "Стилист",
  creator: "Креатор",
};


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
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("stylist");
  const [services, setServices] = useState<Service[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setServices(loadServices());
    setMediaItems(loadMedia());
    fetchServices().then(setServices).catch(() => undefined);
    fetchMedia().then(setMediaItems).catch(() => undefined);
  }, []);

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);
  const mediaMap = useMemo(
    () => new Map(resolvedMediaItems.map((m) => [m.id, m])),
    [resolvedMediaItems]
  );

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => (service.category ?? "stylist") === activeCategory)
      .sort((a, b) => {
        const ao = a.order ?? 0;
        const bo = b.order ?? 0;
        if (ao !== bo) return ao - bo;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })
      .map((service) => {
        const media =
          mediaMap.get(service.imageId) ||
          (service.coverId ? mediaMap.get(service.coverId) : undefined);
        return {
          id: service.id,
          title: service.title,
          image: media?.src ?? "/placeholder.svg",
          href: service.ctaLink || "/contacts",
        };
      });
  }, [services, activeCategory, mediaMap]);

  return (
    <>
      <Helmet>
        <title>Услуги стилиста и контент-креатора в Москве — Bella Hasias</title>
        <meta name="description" content="Услуги стилиста для брендов и съёмок, персональный шоппинг, разбор гардероба, UGC-контент и визуальный контент для брендов в Москве." />
        <meta name="keywords" content="стилист для бренда, стилист на съёмку, персональный шоппинг, визуальный контент для брендов, UGC-контент Москва, стилист контент-креатор" />
        <meta property="og:title" content="Услуги стилиста и контент-креатора — Bella Hasias" />
        <meta property="og:description" content="Стилизация съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://bellahasias.ru/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Услуги стилиста и контент-креатора — Bella Hasias" />
        <meta name="twitter:description" content="Стилизация съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://bellahasias.ru/services" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Услуги' },
          ]}
        />

        {/* Content */}
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left mb-12"
            >
              <h1 className="font-display text-h1 text-foreground">
                Услуги
              </h1>
            </motion.div>

            {/* Category switcher */}
            <div className="flex justify-start mb-10">
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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
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
              className="text-left mt-16"
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
