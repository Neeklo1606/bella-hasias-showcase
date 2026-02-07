import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import TelegramCTA from '@/components/TelegramCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Bella Hasias — Стилист и контент-креатор в Москве</title>
        <meta
          name="description"
          content="Стилист для брендов и съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве. Bella Hasias — стилист контент-креатор."
        />
        <meta name="keywords" content="стилист для бренда, стилист на съёмку, персональный шоппинг, визуальный контент для брендов, UGC-контент Москва, стилист контент-креатор" />
        <meta property="og:title" content="Bella Hasias — Стилист и контент-креатор в Москве" />
        <meta
          property="og:description"
          content="Стилист для брендов и съёмок, персональный шоппинг, UGC-контент и визуальный контент для брендов в Москве."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bellahasias.com" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <TelegramCTA />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
