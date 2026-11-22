import React, {useEffect, useState} from 'react';
import {CheckCircle2, Clock, XCircle} from 'lucide-react';

interface GardenScheduleStatus {
  isOpen: boolean;
  statusLabel: 'Status: Open' | 'Status: Closed';
  detailText: string;
  currentDayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  formattedTime: string;
  formattedDay: string;
}

const FIXED_HOLIDAYS: Record<string, string> = {
  '02-04': 'Independence Day',
  '04-13': 'Sinhala & Tamil New Year Eve',
  '04-14': 'Sinhala & Tamil New Year',
  '05-01': 'May Day',
  '12-25': 'Christmas Day',
};

const DAILY_HOURS: {dayIndex: number; dayName: string; hours: string; isClosed: boolean}[] = [
  {dayIndex: 1, dayName: 'Monday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 2, dayName: 'Tuesday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 3, dayName: 'Wednesday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 4, dayName: 'Thursday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 5, dayName: 'Friday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 6, dayName: 'Saturday', hours: '7:00 AM – 4:00 PM', isClosed: false},
  {dayIndex: 0, dayName: 'Sunday', hours: 'Closed', isClosed: true},
];

function evaluateGardenStatus(now: Date): GardenScheduleStatus {
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const openMinutes = 7 * 60; // 7:00 AM
  const closeMinutes = 16 * 60; // 4:00 PM

  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const holidayName = FIXED_HOLIDAYS[`${mm}-${dd}`];

  const formattedTime = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  const formattedDay = now.toLocaleDateString([], {
    weekday: 'long',
  });

  if (holidayName) {
    return {
      isOpen: false,
      statusLabel: 'Status: Closed',
      detailText: `Closed for ${holidayName} (Government Holiday)`,
      currentDayIndex: day,
      formattedTime,
      formattedDay,
    };
  }

  if (day === 0) {
    return {
      isOpen: false,
      statusLabel: 'Status: Closed',
      detailText: 'Closed on Sundays · Opens Monday at 7:00 AM',
      currentDayIndex: day,
      formattedTime,
      formattedDay,
    };
  }

  if (totalMinutes >= openMinutes && totalMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusLabel: 'Status: Open',
      detailText: 'Open now · Closes today at 4:00 PM',
      currentDayIndex: day,
      formattedTime,
      formattedDay,
    };
  }

  if (totalMinutes < openMinutes) {
    return {
      isOpen: false,
      statusLabel: 'Status: Closed',
      detailText: 'Opens today at 7:00 AM',
      currentDayIndex: day,
      formattedTime,
      formattedDay,
    };
  }

  return {
    isOpen: false,
    statusLabel: 'Status: Closed',
    detailText: day === 6 ? 'Closed for the day · Opens Monday at 7:00 AM' : 'Closed for the day · Opens tomorrow at 7:00 AM',
    currentDayIndex: day,
    formattedTime,
    formattedDay,
  };
}

export const OpeningHoursSection: React.FC = () => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const status = evaluateGardenStatus(now);

  return (
    <section aria-labelledby="opening-hours-heading" className="rounded-3xl bg-white p-6 sm:p-8 border border-sky-100/90 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Clock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="opening-hours-heading"
              className="font-display text-xl font-semibold text-slate-900"
            >
              Opening Hours
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
              <span>{status.formattedDay}</span>
              <span className="mx-1.5 text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="font-mono-tabular">{status.formattedTime}</span>
              <span className="mx-1.5 text-slate-300" aria-hidden="true">
                ·
              </span>
              <span>{status.detailText}</span>
            </p>
          </div>
        </div>

        <div
          role="status"
          aria-live="polite"
          className={`inline-flex self-start sm:self-center items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border whitespace-nowrap shrink-0 ${
            status.isOpen
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {status.isOpen ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4 text-rose-600 shrink-0" aria-hidden="true" />
          )}
          <span>{status.statusLabel}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 divide-y divide-slate-100">
          {DAILY_HOURS.map((entry) => {
            const isToday = entry.dayIndex === status.currentDayIndex;
            return (
              <div
                key={entry.dayName}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                  isToday ? 'bg-sky-50/70' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={
                      isToday
                        ? 'font-semibold text-slate-900'
                        : 'font-medium text-slate-700'
                    }
                  >
                    {entry.dayName}
                  </span>
                  {isToday && (
                    <span className="text-xs font-medium text-sky-700">
                      (Today)
                    </span>
                  )}
                </div>

                <span
                  className={`font-mono-tabular text-sm ${
                    entry.isClosed
                      ? 'font-medium text-rose-700'
                      : isToday
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-600'
                  }`}
                >
                  {entry.hours}
                </span>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-sky-50/60 p-5 border border-sky-100 space-y-3">
          <h3 className="font-display text-base font-semibold text-slate-900">
            Visiting Schedule Summary
          </h3>
          <dl className="space-y-2.5 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600">Weekdays (Mon – Fri)</dt>
              <dd className="font-mono-tabular font-semibold text-slate-900 whitespace-nowrap">
                7:00 AM – 4:00 PM
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600">Saturday</dt>
              <dd className="font-mono-tabular font-semibold text-slate-900 whitespace-nowrap">
                7:00 AM – 4:00 PM
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 pt-2 border-t border-sky-200/60">
              <dt className="text-slate-600">Sunday</dt>
              <dd className="font-semibold text-rose-700">Closed</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600">Government Holidays</dt>
              <dd className="font-semibold text-rose-700">Closed</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
