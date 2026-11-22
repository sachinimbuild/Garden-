import {useState} from 'react';
import {
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react';
import {ActionCard} from './components/ActionCard';
import {ActionIcon} from './components/ActionIcon';
import {GalleryLightbox} from './components/GalleryLightbox';
import {GallerySection} from './components/GallerySection';
import {OfflineIndicator} from './components/OfflineIndicator';
import {OpeningHoursSection} from './components/OpeningHoursSection';
import {PlantLogo} from './components/PlantLogo';
import {type NavTab, TopNavBar} from './components/TopNavBar';
import {GARDEN_GALLERY_PHOTOS, type GalleryPhoto} from './data/gardenGallery';
import {
  GARDEN_ACTIONS,
  GARDEN_INFO,
  getResolvedActionHref,
} from './data/gardenLinks';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<GalleryPhoto[]>(GARDEN_GALLERY_PHOTOS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const locationAction = GARDEN_ACTIONS.find((a) => a.id === 'location')!;
  const callAction = GARDEN_ACTIONS.find((a) => a.id === 'call')!;
  const directActions = GARDEN_ACTIONS.filter((a) => a.category !== 'social');
  const socialActions = GARDEN_ACTIONS.filter((a) => a.category === 'social');

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleOpenPhoto = (photo: GalleryPhoto, visiblePhotos: GalleryPhoto[]) => {
    const photosForLightbox = activeTab === 'home' ? GARDEN_GALLERY_PHOTOS : visiblePhotos;
    const index = photosForLightbox.findIndex((p) => p.id === photo.id);
    setLightboxPhotos(photosForLightbox);
    setLightboxIndex(index >= 0 ? index : 0);
  };

  const handleShare = async () => {
    const shareData = {
      title: GARDEN_INFO.name,
      text: `${GARDEN_INFO.name} (${GARDEN_INFO.locationLabel}) — Directions, Contact & Hours`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share unavailable; fall back to copy
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setSharedFeedback(true);
      setTimeout(() => setSharedFeedback(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F4FD] text-[#0F2438] flex flex-col">
      <TopNavBar activeTab={activeTab} onSelectTab={handleTabChange} />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-5 pb-12">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Section: Balanced 2-Column Split on Desktop, Stacked Card on Mobile */}
            <section
              aria-label="Medicinal garden overview"
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
            >
              <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 border border-sky-100/90 shadow-xs">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-sky-800">
                    Ganewaththa
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    Botanical &amp; Medicinal Sanctuary
                  </p>

                  <h1 className="mt-2.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                    Medicinal garden
                  </h1>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    Open instant directions in Google Maps, call our garden office directly, or
                    send an inquiry through Gmail. Use the tabs above to view full opening hours
                    and social media channels.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={getResolvedActionHref(locationAction)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>Open Google Maps</span>
                  </a>

                  <a
                    href={callAction.href}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-sky-50 hover:border-sky-200 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    <Phone className="h-4 w-4 text-sky-700" aria-hidden="true" />
                    <span className="font-mono-tabular">0372264490</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                    aria-label="Share Medicinal garden app"
                  >
                    {sharedFeedback ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                        <span className="text-emerald-700">Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-sky-100/90 bg-white shadow-xs min-h-[200px] sm:min-h-[240px]">
                {!heroImgFailed ? (
                  <img
                    src="/assets/aistudio/IMG_5057_8cf1d4cc.JPG"
                    alt="Medicinal garden Ganewaththa flowering botanical specimen"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="h-full w-full object-cover aspect-16/10 lg:aspect-auto"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-50 to-sky-50 p-6 text-center">
                    <PlantLogo className="h-16 w-16" />
                    <p className="mt-3 font-display text-base font-semibold text-slate-800">
                      Medicinal garden Ganewaththa
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Location & Direct Contact */}
            <section aria-labelledby="direct-contact-heading" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2
                    id="direct-contact-heading"
                    className="font-display text-xl font-semibold text-slate-900"
                  >
                    Location &amp; Direct Contact
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Opens directly in Google Maps, Phone, or Gmail
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabChange('hours')}
                  className="inline-flex self-start sm:self-center min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-sky-700 border border-sky-100 hover:bg-sky-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Check Opening Hours</span>
                </button>
              </div>

              {/* Mobile: Crisp Native Android Tap Rows */}
              <div className="sm:hidden rounded-2xl bg-white border border-sky-100/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {directActions.map((item) => (
                  <ActionCard key={item.id} item={item} variant="row" />
                ))}
              </div>

              {/* Tablet & Desktop: 3-Column Direct Cards */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-4">
                {directActions.map((item) => (
                  <ActionCard key={item.id} item={item} variant="card" />
                ))}
              </div>
            </section>

            {/* Gallery Preview Grid */}
            <GallerySection
              photos={GARDEN_GALLERY_PHOTOS}
              variant="preview"
              onOpenPhoto={handleOpenPhoto}
              onViewAll={() => handleTabChange('gallery')}
            />

            {/* Quick Gmail Inquiry Templates */}
            <section
              aria-labelledby="gmail-templates-heading"
              className="rounded-2xl bg-white p-5 sm:p-6 border border-sky-100/90 shadow-xs"
            >
              <h2
                id="gmail-templates-heading"
                className="font-display text-base font-semibold text-slate-900"
              >
                Quick Gmail Templates
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Compose an email to dnbgmpg@gmail.com in Gmail with a ready subject line
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {[
                  'Garden Visit Inquiry',
                  'Medicinal Plant Information',
                  'Educational Tour Request',
                ].map((subject) => (
                  <a
                    key={subject}
                    href={`mailto:${GARDEN_INFO.email}?subject=${encodeURIComponent(subject)}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-sky-50/50 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 hover:bg-sky-100/70 transition-colors whitespace-nowrap"
                  >
                    <Mail className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
                    <span>{subject}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            photos={GARDEN_GALLERY_PHOTOS}
            variant="full"
            onOpenPhoto={handleOpenPhoto}
          />
        )}

        {activeTab === 'hours' && (
          <div className="space-y-5">
            <OpeningHoursSection />
          </div>
        )}

        {activeTab === 'social' && (
          <section aria-labelledby="social-heading" className="space-y-5">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-sky-100/90 shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Official Channels · Facebook, YouTube &amp; TikTok
              </p>
              <h1
                id="social-heading"
                className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance"
              >
                Social Media Channels
              </h1>
              <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
                Tap any platform below to open Medicinal garden directly in its Android app or
                Google Chrome browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socialActions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white p-6 border border-sky-100/90 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accentBg} ${item.accentText}`}
                    >
                      <ActionIcon id={item.id} className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {item.displayValue}
                      <span aria-hidden="true"> · </span>
                      {item.targetAppLabel}
                    </p>
                  </div>

                  <a
                    href={getResolvedActionHref(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
                  >
                    <span>Open {item.title}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-sky-200/60 bg-white/75 py-5">
        <div className="mx-auto flex flex-col sm:flex-row max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 text-xs text-slate-500">
          <span>Medicinal garden Ganewaththa</span>
          <span className="font-mono-tabular">0372264490 · dnbgmpg@gmail.com</span>
        </div>
      </footer>

      <GalleryLightbox
        photos={lightboxPhotos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />

      <OfflineIndicator />
    </div>
  );
}
