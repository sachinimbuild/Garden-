import React, {useMemo, useState} from 'react';
import {Expand} from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryPhoto,
} from '../data/gardenGallery';
import {PlantLogo} from './PlantLogo';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onOpenPhoto: (photo: GalleryPhoto, visiblePhotos: GalleryPhoto[]) => void;
  variant?: 'full' | 'preview';
  onViewAll?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  onOpenPhoto,
  variant = 'full',
  onViewAll,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  const visiblePhotos = useMemo(() => {
    if (variant === 'preview') {
      return photos.slice(0, 4);
    }
    if (selectedCategory === 'all') {
      return photos;
    }
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [photos, selectedCategory, variant]);

  return (
    <section aria-labelledby="garden-gallery-heading" className="space-y-5">
      {variant === 'full' ? (
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-sky-100/90 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-sky-800">
                Ganewaththa · Visual Field Notes · {photos.length} Photographs
              </p>
              <h1
                id="garden-gallery-heading"
                className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
              >
                Medicinal Garden Gallery
              </h1>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                Explore the botanical walkways, nursery beds, and medicinal plant specimens across
                our sanctuary. Select any photograph to view it in full screen.
              </p>
            </div>

            {/* Interactive Category Filter Controls */}
            <div
              role="group"
              aria-label="Filter gallery photos by category"
              className="flex flex-wrap items-center gap-1 rounded-xl bg-sky-50/80 p-1 border border-sky-100 self-start lg:self-end"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={isActive}
                    className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2
              id="garden-gallery-heading"
              className="font-display text-xl font-semibold text-slate-900"
            >
              Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tap any garden photograph to inspect in full screen
            </p>
          </div>

          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex self-start sm:self-center min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-sky-700 border border-sky-100 hover:bg-sky-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>View All</span>
              <span className="font-mono-tabular text-sky-600">({photos.length})</span>
            </button>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {visiblePhotos.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 border border-sky-100/90 text-center">
          <p className="font-display text-base font-semibold text-slate-800">
            No photographs in this category yet
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="mt-3 inline-flex min-h-[40px] items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Show All Photos
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            variant === 'preview'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {visiblePhotos.map((photo) => {
            const hasFailed = Boolean(failedIds[photo.id]);
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => onOpenPhoto(photo, visiblePhotos)}
                aria-label={`View ${photo.title} in full screen`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-sky-100/90 shadow-xs text-left transition-all duration-150 hover:shadow-md hover:border-sky-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-sky-50">
                  {!hasFailed ? (
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedIds((prev) => ({
                          ...prev,
                          [photo.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-50 to-sky-50 p-4 text-center">
                      <PlantLogo className="h-12 w-12" />
                      <span className="mt-2 text-xs font-medium text-slate-700">
                        {photo.title}
                      </span>
                    </div>
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950/60 text-white backdrop-blur-xs opacity-90 sm:opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Expand className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900 line-clamp-1">
                      {photo.title}
                    </h3>
                    {variant === 'full' && (
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                  </div>

                  <p className="mt-2.5 text-xs text-slate-500 truncate">
                    <span className="font-medium text-emerald-800">{photo.categoryLabel}</span>
                    <span className="mx-1.5 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span>{photo.botanicalNote}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
