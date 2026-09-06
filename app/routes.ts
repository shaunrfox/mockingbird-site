import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  // Newsletter confirmation states: standalone, no header/footer.
  route('newsletter/confirmed', 'routes/newsletter-confirmed.tsx'),
  route('newsletter/already-confirmed', 'routes/newsletter-already-confirmed.tsx'),
  route('newsletter/error', 'routes/newsletter-error.tsx'),

  layout('routes/main-layout.tsx', [
    index('routes/home.tsx'),
    route('team', 'routes/team.tsx'),
    route('pledge', 'routes/pledge.tsx'),
    route('contact', 'routes/contact.tsx'),
  ]),
] satisfies RouteConfig;
