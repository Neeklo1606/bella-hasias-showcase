import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import photographerImage from '@/assets/service-photographer.jpg';

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
        <title>Контент Фотограф | Bella Hasias</title>
        <meta
          name="description"
          content="Fashion и lifestyle фотография от Bella Hasias. Портфолио фотосессии, имиджевая съёмка. От 7000 ₽ за съёмку."
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navigation />
        
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-6 md:px-12">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors mb-8 font-sans text-sm tracking-wider uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к услугам
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Image */}
              <div className="relative">
                <img
                  src={photographerImage}
                  alt="Контент фотограф"
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-sm"
                />
              </div>

              {/* Content */}
              <div>
                <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-4">
                  Услуга
                </p>
                <h1 className="font-serif text-foreground text-4xl md:text-5xl lg:text-6xl mb-6">
                  Контент Фотограф
                </h1>
                <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
                  Создаю визуальный контент, который рассказывает историю. Fashion съёмка, 
                  lifestyle фото, портфолио — каждый кадр продуман до мелочей и передаёт 
                  нужное настроение.
                </p>

                <div className="mb-8">
                  <p className="font-serif text-grotto text-3xl mb-2">от 7000 ₽</p>
                  <p className="font-sans text-muted-foreground">за съёмку</p>
                </div>

                <div className="mb-10">
                  <h3 className="font-serif text-foreground text-xl mb-4">Что входит:</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 font-sans text-muted-foreground">
                        <Check className="w-5 h-5 text-grotto flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://wa.me/79991234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase hover:bg-foreground transition-colors duration-300"
                >
                  Забронировать съёмку
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServicePhotographer;
