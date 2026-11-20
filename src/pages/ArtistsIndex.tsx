import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../components/SiteWrapper';
import { TagList } from '../components/Tag/Tag';
import type { ArtistCard, Medium } from '../lib/sanity';

export const mediumHref = (m: Medium) => `/artists/medium/${m.slug}`;

type Props = {
  artists: ArtistCard[];
  mediums: Medium[];
  /** The medium this page filters by. Absent on /artists, where "All" is selected. */
  current?: Medium;
};

/**
 * The artist list, shared by /artists and /artists/medium/:slug. Each medium
 * page is prerendered, so the filter works without JavaScript and every
 * medium has an address people can share.
 */
export function ArtistsIndex({ artists, mediums, current }: Props) {
  const filters = [
    { label: 'All', href: '/artists', selected: !current },
    ...mediums.map((m) => ({
      label: m.name,
      href: mediumHref(m),
      selected: m.slug === current?.slug,
    })),
  ];

  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="12" py="48">
        <Box>
          <Heading as="h1">{current ? `Artists: ${current.name}` : 'Artists'}</Heading>
          <Text>The people who make up this community.</Text>
        </Box>

        {mediums.length > 0 ? (
          <nav aria-label="Filter artists by medium">
            <TagList items={filters} size="md" />
          </nav>
        ) : null}

        {artists.length === 0 ? (
          <Text>{current ? `No artists listed in ${current.name} yet.` : 'No artists listed yet.'}</Text>
        ) : (
          <VStack alignItems="flex-start" gap="8">
            {artists.map((a) => (
              <Flex key={a._id} flexDir="column" gap="4">
                <Text textStyle="heading.sm">
                  <Link to={`/artists/${a.slug}`} className={link({ underline: false })}>
                    {a.name}
                  </Link>
                </Text>
                {/* Display only: these move into the Artist card, which is itself the link. */}
                <TagList items={a.mediums.map((m) => ({ label: m.name }))} />
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
    </SiteWrapper>
  );
}
