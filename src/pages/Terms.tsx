import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Пользовательское соглашение — Bella Hasias</title>
        <meta name="description" content="Пользовательское соглашение сайта Bella Hasias. Условия использования услуг стилиста и контент-креатора." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-sans text-sm">Назад</span>
            </Link>
            <Link
              to="/"
              className="font-display text-xl font-semibold text-foreground"
            >
              Bella Hasias
            </Link>
            <div className="w-20" />
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-h1 text-foreground mb-8">
              Пользовательское соглашение
            </h1>

            <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-6">
              <p>
                Используя сайт bellahasias.ru, вы соглашаетесь с условиями предоставления услуг. 
                Вся информация на сайте предоставляется в ознакомительных целях и не является публичной офертой.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">1. Общие положения</h2>
              <p>
                Настоящее Пользовательское соглашение регулирует отношения между владельцем сайта 
                и пользователями в рамках использования сайта и предоставляемых услуг.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">2. Услуги</h2>
              <p>
                Сайт предоставляет информацию об услугах стилиста и контент-креатора. Конкретные 
                условия оказания услуг согласовываются индивидуально с каждым клиентом.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">3. Авторские права</h2>
              <p>
                Все материалы, размещённые на сайте (тексты, изображения, логотипы), являются 
                интеллектуальной собственностью и защищены законодательством об авторском праве.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">4. Ограничение ответственности</h2>
              <p>
                Владелец сайта не несёт ответственности за возможные убытки, возникшие в результате 
                использования или невозможности использования материалов сайта.
              </p>

              <p className="text-sm text-muted-foreground/60 mt-12 pt-6 border-t border-border">
                Дата последнего обновления: 7 февраля 2026 г.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Terms;
