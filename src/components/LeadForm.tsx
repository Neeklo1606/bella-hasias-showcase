import { useState } from 'react';
import { z } from 'zod';
import { MessageCircle, Send, Mail, MapPin, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100, 'Имя слишком длинное'),
  email: z.string().trim().email('Введите корректный email').max(255),
  phone: z.string().trim().min(1, 'Введите номер телефона').max(20),
  service: z.string().min(1, 'Выберите услугу'),
  message: z.string().trim().max(1000, 'Сообщение слишком длинное').optional(),
});

type FormData = z.infer<typeof formSchema>;

const LeadForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const services = [
    { value: 'stylist', label: 'Стилист' },
    { value: 'ugc', label: 'UGC / Контент-креатор' },
    { value: 'photographer', label: 'Фотография' },
  ];

  const contactInfo = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+7 (999) 123-45-67',
      href: 'https://wa.me/79991234567',
    },
    {
      icon: Send,
      label: 'Telegram',
      value: '@bellahasias',
      href: 'https://t.me/bellahasias',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@bellahasias.com',
      href: 'mailto:hello@bellahasias.com',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена!",
      description: "Я свяжусь с вами в ближайшее время.",
    });

    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-graphite text-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 md:mb-18">
            <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-5">
              Связаться
            </p>
            <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-5xl mb-5 tracking-[0.05em]">
              Запишитесь на консультацию
            </h2>
            <p className="font-sans text-cream/50 max-w-lg mx-auto leading-relaxed">
              Готова обсудить ваш проект и помочь воплотить идеи в жизнь
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-red-400' : 'border-background/30'} focus:border-magnolia text-background placeholder:text-background/40 py-4 text-base md:text-lg outline-none transition-colors`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-red-400' : 'border-background/30'} focus:border-magnolia text-background placeholder:text-background/40 py-4 text-base md:text-lg outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Телефон / WhatsApp"
                    className={`w-full bg-transparent border-0 border-b ${errors.phone ? 'border-red-400' : 'border-background/30'} focus:border-magnolia text-background placeholder:text-background/40 py-4 text-base md:text-lg outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Service Select */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b ${errors.service ? 'border-red-400' : 'border-background/30'} focus:border-magnolia text-background py-4 text-base md:text-lg outline-none transition-colors appearance-none cursor-pointer ${!formData.service ? 'text-background/40' : ''}`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFAF6' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '24px' }}
                  >
                    <option value="" className="bg-foreground text-background">Выберите услугу</option>
                    {services.map(s => (
                      <option key={s.value} value={s.value} className="bg-foreground text-background">{s.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Сообщение (опционально)"
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-background/30 focus:border-magnolia text-background placeholder:text-background/40 py-4 text-base md:text-lg outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-gold text-deep-black font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[52px]"
                >
                  {isSubmitting ? (
                    'Отправка...'
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Отправить запрос
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <h3 className="font-serif text-cream text-2xl mb-8 tracking-wide">
                Или свяжитесь напрямую
              </h3>

              <div className="space-y-5 mb-10">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-cream/60 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-cream/40 text-xs tracking-[0.15em] uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="font-sans text-cream group-hover:text-gold transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2 text-cream/30 pt-6 border-t border-cream/10">
                <MapPin size={16} />
                <span className="font-sans text-sm">Москва, Россия</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
