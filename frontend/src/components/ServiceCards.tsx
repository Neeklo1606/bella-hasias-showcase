import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/admin/types/service';

// Категория из админки → подпись на плашке
export const groupLabel = (category?: string): string => {
  const c = (category || '').toLowerCase();
  return ['creator', 'ugc', 'photo', 'brand', 'shoot'].includes(c) ? 'Съёмка и контент' : 'Стиль и гардероб';
};

// Первое предложение описания — коротко и по делу (полный текст на странице услуги)
export const shortText = (text?: string): string => {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  const first = clean.match(/^.+?[.!?](\s|$)/)?.[0]?.trim() ?? clean;
  return first.length > 140 ? first.slice(0, 137).replace(/\s\S*$/, '') + '…' : first;
};

export const publishedOnly = (list?: Service[]) =>
  (list ?? []).filter((s) => (s as { status?: string }).status === 'published' || !(s as { status?: string }).status);

/** Компактные плашки услуг без фото: градиентная рамка, мягкий перелив, адаптивная сетка. */
const ServiceCards = ({ services }: { services: Service[] }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    {services.map((service, i) => (
      <li key={service.id} className="min-w-0">
        <Link
          to={`/services/${service.slug || service.id}`}
          className="service-plaque group"
          style={{ animationDelay: `${(i % 6) * -2.2}s` }}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="service-plaque__tag">{groupLabel(service.category)}</span>
              <span className="mt-2 block font-display text-lg font-semibold leading-snug tracking-[-0.01em] [word-spacing:0.12em] text-foreground">
                {service.title}
              </span>
            </span>
            <span className="service-plaque__arrow" aria-hidden>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{shortText(service.description)}</span>
        </Link>
      </li>
    ))}
  </ul>
);

export default ServiceCards;
