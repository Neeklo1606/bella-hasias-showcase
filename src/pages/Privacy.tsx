import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Политика конфиденциальности — Bella Hasias</title>
        <meta name="description" content="Политика конфиденциальности и обработки персональных данных Bella Hasias" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://bellahasias.com/privacy" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
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

        {/* Content */}
        <section className="pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display text-h1 text-foreground mb-8">
              Политика конфиденциальности
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 font-sans text-muted-foreground">
                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">1. Общие положения</h2>
                  <p className="leading-relaxed">
                    Мы соблюдаем конфиденциальность данных пользователей и не передаём информацию третьим лицам. 
                    Используя сайт, вы соглашаетесь с условиями данной политики.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">2. Сбор информации</h2>
                  <p className="leading-relaxed">Мы собираем следующие данные:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Имя и контактная информация (Telegram)</li>
                    <li>Информация о запрашиваемых услугах</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">3. Использование информации</h2>
                  <p className="leading-relaxed">
                    Собранная информация используется исключительно для связи с вами по вопросам 
                    предоставления услуг стилиста и контент-креатора.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">4. Защита данных</h2>
                  <p className="leading-relaxed">
                    Мы принимаем необходимые меры для защиты ваших персональных данных от 
                    несанкционированного доступа, изменения или уничтожения.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">5. Передача данных третьим лицам</h2>
                  <p className="leading-relaxed">
                    Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, 
                    предусмотренных законодательством Российской Федерации.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">6. Права пользователей</h2>
                  <p className="leading-relaxed">В соответствии с ФЗ-152 «О персональных данных» вы имеете право:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Получить информацию о хранящихся персональных данных</li>
                    <li>Требовать уточнения, блокирования или уничтожения данных</li>
                    <li>Отозвать согласие на обработку персональных данных</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">7. Контактная информация</h2>
                  <p className="leading-relaxed">
                    По всем вопросам свяжитесь в Telegram:{' '}
                    <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      @Bella_hasias
                    </a>
                  </p>
                </section>

                <section className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground/60">
                    Дата последнего обновления: 7 февраля 2026 г.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Privacy;
