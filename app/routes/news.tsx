import { Link } from 'react-router';
import { Box, Heading, Text } from '@okshaun/components';
import { VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';

/**
 * Placeholder. There is no `post` type in the CMS yet, so this page has no
 * loader and nothing to list — it exists so the nav item leads somewhere
 * honest rather than to a 404.
 */
export function meta() {
  return [
    { title: 'News · Mockingbird Arts' },
    { name: 'description', content: 'News from Mockingbird Arts.' },
    // Nothing here worth indexing until there are real posts.
    { name: 'robots', content: 'noindex' },
  ];
}

export default function News() {
  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="12" py="48">
        <Box>
          <Heading as="h1">News</Heading>
          <Text>
            We are just getting started here. Notes on what we are making,
            who we are making it with, and what is coming next will land on
            this page.
          </Text>
        </Box>

        <Box>
          <Text>
            In the meantime, the{' '}
            <Link to="/events" className={link()}>
              events calendar
            </Link>{' '}
            is the best picture of what is happening, and the{' '}
            <Link to="/contact" className={link()}>
              newsletter
            </Link>{' '}
            is the surest way to hear about it first.
          </Text>
        </Box>
      </VStack>
    </SiteWrapper>
  );
}
