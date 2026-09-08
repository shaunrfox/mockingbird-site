import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { getArtists } from '../../src/lib/sanity';
import type { Route } from './+types/artists';

export async function loader() {
  return { artists: await getArtists() };
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
  const { artists } = loaderData;

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="12" py="48">
        <Box>
          <Heading as="h1">Artists</Heading>
          <Text>The people who make up this community.</Text>
        </Box>

        {artists.length === 0 ? (
          <Text>No artists listed yet.</Text>
        ) : (
          <VStack alignItems="flex-start" gap="8">
            {artists.map((a) => (
              <Flex key={a._id} flexDir="column" gap="1">
                <Text textStyle="heading.sm">
                  <Link to={`/artists/${a.slug}`} className={link({ underline: false })}>
                    {a.name}
                  </Link>
                </Text>
                {a.mediums?.length ? <Text>{a.mediums.join(' · ')}</Text> : null}
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
    </SiteWrapper>
  );
}
