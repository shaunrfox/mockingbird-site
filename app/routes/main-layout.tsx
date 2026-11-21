import type { ReactNode } from 'react';
import { Outlet, isRouteErrorResponse, useRouteError } from 'react-router';
import { Box } from '@okshaun/components';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { NotFound } from '../../src/pages/NotFound';

function Frame({ children }: { children: ReactNode }) {
  return (
    <Box minH="[100vh]">
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

export default function MainLayout() {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
}

/**
 * True when the error means the page's content does not exist.
 *
 * The site is prerendered, so an unknown slug such as /artists/nobody has no
 * data file. The host answers with the app shell, and React Router reports
 * "No result found for routeId", not a 404. Anything else, such as a network
 * failure, shows the general error message instead.
 */
function isMissingPage(error: unknown) {
  if (isRouteErrorResponse(error)) return error.status === 404;
  return error instanceof Error && error.message.startsWith('No result found for routeId');
}

/**
 * An error replaces this whole layout, so the boundary draws the header and
 * footer again around the message.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const missing = isMissingPage(error);
  return (
    <Frame>
      {/* React 19 moves these into the head. */}
      <title>{`${missing ? 'Page not found' : 'Something went wrong'} · Mockingbird Arts`}</title>
      <meta name="robots" content="noindex" />
      <NotFound failed={!missing} />
    </Frame>
  );
}
