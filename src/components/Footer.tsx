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
    <footer className="py-12 md:py-16 px-6 md:px-10 lg:px-16" style={{ backgroundColor: '#FBF9F7' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="font-display text-lg font-semibold transition-colors duration-300"
              style={{ color: '#1F2121' }}
            >
              Bella Hasias
            </Link>
            <p className="font-sans text-sm mt-2" style={{ color: '#1F2121', opacity: 0.6 }}>
              © {currentYear} Bella Hasias
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-sm transition-colors min-h-[44px] flex items-center"
                style={{ color: '#1F2121', opacity: 0.7 }}
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
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href="https://www.instagram.com/bellahasias/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(31, 33, 33, 0.1)', color: '#1F2121' }}
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://t.me/bellahasias"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram-канал"
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(31, 33, 33, 0.1)', color: '#1F2121' }}
            >
              <TelegramIcon size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(31, 33, 33, 0.1)' }}>
          <p className="font-sans text-xs" style={{ color: '#1F2121', opacity: 0.4 }}>
            Сайт создан веб студией{' '}
            <a 
              href="https://neeklo.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity underline"
            >
              neeklo.ru
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-xs transition-colors min-h-[44px] flex items-center"
                style={{ color: '#1F2121', opacity: 0.5 }}
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
