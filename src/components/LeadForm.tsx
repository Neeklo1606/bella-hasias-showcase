import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  email: z.string().trim().email('Введите корректный email').max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1, 'Выберите услугу'),
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
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            Контакты
          </span>
          <h2 className="font-serif text-h2 text-foreground">
            Давайте<br />
            <span className="text-primary">работать вместе</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Form */}
          <div className="card-premium p-8 md:p-10">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">Спасибо!</h3>
                <p className="font-sans text-muted-foreground">Я свяжусь с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Ваше имя <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как вас зовут?"
                      className={`input-premium ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`input-premium ${errors.email ? 'border-destructive' : ''}`}
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
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Услуга <span className="text-primary">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`input-premium appearance-none cursor-pointer ${errors.service ? 'border-destructive' : ''}`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'right 16px center', 
                        backgroundSize: '20px' 
                      }}
                    >
                      <option value="">Выберите услугу</option>
                      <option value="styling">Стилизация</option>
                      <option value="ugc">UGC контент</option>
                      <option value="photo">Фотосъёмка</option>
                    </select>
                    {errors.service && <p className="text-destructive text-xs mt-1.5">{errors.service}</p>}
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
                    className="input-premium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Отправляется...' : 'Отправить'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-10">
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
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

              {/* Working Hours */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground block mb-1">
                    Часы работы
                  </span>
                  <span className="font-sans text-foreground block">Пн–Пт: 10:00–18:00</span>
                  <span className="font-sans text-muted-foreground text-sm">Выходные: по записи</span>
                </div>
              </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
