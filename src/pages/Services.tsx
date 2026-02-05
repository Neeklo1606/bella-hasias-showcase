import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, ArrowRight } from 'lucide-react';
import serviceStylist from '@/assets/service-stylist.jpg';
import serviceUgc from '@/assets/service-ugc.jpg';
import servicePhoto from '@/assets/service-photographer.jpg';

const services = [
  {
    id: 'styling',
    title: 'Стилизация',
    subtitle: 'Персональный стиль и образы',
    description: 'Создание уникального визуального образа для съёмок, мероприятий и повседневной жизни. Работаю с гардеробом, аксессуарами и общей концепцией.',
    features: ['Подбор образов', 'Шоппинг-сопровождение', 'Стилизация для съёмок', 'Капсульный гардероб'],
    image: serviceStylist,
    link: '/services/stylist',
  },
  {
    id: 'ugc',
    title: 'UGC-контент',
    subtitle: 'Контент для брендов',
    description: 'Создание аутентичного пользовательского контента для социальных сетей и рекламных кампаний. Естественный стиль, который резонирует с аудиторией.',
    features: ['Видео для Reels/TikTok', 'Фотоконтент', 'Распаковки и обзоры', 'Stories-контент'],
    image: serviceUgc,
    link: '/services/ugc',
  },
  {
    id: 'photo',
    title: 'Фотосъёмка',
    subtitle: 'Контент-фотография',
    description: 'Профессиональная съёмка для личного бренда, портфолио и коммерческих проектов. Студийная и локационная съёмка в Москве.',
    features: ['Портретная съёмка', 'Предметная съёмка', 'Lifestyle-фото', 'Контент для соцсетей'],
    image: servicePhoto,
    link: '/services/photographer',
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Услуги — Bella Hasias</title>
        <meta name="description" content="Услуги Bella Hasias: стилизация, UGC-контент и профессиональная фотосъёмка в Москве." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link
              to="/"
              className="font-display text-xl font-semibold text-foreground"
            >
              Bella Hasias
            </Link>
            <a
              href="https://t.me/Bella_hasias"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-xs py-2 px-4"
            >
              <Send size={14} className="mr-2" />
              Связаться
            </a>
          </div>
        </nav>

        {/* Content */}
        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-display text-h1 text-foreground mb-4">
                Услуги
              </h1>
              <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto">
                Выберите направление, которое вам подходит
              </p>
            </motion.div>

            {/* Services List */}
            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="font-sans text-xs font-medium tracking-wider uppercase text-primary mb-3">
                      {service.subtitle}
                    </p>
                    <h2 className="font-display text-h2 text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="font-sans text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={service.link}
                        className="btn-ghost-luxury inline-flex items-center"
                      >
                        Подробнее
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                      <a
                        href="https://t.me/Bella_hasias"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury inline-flex"
                      >
                        <Send size={16} className="mr-2" />
                        Заказать
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-20"
            >
              <div className="card-luxury p-10 max-w-2xl mx-auto">
                <h3 className="font-display text-2xl text-foreground mb-3">
                  Не знаете, что выбрать?
                </h3>
                <p className="font-sans text-muted-foreground mb-6">
                  Напишите мне, и мы вместе определим, какая услуга подойдёт именно вам
                </p>
                <a
                  href="https://t.me/Bella_hasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex"
                >
                  <Send size={16} className="mr-2" />
                  Написать в Telegram
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
