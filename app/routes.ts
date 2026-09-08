import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  // Newsletter confirmation states: standalone, no header/footer.
  route('newsletter/confirmed', 'routes/newsletter-confirmed.tsx'),
  route('newsletter/already-confirmed', 'routes/newsletter-already-confirmed.tsx'),
  route('newsletter/error', 'routes/newsletter-error.tsx'),

  layout('routes/main-layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('programs/:slug', 'routes/program.tsx'),
    route('events', 'routes/events.tsx'),
    route('programs/:programSlug/:dateSlug', 'routes/event.tsx'),
    // One-offs have no program to sit under.
    route('events/:slug', 'routes/standalone-event.tsx'),
    route('artists', 'routes/artists.tsx'),
    route('artists/:slug', 'routes/artist.tsx'),
    route('exhibitions', 'routes/exhibitions.tsx'),
    route('exhibitions/:slug', 'routes/exhibition.tsx'),
    route('programs', 'routes/programs.tsx'),
    route('news', 'routes/news.tsx'),
    route('donate', 'routes/donate.tsx'),
    route('pledge', 'routes/pledge.tsx'),
    route('contact', 'routes/contact.tsx'),
  ]),
] satisfies RouteConfig;
