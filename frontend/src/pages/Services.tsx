import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { bootServices } from '@/lib/boot';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ServiceCards, { publishedOnly } from '@/components/ServiceCards';
import { servicesApi } from '@/lib/api/services.api';

const Services = () => {
  const { data: servicesResponse } = useQuery({
    queryKey: ['services', 'public', { status: 'published', per_page: 100 }],
    queryFn: () => servicesApi.list({ status: 'published', per_page: 100 }),
    initialData: bootServices,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const services = publishedOnly(servicesResponse?.data);

  return (
    <>
      <Helmet>
        <title>Услуги стилиста и контент-креатора в Москве — Bella Hasias</title>
        <meta name="description" content="Услуги стилиста для брендов и съёмок, персональный шоппинг, разбор гардероба, UGC-контент и визуальный контент для брендов в Москве." />
        <meta name="keywords" content="стилист для бренда, стилист на съёмку, персональный шоппинг, визуальный контент для брендов, UGC-контент Москва, стилист контент-креатор" />
        <meta property="og:title" content="Услуги стилиста и контент-креатора — Bella Hasias" />
        <meta property="og:description" content="Стилизация съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве." />
        <meta property="og:type" content="website" />
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
        <section className="pt-32 md:pt-36 pb-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h1 className="font-display text-h1 text-foreground">Услуги</h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                Стиль и гардероб для людей, съёмки и контент для брендов. Работаю в Москве и онлайн — выберите услугу, чтобы узнать подробности и записаться.
              </p>
            </div>

            <ServiceCards services={services} />

            {/* CTA Button */}
            <motion.div
             
             
             
              className="text-center mt-16"
            >
              <a
                href="https://t.me/Bella_hasias"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient min-h-[48px]"
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
