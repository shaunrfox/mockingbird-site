import type { Config } from '@react-router/dev/config';

export default {
  // Static site: no server at runtime. Routes listed below are rendered to
  // real HTML at build time; everything else still works client-side.
  ssr: false,
  prerender: ['/', '/team'],
} satisfies Config;
