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
    <footer className="py-12 md:py-16 px-5 md:px-8 bg-lavender/40 border-t border-border-light">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="font-sans text-base tracking-[0.15em] uppercase text-deep-black hover:text-graphite transition-colors duration-300 font-medium"
          >
            BELLA HASIAS
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 flex items-center justify-center bg-mint rounded-full text-deep-black hover:bg-lemon transition-colors duration-300"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-graphite">
            © {currentYear} Bella Hasias. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
