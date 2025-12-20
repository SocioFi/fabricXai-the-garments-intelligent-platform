import { ReactNode } from 'react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';

interface PageLayoutProps {
  breadcrumbs: { label: string; href?: string }[];
  aiInsightsCount?: number;
  children: ReactNode;
}

export function PageLayout({ breadcrumbs, aiInsightsCount = 0, children }: PageLayoutProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb & AI Insights */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator className="text-[#6F83A7]" />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="text-white">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className="text-[#6F83A7] hover:text-white">{crumb.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {aiInsightsCount > 0 && (
          <Badge className="bg-gradient-to-r from-[#EAB308]/20 to-[#57ACAF]/20 text-[#EAB308] border-[#EAB308]/30 gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {aiInsightsCount} insights ready
          </Badge>
        )}
      </div>

      {children}
    </div>
  );
}
