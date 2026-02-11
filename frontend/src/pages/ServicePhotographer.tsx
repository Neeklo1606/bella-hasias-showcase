import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Footer from '@/components/Footer';
import photographerImage from '@/assets/service-photographer.jpg';
import PageHeader from '@/components/PageHeader';

const ServicePhotographer = () => {
  const features = [
    'Fashion фотосессии',
    'Lifestyle съёмка',
    'Портфолио для моделей',
    'Контент для брендов',
    'Имиджевая съёмка',
    'Ретушь и цветокоррекция',
  ];

  return (
    <>
      <Helmet>
        <title>Фотосъёмка | Bella Hasias</title>
        <meta
          name="description"
          content="Fashion и lifestyle фотография от Bella Hasias. Портфолио фотосессии, имиджевая съёмка. От 7000 ₽ за съёмку."
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Услуги', href: '/services' },
            { label: 'Фотосъёмка' },
          ]}
        />
        
        <section className="section-luxury pt-32 md:pt-36">
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
                  src={photographerImage}
                  alt="Контент фотограф"
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
                  Фотосъёмка
                </h1>
                <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
                  Создаю визуальный контент, который рассказывает историю. Fashion съёмка, 
                  lifestyle фото, портфолио — каждый кадр продуман до мелочей и передаёт 
                  нужное настроение.
                </p>

                <div className="glass rounded-3xl p-6 mb-8 inline-block">
                  <p className="font-display text-3xl text-foreground">от 7,000 ₽</p>
                  <p className="font-sans text-muted-foreground text-sm">за съёмку</p>
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
                  Забронировать съёмку
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

export default ServicePhotographer;
