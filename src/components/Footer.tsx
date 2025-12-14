import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 bg-charcoal border-t border-cream/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-cream/80 text-lg tracking-wider">
            BELLA HASIAS
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/bellahasias"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-magnolia transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          <p className="font-sans text-cream/40 text-sm">
            © {new Date().getFullYear()} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
