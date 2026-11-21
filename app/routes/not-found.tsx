import { NotFound } from '../../src/pages/NotFound';

/**
 * Catches every address no other route matches. The host serves the app
 * shell from 404.html with a real 404 status, and this route renders the
 * page inside it.
 */
export function meta() {
  return [{ title: 'Page not found · Mockingbird Arts' }, { name: 'robots', content: 'noindex' }];
}

export default function NotFoundRoute() {
  return <NotFound />;
}
