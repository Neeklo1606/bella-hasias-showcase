import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Политика конфиденциальности | Bella Hasias</title>
        <meta name="description" content="Политика конфиденциальности и обработки персональных данных Bella Hasias" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-4xl mx-auto px-6 flex items-center gap-4">
            <Link
              to="/"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Link>
            <span className="font-display text-lg font-semibold text-foreground">
              Bella Hasias
            </span>
          </div>
        </div>

        {/* Content */}
        <section className="pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8">
              Политика конфиденциальности
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 font-sans text-muted-foreground">
                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">1. Общие положения</h2>
                  <p className="leading-relaxed">
                    Настоящая политика конфиденциальности устанавливает порядок получения, хранения, обработки, использования и защиты персональных данных пользователей сайта bellahasias.com (далее — «Сайт»).
                  </p>
                  <p className="leading-relaxed mt-4">
                    Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не согласны с этими условиями, пожалуйста, не используйте Сайт.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">2. Сбор информации</h2>
                  <p className="leading-relaxed">Мы можем собирать следующие персональные данные:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Имя и контактная информация (email, телефон)</li>
                    <li>Информация о запрашиваемых услугах</li>
                    <li>Техническая информация (IP-адрес, тип браузера, время посещения)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">3. Использование информации</h2>
                  <p className="leading-relaxed">Собранная информация используется для:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Обработки ваших запросов и заявок</li>
                    <li>Связи с вами по вопросам оказания услуг</li>
                    <li>Улучшения качества предоставляемых услуг</li>
                    <li>Соблюдения требований законодательства РФ</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">4. Защита данных</h2>
                  <p className="leading-relaxed">
                    Мы принимаем все необходимые организационные и технические меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl text-foreground mb-4">5. Передача данных третьим лицам</h2>
                  <p className="leading-relaxed">
                    Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
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
                    По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться в Telegram:{' '}
                    <a href="https://t.me/Bella_hasias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      @Bella_hasias
                    </a>
                  </p>
                </section>

                <section className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Privacy;