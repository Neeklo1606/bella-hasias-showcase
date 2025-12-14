import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#contact', label: 'Контакты' },
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-border-light'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-[56px] md:h-[60px]">
            {/* Logo */}
            <Link
              to="/"
              className="font-sans text-sm md:text-base tracking-[0.15em] uppercase text-deep-black hover:text-graphite transition-colors duration-300 font-medium"
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
                  className="font-sans text-[13px] tracking-[0.1em] uppercase font-normal text-deep-black hover:text-graphite transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-deep-black"
              aria-label="Переключить меню"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-mint transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-sans text-2xl tracking-[0.1em] uppercase text-deep-black hover:text-graphite transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="inline-block px-8 py-3 bg-lemon text-deep-black font-sans text-xs tracking-[0.15em] uppercase rounded-full hover:bg-lemon/80 transition-colors duration-300"
            >
              Связаться
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
