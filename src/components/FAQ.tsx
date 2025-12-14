import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'Какова стоимость стилизации?',
      answer: 'Стоимость персональной стилизации начинается от 5000 ₽ за сессию. Точная цена зависит от объёма работы: разбор гардероба, подбор образов для мероприятия или создание полноценной капсулы. После консультации я составлю индивидуальное предложение.',
    },
    {
      question: 'Как долго длится съёмка?',
      answer: 'Продолжительность съёмки зависит от проекта. Стандартная фотосессия занимает 2-3 часа, UGC контент для одного продукта — около 1-2 часов. Для масштабных проектов время обсуждается индивидуально.',
    },
    {
      question: 'Можно ли заказать через WhatsApp?',
      answer: 'Да, конечно! WhatsApp — самый быстрый способ связи. Напишите мне, опишите ваш проект, и я отвечу в течение нескольких часов. Также доступны Telegram и email для более детального обсуждения.',
    },
    {
      question: 'Где вы проводите съёмки?',
      answer: 'Я работаю в Москве и области. Съёмки провожу в профессиональных студиях, на локациях или в вашем пространстве — в зависимости от концепции проекта. Для выездных съёмок в другие города обсуждаем условия отдельно.',
    },
    {
      question: 'Какой минимальный заказ?',
      answer: 'Минимальный заказ зависит от услуги. Для стилизации — одна консультация (от 5000 ₽), для UGC — один видеоролик (от 8000 ₽), для фотографии — одна съёмка (от 7000 ₽). Для постоянных клиентов действуют специальные условия.',
    },
    {
      question: 'Сколько времени занимает подготовка?',
      answer: 'Сроки зависят от сложности проекта. Обычно на подготовку уходит 3-5 дней: согласование концепции, подбор локации и материалов. Срочные проекты возможны при предварительном обсуждении.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        {/* Divider top */}
        <div className="h-px bg-primary/30 mb-16 md:mb-20" />

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-4">
              Вопросы
            </p>
            <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl">
              Часто задаваемые вопросы
            </h2>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-primary/20 py-2"
              >
                <AccordionTrigger className="font-serif text-foreground text-lg md:text-xl text-left hover:text-primary hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-muted-foreground text-base leading-relaxed pb-6 pt-0">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Divider bottom */}
        <div className="h-px bg-primary/30 mt-16 md:mt-20" />
      </div>
    </section>
  );
};

export default FAQ;
