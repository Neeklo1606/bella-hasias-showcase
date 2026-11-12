import { Link } from 'react-router-dom';
import { ArrowRight, Send, Instagram } from 'lucide-react';

const CONTACTS = [
  { icon: Send, title: 'Telegram', value: '@Bella_hasias', href: 'https://t.me/Bella_hasias', external: true },
  { icon: Instagram, title: 'Instagram', value: '@bellahasias', href: 'https://www.instagram.com/bellahasias/', external: true },
];

const ContactSection = () => {
  return (
    <section id="contacts" className="section-luxury services-mesh relative overflow-hidden">
      <div className="container-luxury relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-h2 text-foreground">Контакты</h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Москва и онлайн. Напишите, какая услуга нужна и когда удобно, отвечу в течение дня.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto mb-12">
          {CONTACTS.map(({ icon: Icon, title, value, href, external }) => (
            <li key={title} className="min-w-0">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="service-card group flex-row items-center gap-4 p-5"
              >
                <span className="contact-icon" aria-hidden>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold [word-spacing:0.12em] text-foreground">{title}</span>
                  <span className="block truncate text-sm text-muted-foreground">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Link to="/contacts" className="btn-gradient">
            Оставить заявку
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
