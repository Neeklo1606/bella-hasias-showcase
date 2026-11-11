import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Видео 720×1280 без звука (~2 МБ) и постер — первый кадр ролика (предзагружается в app.blade.php)
const VIDEO_URL = '/build/videos/hero-video.mp4';
const POSTER_URL = '/build/videos/hero-poster.webp';

/** Видео подгружаем после загрузки страницы и только если пользователь не просил экономить трафик/анимации. */
const useDeferredVideo = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => {
        if (win.requestIdleCallback) win.requestIdleCallback(() => setEnabled(true), { timeout: 1500 });
        else setEnabled(true);
      }, 300);
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      window.removeEventListener('load', start);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return enabled;
};

const Hero = () => {
  const loadVideo = useDeferredVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoplay не всегда срабатывает, если src назначен после монтирования — запускаем явно
  useEffect(() => {
    if (loadVideo) videoRef.current?.play().catch(() => undefined);
  }, [loadVideo]);

  return (
    <section className="relative bg-background overflow-hidden lg:min-h-[90vh]">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Медиа: одно видео для всех экранов. Высота фиксирована заранее — без сдвигов. */}
          <div className="order-1 lg:order-2 relative h-[58svh] sm:h-[70svh] lg:h-[90vh] bg-secondary">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={POSTER_URL}
              src={loadVideo ? VIDEO_URL : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
            {/* Мобильные: затемнение и плавный переход в фон страницы */}
            <div className="absolute inset-0 bg-black/25 lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/90 lg:hidden" />
            {/* Десктоп: градиент для читаемости текста слева */}
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
          </div>

          {/* Текст: рендерится сразу, без анимации появления — это главный элемент первого экрана */}
          <div className="order-2 lg:order-1 py-12 lg:py-0 px-6 md:px-12 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-12 pt-12 sm:pt-14 lg:pt-20">
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Стилист · UGC · Контент
            </p>

            <h1 className="font-sans lg:font-display text-display text-foreground mb-8 mt-6 sm:mt-8">
              Bella
              <br />
              Hasias
            </h1>

            <p className="font-sans text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
              Услуги стилиста в Москве. Консультации по стилю, шоппинг сопровождение и разбору гардероба.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contacts" className="btn-luxury">
                Связаться
              </Link>
              <Link to="/portfolio" className="btn-ghost-luxury inline-flex items-center">
                Смотреть работы
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
