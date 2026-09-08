import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { exhibitionDates, isCurrent } from '../../src/lib/exhibition-format';
import { getExhibitions, type ExhibitionCard } from '../../src/lib/sanity';
import type { Route } from './+types/exhibitions';

export async function loader() {
  return { exhibitions: await getExhibitions() };
}

export function meta() {
  return [
    { title: 'Exhibitions · Mockingbird Arts' },
    { name: 'description', content: 'Exhibitions presented by Mockingbird Arts.' },
  ];
}

function Row({ e }: { e: ExhibitionCard }) {
  return (
    <Flex flexDir="column" gap="1">
      <Text textStyle="heading.sm">
        <Link to={`/exhibitions/${e.slug}`} className={link({ underline: false })}>
          {e.title}
        </Link>
      </Text>
      <Text>
        {exhibitionDates(e)}
        {e.venueName ? ` · ${e.venueName}` : ''}
      </Text>
    </Flex>
  );
}

export default function Exhibitions({ loaderData }: Route.ComponentProps) {
  const { exhibitions } = loaderData;
  // Same shape as the events page: what is on now, then the archive.
  const current = exhibitions.filter(isCurrent);
  const past = exhibitions.filter((e) => !isCurrent(e));

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="12" py="48">
        <Heading as="h1">Exhibitions</Heading>

        {exhibitions.length === 0 ? (
          <Text>Nothing listed yet.</Text>
        ) : (
          <>
            {current.length > 0 && (
              <Box>
                <Heading as="h2">On now</Heading>
                <VStack alignItems="flex-start" gap="8">
                  {current.map((e) => (
                    <Row key={e._id} e={e} />
                  ))}
                </VStack>
              </Box>
            )}

            {past.length > 0 && (
              <Box>
                <Heading as="h2" id="past">
                  Past
                </Heading>
                <VStack alignItems="flex-start" gap="8">
                  {past.map((e) => (
                    <Row key={e._id} e={e} />
                  ))}
                </VStack>
              </Box>
            )}
          </>
        )}
      </VStack>
    </SiteWrapper>
  );
}
