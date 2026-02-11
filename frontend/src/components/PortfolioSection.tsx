import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { casesApi } from '@/lib/api/cases.api';
import { toast } from '@/components/ui/use-toast';
import type { CaseItem } from '@/admin/types/case';

const FEATURED_COUNT = 6; // Number of featured cases to show

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Get featured cases: first N by sort_order (if available) or updated_at
const getFeaturedCases = (cases: CaseItem[]): CaseItem[] => {
  return [...cases]
    .sort((a, b) => {
      // First sort by sortOrder if available
      const aOrder = (a as any).sortOrder ?? 0;
      const bOrder = (b as any).sortOrder ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      // Then by updated_at (newest first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, FEATURED_COUNT);
};

const PortfolioSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await casesApi.list({ 
          status: 'published',
          per_page: 50 
        });
        // Filter published cases (API should already filter, but double-check)
        const published = response.data.filter((c: CaseItem) => c.status === 'published' || !c.status);
        setCases(published);
      } catch (err: any) {
        console.error("Failed to load cases:", err);
        setError("Не удалось загрузить портфолио");
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить портфолио. Попробуйте обновить страницу.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  const featuredWorks = useMemo(() => {
    const featured = getFeaturedCases(cases);
    // Transform to display format with media
    return featured.map((caseItem) => {
      // Get first media item from API response
      const media = (caseItem as any).media || [];
      const firstMedia = media[0];
      const imageUrl = firstMedia?.url || firstMedia?.src || "";
      
      return {
        id: caseItem.id,
        src: imageUrl,
        title: caseItem.title,
        slug: caseItem.slug,
      };
    }).filter((work) => work.src); // Only show cases with images
  }, [cases]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % featuredWorks.length);
  }, [featuredWorks.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length);
  }, [featuredWorks.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Loading skeleton
  if (loading) {
    return (
      <section id="portfolio" className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-foreground">
              Портфолио
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-2xl md:rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="portfolio" className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-foreground mb-4">
              Портфолио
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredWorks.length === 0) {
    return (
      <section id="portfolio" className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-foreground">
              Портфолио
            </h2>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            Нет работ в портфолио
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-h2 text-foreground">
            Портфолио
          </h2>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {featuredWorks.map((work, index) => (
            <motion.button
              key={work.id}
              variants={itemVariants}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4] bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-center justify-center">
                <span className="font-display text-base md:text-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-4 text-center">
                  {work.title}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="btn-luxury inline-flex items-center"
          >
            Смотреть все работы
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && featuredWorks[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as any).startX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const startX = (e.currentTarget as any).startX;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) nextImage();
              else prevImage();
            }
          }}
        >
          {/* Close button - positioned lower to avoid header */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-20 right-4 z-10 text-white/80 hover:text-white transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-20 left-4 font-sans text-sm text-white/60 z-10">
            <span className="text-white font-medium">{String(lightboxIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(featuredWorks.length).padStart(2, '0')}</span>
          </div>

          {/* Navigation arrows - hidden on mobile, swipe instead */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Предыдущая"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Следующая"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image */}
          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[92vw] max-h-[75vh] overflow-hidden rounded-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={featuredWorks[lightboxIndex].src}
              alt={featuredWorks[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Swipe hint on mobile */}
          <div className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            ← Свайп для навигации →
          </div>

          {/* Image title */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="font-display text-base md:text-lg text-white/80">
              {featuredWorks[lightboxIndex].title}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PortfolioSection;
