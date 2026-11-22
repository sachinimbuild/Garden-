import React, {useState} from 'react';
import {Download, Smartphone, X} from 'lucide-react';
import {usePWAInstall} from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const {isInstallable, isInstalled, isIOS, isAndroid, install} = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleAction = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuide(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAction}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-sky-700 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer"
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{isInstallable ? 'Install App' : 'Get App'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-guide-title"
        >
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200 sm:hidden" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="install-guide-title" className="text-base font-semibold text-slate-900">
                    Install Medicinal garden
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add to your home screen as a native app
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
                aria-label="Close install instructions"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">1.</span>
                  <span>
                    Tap the <strong>Share</strong> button in your Safari toolbar.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">2.</span>
                  <span>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">3.</span>
                  <span>
                    Tap <strong>Add</strong> to launch with the plant app icon.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">1.</span>
                  <span>
                    Open this page in <strong>{isAndroid ? 'Google Chrome on Android' : 'Chrome or Edge'}</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">2.</span>
                  <span>
                    Tap the browser menu <strong>(⋮)</strong> and choose{' '}
                    <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono-tabular font-semibold text-sky-700">3.</span>
                  <span>
                    Launch <strong>Medicinal garden</strong> directly from your Android app drawer.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full min-h-[44px] rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
