import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#services', label: 'УСЛУГИ' },
    { href: '#portfolio', label: 'ПОРТФОЛИО' },
    { href: '#contact', label: 'КОНТАКТЫ' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav
        className="sticky top-0 z-[1000] bg-white border-b border-[#e8e8e8] animate-fade-in"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-14 md:h-[60px]">
            {/* Logo */}
            <Link
              to="/"
              className="text-sm md:text-base font-semibold text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300 tracking-[0.5px]"
            >
              BELLA HASIAS
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-[13px] font-normal text-[#1a1a1a] tracking-[0.3px] uppercase transition-colors duration-300 hover:text-[#FF3333] group"
                >
                  {link.label}
                  {/* Underline effect */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FF3333] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300"
              aria-label="Переключить меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-[999] bg-white transition-all duration-400 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible translate-x-0' 
            : 'opacity-0 invisible translate-x-full'
        }`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-5 p-2 text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300"
          aria-label="Закрыть меню"
        >
          <X size={24} />
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col items-start justify-center min-h-screen px-10 py-16 gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-lg font-medium text-[#1a1a1a] hover:text-[#FF3333] transition-colors duration-300 uppercase tracking-[0.5px]"
            >
              {link.label}
            </a>
          ))}

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="mt-8 inline-block px-8 py-3 border-2 border-[#FF3333] text-[#FF3333] text-sm tracking-[0.1em] uppercase font-semibold hover:bg-[#FF3333] hover:text-white transition-all duration-300"
          >
            Связаться
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
