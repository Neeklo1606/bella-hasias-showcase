import { MessageCircle, Send, Mail } from 'lucide-react';
import { useState } from 'react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const [showContactOptions, setShowContactOptions] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      color: 'hover:text-green-400',
    },
    {
      icon: Send,
      label: 'Telegram',
      href: 'https://t.me/bellahasias',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:hello@bellahasias.com',
      color: 'hover:text-magnolia',
    },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        poster={heroImage}
      >
        <source
          src="https://player.vimeo.com/external/517089972.sd.mp4?s=7ea13b9b84a8ebaae0c12e90df41cf2a5efc4392&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>

      {/* Image Background - Mobile */}
      <div
        className="md:hidden absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center animate-fade-in-up" style={{ animationFillMode: 'both' }}>
          <p className="font-sans text-cream/80 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Стилист & Контент-Креатор
          </p>
        </div>

        <h1 className="font-serif text-cream text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Bella Hasias
        </h1>

        <p className="font-sans text-cream/70 text-base md:text-lg mt-6 max-w-md text-center leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          Создаю уникальный визуальный стиль для брендов и личностей
        </p>

        {/* Contact Button */}
        <div className="mt-12 animate-fade-in-up relative" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <button
            onClick={() => setShowContactOptions(!showContactOptions)}
            className="group relative px-10 py-4 border border-cream/40 bg-cream/5 backdrop-blur-sm text-cream font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-cream/10 hover:border-cream/60"
          >
            <span className="relative z-10">Связаться</span>
          </button>

          {/* Contact Options Dropdown */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col gap-3 transition-all duration-300 ${
              showContactOptions
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            {contactOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3 bg-charcoal/80 backdrop-blur-sm border border-cream/20 text-cream font-sans text-sm tracking-wider transition-all duration-300 hover:bg-charcoal ${option.color}`}
              >
                <option.icon size={18} />
                <span>{option.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <div className="w-px h-16 bg-gradient-to-b from-cream/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
