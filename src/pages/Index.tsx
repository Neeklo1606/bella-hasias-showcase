import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import LeadForm from '@/components/LeadForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Bella Hasias | Стилист & Контент-Креатор</title>
        <meta
          name="description"
          content="Bella Hasias — стилист и контент-креатор. Создаю уникальный визуальный стиль для брендов и личностей. Fashion styling, content creation, персональные консультации."
        />
        <meta property="og:title" content="Bella Hasias | Стилист & Контент-Креатор" />
        <meta
          property="og:description"
          content="Создаю уникальный визуальный стиль для брендов и личностей"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <LeadForm />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default Index;
