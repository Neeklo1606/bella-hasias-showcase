import { useState } from 'react';
import { MessageCircle, Send, Mail, MapPin, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  email: z.string().trim().email('Введите корректный email').max(255),
  service: z.string().min(1, 'Выберите услугу'),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const LeadForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена!",
      description: "Я свяжусь с вами в ближайшее время.",
    });

    setFormData({ name: '', email: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  const contactLinks = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/1234567890' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/bellahasias' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@bellahasias.com' },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-5 md:px-8 bg-deep-black">
      <div className="max-w-[800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream/40 mb-4">
            Начнём работу
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-cream tracking-tight mb-4">
            Связаться со мной
          </h2>
          <p className="font-sans text-sm md:text-base text-cream/60 max-w-md mx-auto">
            Расскажите о вашем проекте, и я свяжусь с вами в ближайшее время.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-transparent border ${errors.name ? 'border-red-400' : 'border-cream/20'} text-cream placeholder:text-cream/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-transparent border ${errors.email ? 'border-red-400' : 'border-cream/20'} text-cream placeholder:text-cream/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-transparent border ${errors.service ? 'border-red-400' : 'border-cream/20'} text-cream font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 appearance-none cursor-pointer ${!formData.service ? 'text-cream/40' : ''}`}
            >
              <option value="" className="bg-deep-black">Выберите услугу</option>
              <option value="styling" className="bg-deep-black">Стилистика</option>
              <option value="ugc" className="bg-deep-black">UGC / Контент</option>
              <option value="photo" className="bg-deep-black">Фотосъёмка</option>
              <option value="other" className="bg-deep-black">Другое</option>
            </select>
            {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
          </div>

          <textarea
            name="message"
            placeholder="Расскажите о проекте (опционально)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-4 bg-transparent border border-cream/20 text-cream placeholder:text-cream/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-12 py-4 bg-cream text-deep-black font-sans text-xs tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Отправка...' : (
              <>
                <Check className="w-4 h-4" />
                Отправить
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-12">
          <div className="flex-1 h-px bg-cream/10" />
          <span className="font-sans text-xs text-cream/40 uppercase tracking-wider">или</span>
          <div className="flex-1 h-px bg-cream/10" />
        </div>

        {/* Contact Links */}
        <div className="flex justify-center gap-6 md:gap-8 mb-8">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors duration-300"
            >
              <link.icon size={18} />
              <span className="font-sans text-sm hidden md:inline">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-cream/30">
          <MapPin size={14} />
          <span className="font-sans text-xs">Москва, Россия</span>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
