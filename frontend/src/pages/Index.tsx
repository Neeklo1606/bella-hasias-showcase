import PageSEO from '@/components/PageSEO';
import Hero from '@/components/Hero';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import TelegramCTA from '@/components/TelegramCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <PageSEO
        slug="home"
        fallback={{
          title: "Стилист и контент-креатор в Москве | Bella Hasias",
          description: "Профессиональный стилист и контент-креатор в Москве. Создаю визуальный стиль и контент, который раскрывает индивидуальность брендов и людей.",
          image: "/og-image.jpg",
        }}
      />

      <main className="min-h-screen bg-background">
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
