import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Editorial Shoot',
      category: 'Fashion',
      image: portfolio1,
    },
    {
      id: 2,
      title: 'Brand Campaign',
      category: 'Commercial',
      image: portfolio2,
    },
    {
      id: 3,
      title: 'Personal Styling',
      category: 'Styling',
      image: portfolio3,
    },
    {
      id: 4,
      title: 'Content Creation',
      category: 'Social Media',
      image: portfolio4,
    },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-6">
            Портфолио
          </p>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl">
            Избранные работы
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                <p className="font-sans text-cream/70 text-sm tracking-widest uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="font-serif text-cream text-2xl">{project.title}</h3>
              </div>

              {/* Default label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/70 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <p className="font-sans text-cream/70 text-xs tracking-widest uppercase mb-1">
                  {project.category}
                </p>
                <h3 className="font-serif text-cream text-lg">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
