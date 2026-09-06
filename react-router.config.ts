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
    const { getProgramSlugs } = await import('./src/lib/sanity');
    const slugs = await getProgramSlugs();
    return ['/', '/team', ...slugs.map((s) => `/programs/${s}`)];
  },
} satisfies Config;
