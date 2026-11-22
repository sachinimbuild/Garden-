import React from 'react';
import {MapPin} from 'lucide-react';
import {GARDEN_ACTIONS, getResolvedActionHref} from '../data/gardenLinks';
import {usePWAInstall} from '../hooks/usePWAInstall';
import {PlantLogo} from './PlantLogo';
import {PWAInstallButton} from './PWAInstallButton';

export type NavTab = 'home' | 'gallery' | 'hours' | 'social';

interface TopNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

const NAV_ITEMS: {id: NavTab; label: string}[] = [
  {id: 'home', label: 'Home'},
  {id: 'gallery', label: 'Gallery'},
  {id: 'hours', label: 'Opening Hours'},
  {id: 'social', label: 'Social Media'},
];

export const TopNavBar: React.FC<TopNavBarProps> = ({activeTab, onSelectTab}) => {
  const {isInstalled} = usePWAInstall();
  const locationItem = GARDEN_ACTIONS[0];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/75 pt-safe">
      {/* Main 3-Zone Top Row */}
      <div className="mx-auto flex h-[52px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Zone 1: Brand Mark */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 rounded-lg"
        >
          <PlantLogo className="h-7 w-7 shrink-0" />
          <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            Medicinal garden
          </span>
        </button>

        {/* Zone 2: Clean Typography Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 ${
                  isActive
                    ? 'text-sky-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-[11px] h-0.5 rounded-full bg-sky-600"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {!isInstalled ? (
            <PWAInstallButton />
          ) : (
            <a
              href={getResolvedActionHref(locationItem)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-sky-700 whitespace-nowrap shrink-0"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Directions</span>
            </a>
          )}
        </div>
      </div>

      {/* Mobile Top Tab Strip (Clean White Minimalist) */}
      <nav
        aria-label="Mobile top tabs"
        className="md:hidden border-t border-slate-100 bg-white px-1.5"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex min-h-[44px] items-center justify-center px-1 text-[11px] sm:text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  isActive
                    ? 'text-sky-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-sky-600"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
