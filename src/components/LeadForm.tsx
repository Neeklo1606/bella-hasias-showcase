import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  email: z.string().trim().email('Введите корректный email').max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const LeadForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      setIsSubmitting(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена!",
      description: "Я свяжусь с вами в ближайшее время.",
    });

    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bella@bellahasias.com', href: 'mailto:bella@bellahasias.com' },
    { icon: Phone, label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: MapPin, label: 'Локация', value: 'Москва, Россия', href: null },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/bellahasias' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/bellahasias' },
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
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">Спасибо!</h3>
                <p className="font-sans text-muted-foreground">Я свяжусь с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      className={`input-luxury ${errors.name ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`input-luxury ${errors.email ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Услуга
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-luxury appearance-none cursor-pointer"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="styling">Стилизация</option>
                      <option value="ugc">UGC контент</option>
                      <option value="photo">Фотосъёмка</option>
                    </select>
                  </div>
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
                    placeholder="Расскажите о вашем проекте..."
                    rows={4}
                    className="input-luxury resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Отправляется...' : 'Отправить'}
                </button>
              </form>
            )}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
