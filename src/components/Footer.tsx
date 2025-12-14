import { Link } from 'react-router-dom';
import { Instagram, Send, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/bellahasias', label: 'Instagram' },
    { icon: Send, href: 'https://t.me/bellahasias', label: 'Telegram' },
    { icon: Mail, href: 'mailto:hello@bellahasias.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 md:py-16 px-5 md:px-8 bg-cream border-t border-border-light">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-lg tracking-[0.02em] text-deep-black hover:text-gold transition-colors duration-300"
          >
            BELLA HASIAS
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-graphite/50 hover:text-gold transition-colors duration-300"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-graphite/40">
            © {currentYear} Bella Hasias. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
