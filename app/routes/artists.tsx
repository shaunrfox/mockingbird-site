import { ArtistsIndex } from '../../src/pages/ArtistsIndex';
import { getArtists, getMediums } from '../../src/lib/sanity';
import type { Route } from './+types/artists';

export async function loader() {
  const [artists, mediums] = await Promise.all([getArtists(), getMediums()]);
  return { artists, mediums };
}

export function meta() {
  return [
    { title: 'Artists · Mockingbird Arts' },
    {
      name: 'description',
      content: 'The artists who make up the Mockingbird Arts community.',
    },
  ];
}

export default function Artists({ loaderData }: Route.ComponentProps) {
  return <ArtistsIndex artists={loaderData.artists} mediums={loaderData.mediums} />;
}
