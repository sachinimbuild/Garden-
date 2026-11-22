export type ActionCategory = 'location' | 'contact' | 'social';

export interface GardenActionItem {
  id: 'location' | 'call' | 'email' | 'facebook' | 'youtube' | 'tiktok';
  category: ActionCategory;
  title: string;
  subtitle: string;
  displayValue: string;
  targetAppLabel: string;
  href: string;
  androidIntentHref?: string;
  isExternalWeb: boolean;
  copyableValue?: string;
  accentBg: string;
  accentText: string;
}

export const GARDEN_INFO = {
  name: 'Medicinal garden',
  locationLabel: 'Ganewaththa',
  phone: '0372264490',
  email: 'dnbgmpg@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/PpWU7RZsbbAFPENu9?g_st=ac',
  facebookUrl: 'https://www.facebook.com/MedicinalgardenGanewaththa/',
  youtubeUrl: 'https://m.youtube.com/@MedicinalGardeng',
  tiktokUrl: 'https://www.tiktok.com/@medicinalplantsgarden?_r=1&_t=ZS-9BQSbyM6YAn',
} as const;

export const GARDEN_ACTIONS: GardenActionItem[] = [
  {
    id: 'location',
    category: 'location',
    title: 'Location & Directions',
    subtitle: 'Navigate directly to Medicinal garden Ganewaththa',
    displayValue: 'Ganewaththa · Google Maps',
    targetAppLabel: 'Opens in Google Maps',
    href: GARDEN_INFO.mapsUrl,
    androidIntentHref:
      'intent://maps.app.goo.gl/PpWU7RZsbbAFPENu9?g_st=ac#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=https%3A%2F%2Fmaps.app.goo.gl%2FPpWU7RZsbbAFPENu9%3Fg_st%3Dac;end',
    isExternalWeb: true,
    copyableValue: GARDEN_INFO.mapsUrl,
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-700',
  },
  {
    id: 'call',
    category: 'contact',
    title: 'Call Garden Office',
    subtitle: 'Speak directly with Medicinal garden inquiries',
    displayValue: '0372264490',
    targetAppLabel: 'Opens in Phone app',
    href: `tel:${GARDEN_INFO.phone}`,
    isExternalWeb: false,
    copyableValue: GARDEN_INFO.phone,
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-700',
  },
  {
    id: 'email',
    category: 'contact',
    title: 'Email via Gmail',
    subtitle: 'Send inquiries, visit requests, or plant questions',
    displayValue: 'dnbgmpg@gmail.com',
    targetAppLabel: 'Opens in Gmail app',
    href: `mailto:${GARDEN_INFO.email}`,
    isExternalWeb: false,
    copyableValue: GARDEN_INFO.email,
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-700',
  },
  {
    id: 'facebook',
    category: 'social',
    title: 'Facebook',
    subtitle: 'Garden updates, events, and community posts',
    displayValue: 'MedicinalgardenGanewaththa',
    targetAppLabel: 'Opens in Facebook or Chrome',
    href: GARDEN_INFO.facebookUrl,
    isExternalWeb: true,
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
  },
  {
    id: 'youtube',
    category: 'social',
    title: 'YouTube',
    subtitle: 'Plant care guides and medicinal garden tours',
    displayValue: '@MedicinalGardeng',
    targetAppLabel: 'Opens in YouTube or Chrome',
    href: GARDEN_INFO.youtubeUrl,
    isExternalWeb: true,
    accentBg: 'bg-red-50',
    accentText: 'text-red-700',
  },
  {
    id: 'tiktok',
    category: 'social',
    title: 'TikTok',
    subtitle: 'Short botanical clips and herbal spotlights',
    displayValue: '@medicinalplantsgarden',
    targetAppLabel: 'Opens in TikTok app',
    href: GARDEN_INFO.tiktokUrl,
    isExternalWeb: true,
    accentBg: 'bg-slate-100',
    accentText: 'text-slate-900',
  },
];

export function isNativeCapacitorApp(): boolean {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as {Capacitor?: {isNativePlatform?: () => boolean}}).Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

export function isAndroidDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent);
}

export function getResolvedActionHref(item: GardenActionItem): string {
  if (!isNativeCapacitorApp() && isAndroidDevice() && item.androidIntentHref) {
    return item.androidIntentHref;
  }
  return item.href;
}
