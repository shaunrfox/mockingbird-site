import { Box, Heading, Text } from '@okshaun/components';
import { SiteWrapper } from '../components/SiteWrapper';
import { Flex, VStack } from '@styled-system/jsx';

export default function Home() {
  return (
    <>
      <SiteWrapper gap='64' py='64'>
        <Heading as='h1' textStyle='heading.sm' maxWidth='lg'>
          Mockingbird Arts is a new nonprofit serving artists and the people of
          Austin, through hospitality, artist formation, and cultural engagement
          for the common good.
        </Heading>
        <Text textStyle='mono.lg' textTransform='uppercase' textAlign='center'>
          <Box as='span' whiteSpace='nowrap'>
            Artists in community
          </Box>{' '}
          •{' '}
          <Box as='span' whiteSpace='nowrap'>
            Engaging the city
          </Box>{' '}
          •{' '}
          <Box as='span' whiteSpace='nowrap'>
            Enriching the culture
          </Box>
        </Text>
      </SiteWrapper>
      <Box
        bg='surface.sunken'
        borderInlineWidth='0'
        borderBlockWidth='4'
        borderStyle='solid'
        borderColor='yellow.60'
      >
        <SiteWrapper gap='56' py='96'>
          <VStack maxWidth='lg' alignItems='left' gap='16'>
            <Heading
              textStyle='body.md'
              fontFamily='sans'
              textTransform='uppercase'
              fontWeight='bold'
              letterSpacing='1'
            >
              Our vision
            </Heading>
            <Text textStyle='heading.sm'>
              The vision of Mockingbird Arts is to guide artists into community,
              to engage the city, and enrich the culture.
            </Text>
          </VStack>
          <VStack maxWidth='lg' alignItems='left' gap='16'>
            <Heading
              textStyle='body.md'
              fontFamily='sans'
              textTransform='uppercase'
              fontWeight='bold'
              letterSpacing='1'
            >
              Our mission
            </Heading>
            <VStack gap='16'>
              <Text textStyle='heading.sm'>
                To cultivate both the character and craft of the artists of
                Austin, so they may become who they were meant to be.
              </Text>
              <Text textStyle='heading.sm'>
                To create opportunities for purposeful engagement with the arts
                in Austin, in order to deepen our experience of truth, goodness,
                and beauty.
              </Text>
              <Text textStyle='heading.sm'>
                To contribute to the flourishing of our city and its culture,
                for the common good.
              </Text>
            </VStack>
          </VStack>
        </SiteWrapper>
      </Box>
      <SiteWrapper gap='16' py='96'>
        <VStack maxWidth='4xl' alignItems='left' gap='16'>
          <Heading
            textStyle='body.md'
            fontFamily='sans'
            textTransform='uppercase'
            fontWeight='bold'
            letterSpacing='1'
          >
            Our approach
          </Heading>
          <Flex
            gap='32'
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
            // bg={{ base: 'transparent', md: 'magenta.20' }}
          >
            <VStack gap='32'>
              <VStack alignItems='left'>
                <Heading level='h3'>People</Heading>
                <Text textStyle='body.lg'>
                  Austin-area artists of all disciplines are welcome to be part
                  of our community. Our gatherings provide safe space for
                  growth, collaboration, and respectful cultural dialogue.
                </Text>
              </VStack>
              <VStack alignItems='left'>
                <Heading level='h3'>Place</Heading>
                <Text textStyle='body.lg'>
                  Events are held in various spaces around the city, in
                  partnership with other organizations and businesses.
                  Eventually, we also hope to have our own space that will serve
                  as the hub for our community.
                </Text>
              </VStack>
            </VStack>
            <VStack gap='32'>
              <VStack alignItems='left'>
                <Heading level='h3'>Partnerships</Heading>
                <Text textStyle='body.lg'>
                  We seek to partner with organizations, businesses, and
                  individuals to host events and support the Mockingbird Arts
                  community in Austin. We think of partnerships falling into two
                  categories:
                </Text>
                <Box as='ul' ms='16'>
                  <Text as='li' textStyle='body.lg'>
                    Collaborative Partners &ndash; like-minded organizations
                    that want to produce events together.
                  </Text>
                  <Text as='li' textStyle='body.lg'>
                    Supporting Partners &ndash; organizations and individuals
                    that support our work through funding or providing space for
                    events.
                  </Text>
                </Box>
              </VStack>
              <VStack alignItems='left'>
                <Heading level='h3'>Funding</Heading>
                <Text textStyle='body.lg'>
                  Mockingbird Arts will be a 501c-3 non-profit, and will be
                  supported through donations from both individuals and
                  organizations.
                </Text>
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </SiteWrapper>
    </>
  );
}
