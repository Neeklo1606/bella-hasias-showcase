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
    <footer className="py-10 md:py-14 px-6 md:px-10 lg:px-16 bg-[#1a1a1a] border-t-2 border-[#FF3333]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-sm tracking-[0.15em] uppercase text-white hover:text-[#FF3333] transition-colors duration-300 font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            BELLA HASIAS
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-[#FF3333] transition-colors duration-300"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p 
            className="text-xs text-white/50"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            © {currentYear} Bella Hasias. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
