import { Box, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { getProgram } from '../../src/lib/sanity';
import type { Route } from './+types/program';

/**
 * Runs at BUILD time — ssr is false, so this never executes on a request.
 * The result is baked into the prerendered HTML.
 */
export async function loader({ params }: Route.LoaderArgs) {
  const today = new Date().toISOString().slice(0, 10);
  const program = await getProgram(params.slug, today);
  if (!program) throw new Response('Not found', { status: 404 });
  return { program };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.program) return [{ title: 'Mockingbird Arts' }];
  return [
    { title: `${data.program.name} · Mockingbird Arts` },
    { name: 'description', content: data.program.shortDescription },
    { property: 'og:title', content: `${data.program.name} · Mockingbird Arts` },
    { property: 'og:description', content: data.program.shortDescription },
  ];
}

function when(e: { date: string; startTime?: string; endTime?: string }) {
  const d = new Date(`${e.date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  if (!e.startTime) return d;
  const clock = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'pm' : 'am';
    const hour = h % 12 === 0 ? 12 : h % 12;
    return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
  };
  return e.endTime
    ? `${d}, ${clock(e.startTime)}–${clock(e.endTime)}`
    : `${d}, ${clock(e.startTime)}`;
}

export default function ProgramPage({ loaderData }: Route.ComponentProps) {
  const { program } = loaderData;
  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="8" py="12">
        <Box>
          <Heading as="h1">{program.name}</Heading>
          <Text>{program.shortDescription}</Text>
        </Box>

        <Box>
          <Heading as="h2">Upcoming</Heading>
          {program.upcoming.length === 0 ? (
            <Text>No dates on the calendar right now.</Text>
          ) : (
            <VStack alignItems="flex-start" gap="3">
              {program.upcoming.map((e) => (
                <Flex key={e._id} flexDir="column">
                  <Text textStyle="heading.sm">{when(e)}</Text>
                  {e.venueName ? <Text>{e.venueName}</Text> : null}
                </Flex>
              ))}
            </VStack>
          )}
        </Box>

        {program.past.length > 0 && (
          <Box>
            <Heading as="h2" id="past">
              Past
            </Heading>
            <VStack alignItems="flex-start" gap="2">
              {program.past.map((e) => (
                <Text key={e._id}>
                  {when(e)}
                  {e.venueName ? ` · ${e.venueName}` : ''}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </SiteWrapper>
  );
}
