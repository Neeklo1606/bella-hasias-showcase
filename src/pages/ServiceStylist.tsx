import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import stylistImage from '@/assets/service-stylist.jpg';

const ServiceStylist = () => {
  const features = [
    'Анализ цветотипа и типа фигуры',
    'Разбор гардероба с рекомендациями',
    'Подбор капсульного гардероба',
    'Персональный шопинг',
    'Стилизация для фотосессий',
    'Консультации по стилю онлайн',
  ];

  return (
    <>
      <Helmet>
        <title>Стилист | Bella Hasias</title>
        <meta
          name="description"
          content="Персональная стилизация от Bella Hasias. Подбор образов, консультации по стилю, разбор гардероба. От 5000 ₽ за сессию."
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navigation />
        
        <section className="section-luxury pt-32">
          <div className="container-luxury">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-sans text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к услугам
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-3xl"
              >
                <img
                  src={stylistImage}
                  alt="Персональный стилист"
                  className="w-full h-[400px] md:h-[550px] object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Услуга
                </p>
                <h1 className="font-display text-h1 text-foreground mb-6">
                  Стилист
                </h1>
                <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
                  Персональная стилизация — это возможность раскрыть свой уникальный образ. 
                  Я помогу вам создать гардероб, который подчеркнёт вашу индивидуальность и 
                  будет работать на вас в любой ситуации.
                </p>

                <div className="glass rounded-3xl p-6 mb-8 inline-block">
                  <p className="font-display text-3xl text-foreground">от 5,000 ₽</p>
                  <p className="font-sans text-muted-foreground text-sm">за сессию</p>
                </div>

                <div className="mb-10">
                  <h3 className="font-display text-xl text-foreground mb-5">Что входит:</h3>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-4 font-sans text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://wa.me/79991234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury"
                >
                  Записаться
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServiceStylist;
