import { Link } from 'react-router';
import { Divider, Heading, Text } from '@okshaun/components';
import { Flex, Grid, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { css } from '@styled-system/css';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { RichText } from '../../src/components/RichText';
import { TagList } from '../../src/components/Tag/Tag';
import { WorksGallery } from '../../src/components/WorksGallery/WorksGallery';
import { mediumHref } from '../../src/pages/ArtistsIndex';
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
    { name: 'description', content: a.mediums.map((m) => m.name).join(', ') },
    { property: 'og:title', content: a.name },
    ...(a.headshot ? [{ property: 'og:image', content: a.headshot.url }] : []),
  ];
}

const eyebrow = css({
  textStyle: 'mono.md',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
});

// The photo is shown whole, at its own shape: resized by Sanity, never cropped.
const headshot = css({
  display: 'block',
  width: 'full',
  height: 'auto',
  borderRadius: '8',
});

/**
 * An artist's page, laid out after the old faithandarts.org artist pages:
 * the name, then the photo beside the bio, the mediums in a side column, and
 * the works in a gallery that opens a lightbox.
 */
export default function Artist({ loaderData }: Route.ComponentProps) {
  const { artist } = loaderData;
  const works = artist.works?.filter((w) => w.image) ?? [];

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="48" py="48" width="full">
        <VStack alignItems="flex-start" gap="4">
          <Link to="/artists" className={`${eyebrow} ${link({ underline: false })}`}>
            Artists
          </Link>
          <Heading as="h1">{artist.name}</Heading>
        </VStack>

        <Grid
          gridTemplateColumns={{ base: '1fr', lg: '[minmax(0, 3fr) minmax(0, 1fr)]' }}
          gap={{ base: '40', lg: '64' }}
          width="full"
          alignItems="start"
        >
          <Grid
            gridTemplateColumns={{ base: '1fr', md: artist.headshot ? '[1fr 1fr]' : '1fr' }}
            gap="32"
            alignItems="start"
          >
            {artist.headshot ? (
              <img
                src={`${artist.headshot.url}?w=1200&auto=format`}
                alt={artist.name}
                className={headshot}
              />
            ) : null}
            <VStack alignItems="flex-start" gap="16">
              <RichText value={artist.bio} />
              {artist.links?.length ? (
                <Flex flexDir="column" gap="4">
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
            </VStack>
          </Grid>

          {artist.mediums.length ? (
            <VStack alignItems="flex-start" gap="12">
              <Text as="h2" className={eyebrow}>
                Mediums
              </Text>
              <TagList
                items={artist.mediums.map((m) => ({ label: m.name, href: mediumHref(m) }))}
                size="md"
                aria-label="Mediums"
              />
            </VStack>
          ) : null}
        </Grid>

        {works.length ? (
          <VStack alignItems="flex-start" gap="24" width="full">
            <Divider direction="horizontal" />
            <Heading>Work</Heading>
            <WorksGallery works={works} artistName={artist.name} />
          </VStack>
        ) : null}
      </VStack>
    </SiteWrapper>
  );
}
