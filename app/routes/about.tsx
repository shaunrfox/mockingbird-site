import Team from '../../src/pages/Team';
import { getPeople } from '../../src/lib/sanity';
import type { Route } from './+types/about';

export async function loader() {
  return { people: await getPeople() };
}

export function meta() {
  return [
    { title: 'About · Mockingbird Arts' },
    {
      name: 'description',
      content:
        'The people behind Mockingbird Arts — staff and board serving artists and the city of Austin.',
    },
    { property: 'og:title', content: 'About · Mockingbird Arts' },
  ];
}

export default function About({ loaderData }: Route.ComponentProps) {
  return <Team people={loaderData.people} />;
}
