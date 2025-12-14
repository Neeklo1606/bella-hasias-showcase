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
    { icon: Mail, label: 'EMAIL', value: 'bella@bellahasias.com', href: 'mailto:bella@bellahasias.com' },
    { icon: Phone, label: 'ТЕЛЕФОН', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: MapPin, label: 'ЛОКАЦИЯ', value: 'Москва, Россия', href: null },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/bellahasias' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/bellahasias' },
  ];

  const inputClass = (hasError: boolean) => 
    `w-full px-4 py-3 bg-white border ${hasError ? 'border-[#FF3333]' : 'border-[#e8e8e8]'} rounded-md text-[#1a1a1a] placeholder:text-[#999999] text-sm focus:outline-none focus:border-[#FF3333] focus:shadow-[0_0_0_3px_rgba(255,51,51,0.1)] transition-all duration-300`;

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-20 px-5 md:px-10 lg:px-10 bg-white border-t border-[#e8e8e8]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 
            className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
          >
            СВЯЗАТЬСЯ.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16">
          
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя *"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass(!!errors.name)}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                {errors.name && <p className="text-[#FF3333] text-xs mt-1.5">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass(!!errors.email)}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                {errors.email && <p className="text-[#FF3333] text-xs mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass(false)}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`${inputClass(!!errors.service)} appearance-none cursor-pointer ${!formData.service ? 'text-[#999999]' : ''}`}
                  style={{ 
                    fontFamily: "'Inter', sans-serif",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'right 12px center', 
                    backgroundSize: '20px' 
                  }}
                >
                  <option value="">Выберите услугу *</option>
                  <option value="styling">Стилизация</option>
                  <option value="ugc">UGC Контент</option>
                  <option value="photo">Фотосъёмка</option>
                </select>
                {errors.service && <p className="text-[#FF3333] text-xs mt-1.5">{errors.service}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Сообщение (опционально)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass(false)} resize-none`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#FF3333] text-white text-sm tracking-[0.05em] uppercase font-semibold rounded-full transition-all duration-300 hover:bg-[#d40000] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,51,51,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isSubmitting ? 'ОТПРАВЛЯЕТСЯ...' : isSuccess ? 'СПАСИБО! МЫ СВЯЖЕМСЯ СКОРО' : 'ОТПРАВИТЬ'}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:pl-8">
            <div className="space-y-7">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon size={24} className="text-[#1a1a1a] flex-shrink-0 mt-0.5" />
                  <div>
                    <p 
                      className="text-[11px] tracking-[0.05em] uppercase font-semibold text-[#1a1a1a] mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-sm text-[#666666] hover:text-[#FF3333] transition-colors duration-300"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p 
                        className="text-sm text-[#666666]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock size={24} className="text-[#1a1a1a] flex-shrink-0 mt-0.5" />
                <div>
                  <p 
                    className="text-[11px] tracking-[0.05em] uppercase font-semibold text-[#1a1a1a] mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    ЧАСЫ РАБОТЫ
                  </p>
                  <p 
                    className="text-sm text-[#666666]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Пн–Пт: 10:00–18:00 (МСК)
                  </p>
                  <p 
                    className="text-sm text-[#666666]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Выходные: по записи
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p 
                  className="text-[11px] tracking-[0.05em] uppercase font-semibold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  СОЦИАЛЬНЫЕ СЕТИ
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300"
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                  <a
                    href="mailto:bella@bellahasias.com"
                    aria-label="Email"
                    className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
