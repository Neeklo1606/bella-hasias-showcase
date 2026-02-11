import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

interface ServicePageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  caseBlocks: string[];
}

const ServicePageLayout = ({
  title,
  metaTitle,
  metaDescription,
  metaKeywords,
  ogImage,
  heroImage,
  heroImageAlt,
  intro,
  caseBlocks,
}: ServicePageLayoutProps) => {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Заявка на услугу "${title}"%0A%0AИмя: ${formData.name}%0ATelegram: ${formData.telegram}%0AКомментарий: ${formData.comment}`;
    window.open(`https://t.me/Bella_hasias?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle} | Bella Hasias</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={`${title} — Bella Hasias`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} — Bella Hasias`} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <main className="min-h-screen bg-background">
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Услуги', href: '/services' },
            { label: title },
          ]}
        />

        {/* Hero Section - Full Width Image */}
        <section className="pt-28 md:pt-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
          >
            <img
              src={heroImage}
              alt={heroImageAlt}
              loading="eager"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-h1 text-foreground mb-6 md:mb-8"
            >
              {title}
            </motion.h1>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-lg md:text-xl text-foreground/80 leading-relaxed mb-10 md:mb-12"
            >
              {intro}
            </motion.p>

            {/* Case Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 mb-16"
            >
              {caseBlocks.map((block, index) => (
                <p
                  key={index}
                  className="font-sans text-base text-muted-foreground leading-relaxed"
                >
                  {block}
                </p>
              ))}
            </motion.div>

            {/* CTA Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-secondary/30 rounded-3xl p-8 md:p-10"
            >
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                Оставить заявку
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Ваш Telegram (@username)"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    required
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Расскажите о вашем проекте"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="input-luxury w-full resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-luxury w-full md:w-auto min-h-[52px] text-base group"
                >
                  <Send size={18} className="mr-2 transition-transform group-hover:translate-x-1" />
                  Отправить
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServicePageLayout;