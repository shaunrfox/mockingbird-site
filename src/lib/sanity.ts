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
