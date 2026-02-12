import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { servicesApi } from '@/lib/api/services.api';
import type { Service } from '@/admin/types/service';

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

  const { data: servicesResponse, isLoading } = useQuery({
    queryKey: ['services', 'public', { status: 'published', per_page: 100 }],
    queryFn: () => servicesApi.list({ status: 'published', per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const services = servicesResponse?.data || [];

  const filteredServices = useMemo(() => {
    return services
      .filter((service: Service) => {
        const serviceCategory = service.category === 'stylist' ? 'stylist' : 
                               service.category === 'creator' ? 'creator' : 
                               'stylist'; // default
        return serviceCategory === activeCategory;
      })
      .map((service: Service & { image?: any; cover?: any }) => ({
        id: service.id,
        title: service.title,
        image: service.cover?.url || service.image?.url || '',
        href: `/services/${service.slug || service.id}`,
        category: (service.category === 'creator' ? 'creator' : 'stylist') as ServiceCategory,
      }));
  }, [services, activeCategory]);

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
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Услуги' },
          ]}
        />

        {/* Content */}
        <section className="pt-32 md:pt-36 pb-20 px-6 md:px-10">
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
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
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
            )}

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
