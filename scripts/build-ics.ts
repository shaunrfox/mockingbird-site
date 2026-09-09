/**
 * Writes public/events.ics from the CMS at build time.
 *
 * The content model spec called for a Worker route, but that was written
 * before the site settled on prerendering. Every page here is generated at
 * build time and refreshed on deploy; a static feed behaves the same way and
 * needs no runtime. Calendar clients poll on their own schedule anyway —
 * typically hours — so a deploy-fresh file is well within tolerance.
 *
 * Times are local wall-clock against a fixed zone (DTSTART;TZID=America/Chicago),
 * which is the whole reason startTime/endTime are stored as HH:MM strings
 * rather than UTC datetimes.
 */
import { writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';

Object.assign(process.env, loadEnv('production', process.cwd(), 'VITE_'));

const ZONE = 'America/Chicago';
const DOMAIN = 'mkbd.org';

/** RFC 5545 folds lines at 75 octets; continuations start with one space. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest) > 75) {
    let cut = 75;
    while (cut > 1 && Buffer.byteLength(rest.slice(0, cut)) > 75) cut--;
    out.push(rest.slice(0, cut));
    rest = ' ' + rest.slice(cut);
  }
  out.push(rest);
  return out.join('\r\n');
}

/** Escape per RFC 5545: backslash, semicolon, comma, newline. */
const esc = (s: string) =>
  s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');

const stamp = (d: string, t?: string) =>
  `${d.replace(/-/g, '')}T${(t ?? '00:00').replace(':', '')}00`;

async function main() {
  const { getEventsList, eventHref } = await import('../src/lib/sanity');
  const today = new Date().toISOString().slice(0, 10);
  const { upcoming, past } = await getEventsList(today);

  // Past events stay in the feed so a subscriber's history is not blank, but
  // only a year of it — a decade of a weekly program is not useful in a
  // calendar client.
  const cutoff = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const events = [...upcoming, ...past.filter((e) => e.date >= cutoff)];

  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//Mockingbird Arts//${DOMAIN}//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Mockingbird Arts',
    `X-WR-TIMEZONE:${ZONE}`,
  ];

  for (const e of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${e._id}@${DOMAIN}`);
    lines.push(`DTSTAMP:${now}`);

    if (e.startTime) {
      lines.push(`DTSTART;TZID=${ZONE}:${stamp(e.date, e.startTime)}`);
      // No end time is common — 115 of 191 source events had one. Omitting
      // DTEND leaves the client to show it as an instant, which is honest.
      if (e.endTime) lines.push(`DTEND;TZID=${ZONE}:${stamp(e.date, e.endTime)}`);
    } else {
      // All-day: DTEND is exclusive, so it is the following day.
      const next = new Date(`${e.date}T12:00:00`);
      next.setDate(next.getDate() + 1);
      lines.push(`DTSTART;VALUE=DATE:${e.date.replace(/-/g, '')}`);
      lines.push(`DTEND;VALUE=DATE:${next.toISOString().slice(0, 10).replace(/-/g, '')}`);
    }

    lines.push(fold(`SUMMARY:${esc(e.title)}`));
    if (e.venueName) lines.push(fold(`LOCATION:${esc(e.venueName)}`));
    lines.push(fold(`URL:https://${DOMAIN}${eventHref(e)}`));
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  writeFileSync('public/events.ics', lines.join('\r\n') + '\r\n');
  console.log(`events.ics: ${events.length} events (${upcoming.length} upcoming)`);
}

main().catch((err) => {
  console.error('events.ics generation failed:', err);
  process.exit(1);
});
