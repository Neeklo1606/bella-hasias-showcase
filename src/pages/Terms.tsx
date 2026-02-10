import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Пользовательское соглашение — Bella Hasias</title>
        <meta name="description" content="Пользовательское соглашение сайта Bella Hasias. Условия использования услуг стилиста и контент-креатора." />
        <meta name="keywords" content="пользовательское соглашение, условия использования, Bella Hasias" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Пользовательское соглашение — Bella Hasias" />
        <meta property="og:description" content="Пользовательское соглашение сайта Bella Hasias. Условия использования услуг стилиста и контент-креатора." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://bellahasias.ru/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Пользовательское соглашение — Bella Hasias" />
        <meta name="twitter:description" content="Пользовательское соглашение сайта Bella Hasias. Условия использования услуг стилиста и контент-креатора." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://bellahasias.ru/terms" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Пользовательское соглашение' },
          ]}
        />

        <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 sm:px-6 md:px-8">
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
