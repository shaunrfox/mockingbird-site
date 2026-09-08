import { createClient } from '@sanity/client';

// The project id is public — it ships in the browser bundle either way.
// It lives in .env.local so it is not hardcoded per environment.
const env = (import.meta as unknown as { env?: Record<string, string> }).env;
export const projectId =
  env?.VITE_SANITY_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID ?? '';
export const dataset =
  env?.VITE_SANITY_DATASET ?? process.env.VITE_SANITY_DATASET ?? 'production';

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  // Content is fetched at build time, so read from the API rather than the
  // CDN — a stale edit would be baked into the deploy.
  useCdn: false,
});

export type ProgramEvent = {
  _id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  slug: string;
  venueName?: string;
  venueAddress?: string;
};

export type Program = {
  _id: string;
  name: string;
  slug: string;
  kind: 'ongoing' | 'limited';
  shortDescription: string;
  description?: unknown[];
  registrationEnabled: boolean;
  upcoming: ProgramEvent[];
  past: ProgramEvent[];
};

const EVENT_FIELDS = `
  _id,
  date,
  startTime,
  endTime,
  "slug": slug.current,
  "venueName": venue->name,
  "venueAddress": venue->address
`;

export type ProgramCard = {
  _id: string;
  name: string;
  slug: string;
  kind: 'ongoing' | 'limited';
  status: 'active' | 'paused' | 'retired';
  shortDescription: string;
  heroImage?: { url: string };
  /** How many dates are still ahead, so the card can say so without a second query. */
  upcomingCount: number;
};

/**
 * The programs index. Retired programs keep their page — the archive is the
 * point — but they do not belong in a list of what the organization offers.
 */
export async function getPrograms(today: string): Promise<ProgramCard[]> {
  return sanity.fetch(
    `*[_type == "program" && defined(slug.current) && status != "retired"]
      | order(name asc) {
        _id, name, kind, status, shortDescription,
        "slug": slug.current,
        "heroImage": heroImage{"url": asset->url},
        "upcomingCount": count(*[_type == "event" && program._ref == ^._id && date >= $today])
      }`,
    { today }
  );
}

/** Slugs of every program that should have a page. */
export async function getProgramSlugs(): Promise<string[]> {
  return sanity.fetch<string[]>(
    `*[_type == "program" && defined(slug.current)].slug.current`
  );
}

export async function getProgram(slug: string, today: string): Promise<Program | null> {
  return sanity.fetch<Program | null>(
    `*[_type == "program" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      kind,
      shortDescription,
      description,
      "registrationEnabled": coalesce(registration.enabled, false),
      "upcoming": *[_type == "event" && program._ref == ^._id && date >= $today]
        | order(date asc) { ${EVENT_FIELDS} },
      "past": *[_type == "event" && program._ref == ^._id && date < $today]
        | order(date desc) [0...12] { ${EVENT_FIELDS} }
    }`,
    { slug, today }
  );
}

export type ListEvent = {
  _id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  slug: string;
  title: string;
  programName?: string;
  programSlug?: string;
  venueName?: string;
};

const LIST_FIELDS = `
  _id,
  date,
  startTime,
  endTime,
  "slug": slug.current,
  "title": coalesce(program->name, titleOverride),
  "programName": program->name,
  "programSlug": program->slug.current,
  "venueName": venue->name
`;

/**
 * One query for the whole events page: everything ahead, oldest first, then
 * the archive newest first. The archive is capped — five years of a weekly
 * program is a lot of rows to bake into one document.
 */
export async function getEventsList(today: string): Promise<{
  upcoming: ListEvent[];
  past: ListEvent[];
}> {
  return sanity.fetch(
    `{
      "upcoming": *[_type == "event" && date >= $today] | order(date asc) { ${LIST_FIELDS} },
      "past": *[_type == "event" && date < $today] | order(date desc) [0...200] { ${LIST_FIELDS} }
    }`,
    { today }
  );
}

export type RegistrationField = {
  _key: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  options?: string[];
};

export type EventDetail = {
  _id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  slug: string;
  titleOverride?: string;
  noteOverride?: unknown[];
  capacity?: number;
  registrationCloses?: string;
  registrationEnabled?: 'inherit' | 'on' | 'off';
  signupUrl?: string;
  venue?: { name: string; address?: string; mapUrl?: string; accessNotes?: string };
  program?: {
    name: string;
    slug: string;
    shortDescription?: string;
    registration?: {
      enabled?: boolean;
      fields?: RegistrationField[];
      notifyEmail?: string;
    };
  };
  artists?: { _id: string; name: string; slug: string }[];
  /** Found by reverse lookup — an exhibition references its events, not the other way round. */
  exhibition?: { title: string; slug: string };
};

/**
 * Where an event lives on the site. An occurrence sits under its program so
 * the address says what it belongs to; a one-off has no program to sit under.
 * Every link to an event goes through here.
 */
export function eventHref(e: { slug: string; programSlug?: string }): string {
  return e.programSlug ? `/programs/${e.programSlug}/${e.slug}` : `/events/${e.slug}`;
}

/** Every event that should have a page, as a route path. */
export async function getEventPaths(): Promise<string[]> {
  return sanity.fetch<string[]>(
    `*[_type == "event" && defined(slug.current)]{
      "path": select(
        defined(program->slug.current) =>
          "/programs/" + program->slug.current + "/" + slug.current,
        "/events/" + slug.current
      )
    }.path`
  );
}

const DETAIL_FIELDS = `
  _id, date, startTime, endTime, titleOverride, noteOverride,
  capacity, registrationCloses, registrationEnabled, signupUrl,
  "slug": slug.current,
  "venue": venue->{name, address, mapUrl, accessNotes},
  "program": program->{
    name, "slug": slug.current, shortDescription, registration
  },
  "artists": artists[]->{_id, name, "slug": slug.current},
  "exhibition": *[_type == "exhibition" && references(^._id)][0]{
    title, "slug": slug.current
  }
`;

/** One occurrence of a program, addressed by program and date. */
export async function getEvent(
  programSlug: string,
  dateSlug: string
): Promise<EventDetail | null> {
  return sanity.fetch<EventDetail | null>(
    `*[_type == "event"
        && slug.current == $dateSlug
        && program->slug.current == $programSlug][0]{ ${DETAIL_FIELDS} }`,
    { programSlug, dateSlug }
  );
}

/** A one-off, which belongs to no program and so carries its own title. */
export async function getStandaloneEvent(slug: string): Promise<EventDetail | null> {
  return sanity.fetch<EventDetail | null>(
    `*[_type == "event"
        && slug.current == $slug
        && !defined(program)][0]{ ${DETAIL_FIELDS} }`,
    { slug }
  );
}

/**
 * Signups are defined once on the program. An individual date may force
 * them on or off, but "inherit" is the answer for almost every date.
 */
export function signupsOpen(e: EventDetail): boolean {
  if (e.registrationEnabled === 'off') return false;
  if (e.registrationEnabled === 'on') return true;
  return Boolean(e.program?.registration?.enabled);
}

/* ------------------------------------------------------------------ *
 * Artists
 * ------------------------------------------------------------------ */

export type ArtistLink = { _key: string; label: string; url: string };

export type ArtistWork = {
  _key: string;
  title?: string;
  medium?: string;
  credit?: string;
  image?: { url: string };
};

export type ArtistCard = {
  _id: string;
  name: string;
  slug: string;
  sortName: string;
  mediums?: string[];
  headshot?: { url: string };
};

export type ArtistDetail = ArtistCard & {
  bio?: unknown[];
  links?: ArtistLink[];
  works?: ArtistWork[];
};

const ARTIST_CARD = `
  _id,
  name,
  sortName,
  mediums,
  "slug": slug.current,
  "headshot": headshot{"url": asset->url}
`;

/** Everyone, filed the way a person reads a list — by sortName, not name. */
export async function getArtists(): Promise<ArtistCard[]> {
  return sanity.fetch(
    `*[_type == "artist" && defined(slug.current)] | order(sortName asc) { ${ARTIST_CARD} }`
  );
}

export async function getArtistSlugs(): Promise<string[]> {
  return sanity.fetch(`*[_type == "artist" && defined(slug.current)].slug.current`);
}

export async function getArtist(slug: string): Promise<ArtistDetail | null> {
  return sanity.fetch(
    `*[_type == "artist" && slug.current == $slug][0]{
      ${ARTIST_CARD},
      bio,
      links,
      works[]{_key, title, medium, credit, "image": image{"url": asset->url}}
    }`,
    { slug }
  );
}

/* ------------------------------------------------------------------ *
 * Exhibitions
 * ------------------------------------------------------------------ */

export type ExhibitionCard = {
  _id: string;
  title: string;
  slug: string;
  series?: string;
  startDate: string;
  endDate?: string;
  venueName?: string;
  heroImage?: { url: string };
};

export type ExhibitionDetail = ExhibitionCard & {
  description?: unknown[];
  venue?: { name: string; address?: string; mapUrl?: string; accessNotes?: string };
  artists?: ArtistCard[];
  relatedEvents?: ListEvent[];
};

const EXHIBITION_CARD = `
  _id,
  title,
  series,
  startDate,
  endDate,
  "slug": slug.current,
  "venueName": venue->name,
  "heroImage": heroImage{"url": asset->url}
`;

/** Newest first — an exhibition archive reads backwards from now. */
export async function getExhibitions(): Promise<ExhibitionCard[]> {
  return sanity.fetch(
    `*[_type == "exhibition" && defined(slug.current)] | order(startDate desc) { ${EXHIBITION_CARD} }`
  );
}

export async function getExhibitionSlugs(): Promise<string[]> {
  return sanity.fetch(`*[_type == "exhibition" && defined(slug.current)].slug.current`);
}

export async function getExhibition(slug: string): Promise<ExhibitionDetail | null> {
  return sanity.fetch(
    `*[_type == "exhibition" && slug.current == $slug][0]{
      ${EXHIBITION_CARD},
      description,
      "venue": venue->{name, address, mapUrl, accessNotes},
      "artists": artists[]->{ ${ARTIST_CARD} },
      "relatedEvents": relatedEvents[]->{ ${LIST_FIELDS} }
    }`,
    { slug }
  );
}
