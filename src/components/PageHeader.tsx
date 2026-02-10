import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type PageBreadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  breadcrumbs: PageBreadcrumb[];
};

const PageHeader = ({ breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 pt-0 md:pt-24 overflow-hidden transition-all duration-300 max-h-0 opacity-0 md:max-h-12 md:opacity-100 pb-0 md:pb-3">
      <div className="pt-2">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageHeader;
