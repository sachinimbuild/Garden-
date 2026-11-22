import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {type GalleryPhoto} from '../data/gardenGallery';
import {PlantLogo} from './PlantLogo';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  activeIndex,
  onClose,
  onSelectIndex,
}) => {
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < photos.length;
  const currentPhoto = isOpen ? photos[activeIndex] : null;

  const handlePrev = useCallback(() => {
    if (!isOpen || photos.length === 0) return;
    onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, isOpen, onSelectIndex, photos.length]);

  const handleNext = useCallback(() => {
    if (!isOpen || photos.length === 0) return;
    onSelectIndex((activeIndex + 1) % photos.length);
  }, [activeIndex, isOpen, onSelectIndex, photos.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) {
    return null;
  }

  const hasFailed = Boolean(failedIds[currentPhoto.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 48) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentPhoto.title} — Fullscreen gallery viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 text-white backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top Bar: Counter, Category Metadata & High-Contrast Close Button */}
      <div
        className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 pt-safe border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0 flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
          <span className="font-mono-tabular font-semibold text-white whitespace-nowrap">
            {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
          <span className="truncate">{currentPhoto.categoryLabel}</span>
          <span className="hidden sm:inline text-white/30" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline truncate text-slate-400">
            {currentPhoto.botanicalNote}
          </span>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen photo viewer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Main Full-Screen Viewport */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-16 py-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photo"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        <div
          className="relative flex max-h-full max-w-5xl w-full items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {!hasFailed ? (
            <img
              key={currentPhoto.id}
              src={currentPhoto.src}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              onError={() =>
                setFailedIds((prev) => ({
                  ...prev,
                  [currentPhoto.id]: true,
                }))
              }
              className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl select-none"
            />
          ) : (
            <div className="flex h-[320px] sm:h-[420px] w-full max-w-2xl flex-col items-center justify-center rounded-2xl bg-slate-900 border border-white/10 p-6 text-center">
              <PlantLogo className="h-16 w-16" />
              <p className="mt-4 font-display text-lg font-semibold text-white">
                {currentPhoto.title}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {currentPhoto.botanicalNote}
              </p>
            </div>
          )}
        </div>

        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photo"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Thumbnail Strip */}
      <div
        className="border-t border-white/10 bg-slate-950/90 px-4 sm:px-6 py-3.5 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-5xl flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-base sm:text-lg font-semibold text-white truncate">
                {currentPhoto.title}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Mobile Prev/Next Controls in Thumb Zone */}
            {photos.length > 1 && (
              <div className="flex sm:hidden items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white active:bg-white/20 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white active:bg-white/20 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {photos.length > 1 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1"
              aria-label="Gallery thumbnails"
            >
              {photos.map((photo, index) => {
                const isSelected = index === activeIndex;
                const thumbFailed = Boolean(failedIds[photo.id]);
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => onSelectIndex(index)}
                    aria-label={`View ${photo.title}`}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400 ${
                      isSelected
                        ? 'ring-2 ring-sky-400 opacity-100 scale-[1.02]'
                        : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    {!thumbFailed ? (
                      <img
                        src={photo.src}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedIds((prev) => ({
                            ...prev,
                            [photo.id]: true,
                          }))
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <PlantLogo className="h-5 w-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
