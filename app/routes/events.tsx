import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Box, Divider, Heading, Text } from '@okshaun/components';
import { link } from '@styled-system/recipes';
import { Flex, VStack } from '@styled-system/jsx';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { eventHref, getEventsList, type ListEvent } from '../../src/lib/sanity';
import type { Route } from './+types/events';

/** How many archive entries are in the page before anyone clicks. */
const ARCHIVE_PAGE = 12;

export async function loader() {
  const today = new Date().toISOString().slice(0, 10);
  const { upcoming, past } = await getEventsList(today);
  return { upcoming, past };
}

export function meta() {
  return [
    { title: 'Events · Mockingbird Arts' },
    {
      name: 'description',
      content:
        'What is coming up at Mockingbird Arts, and everything we have gathered for since 2021.',
    },
  ];
}

function clock(t?: string) {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

function longDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function EventRow({ e, showYear }: { e: ListEvent; showYear?: boolean }) {
  const start = clock(e.startTime);
  const end = clock(e.endTime);
  const time = start ? (end ? `${start}–${end}` : start) : null;
  const when = showYear ? `${longDate(e.date)}, ${e.date.slice(0, 4)}` : longDate(e.date);

  return (
    <Flex flexDir="column" gap="2" py="8">
      <Text textStyle="heading.sm">
        <Link to={eventHref(e)} className={link({ underline: false })}>
          {e.title}
        </Link>
      </Text>
      <Text>
        {when}
        {time ? ` · ${time}` : ''}
        {e.venueName ? ` · ${e.venueName}` : ''}
      </Text>
      {e.programSlug && e.programName ? (
        <Text>
          Part of{' '}
          <Link to={`/programs/${e.programSlug}`} className={link({ underline: false })}>
            {e.programName}
          </Link>
        </Text>
      ) : null}
    </Flex>
  );
}

export default function EventsPage({ loaderData }: Route.ComponentProps) {
  const { upcoming, past } = loaderData;
  const [program, setProgram] = useState('all');
  const [shown, setShown] = useState(ARCHIVE_PAGE);

  // Every program that actually appears, so the filter never offers an
  // option that yields nothing.
  const programs = useMemo(() => {
    const seen = new Map<string, string>();
    for (const e of [...upcoming, ...past]) {
      if (e.programSlug && e.programName) seen.set(e.programSlug, e.programName);
    }
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [upcoming, past]);

  const match = (e: ListEvent) => program === 'all' || e.programSlug === program;
  const up = upcoming.filter(match);
  const archive = past.filter(match);
  const visible = archive.slice(0, shown);

  // Year headings are landmarks in a long reverse-chronological list.
  const withYearBreaks: Array<{ year?: string; event: ListEvent }> = [];
  let lastYear = '';
  for (const e of visible) {
    const year = e.date.slice(0, 4);
    withYearBreaks.push({ year: year === lastYear ? undefined : year, event: e });
    lastYear = year;
  }

  return (
    <SiteWrapper>
      <VStack alignItems="stretch" gap="8" py="12">
        <Flex justifyContent="space-between" alignItems="baseline" gap="4" flexWrap="wrap">
          <Heading as="h1">Events</Heading>
        {/* A subscription beats checking back. Regenerated on every deploy,
            same as every page here. */}
        <Text>
          <a href="/events.ics" className={link()}>
            Subscribe in your calendar
          </a>
        </Text>
          <label>
            <Text as="span">Show </Text>
            <select
              value={program}
              onChange={(ev) => {
                setProgram(ev.target.value);
                setShown(ARCHIVE_PAGE);
              }}
            >
              <option value="all">All programs</option>
              {programs.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </Flex>

        <Box>
          <Heading as="h2">Upcoming</Heading>
          {up.length === 0 ? (
            <Text>Nothing on the calendar right now. The archive is below.</Text>
          ) : (
            up.map((e) => <EventRow key={e._id} e={e} />)
          )}
        </Box>

        {archive.length > 0 && (
          <Box>
            <Divider direction="horizontal" />
            {/* Anchor so the archive can be linked directly. */}
            <Heading as="h2" id="past">
              Past
            </Heading>
            {/* Exhibitions are not in the main nav, so the archive is where
                someone looking backwards will find them. */}
            <Text>
              Looking for past shows? See{' '}
              <Link to="/exhibitions" className={link()}>
                exhibitions
              </Link>
              .
            </Text>
            {withYearBreaks.map(({ year, event }) => (
              <Box key={event._id}>
                {year ? <Text textStyle="heading.sm">{year}</Text> : null}
                <EventRow e={event} />
              </Box>
            ))}
            {shown < archive.length && (
              <button type="button" onClick={() => setShown(shown + ARCHIVE_PAGE)}>
                Show {Math.min(ARCHIVE_PAGE, archive.length - shown)} more
              </button>
            )}
          </Box>
        )}
      </VStack>
    </SiteWrapper>
  );
}
