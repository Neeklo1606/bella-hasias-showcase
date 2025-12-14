import { Palette, Camera, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Стилизация',
      description:
        'Создание уникального образа для фотосессий, мероприятий и повседневной жизни.',
    },
    {
      icon: Camera,
      title: 'Контент-креация',
      description:
        'Разработка визуального контента для социальных сетей и маркетинговых кампаний.',
    },
    {
      icon: Sparkles,
      title: 'Консультации',
      description:
        'Персональные консультации по стилю и разбор гардероба с рекомендациями.',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-6">
            Услуги
          </p>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl">
            Чем могу помочь
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 md:p-10 bg-background border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <service.icon
                className="w-10 h-10 text-primary mb-8 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1}
              />
              <h3 className="font-serif text-xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
