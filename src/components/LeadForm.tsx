import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Введите ваше имя').max(100),
  email: z.string().trim().email('Введите корректный email').max(255),
  phone: z.string().trim().min(1, 'Введите номер телефона').max(20),
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
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bella@bellahasias.com', href: 'mailto:bella@bellahasias.com' },
    { icon: Phone, label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: MapPin, label: 'Локация', value: 'Москва, Россия', href: null },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: 'https://instagram.com/bellahasias' 
    },
    { 
      icon: Send, 
      label: 'Telegram', 
      href: 'https://t.me/bellahasias' 
    },
  ];

  const inputClass = (hasError: boolean) => 
    `w-full px-4 py-3 bg-white border ${hasError ? 'border-red-400' : 'border-[#e8e3d8]'} text-deep-black placeholder:text-graphite/40 font-sans text-sm rounded-md focus:outline-none focus:border-gold transition-all duration-300`;

  return (
    <section id="contact" className="py-20 md:py-28 px-5 md:px-8 lg:px-12 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header - Left aligned */}
        <div className="mb-10 md:mb-14">
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-deep-black tracking-[-0.01em] font-normal">
            Get in Touch
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          
          {/* Left: Form */}
          <div className="bg-[#fefbf8] p-6 md:p-10 border border-[#e8e3d8]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass(!!errors.name)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Service Select */}
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`${inputClass(!!errors.service)} appearance-none cursor-pointer ${!formData.service ? 'text-graphite/40' : ''}`}
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'right 12px center', 
                    backgroundSize: '20px' 
                  }}
                >
                  <option value="">Выберите услугу</option>
                  <option value="styling">Стилизация</option>
                  <option value="ugc">UGC Контент</option>
                  <option value="photo">Фотосъёмка</option>
                  <option value="other">Другое</option>
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Сообщение (опционально)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass(false)} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold text-white font-sans text-sm tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(212,165,116,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:pl-6">
            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#e8e3d8] rounded-full">
                    <item.icon size={18} className="text-graphite/60" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-graphite/50 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="font-sans text-base text-deep-black hover:text-gold transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-sans text-base text-deep-black">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e8e3d8] mb-10" />

            {/* Hours */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-10 h-10 flex items-center justify-center border border-[#e8e3d8] rounded-full">
                <Clock size={18} className="text-graphite/60" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.1em] uppercase text-graphite/50 mb-2">
                  Часы работы
                </p>
                <p className="font-sans text-sm text-deep-black mb-1">Пн–Пт: 10:00–18:00 (МСК)</p>
                <p className="font-sans text-sm text-graphite/60">Выходные: по записи</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e8e3d8] mb-10" />

            {/* Social Links */}
            <div>
              <p className="font-sans text-xs tracking-[0.1em] uppercase text-graphite/50 mb-4">
                Социальные сети
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center border border-[#e8e3d8] rounded-full text-graphite/60 hover:text-gold hover:border-gold transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
