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
      <section id="portfolio" className="py-20 md:py-28 bg-card">
        {/* Top divider */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="h-px bg-primary/30 mb-16 md:mb-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="font-sans text-primary text-sm tracking-[0.3em] uppercase mb-4">
              Портфолио
            </p>
            <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl">
              Мои работы
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-14">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 font-sans text-sm tracking-wider uppercase transition-all duration-300 border ${
                  activeFilter === filter.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedImage(project.id)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay - Desktop */}
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <Eye className="w-8 h-8 text-background mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                  <p className="font-serif text-background text-lg md:text-xl text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="h-px bg-primary/30 mt-16 md:mt-20" />
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
