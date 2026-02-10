import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";

export type PortfolioWork = {
  id: string;
  src: string;
  alt: string;
  caseId: string;
  tags: string[];
};

export const buildPortfolioWorks = (
  cases: CaseItem[],
  mediaItems: MediaItem[]
): PortfolioWork[] => {
  const mediaMap = new Map(mediaItems.map((m) => [m.id, m]));
  const orderedCases = [...cases].sort((a, b) => {
    const ao = a.order ?? 0;
    const bo = b.order ?? 0;
    if (ao !== bo) return ao - bo;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return orderedCases
    .flatMap((caseItem) =>
      (caseItem.mediaIds || [])
        .map((mediaId, idx) => {
          const media = mediaMap.get(mediaId);
          if (!media) return null;
          return {
            id: `${caseItem.id}-${mediaId}-${idx}`,
            src: media.src,
            alt: media.alt || caseItem.title,
            caseId: caseItem.id,
            tags: caseItem.tags || [],
          };
        })
        .filter(Boolean)
    )
    .filter(Boolean) as PortfolioWork[];
};
