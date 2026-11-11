import { Send } from 'lucide-react';

const TelegramCTA = () => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-background">
      <div className="container-luxury">
        <div className="cta-aurora relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-16 md:py-20 text-center">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-display text-h2 text-white">Больше работ и жизни</h2>
            <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
              В Telegram-канале — свежие съёмки, образы, находки для гардероба и закулисье проектов.
            </p>
            <a
              href="https://t.me/bellahasias"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[hsl(345_30%_25%)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Send className="h-4 w-4" aria-hidden />
              Подписаться на @bellahasias
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramCTA;
