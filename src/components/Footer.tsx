import { Link } from 'react-router-dom';
import { Instagram, Send, Mail } from 'lucide-react';

// VK Icon component
const VKIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202-2.17-3.033-2.763-5.304-2.763-5.778 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.508 2.305 4.71 2.898 4.71.22 0 .322-.102.322-.66V9.72c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.745c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.575 2.15-3.575.119-.254.305-.491.729-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.187.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/bellahasias', label: 'Instagram', isComponent: true },
    { icon: Send, href: 'https://t.me/Bella_hasias', label: 'Telegram', isComponent: true },
    { icon: null, href: 'https://vk.com/bella_hasias', label: 'VK', isVK: true },
    { icon: Mail, href: 'mailto:bella@bellahasias.com', label: 'Email', isComponent: true },
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
                {link.isVK ? <VKIcon /> : link.icon && <link.icon size={18} />}
              </a>
            ))}
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link
              to="/privacy"
              className="font-sans text-sm text-background/50 hover:text-background/80 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <p className="font-sans text-sm text-background/50">
              © {currentYear} Bella Hasias
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
