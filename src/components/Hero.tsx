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
    },
    {
      icon: Send,
      label: 'Telegram',
      href: 'https://t.me/bellahasias',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:hello@bellahasias.com',
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
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/40 to-deep-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <p className="font-sans text-cream/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            Стилист & Контент-Креатор
          </p>
        </div>

        <h1 className="font-serif text-cream text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          BELLA HASIAS
        </h1>

        <p className="font-sans text-cream/60 text-sm md:text-base mt-8 max-w-md text-center leading-relaxed tracking-wide animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          Создаю уникальный визуальный стиль для брендов и личностей
        </p>

        {/* Contact Button */}
        <div className="mt-14 animate-fade-in relative" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <button
            onClick={() => setShowContactOptions(!showContactOptions)}
            className="btn-primary rounded-full px-12 py-4 text-sm tracking-[0.2em] uppercase font-medium"
          >
            Связаться
          </button>

          {/* Contact Options Dropdown */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-5 flex flex-col gap-2 transition-all duration-300 ${
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
                className="flex items-center gap-3 px-6 py-3 bg-cream/10 backdrop-blur-md rounded-full text-cream font-sans text-sm tracking-wider transition-all duration-300 hover:bg-cream/20 border border-cream/20"
              >
                <option.icon size={16} />
                <span>{option.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
        <div className="w-px h-20 bg-gradient-to-b from-cream/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
