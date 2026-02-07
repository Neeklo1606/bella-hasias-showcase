import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import Footer from '@/components/Footer';
import work1 from '@/assets/portfolio/work-1.jpg';

const ServiceUgc = () => {
  return (
    <>
      <Helmet>
        <title>UGC-контент — Создание контента для брендов — Bella Hasias</title>
        <meta name="description" content="Создание UGC-контента для брендов в Москве. Видео для TikTok, Instagram Reels, рекламные ролики." />
        <meta name="keywords" content="UGC контент, контент для брендов, TikTok видео, Instagram Reels" />
        <meta property="og:title" content="UGC-контент — Bella Hasias" />
        <meta property="og:description" content="Создание UGC-контента для брендов в Москве." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link to="/services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]">
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link to="/" className="font-display text-xl font-semibold text-foreground">Bella Hasias</Link>
            <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="btn-luxury text-xs py-2 px-4 min-h-[44px]">
              <Send size={14} className="mr-2" />Связаться
            </a>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img src={work1} alt="UGC-контент для брендов и социальных сетей" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div>
                <h1 className="font-display text-h1 text-foreground mb-6">UGC-контент</h1>
                <div className="font-sans text-muted-foreground space-y-4 mb-8 leading-relaxed">
                  <p>
                    Услуга включает в себя полное стилистическое сопровождение проекта — от идеи до реализации. 
                    Вы получите визуально цельный образ, соответствующий целям съёмки, бренда или личного стиля.
                  </p>
                  <p>
                    Работа строится на глубоком анализе референсов, подборе актуальных решений и внимании к деталям. 
                    Каждый проект уникален и требует индивидуального подхода.
                  </p>
                </div>
                <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="btn-luxury inline-flex w-full md:w-auto justify-center min-h-[48px]">
                  <Send size={16} className="mr-2" />Оставить заявку
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServiceUgc;
