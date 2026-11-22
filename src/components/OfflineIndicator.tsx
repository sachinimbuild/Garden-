import React from 'react';
import {WifiOff} from 'lucide-react';
import {useOnlineStatus} from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-xs font-medium text-slate-800 shadow-lg border border-amber-200"
    >
      <WifiOff className="h-4 w-4 text-amber-600 shrink-0" aria-hidden="true" />
      <span>Offline mode — contact numbers and cached details remain available.</span>
    </div>
  );
};
