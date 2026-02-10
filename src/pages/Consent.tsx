import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const Consent = () => {
  return (
    <>
      <Helmet>
        <title>Согласие на обработку данных — Bella Hasias</title>
        <meta name="description" content="Согласие на обработку персональных данных в соответствии с ФЗ №152." />
        <meta name="keywords" content="согласие на обработку данных, персональные данные, Bella Hasias" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Согласие на обработку данных — Bella Hasias" />
        <meta property="og:description" content="Согласие на обработку персональных данных в соответствии с ФЗ №152." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://bellahasias.ru/consent" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Согласие на обработку данных — Bella Hasias" />
        <meta name="twitter:description" content="Согласие на обработку персональных данных в соответствии с ФЗ №152." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://bellahasias.ru/consent" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <PageHeader
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Согласие на обработку данных' },
          ]}
        />

        <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-h1 text-foreground mb-8">
              Согласие на обработку персональных данных
            </h1>

            <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-6">
              <p>
                Нажимая на кнопку «Оставить заявку», вы соглашаетесь на обработку персональных данных 
                в соответствии с Федеральным законом №152-ФЗ «О персональных данных».
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">Какие данные обрабатываются</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Имя (ник или псевдоним)</li>
                <li>Контактные данные в Telegram</li>
                <li>Содержание сообщения</li>
              </ul>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">Цель обработки</h2>
              <p>
                Персональные данные используются исключительно для связи с вами по вопросам 
                предоставления услуг стилиста и контент-креатора.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">Хранение данных</h2>
              <p>
                Данные хранятся в защищённом виде и не передаются третьим лицам без вашего согласия, 
                за исключением случаев, предусмотренных законодательством РФ.
              </p>

              <h2 className="font-display text-xl text-foreground mt-8 mb-4">Ваши права</h2>
              <p>
                Вы имеете право на доступ к своим персональным данным, их изменение или удаление. 
                Для этого свяжитесь через Telegram: @Bella_hasias
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

export default Consent;
