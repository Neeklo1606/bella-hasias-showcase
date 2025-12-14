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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
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
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#about', label: 'О мне' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-card/98 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-4' : 'py-5 md:py-6'}`}>
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif text-xl md:text-2xl font-medium tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-background'
              }`}
            >
              BELLA HASIAS
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className={`font-sans text-sm tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-background'
                  }`}
                >
                  Услуги
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-card border border-border shadow-lg py-2 min-w-[200px]">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-4 py-2.5 font-sans text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-background'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 z-50 ${
                isMobileMenuOpen ? 'text-foreground' : isScrolled ? 'text-foreground' : 'text-background'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className={`h-px bg-primary/20 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-card transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Services Section */}
          <div className="mb-8 text-center">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Услуги
            </p>
            <div className="flex flex-col gap-4">
              {services.map((service) => (
                <Link
                  key={service.href}
                  to={service.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-xl text-foreground hover:text-primary transition-colors"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-primary/30 my-6" />

          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Связаться со мной
            </p>
            <a
              href="https://wa.me/79991234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase hover:bg-foreground transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
