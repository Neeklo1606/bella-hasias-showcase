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
        <title>Bella Hasias — Стилист, UGC-креатор и контент-фотограф</title>
        <meta
          name="description"
          content="Высококлассный визуальный контент в Москве. Стилизация, UGC-контент и профессиональная фотосъёмка для брендов и личностей."
        />
        <meta property="og:title" content="Bella Hasias — Стилист, UGC-креатор и контент-фотограф" />
        <meta
          property="og:description"
          content="Высококлассный визуальный контент в Москве. Стилизация, UGC и фотосъёмка."
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
