import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../components/SiteWrapper';

const PLACES = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/artists', label: 'Artists' },
  { to: '/exhibitions', label: 'Exhibitions' },
  { to: '/contact', label: 'Contact' },
];

type Props = {
  /** Set for an error that is not a missing page, such as a failed load. */
  failed?: boolean;
};

/**
 * Shown for an address that matches no page, and for a page whose content
 * does not exist, such as an artist who was removed. Lives inside the site
 * header and footer, so the visitor can still find their way.
 */
export function NotFound({ failed = false }: Props) {
  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="24" py="64">
        <Box>
          <Heading as="h1">{failed ? 'Something went wrong' : 'Page not found'}</Heading>
          <Text textStyle="body.lg">
            {failed
              ? 'This page did not load. Please try again in a moment.'
              : 'We could not find that page. It may have moved, or the address may have a typo.'}
          </Text>
        </Box>
        <nav aria-label="Places to go instead">
          <VStack as="ul" alignItems="flex-start" gap="8" listStyle="none" p="0" m="0">
            {PLACES.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className={link()}>
                  {p.label}
                </Link>
              </li>
            ))}
          </VStack>
        </nav>
      </VStack>
    </SiteWrapper>
  );
}
