import { MessageCircle, Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+7 (999) 123-45-67',
      href: 'https://wa.me/1234567890',
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

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-cream/60 text-sm tracking-[0.3em] uppercase mb-6">
              Контакты
            </p>
            <h2 className="font-serif text-cream text-3xl md:text-4xl mb-6">
              Давайте создавать вместе
            </h2>
            <p className="font-sans text-cream/60 max-w-md mx-auto leading-relaxed">
              Готова обсудить ваш проект и помочь воплотить ваши идеи в жизнь
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 border border-cream/10 hover:border-cream/30 bg-cream/5 hover:bg-cream/10 transition-all duration-300 text-center"
              >
                <method.icon
                  className="w-8 h-8 text-cream/60 group-hover:text-magnolia mx-auto mb-6 transition-colors duration-300"
                  strokeWidth={1}
                />
                <p className="font-sans text-sm text-cream/60 tracking-widest uppercase mb-2">
                  {method.label}
                </p>
                <p className="font-serif text-cream text-lg">{method.value}</p>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-16 text-cream/40">
            <MapPin size={16} />
            <span className="font-sans text-sm">Москва, Россия</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
