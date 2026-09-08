import type { ExhibitionCard } from './sanity';

const day = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

/** "November 11 – November 22, 2026", or just the one day when it is one day. */
export function exhibitionDates(e: Pick<ExhibitionCard, 'startDate' | 'endDate'>): string {
  if (!e.endDate || e.endDate === e.startDate) return day(e.startDate);
  return `${day(e.startDate)} – ${day(e.endDate)}`;
}

/** Whether the show is still up. An open-ended run counts as its start day. */
export function isCurrent(e: Pick<ExhibitionCard, 'startDate' | 'endDate'>): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return (e.endDate ?? e.startDate) >= today;
}
