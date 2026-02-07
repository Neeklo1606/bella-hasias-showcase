import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { ComesInGoesOutUnderline } from '@/components/ui/underline-animation';

// Telegram Icon component
const TelegramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { label: 'Услуги', href: '/services' },
    { label: 'Портфолио', href: '/portfolio' },
    { label: 'Контакты', href: '/contacts' },
  ];

  const legalLinks = [
    { label: 'Политика', href: '/privacy' },
    { label: 'Соглашение', href: '/terms' },
    { label: 'Согласие', href: '/consent' },
  ];

  return (
    <footer className="py-10 md:py-14 px-6 md:px-10 lg:px-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="font-display text-lg font-semibold text-foreground transition-colors duration-300 hover:text-primary"
            >
              Bella Hasias
            </Link>
            <p className="font-sans text-sm mt-1.5 text-muted-foreground">
              © {currentYear}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors min-h-[44px] flex items-center"
              >
                <ComesInGoesOutUnderline 
                  label={link.label}
                  direction="left"
                  underlineHeightRatio={0.08}
                />
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/bellahasias/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://t.me/bellahasias"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram-канал"
                className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-all duration-300"
              >
                <TelegramIcon size={18} />
              </a>
            </div>
            <p className="font-sans text-[10px] text-muted-foreground/60 text-center md:text-right">
              * Meta запрещена на территории РФ
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-foreground/5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-muted-foreground/50">
            Сайт создан веб студией{' '}
            <a 
              href="https://neeklo.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              neeklo.ru
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
