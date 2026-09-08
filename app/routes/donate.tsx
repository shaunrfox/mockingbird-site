import { Link } from 'react-router';
import { Box, Divider, Heading, Text } from '@okshaun/components';
import { VStack } from '@styled-system/jsx';
import { link } from '@styled-system/recipes';
import { SiteWrapper } from '../../src/components/SiteWrapper';

/**
 * There is no payment processor wired up yet, so this page makes the case
 * and then says plainly how to give today. When a processor is chosen, the
 * "how to give" block below is the only part that changes.
 */
export function meta() {
  return [
    { title: 'Donate · Mockingbird Arts' },
    {
      name: 'description',
      content:
        'Support Mockingbird Arts — hospitality, artist formation, and cultural engagement for the common good in Austin.',
    },
    { property: 'og:title', content: 'Donate · Mockingbird Arts' },
  ];
}

export default function Donate() {
  return (
    <SiteWrapper>
      <VStack alignItems="flex-start" gap="24" py="48">
        <Box>
          <Heading as="h1">Donate</Heading>
          <Text>
            Mockingbird Arts exists to make room for artists in Austin — to
            gather them, feed them, and give their work somewhere to land.
          </Text>
        </Box>

        <Box>
          <Heading as="h2">What your gift does</Heading>
          <Text>
            Giving covers the ordinary things that make the work possible:
            the room, the coffee, the materials, and the people who keep the
            programs running week after week. Most of what we do costs little
            and depends on somebody paying for it anyway.
          </Text>
        </Box>

        <Divider direction="horizontal" />

        <Box>
          <Heading as="h2">How to give</Heading>
          <Text>
            Online giving is not set up yet. Until it is, the fastest way to
            support the work is to{' '}
            <Link to="/contact" className={link()}>
              get in touch
            </Link>{' '}
            and we will take it from there.
          </Text>
        </Box>
      </VStack>
    </SiteWrapper>
  );
}
