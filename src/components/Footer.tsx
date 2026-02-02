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
    <footer className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-lg font-semibold text-background/90 hover:text-background transition-colors duration-300"
          >
            Bella Hasias
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
                className="w-11 h-11 rounded-2xl flex items-center justify-center bg-background/10 text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-sans text-sm text-background/50">
            © {currentYear} Bella Hasias
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
