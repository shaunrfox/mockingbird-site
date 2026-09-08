import { Link } from 'react-router';
import { Box, Divider, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { RichText } from '../../src/components/RichText';
import { exhibitionDates } from '../../src/lib/exhibition-format';
import { eventHref, getExhibition } from '../../src/lib/sanity';
import type { Route } from './+types/exhibition';

export async function loader({ params }: Route.LoaderArgs) {
  const exhibition = await getExhibition(params.slug);
  if (!exhibition) throw new Response('Not found', { status: 404 });
  return { exhibition };
}

export function meta({ data }: Route.MetaArgs) {
  const e = data?.exhibition;
  if (!e) return [{ title: 'Mockingbird Arts' }];
  return [
    { title: `${e.title} · Mockingbird Arts` },
    { name: 'description', content: exhibitionDates(e) },
    { property: 'og:title', content: e.title },
    ...(e.heroImage ? [{ property: 'og:image', content: e.heroImage.url }] : []),
  ];
}

export default function Exhibition({ loaderData }: Route.ComponentProps) {
  const { exhibition: e } = loaderData;

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="24" py="48">
        <Box>
          {e.series ? <Text>{e.series}</Text> : null}
          <Heading as="h1">{e.title}</Heading>
          <Text>{exhibitionDates(e)}</Text>
        </Box>

        {/* 7 of the 9 exhibitions on the old site have no image, so the page
            has to look finished without one. */}
        {e.heroImage ? (
          <img src={e.heroImage.url} alt={e.title} loading="lazy" width={960} height={640} />
        ) : null}

        {e.venue ? (
          <Box>
            <Text textStyle="heading.sm">{e.venue.name}</Text>
            {e.venue.address ? <Text>{e.venue.address}</Text> : null}
            {e.venue.accessNotes ? <Text>{e.venue.accessNotes}</Text> : null}
          </Box>
        ) : null}

        <RichText value={e.description} />

        {e.artists?.length ? (
          <>
            <Divider direction="horizontal" />
            <Box>
              <Heading as="h2">Artists</Heading>
              <VStack alignItems="flex-start" gap="2">
                {e.artists.map((a) => (
                  <Text key={a._id}>
                    <Link to={`/artists/${a.slug}`} className={link({ underline: false })}>
                      {a.name}
                    </Link>
                  </Text>
                ))}
              </VStack>
            </Box>
          </>
        ) : null}

        {e.relatedEvents?.length ? (
          <>
            <Divider direction="horizontal" />
            <Box>
              <Heading as="h2">Events</Heading>
              <VStack alignItems="flex-start" gap="3">
                {e.relatedEvents.map((ev) => (
                  <Flex key={ev._id} flexDir="column">
                    <Text textStyle="heading.sm">
                      <Link to={eventHref(ev)} className={link({ underline: false })}>
                        {ev.title}
                      </Link>
                    </Text>
                    <Text>
                      {new Date(`${ev.date}T12:00:00`).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {ev.venueName ? ` · ${ev.venueName}` : ''}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </>
        ) : null}

        <Link to="/exhibitions" className={link({ underline: false })}>
          All exhibitions
        </Link>
      </VStack>
    </SiteWrapper>
  );
}
