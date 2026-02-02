import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  service: z.string().min(1, 'Выберите услугу'),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие на обработку данных'),
});

type FormData = z.infer<typeof formSchema>;

const LeadForm = () => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    service: '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Формируем сообщение и перенаправляем в Telegram
    const serviceLabels: Record<string, string> = {
      styling: 'Стилизация',
      ugc: 'UGC контент',
      photo: 'Фотосъёмка',
    };
    
    const serviceName = serviceLabels[formData.service] || formData.service;
    const message = `Привет! Я ${formData.name}. Интересует услуга: ${serviceName}.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://t.me/Bella_hasias?text=${encodedMessage}`, '_blank');
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bella@bellahasias.com', href: 'mailto:bella@bellahasias.com' },
    { icon: Phone, label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: MapPin, label: 'Локация', value: 'Москва, Россия', href: null },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/bellahasias' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/Bella_hasias' },
  ];

  return (
    <section id="contact" className="section-luxury bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Контакты
          </p>
          <h2 className="font-display text-h2 text-foreground">
            Давайте работать вместе
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="card-luxury p-8 md:p-10"
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
                <label htmlFor="service" className="font-sans text-sm font-medium text-foreground mb-2 block">
                  Интересующая услуга
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`input-luxury appearance-none cursor-pointer ${errors.service ? 'ring-2 ring-destructive' : ''}`}
                >
                  <option value="">Выберите услугу</option>
                  <option value="styling">Стилизация</option>
                  <option value="ugc">UGC контент</option>
                  <option value="photo">Фотосъёмка</option>
                </select>
                {errors.service && <p className="text-destructive text-xs mt-1.5">{errors.service}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => {
                    setFormData(prev => ({ ...prev, consent: checked === true }));
                    if (errors.consent) {
                      setErrors(prev => ({ ...prev, consent: undefined }));
                    }
                  }}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor="consent" className="font-sans text-sm text-muted-foreground cursor-pointer">
                    Я согласен на{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      обработку персональных данных
                    </a>
                  </label>
                  {errors.consent && <p className="text-destructive text-xs mt-1">{errors.consent}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="btn-luxury w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Написать в Telegram
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-sans text-foreground hover:text-primary transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-sans text-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground block mb-5">
                Социальные сети
              </span>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <link.icon size={20} />
                  </a>
                ))}
                <a
                  href="mailto:bella@bellahasias.com"
                  aria-label="Email"
                  className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="card-luxury p-6 text-center">
              <p className="font-sans text-sm text-muted-foreground mb-4">
                Предпочитаете написать напрямую?
              </p>
              <a
                href="https://t.me/Bella_hasias"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury inline-flex"
              >
                <Send className="w-4 h-4 mr-2" />
                Открыть Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
