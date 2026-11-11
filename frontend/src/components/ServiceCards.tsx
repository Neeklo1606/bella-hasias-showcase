import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { serviceImage } from '@/lib/localImages';
import type { Service } from '@/admin/types/service';

// Категория из админки → подпись на карточке
export const groupLabel = (category?: string): string => {
  const c = (category || '').toLowerCase();
  return ['creator', 'ugc', 'photo', 'brand', 'shoot'].includes(c) ? 'Съёмка и контент' : 'Стиль и гардероб';
};

// Первое предложение описания — коротко и по делу (полный текст на странице услуги)
export const shortText = (text?: string): string => {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  const first = clean.match(/^.+?[.!?](\s|$)/)?.[0]?.trim() ?? clean;
  return first.length > 150 ? first.slice(0, 147).replace(/\s\S*$/, '') + '…' : first;
};

export const publishedOnly = (list?: Service[]) =>
  (list ?? []).filter((s) => (s as any).status === 'published' || !(s as any).status);

const ServiceCards = ({ services }: { services: Service[] }) => (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => {
            const href = `/services/${service.slug || service.id}`;
            const img = (service as any).image?.url || (service as any).cover?.url || serviceImage(service.slug);
            return (
              <li key={service.id} className="min-w-0">
                <Link to={href} className="service-card group" aria-label={`${service.title}: подробнее`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-muted">
                    {img && (
                      <img
                        src={img}
                        alt={service.title}
                        width={640}
                        height={480}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                      {groupLabel(service.category)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-4">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em] [word-spacing:0.12em] text-foreground flex items-start justify-between gap-3">
                      <span>{service.title}</span>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent-foreground/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{shortText(service.description)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

);

export default ServiceCards;
