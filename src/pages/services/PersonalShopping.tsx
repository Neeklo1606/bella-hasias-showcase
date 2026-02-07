import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Check } from 'lucide-react';
import servicePhotographer from '@/assets/service-photographer.jpg';

const steps = [
  'Определение стиля и бюджета',
  'Составление персонального шоп-листа',
  'Подбор магазинов и маршрута',
  'Совместный шоппинг с примеркой',
  'Финальный разбор покупок',
];

const PersonalShopping = () => {
  return (
    <>
      <Helmet>
        <title>Персональный шоппинг — Шоп-лист и покупки — Bella Hasias</title>
        <meta name="description" content="Персональный шоппинг в Москве со стилистом. Составление шоп-листа, совместные покупки, подбор идеального гардероба под ваш стиль и бюджет." />
        <meta name="keywords" content="персональный шоппинг, шоппинг со стилистом, шоп-лист Москва" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link to="/services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link to="/" className="font-display text-xl font-semibold text-foreground">Bella Hasias</Link>
            <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="btn-luxury text-xs py-2 px-4">
              <Send size={14} className="mr-2" />Связаться
            </a>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img src={servicePhotographer} alt="Персональный шоппинг" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div>
                <p className="font-sans text-xs font-medium tracking-wider uppercase text-primary mb-3">Стилист</p>
                <h1 className="font-display text-h1 text-foreground mb-6">Персональный шоппинг</h1>
                <p className="font-sans text-muted-foreground mb-8 leading-relaxed">
                  Совместный шоппинг с профессиональным стилистом. Составлю персональный шоп-лист, подберу магазины 
                  и проведу вас через весь процесс покупок, чтобы вы получили идеальный гардероб без лишних трат.
                </p>
                <h2 className="font-display text-xl text-foreground mb-4">Как проходит</h2>
                <ul className="space-y-3 mb-8">
                  {steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check size={14} className="text-primary" />
                      </span>
                      <span className="font-sans text-sm text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="btn-luxury inline-flex w-full md:w-auto justify-center">
                  <Send size={16} className="mr-2" />Оставить заявку
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PersonalShopping;
