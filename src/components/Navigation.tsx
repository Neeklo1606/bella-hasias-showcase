import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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

  const services = [
    { href: '/services/stylist', label: 'Стилист' },
    { href: '/services/ugc', label: 'UGC / Контент-креатор' },
    { href: '/services/photographer', label: 'Фотография' },
  ];

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
            ? 'bg-cream/98 backdrop-blur-sm border-b border-border-light'
            : 'bg-cream'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-[56px] md:h-[60px]">
            {/* Logo */}
            <Link
              to="/"
              className="font-serif text-sm md:text-lg tracking-[0.02em] text-deep-black hover:text-gold transition-colors duration-300"
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
                  className="font-sans text-[13px] font-normal text-graphite hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-deep-black"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-cream transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-serif text-2xl text-deep-black hover:text-gold transition-colors duration-300"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div className="w-12 h-px bg-border-light my-10" />

          {/* Services */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-graphite/50 mb-2">
              Услуги
            </p>
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-base text-graphite hover:text-gold transition-colors duration-300"
              >
                {service.label}
              </Link>
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
              className="inline-block px-8 py-3 bg-deep-black text-cream font-sans text-xs tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
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
