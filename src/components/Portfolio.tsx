import { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Import all portfolio images
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';
import work4 from '@/assets/portfolio/work-4.jpg';
import work5 from '@/assets/portfolio/work-5.jpg';
import work6 from '@/assets/portfolio/work-6.jpg';
import work7 from '@/assets/portfolio/work-7.jpg';
import work8 from '@/assets/portfolio/work-8.jpg';
import work9 from '@/assets/portfolio/work-9.jpg';
import work10 from '@/assets/portfolio/work-10.jpg';
import work11 from '@/assets/portfolio/work-11.jpg';
import work12 from '@/assets/portfolio/work-12.jpg';

type Category = 'all' | 'styling' | 'photo' | 'ugc';

interface PortfolioItem {
  id: number;
  title: string;
  category: Category;
  image: string;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const projects: PortfolioItem[] = [
    { id: 1, title: 'Деловой образ', category: 'styling', image: work1 },
    { id: 2, title: 'Съёмка контента', category: 'ugc', image: work2 },
    { id: 3, title: 'Editorial Look', category: 'photo', image: work3 },
    { id: 4, title: 'Консультация по стилю', category: 'styling', image: work4 },
    { id: 5, title: 'TikTok контент', category: 'ugc', image: work5 },
    { id: 6, title: 'Fashion портрет', category: 'photo', image: work6 },
    { id: 7, title: 'Beauty съёмка', category: 'ugc', image: work7 },
    { id: 8, title: 'Студийная съёмка', category: 'photo', image: work8 },
    { id: 9, title: 'Капсульный гардероб', category: 'styling', image: work9 },
    { id: 10, title: 'Unboxing видео', category: 'ugc', image: work10 },
    { id: 11, title: 'Lifestyle портрет', category: 'photo', image: work11 },
    { id: 12, title: 'Коммерческая съёмка', category: 'photo', image: work12 },
  ];

  const filters: { key: Category; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'styling', label: 'Стилизация' },
    { key: 'photo', label: 'Съёмка' },
    { key: 'ugc', label: 'UGC' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    setSelectedImage(filteredProjects[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedImage);
    const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredProjects[nextIndex].id);
  };

  const selectedProject = projects.find(p => p.id === selectedImage);

  return (
    <>
      <section id="portfolio" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-5">
              Портфолио
            </p>
            <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl tracking-[0.05em]">
              Мои работы
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2.5 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-full ${
                  activeFilter === filter.key
                    ? 'bg-gold text-deep-black'
                    : 'bg-transparent text-foreground border border-border hover:border-gold hover:text-gold'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedImage(project.id)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-xl"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-6">
                  <Eye className="w-6 h-6 text-cream mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                  <p className="font-serif text-cream text-base md:text-lg text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 tracking-wide">
                    {project.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl lg:max-w-5xl p-0 bg-foreground/95 border-none">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-background/70 hover:text-background transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation - Previous */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-background/70 hover:text-background transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Navigation - Next */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-background/70 hover:text-background transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            {selectedProject && (
              <div className="flex flex-col">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="p-4 md:p-6 text-center">
                  <p className="font-serif text-background text-xl md:text-2xl">
                    {selectedProject.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Portfolio;
