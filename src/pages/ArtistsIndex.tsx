import { Box, Heading, Text } from '@okshaun/components';
import { Grid, VStack } from '@styled-system/jsx';
import { SiteWrapper } from '../components/SiteWrapper';
import { TagList } from '../components/Tag/Tag';
import { ArtistCard } from '../components/ArtistCard/ArtistCard';
import type { ArtistCard as ArtistCardData, Medium } from '../lib/sanity';

export const mediumHref = (m: Medium) => `/artists/medium/${m.slug}`;

type Props = {
  artists: ArtistCardData[];
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
      <VStack alignItems="flex-start" gap="24" py="48" width="full">
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
          <Grid
            as="ul"
            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            gap="24"
            width="full"
            listStyle="none"
            p="0"
            m="0"
          >
            {artists.map((a) => (
              <li key={a._id}>
                <ArtistCard artist={a} />
              </li>
            ))}
          </Grid>
        )}
      </VStack>
    </SiteWrapper>
  );
}
