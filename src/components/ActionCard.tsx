import React, {useState} from 'react';
import {ArrowUpRight, Check, Copy} from 'lucide-react';
import {type GardenActionItem, getResolvedActionHref} from '../data/gardenLinks';
import {ActionIcon} from './ActionIcon';

interface ActionCardProps {
  item: GardenActionItem;
  variant?: 'card' | 'row';
}

export const ActionCard: React.FC<ActionCardProps> = ({item, variant = 'card'}) => {
  const [copied, setCopied] = useState(false);
  const resolvedHref = getResolvedActionHref(item);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!item.copyableValue) return;
    try {
      await navigator.clipboard.writeText(item.copyableValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  if (variant === 'row') {
    return (
      <div className="flex items-center justify-between gap-3 py-3.5 px-4 transition-colors duration-150 hover:bg-sky-50/50">
        <a
          href={resolvedHref}
          target={item.isExternalWeb ? '_blank' : undefined}
          rel={item.isExternalWeb ? 'noopener noreferrer' : undefined}
          className="flex min-w-0 flex-1 items-center gap-3.5 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 rounded-xl"
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.accentBg} ${item.accentText}`}
          >
            <ActionIcon id={item.id} className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {item.title}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 truncate">
              {item.displayValue}
              <span aria-hidden="true"> · </span>
              {item.targetAppLabel}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        </a>

        {item.copyableValue && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600"
            aria-label={copied ? `${item.title} copied` : `Copy ${item.title}`}
            title={copied ? 'Copied' : 'Copy'}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 border border-sky-100/90 shadow-xs transition-all duration-150 hover:shadow-md hover:border-sky-200">
      <a
        href={resolvedHref}
        target={item.isExternalWeb ? '_blank' : undefined}
        rel={item.isExternalWeb ? 'noopener noreferrer' : undefined}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.accentBg} ${item.accentText} transition-transform duration-150 group-hover:scale-105`}
          >
            <ActionIcon id={item.id} className="h-6 w-6" />
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors duration-150 group-hover:bg-sky-50 group-hover:text-sky-700">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
          {item.subtitle}
        </p>
      </a>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={resolvedHref}
          target={item.isExternalWeb ? '_blank' : undefined}
          rel={item.isExternalWeb ? 'noopener noreferrer' : undefined}
          className="min-w-0 flex-1 text-xs text-slate-500 truncate hover:text-sky-700 transition-colors"
        >
          <span className={item.id === 'call' ? 'font-mono-tabular font-medium text-slate-700' : 'font-medium text-slate-700'}>
            {item.displayValue}
          </span>
          <span aria-hidden="true"> · </span>
          <span>{item.targetAppLabel}</span>
        </a>

        {item.copyableValue && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label={copied ? `${item.title} copied` : `Copy ${item.title}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
