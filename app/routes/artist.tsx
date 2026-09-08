import { Link } from 'react-router';
import { Box, Divider, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { RichText } from '../../src/components/RichText';
import { getArtist } from '../../src/lib/sanity';
import type { Route } from './+types/artist';

export async function loader({ params }: Route.LoaderArgs) {
  const artist = await getArtist(params.slug);
  if (!artist) throw new Response('Not found', { status: 404 });
  return { artist };
}

export function meta({ data }: Route.MetaArgs) {
  const a = data?.artist;
  if (!a) return [{ title: 'Mockingbird Arts' }];
  return [
    { title: `${a.name} · Mockingbird Arts` },
    { name: 'description', content: a.mediums?.join(', ') ?? '' },
    { property: 'og:title', content: a.name },
    ...(a.headshot ? [{ property: 'og:image', content: a.headshot.url }] : []),
  ];
}

export default function Artist({ loaderData }: Route.ComponentProps) {
  const { artist } = loaderData;

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="24" py="48">
        <Box>
          <Heading as="h1">{artist.name}</Heading>
          {artist.mediums?.length ? <Text>{artist.mediums.join(' · ')}</Text> : null}
        </Box>

        {artist.headshot ? (
          <img
            src={artist.headshot.url}
            alt={artist.name}
            loading="lazy"
            width={480}
            height={480}
          />
        ) : null}

        <RichText value={artist.bio} />

        {artist.links?.length ? (
          <Flex flexDir="column" gap="2">
            {artist.links.map((l) => (
              <a
                key={l._key}
                href={l.url}
                className={link()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </Flex>
        ) : null}

        {artist.works?.length ? (
          <>
            <Divider direction="horizontal" />
            <Box>
              <Heading as="h2">Work</Heading>
              <VStack alignItems="flex-start" gap="8">
                {artist.works.map((w) => (
                  <Flex key={w._key} flexDir="column" gap="2">
                    {w.image ? (
                      <img
                        src={w.image.url}
                        alt={w.title ?? ''}
                        loading="lazy"
                        width={640}
                        height={480}
                      />
                    ) : null}
                    {w.title ? <Text textStyle="heading.sm">{w.title}</Text> : null}
                    {w.medium ? <Text>{w.medium}</Text> : null}
                    {w.credit ? <Text>Photo: {w.credit}</Text> : null}
                  </Flex>
                ))}
              </VStack>
            </Box>
          </>
        ) : null}

        <Link to="/artists" className={link({ underline: false })}>
          All artists
        </Link>
      </VStack>
    </SiteWrapper>
  );
}
