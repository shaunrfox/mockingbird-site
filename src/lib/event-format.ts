import type { EventDetail } from './sanity';

/**
 * Formatting shared by the event page and its two routes. It lives apart from
 * the component so that file exports a component and nothing else.
 */

export function eventTitle(e: EventDetail): string {
  return e.program?.name ?? e.titleOverride ?? 'Event';
}

export function longDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** 24-hour "19:30" as the "7:30pm" a person reads off the page. */
export function clock(t?: string): string | null {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

/** "7pm–9pm", "7pm", or null. */
export function timeRange(start?: string, end?: string): string | null {
  const s = clock(start);
  const e = clock(end);
  return s ? (e ? `${s}–${e}` : s) : null;
}

/** "Sep 12, 2026", the date line on an event card. */
export function shortDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** { month: "SEP", day: "12" } for the date badge. */
export function badgeDate(date: string): { month: string; day: string } {
  const d = new Date(`${date}T12:00:00`);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: String(d.getDate()),
  };
}

export function eventMeta(e: EventDetail | undefined) {
  if (!e) return [{ title: 'Mockingbird Arts' }];
  const when = new Date(`${e.date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const title = eventTitle(e);
  return [
    { title: `${title}, ${when} · Mockingbird Arts` },
    { name: 'description', content: e.program?.shortDescription ?? '' },
    { property: 'og:title', content: `${title} · ${when}` },
  ];
}
