import { Link } from 'react-router-dom';
import { Instagram, Send, Mail } from 'lucide-react';

// Telegram Icon component
const TelegramIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Услуги', href: '/services' },
    { label: 'Портфолио', href: '/portfolio' },
    { label: 'Контакты', href: '/contacts' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/bellahasias', label: 'Instagram' },
    { icon: null, href: 'https://t.me/bellahasias', label: 'Telegram Channel', isTelegram: true },
    { icon: Send, href: 'https://t.me/Bella_hasias', label: 'Telegram DM' },
    { icon: Mail, href: 'mailto:bella@bellahasias.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="font-display text-lg font-semibold text-background/90 hover:text-background transition-colors duration-300"
            >
              Bella Hasias
            </Link>
            <p className="font-sans text-sm text-background/50 mt-2">
              Стилист · UGC · Фотограф
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-sm text-background/60 hover:text-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/privacy"
              className="font-sans text-sm text-background/60 hover:text-background transition-colors"
            >
              Политика
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-background/10 text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {link.isTelegram ? <TelegramIcon /> : link.icon && <link.icon size={18} />}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/40">
            © {currentYear} Bella Hasias. Все права защищены.
          </p>
          <a
            href="https://t.me/bellahasias"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-background/40 hover:text-primary transition-colors flex items-center gap-1"
          >
            <Send size={12} />
            @bellahasias
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
