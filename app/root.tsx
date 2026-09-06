import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from '@okshaun/components';
import sprite from '../src/assets/logos-sprite.svg?raw';
import '../src/index.css';
import '../src/App.css';

const DESCRIPTION =
  'Mockingbird Arts is a new nonprofit serving artists and the people of Austin, through hospitality, artist formation, and cultural engagement for the common good.';

/** Defaults. Any route exporting its own meta overrides these. */
export function meta() {
  return [
    { title: 'Mockingbird Arts' },
    { name: 'description', content: DESCRIPTION },
    { property: 'og:site_name', content: 'Mockingbird Arts' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Mockingbird Arts' },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:image', content: 'https://mkbd.org/web-app-manifest-512x512.png' },
    { name: 'twitter:card', content: 'summary' },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="https://use.typekit.net/gsh7kwc.css" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Sprite is inlined at build time instead of injected by script on
            mount, so it exists in the prerendered HTML. */}
        <div
          aria-hidden="true"
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{ __html: sprite }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
