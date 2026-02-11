import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import heroLeft from '@/assets/hero/hero-left.jpg';
import heroRight from '@/assets/hero/hero-right.jpg';
import photo3 from '@/assets/hero/photo-3.jpg';
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';

const recentWorks = [
  { id: 1, src: heroLeft, title: 'Editorial Portrait' },
  { id: 2, src: heroRight, title: 'Fashion Story' },
  { id: 3, src: photo3, title: 'Personal Style' },
  { id: 4, src: work1, title: 'Brand Campaign' },
  { id: 5, src: work2, title: 'Content Creation' },
  { id: 6, src: work3, title: 'Studio Session' },
];

const VKLanding = () => {
  const vkProfileUrl = 'https://vk.com/bella_hasias'; // Replace with actual VK URL

  return (
    <>
      <Helmet>
        <title>Bella Hasias | Стилист и UGC-креатор</title>
        <meta name="description" content="Высококлассный визуальный контент в Москве. Стилизация, UGC, фотосъёмка." />
        <meta property="og:title" content="Bella Hasias — Стилист и UGC-креатор" />
        <meta property="og:description" content="Высококлассный визуальный контент в Москве" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero - Mobile optimized */}
        <section className="pt-12 pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Стилист · UGC · Контент
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Bella Hasias
            </h1>
            <p className="font-sans text-base text-muted-foreground max-w-sm mx-auto mb-6">
              Создаю визуальный контент и стиль, который рассказывает вашу уникальную историю
            </p>
            
            {/* Main CTA */}
            <a
              href={vkProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury inline-flex items-center gap-2 text-base py-4 px-8"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в ВК
            </a>
          </motion.div>
        </section>

        {/* Recent Works Feed */}
        <section className="py-8 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="font-display text-lg text-foreground">
                Последние работы
              </h2>
              <a
                href="/"
                className="font-sans text-sm text-primary flex items-center gap-1"
              >
                Все работы
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Instagram-style grid */}
            <div className="grid grid-cols-2 gap-2">
              {recentWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="aspect-square overflow-hidden rounded-2xl bg-secondary"
                >
                  <img
                    src={work.src}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services Quick Links */}
        <section className="py-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="font-display text-lg text-foreground mb-4">
              Услуги
            </h2>
            
            <a href="/services/stylist" className="card-luxury p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base text-foreground">Стилизация</h3>
                <p className="font-sans text-sm text-muted-foreground">от 5,000 ₽</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </a>
            
            <a href="/services/ugc" className="card-luxury p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base text-foreground">UGC Контент</h3>
                <p className="font-sans text-sm text-muted-foreground">от 8,000 ₽</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </a>
            
            <a href="/services/photographer" className="card-luxury p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base text-foreground">Фотосъёмка</h3>
                <p className="font-sans text-sm text-muted-foreground">от 7,000 ₽</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </a>
          </motion.div>
        </section>

        {/* Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border/50">
          <a
            href={vkProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury w-full flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Связаться в ВКонтакте
          </a>
        </div>

        {/* Bottom spacing for sticky CTA */}
        <div className="h-24" />
      </main>
    </>
  );
};

export default VKLanding;