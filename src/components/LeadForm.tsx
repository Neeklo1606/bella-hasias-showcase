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
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/bellahasias' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/bellahasias' },
  ];

  const inputClass = (hasError: boolean) => 
    `w-full px-4 py-3 bg-white border ${hasError ? 'border-[#FF3333]' : 'border-[#e5e5e5]'} text-[#1a1a1a] placeholder:text-[#999999] text-sm focus:outline-none focus:border-[#FF3333] transition-all duration-300`;

  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <span 
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#666666] mb-4 block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="text-[#FF3333]">04</span> / КОНТАКТЫ
          </span>
          <h2 
            className="text-[40px] sm:text-[60px] md:text-[80px] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#1a1a1a]"
            style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
          >
            СВЯЗАТЬСЯ.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16">
          
          {/* Left: Form */}
          <div className="bg-[#f5f5f5] p-6 md:p-8 border border-[#e5e5e5]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass(!!errors.name)}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {errors.name && <p className="text-[#FF3333] text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass(!!errors.email)}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {errors.email && <p className="text-[#FF3333] text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass(!!errors.phone)}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {errors.phone && <p className="text-[#FF3333] text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`${inputClass(!!errors.service)} appearance-none cursor-pointer ${!formData.service ? 'text-[#999999]' : ''}`}
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
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
                {errors.service && <p className="text-[#FF3333] text-xs mt-1">{errors.service}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Сообщение (опционально)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass(false)} resize-none`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FF3333] text-white text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:pl-4">
            <div className="space-y-5 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                    <item.icon size={18} className="text-[#1a1a1a]" />
                  </div>
                  <div>
                    <p 
                      className="text-[10px] tracking-[0.1em] uppercase text-[#666666] mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-sm text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p 
                        className="text-sm text-[#1a1a1a]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-[#e5e5e5] mb-8" />

            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                <Clock size={18} className="text-[#1a1a1a]" />
              </div>
              <div>
                <p 
                  className="text-[10px] tracking-[0.1em] uppercase text-[#666666] mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Часы работы
                </p>
                <p 
                  className="text-sm text-[#1a1a1a] mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Пн–Пт: 10:00–18:00 (МСК)
                </p>
                <p 
                  className="text-sm text-[#666666]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Выходные: по записи
                </p>
              </div>
            </div>

            <div className="h-px bg-[#e5e5e5] mb-8" />

            <div>
              <p 
                className="text-[10px] tracking-[0.1em] uppercase text-[#666666] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
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
                    className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-white hover:bg-[#FF3333] transition-all duration-300"
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
