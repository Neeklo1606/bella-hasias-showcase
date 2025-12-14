import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { href: '/services/stylist', label: 'Услуги' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#contact', label: 'Контакты' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/bellahasias',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      label: 'TikTok',
      href: 'https://tiktok.com/@bellahasias',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/79991234567',
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left Column - Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-serif text-2xl md:text-3xl tracking-wider text-background">
              BELLA HASIAS
            </Link>
            <p className="font-sans text-background/60 text-sm mt-3 leading-relaxed">
              Стилист | Контент-креатор | Фотограф
            </p>
            <p className="font-sans text-background/40 text-sm mt-4 max-w-xs mx-auto md:mx-0">
              Создаю уникальный визуальный стиль для брендов и личностей
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="text-center">
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-background/50 mb-5">
              Навигация
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="font-sans text-background/70 hover:text-magnolia transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="font-sans text-background/70 hover:text-magnolia transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Social & Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-background/50 mb-5">
              Контакты
            </h3>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-9 md:h-9 border border-background/20 flex items-center justify-center text-background/60 hover:text-magnolia hover:border-magnolia transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <a
                href="mailto:bella@bellahasias.com"
                className="flex items-center justify-center md:justify-end gap-2 text-background/70 hover:text-magnolia transition-colors group"
              >
                <Mail className="w-4 h-4 text-background/40 group-hover:text-magnolia" />
                <span className="font-sans text-sm">bella@bellahasias.com</span>
              </a>
              <a
                href="tel:+79991234567"
                className="flex items-center justify-center md:justify-end gap-2 text-background/70 hover:text-magnolia transition-colors group"
              >
                <Phone className="w-4 h-4 text-background/40 group-hover:text-magnolia" />
                <span className="font-sans text-sm">+7 (999) 123-45-67</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-background/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bella Hasias. Все права защищены.
            </p>
            <p className="font-sans text-background/30 text-xs">
              Москва, Россия
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
