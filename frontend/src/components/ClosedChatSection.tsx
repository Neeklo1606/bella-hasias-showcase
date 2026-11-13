import { ArrowRight, Lock, Sparkles, Shirt, TrendingUp, Tag, Check } from 'lucide-react';

// Вход в закрытый канал — только через бота: он принимает оплату и сам присылает ссылку.
const BOT_URL = 'https://t.me/bellahasias_bot';

const INSIDE = [
  { icon: Shirt, title: 'Капсулы каждый месяц', text: 'Готовые сочетания под сезон' },
  { icon: TrendingUp, title: 'Разборы трендов', text: 'Что носить, а что пропустить' },
  { icon: Sparkles, title: 'Советы от меня', text: 'Отвечаю на вопросы в чате' },
  { icon: Tag, title: 'Находки и промокоды', text: 'Удачные вещи и скидки' },
];

const RULES = [
  'Вход через бота: оплата → ссылка в канал',
  'Доступ 30 дней с момента оплаты',
  'Без автосписаний: продлеваете сами',
];

const ClosedChatSection = () => (
  <section
    id="closed-chat"
    className="services-mesh relative overflow-hidden py-16 md:py-24 px-6 md:px-10 lg:px-16"
    aria-labelledby="closed-chat-heading"
  >
    <div className="container-luxury relative z-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur md:p-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Закрытый чат
          </span>
          <h2 id="closed-chat-heading" className="mt-4 font-display text-h2 text-foreground">
            Стиль без хаоса в гардеробе
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Мой закрытый Telegram-канал: образы, капсулы и тренды, которые легко повторить.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INSIDE.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 rounded-2xl border border-border/60 p-4">
              <span className="contact-icon shrink-0" aria-hidden>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-base font-semibold text-foreground">{title}</span>
                <span className="block text-sm text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <ul className="space-y-2">
            {RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" aria-hidden />
                {rule}
              </li>
            ))}
          </ul>
          <div className="text-center md:text-right">
            <p className="font-display text-3xl font-semibold text-foreground">
              990 ₽ <span className="text-base font-normal text-muted-foreground">первый месяц</span>
            </p>
            <p className="text-sm text-muted-foreground">далее 1 500 ₽ в месяц</p>
            <a
              href={BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient mt-4"
            >
              Вступить в чат
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ClosedChatSection;
