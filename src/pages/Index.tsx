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
        <title>Стилист и контент-креатор в Москве | Bella Hasias</title>
        <meta
          name="description"
          content="Профессиональный стилист и контент-креатор в Москве. Создаю визуальный стиль и контент, который раскрывает индивидуальность брендов и людей."
        />
        <meta name="keywords" content="стилист Москва, визуальный контент, стилизация съёмки, контент-креатор Москва, персональный шопинг, стилист бренда, контент для Instagram, UGC-контент" />
        <meta property="og:title" content="Bella Hasias — стилист и контент-креатор в Москве" />
        <meta
          property="og:description"
          content="Создаю визуальный стиль и контент, который раскрывает индивидуальность бренда или личности."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bella-hasias-showcase.lovable.app/" />
        <meta property="og:image" content="https://bella-hasias-showcase.lovable.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bella Hasias — стилист и контент-креатор в Москве" />
        <meta name="twitter:description" content="Создаю визуальный стиль и контент, который раскрывает индивидуальность бренда или личности." />
        <meta name="twitter:image" content="https://bella-hasias-showcase.lovable.app/og-image.jpg" />
        <link rel="canonical" href="https://bella-hasias-showcase.lovable.app/" />
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
