import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { getPrograms } from '../../src/lib/sanity';
import type { Route } from './+types/programs';

export async function loader() {
  const today = new Date().toISOString().slice(0, 10);
  return { programs: await getPrograms(today) };
}

export function meta() {
  return [
    { title: 'Programs · Mockingbird Arts' },
    {
      name: 'description',
      content:
        'Ongoing and limited-run programs for artists in Austin — writing, songwriting, making, and time together.',
    },
  ];
}

export default function Programs({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData;

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="12" py="48">
        <Box>
          <Heading as="h1">Programs</Heading>
          <Text>What we run, and how to join in.</Text>
        </Box>

        {programs.length === 0 ? (
          <Text>Nothing listed yet.</Text>
        ) : (
          <VStack alignItems="flex-start" gap="8">
            {programs.map((p) => (
              <Flex key={p._id} flexDir="column" gap="1">
                <Text textStyle="heading.sm">
                  <Link to={`/programs/${p.slug}`} className={link({ underline: false })}>
                    {p.name}
                  </Link>
                </Text>
                <Text>{p.shortDescription}</Text>
                <Text>
                  {p.status === 'paused'
                    ? 'On pause right now'
                    : p.upcomingCount > 0
                      ? `${p.upcomingCount} date${p.upcomingCount === 1 ? '' : 's'} coming up`
                      : 'No dates on the calendar right now'}
                </Text>
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
    </SiteWrapper>
  );
}
