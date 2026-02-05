import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroCenter from '@/assets/hero/hero-center.jpg';

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center section-luxury bg-background">
      <div className="container-luxury w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Typography */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
            >
              Стилист · UGC · Контент
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-display text-foreground mb-8"
            >
              Bella
              <br />
              Hasias
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Создаю визуальный контент и стиль, который рассказывает вашу уникальную историю
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contacts"
                className="btn-luxury"
              >
                Связаться
              </Link>
              <Link
                to="/portfolio"
                className="btn-ghost-luxury inline-flex items-center"
              >
                Смотреть работы
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src={heroCenter}
                alt="Bella Hasias"
                className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-3xl"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
