import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from '@okshaun/components';
import sprite from '../src/assets/logos-sprite.svg?raw';
import '../src/index.css';
import '../src/App.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="https://use.typekit.net/gsh7kwc.css" />
        <title>Mockingbird Arts</title>
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
