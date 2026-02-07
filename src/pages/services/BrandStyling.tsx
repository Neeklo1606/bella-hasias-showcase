import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Check } from 'lucide-react';
import serviceStylist from '@/assets/service-stylist.jpg';

const steps = [
  'Брифинг и обсуждение концепции',
  'Подбор референсов и мудборда',
  'Шоппинг и подготовка образов',
  'Стилизация на съёмке',
  'Финальная корректировка образов',
];

const BrandStyling = () => {
  return (
    <>
      <Helmet>
        <title>Стилизация съёмки для бренда — Bella Hasias</title>
        <meta name="description" content="Профессиональная стилизация съёмок для брендов: каталоги, кампейны, имиджевые проекты. Создание уникального визуального образа в Москве." />
        <meta name="keywords" content="стилизация съёмки, стилист для бренда, кампейн, каталог, имидж съёмка Москва" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/services"
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

        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img
                  src={serviceStylist}
                  alt="Стилизация съёмки для бренда"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Content */}
              <div>
                <p className="font-sans text-xs font-medium tracking-wider uppercase text-primary mb-3">
                  Стилист
                </p>
                <h1 className="font-display text-h1 text-foreground mb-6">
                  Стилизация съёмки
                </h1>
                <p className="font-sans text-muted-foreground mb-8 leading-relaxed">
                  Полный цикл стилизации для коммерческих съёмок: от каталогов и лукбуков до рекламных кампейнов. 
                  Работаю с подбором одежды, аксессуаров, создаю целостный визуальный образ, который подчёркивает 
                  идентичность бренда и резонирует с целевой аудиторией.
                </p>

                {/* Process */}
                <h2 className="font-display text-xl text-foreground mb-4">Процесс работы</h2>
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

                {/* CTA */}
                <a
                  href="https://t.me/Bella_hasias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex w-full md:w-auto justify-center"
                >
                  <Send size={16} className="mr-2" />
                  Оставить заявку
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BrandStyling;
