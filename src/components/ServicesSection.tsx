import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { fetchServices, loadServices } from '@/admin/lib/servicesStorage';
import { fetchMedia, loadMedia } from '@/admin/lib/mediaStorage';
import { useResolvedMediaItems } from '@/hooks/use-resolved-media';
import type { Service } from '@/admin/types/service';
import type { MediaItem } from '@/admin/types/media';

type ServiceCategory = "stylist" | "creator";

const categoryLabels: Record<ServiceCategory, string> = {
  stylist: "Стилист",
  creator: "Креатор",
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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setServices(loadServices());
    setMediaItems(loadMedia());
    fetchServices().then(setServices).catch(() => undefined);
    fetchMedia().then(setMediaItems).catch(() => undefined);
  }, []);

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);
  const mediaMap = useMemo(
    () => new Map(resolvedMediaItems.map((m) => [m.id, m])),
    [resolvedMediaItems]
  );

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => (service.category ?? "stylist") === activeCategory)
      .sort((a, b) => {
        const ao = a.order ?? 0;
        const bo = b.order ?? 0;
        if (ao !== bo) return ao - bo;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })
      .map((service) => {
        const media =
          mediaMap.get(service.imageId) ||
          (service.coverId ? mediaMap.get(service.coverId) : undefined);
        return {
          id: service.id,
          title: service.title,
          image: media?.src ?? "/placeholder.svg",
          href: service.ctaLink || "/contacts",
        };
      })
      .slice(0, 3);
  }, [services, activeCategory, mediaMap]);

  return (
    <section
      id="services"
      className="py-12 md:py-16 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="container-luxury px-5 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-left mb-10"
        >
          <h2 
            id="services-heading"
            className="font-display text-h2 text-foreground"
          >
            Услуги
          </h2>
        </motion.div>

        {/* Category switcher */}
        <div className="flex justify-start mb-10">
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
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {filteredServices.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <InteractiveTravelCard
                title={service.title}
                imageUrl={service.image}
                href={service.href}
                onActionClick={() => navigate(service.href)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-left mt-10"
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
