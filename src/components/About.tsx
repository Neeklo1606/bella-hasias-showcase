import aboutPortrait from '@/assets/about-portrait.jpg';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-6">
                О себе
              </p>
              <h2 className="font-serif text-foreground text-3xl md:text-4xl leading-tight mb-8">
                Создаю визуальные истории, которые вдохновляют
              </h2>
              <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
                <p>
                  Более 7 лет опыта в fashion-индустрии. Работаю с брендами, блогерами 
                  и креативными проектами, создавая уникальный визуальный контент.
                </p>
                <p>
                  Моя философия — каждый образ должен рассказывать историю. 
                  Я помогаю моим клиентам найти свой уникальный стиль и выразить 
                  его через одежду и визуальный контент.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
                <div>
                  <p className="font-serif text-3xl text-primary">7+</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Лет опыта</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-primary">150+</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Проектов</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-primary">50+</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Брендов</p>
                </div>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="order-1 md:order-2">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={aboutPortrait} 
                  alt="Bella Hasias - Стилист и контент-креатор"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
