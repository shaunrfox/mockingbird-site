import type { Config } from '@react-router/dev/config';
import { loadEnv } from 'vite';

// The config runs in Node, outside Vite's env injection, so pull the same
// VITE_ vars in by hand before anything imports the Sanity client.
Object.assign(process.env, loadEnv('production', process.cwd(), 'VITE_'));

export default {
  // Static site: no server at runtime. The paths below are rendered to real
  // HTML at build time; loaders run then, not on request.
  ssr: false,
  async prerender() {
    const { getProgramSlugs, getEventPaths, getArtistSlugs, getExhibitionSlugs } =
      await import('./src/lib/sanity');
    const [slugs, eventPaths, artistSlugs, exhibitionSlugs] = await Promise.all([
      getProgramSlugs(),
      getEventPaths(),
      getArtistSlugs(),
      getExhibitionSlugs(),
    ]);
    return [
      // Static pages. Every route in app/routes.ts belongs here — one that is
      // missing still resolves in the browser via the SPA fallback, but it
      // answers 404 and ships no content to a crawler.
      '/',
      '/about',
      '/programs',
      '/events',
      '/artists',
      '/exhibitions',
      '/news',
      '/donate',
      '/pledge',
      '/contact',
      // The Worker redirects people to these after a newsletter confirmation,
      // so they are landing pages arrived at cold, not client-side routes.
      '/newsletter/confirmed',
      '/newsletter/already-confirmed',
      '/newsletter/error',
      // Everything below comes from Sanity — nobody maintains this list.
      ...slugs.map((s) => `/programs/${s}`),
      ...eventPaths,
      ...artistSlugs.map((s) => `/artists/${s}`),
      ...exhibitionSlugs.map((s) => `/exhibitions/${s}`),
    ];
  },
} satisfies Config;
