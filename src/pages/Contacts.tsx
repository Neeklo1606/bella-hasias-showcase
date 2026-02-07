import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Instagram } from 'lucide-react';
import { z } from 'zod';
import Footer from '@/components/Footer';
import { ComesInGoesOutUnderline } from '@/components/ui/underline-animation';

// Telegram Icon
const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  telegram: z.string().trim().min(1, 'Введите ваш Telegram').max(100),
  message: z.string().trim().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Contacts = () => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    telegram: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    let message = `Привет! Я ${formData.name}. Мой Telegram: ${formData.telegram}.`;
    if (formData.message) {
      message += ` ${formData.message}`;
    }
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://t.me/Bella_hasias?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Контакты — Bella Hasias | Стилист и контент-креатор Москва</title>
        <meta name="description" content="Свяжитесь с Bella Hasias для заказа стилизации, UGC-контента или фотосъёмки в Москве. Telegram и Instagram." />
        <meta name="keywords" content="стилист Москва контакты, UGC-контент заказать, визуальный контент для брендов" />
        <meta property="og:title" content="Контакты — Bella Hasias" />
        <meta property="og:description" content="Свяжитесь для заказа стилизации, UGC-контента или фотосъёмки." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bellahasias.com/contacts" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
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
              href="https://t.me/bellahasias"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-xs py-2 px-4 min-h-[44px]"
            >
              <Send size={14} className="mr-2" />
              Telegram
            </a>
          </div>
        </nav>

        {/* Content */}
        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-display text-h1 text-foreground">
                Контакты
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="card-luxury p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как вас зовут?"
                      className={`input-luxury ${errors.name ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="telegram" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Ваш Telegram
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      placeholder="@username"
                      className={`input-luxury ${errors.telegram ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.telegram && <p className="text-destructive text-xs mt-1.5">{errors.telegram}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Комментарий (опционально)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Расскажите подробнее о вашем проекте..."
                      rows={4}
                      className="input-luxury resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-luxury w-full min-h-[48px]">
                    <Send className="w-4 h-4 mr-2" />
                    Написать в Telegram
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-8"
              >
                {/* Social Links */}
                <div>
                  <span className="font-sans text-xs font-medium tracking-wider uppercase text-muted-foreground block mb-4">
                    Социальные сети
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/bellahasias/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://t.me/bellahasias"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <TelegramIcon size={20} />
                    </a>
                  </div>
                </div>

                {/* Telegram Channel CTA */}
                <div className="card-luxury p-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Telegram-канал
                  </h2>
                  <a
                    href="https://t.me/bellahasias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ComesInGoesOutUnderline label="@bellahasias" direction="left" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Contacts;
