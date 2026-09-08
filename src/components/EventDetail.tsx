import { Link } from 'react-router';
import { Box, Divider, Heading, Text } from '@okshaun/components';
import { link } from '@styled-system/recipes';
import { Flex, VStack } from '@styled-system/jsx';
import { SiteWrapper } from './SiteWrapper';
import { RegistrationForm } from './forms';
import { signupsOpen, type EventDetail } from '../lib/sanity';
import { clock, eventTitle, longDate } from '../lib/event-format';

/**
 * The event page itself. Two routes render it — an occurrence at
 * /programs/:programSlug/:dateSlug and a one-off at /events/:slug — because
 * the address differs but nothing about the page does.
 */

export function EventDetailPage({ event }: { event: EventDetail }) {
  const title = eventTitle(event);
  const start = clock(event.startTime);
  const end = clock(event.endTime);
  const isPast = event.date < new Date().toISOString().slice(0, 10);
  const open = signupsOpen(event) && !isPast;
  const fields = event.program?.registration?.fields ?? [];

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="24" py="48">
        <Box>
          {event.program ? (
            <Text>
              Part of{' '}
              <Link to={`/programs/${event.program.slug}`} className={link({ underline: false })}>
                {event.program.name}
              </Link>
            </Text>
          ) : null}
          {/* Found by reverse lookup: the exhibition references its events,
              so an event can say what it belongs to without storing it. */}
          {event.exhibition ? (
            <Text>
              Part of{' '}
              <Link
                to={`/exhibitions/${event.exhibition.slug}`}
                className={link({ underline: false })}
              >
                {event.exhibition.title}
              </Link>
            </Text>
          ) : null}
          <Heading as="h1">{title}</Heading>
          <Text>
            {longDate(event.date)}
            {start ? ` · ${start}${end ? `–${end}` : ''}` : ''}
          </Text>
        </Box>

        {event.venue ? (
          <Box>
            <Text textStyle="heading.sm">{event.venue.name}</Text>
            {event.venue.address ? <Text>{event.venue.address}</Text> : null}
            {event.venue.accessNotes ? (
              <Text>{event.venue.accessNotes}</Text>
            ) : !event.venue.address ? (
              <Text>Address is sent to people who sign up.</Text>
            ) : null}
          </Box>
        ) : null}

        {event.artists?.length ? (
          <Box>
            <Text textStyle="heading.sm">Artists</Text>
            {event.artists.map((a) => (
              <Text key={a._id}>
                <Link to={`/artists/${a.slug}`} className={link({ underline: false })}>
                  {a.name}
                </Link>
              </Text>
            ))}
          </Box>
        ) : null}

        <Divider direction="horizontal" />

        {isPast ? (
          <Text>This one has already happened.</Text>
        ) : open && fields.length > 0 ? (
          <Box>
            <Heading as="h2">Sign up</Heading>
            {event.capacity ? <Text>Space is limited to {event.capacity}.</Text> : null}
            <RegistrationForm eventId={event._id} fields={fields} />
          </Box>
        ) : event.signupUrl ? (
          <Flex>
            <a href={event.signupUrl} className={link()}>
              Sign up for this one
            </a>
          </Flex>
        ) : (
          <Text>No signup needed — just come along.</Text>
        )}
      </VStack>
    </SiteWrapper>
  );
}
