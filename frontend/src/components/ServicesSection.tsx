import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { servicesApi } from '@/lib/api/services.api';
import { toast } from '@/components/ui/use-toast';
import type { Service } from '@/admin/types/service';

type ServiceCategory = "stylist" | "creator";

const categoryLabels: Record<ServiceCategory, string> = {
  stylist: "Стилист",
  creator: "Креатор",
};

// Map API category to UI category
const mapCategoryToUI = (category?: string): ServiceCategory => {
  if (!category) return "stylist";
  const lower = category.toLowerCase();
  if (lower === "stylist" || lower === "styling") return "stylist";
  if (lower === "creator" || lower === "ugc" || lower === "photo" || lower === "brand" || lower === "shoot") return "creator";
  return "stylist"; // default
};

// Map service to href based on slug or id
const getServiceHref = (service: Service): string => {
  // Try to match by title or use generic route
  const titleLower = service.title.toLowerCase();
  if (titleLower.includes("бренд") || titleLower.includes("стилизация")) return "/services/brand-styling";
  if (titleLower.includes("клиент") || titleLower.includes("съёмка")) return "/services/client-shoot";
  if (titleLower.includes("гардероб") || titleLower.includes("разбор")) return "/services/wardrobe-audit";
  if (titleLower.includes("шоппинг") || titleLower.includes("шопинг")) return "/services/personal-shopping";
  if (titleLower.includes("ugc")) return "/services/ugc";
  if (titleLower.includes("ai") || titleLower.includes("искусственный")) return "/services/ai-content";
  return "/services"; // fallback
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const ServicesSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("stylist");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesApi.list({ 
          status: 'published',
          per_page: 50 
        });
        // Filter published services (API should already filter, but double-check)
        const published = response.data.filter((s: Service) => s.status === 'published' || !s.status);
        setServices(published);
      } catch (err: any) {
        console.error("Failed to load services:", err);
        setError("Не удалось загрузить услуги");
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить услуги. Попробуйте обновить страницу.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const uiCategory = mapCategoryToUI(service.category);
        return uiCategory === activeCategory;
      })
      .slice(0, 6); // Limit to 6 services per category
  }, [services, activeCategory]);

  // Loading skeleton
  if (loading) {
    return (
      <section 
        id="services" 
        className="py-16 md:py-20 bg-secondary/30"
        aria-labelledby="services-heading"
      >
        <div className="container-luxury">
          <div className="text-center mb-10">
            <h2 
              id="services-heading"
              className="font-display text-h2 text-foreground"
            >
              Услуги
            </h2>
          </div>
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-md flex gap-2 sm:gap-3">
              <div className="h-10 w-full sm:w-auto min-w-[140px] bg-muted animate-pulse rounded-md" />
              <div className="h-10 w-full sm:w-auto min-w-[140px] bg-muted animate-pulse rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section 
        id="services" 
        className="py-16 md:py-20 bg-secondary/30"
        aria-labelledby="services-heading"
      >
        <div className="container-luxury">
          <div className="text-center">
            <h2 
              id="services-heading"
              className="font-display text-h2 text-foreground mb-4"
            >
              Услуги
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="services" 
      className="py-16 md:py-20 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 
            id="services-heading"
            className="font-display text-h2 text-foreground"
          >
            Услуги
          </h2>
        </motion.div>

        {/* Category switcher */}
        <div className="flex justify-center mb-10">
          <ToggleGroup
            type="single"
            value={activeCategory}
            onValueChange={(value) => {
              if (value) setActiveCategory(value as ServiceCategory);
            }}
            variant="outline"
            className="w-full max-w-md flex-col sm:flex-row sm:w-auto gap-2 sm:gap-3"
            aria-label="Категории услуг"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className="w-full sm:w-auto min-w-[140px]"
              >
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {filteredServices.map((service) => {
              // Get image URL from API response
              const imageUrl = (service as any).image?.url || (service as any).cover?.url || "";
              
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <InteractiveTravelCard
                    title={service.title}
                    imageUrl={imageUrl}
                    href={getServiceHref(service)}
                    onActionClick={() => navigate(getServiceHref(service))}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Нет услуг в категории "{categoryLabels[activeCategory]}"
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="btn-luxury inline-flex items-center"
          >
            Все услуги
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
