import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ServicePageLayout from '@/components/ServicePageLayout';
import { servicesApi } from '@/lib/api/services.api';
import { useResolvedMediaItems } from '@/hooks/use-resolved-media';
import type { MediaItem } from '@/admin/types/media';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', 'public', slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug не указан");
      return servicesApi.getBySlug(slug);
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Get cover image from API response
  // API returns cover object with url, or we can use image as fallback
  const coverImage = (service as any)?.cover?.url || (service as any)?.image?.url || '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
          <p className="text-muted-foreground">Попробуйте выбрать другую услугу</p>
        </div>
      </div>
    );
  }

  // Split description into intro and caseBlocks
  // First paragraph is intro, rest are caseBlocks
  const description = String(service.description || '');
  const title = String(service.title || 'Услуга');
  const descriptionParts = description.split('\n\n').filter(p => p.trim());
  const intro = descriptionParts[0] || description || 'Описание услуги';
  const caseBlocks = descriptionParts.slice(1);

  return (
    <ServicePageLayout
      title={title}
      metaTitle={title}
      metaDescription={description || 'Описание услуги'}
      metaKeywords={service.tags?.join(', ') || ''}
      ogImage={coverImage}
      heroImage={coverImage}
      heroImageAlt={title}
      intro={intro}
      caseBlocks={caseBlocks.length > 0 ? caseBlocks : (description ? [description] : ['Описание услуги'])}
    />
  );
};

export default ServicePage;
