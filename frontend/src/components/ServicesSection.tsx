import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { bootServices } from '@/lib/boot';
import { servicesApi } from '@/lib/api/services.api';
import ServiceCards, { publishedOnly } from '@/components/ServiceCards';

const ServicesSection = () => {
  const { data } = useQuery({
    queryKey: ['services', 'public', { status: 'published', per_page: 50 }],
    queryFn: () => servicesApi.list({ status: 'published', per_page: 50 }),
    initialData: bootServices,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const services = useMemo(() => publishedOnly(data?.data), [data]);

  return (
    <section id="services" className="services-mesh relative overflow-hidden py-16 md:py-24 px-6 md:px-10 lg:px-16" aria-labelledby="services-heading">
      <div className="container-luxury relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <h2 id="services-heading" className="font-display text-h2 text-foreground">
            Услуги
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Стилист и контент-креатор в Москве и онлайн: от разбора гардероба до съёмки для бренда.
          </p>
        </div>

        <ServiceCards services={services} />

        <div className="text-center mt-12">
          <Link to="/services" className="btn-gradient">
            Все услуги и подробности
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
