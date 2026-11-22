import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

async function initServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const cap = (window as unknown as {Capacitor?: {isNativePlatform?: () => boolean}}).Capacitor;
  if (cap?.isNativePlatform?.()) {
    return;
  }

  const isDev = import.meta.env.DEV;
  const swUrl = isDev ? '/dev-sw.js?dev-sw' : '/sw.js';

  try {
    // Dev service workers use type: 'module' ('omit' credentials), while
    // production classic service workers use 'same-origin' credentials.
    // Skip registration if the matching credential mode returns a redirect.
    const res = await fetch(swUrl, {
      method: 'GET',
      redirect: 'manual',
      credentials: isDev ? 'omit' : 'same-origin',
    });

    const isDirectJs = (response: Response) => {
      if (response.type === 'opaqueredirect' || response.redirected || response.status !== 200) {
        return false;
      }
      const contentType = response.headers.get('content-type') || '';
      return contentType.includes('javascript') || contentType.includes('ecmascript');
    };

    if (!isDirectJs(res)) {
      return;
    }

    registerSW({
      immediate: true,
      onRegisterError() {
        // Ignore registration errors in restricted preview/iframe environments
      },
    });
  } catch {
    // Ignore network or security errors when preflighting service worker script
  }
}

void initServiceWorker();

createRoot(document.getElementById('root')!).render(<App />);
