import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { z } from 'zod';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  telegram: z.string().trim().min(1, 'Введите ваш Telegram').max(100),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Feedback = () => {
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
        <title>Обратная связь — Bella Hasias</title>
        <meta name="description" content="Форма обратной связи. Свяжитесь с Bella Hasias для заказа услуг стилиста или контент-креатора." />
      </Helmet>

      <main className="min-h-screen bg-background">
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
            <div className="w-20" />
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-xl mx-auto">
            <h1 className="font-display text-h1 text-foreground mb-8 text-center">
              Обратная связь
            </h1>

            <div className="card-luxury p-8">
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
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите подробнее о вашем запросе..."
                    rows={5}
                    className="input-luxury resize-none"
                  />
                </div>

                <button type="submit" className="btn-luxury w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Feedback;
