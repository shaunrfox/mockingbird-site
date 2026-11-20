import { ArtistsIndex } from '../../src/pages/ArtistsIndex';
import { getArtists, getMediums } from '../../src/lib/sanity';
import type { Route } from './+types/artists-medium';

export async function loader({ params }: Route.LoaderArgs) {
  const [artists, mediums] = await Promise.all([getArtists(), getMediums()]);
  const current = mediums.find((m) => m.slug === params.slug);
  if (!current) throw new Response('Not found', { status: 404 });
  return {
    artists: artists.filter((a) => a.mediums.some((m) => m.slug === current.slug)),
    mediums,
    current,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const name = data?.current.name;
  if (!name) return [{ title: 'Artists · Mockingbird Arts' }];
  return [
    { title: `${name} · Artists · Mockingbird Arts` },
    { name: 'description', content: `Mockingbird Arts artists working in ${name}.` },
  ];
}

export default function ArtistsByMedium({ loaderData }: Route.ComponentProps) {
  const { artists, mediums, current } = loaderData;
  return <ArtistsIndex artists={artists} mediums={mediums} current={current} />;
}
