import { Box, Text, Heading, Divider } from '@okshaun/components';
import { Grid, Flex, VStack } from '@styled-system/jsx';
import { SiteWrapper } from '../components/SiteWrapper';
import { css } from '@styled-system/css';

const imageWrapper = css({
  position: 'relative',
  maxWidth: 'xs',
  aspectRatio: 'square',
  order: { base: '2', md: 'unset' },
});

const image = css({
  width: 'full',
  filter: '[grayscale(100%)]',
  position: 'relative',
  zIndex: '-1',
});

const imageOverlay = css({
  display: 'block',
  position: 'absolute',
  top: '16',
  left: '16',
  bg: { base: 'yellow.60/20', _dark: 'yellow.60/10' },
  width: 'full',
  height: 'full',
  zIndex: '10',
  mixBlendMode: { base: 'multiply', _dark: 'plus-lighter' },
});

const eyebrow = css({
  textStyle: 'mono.md',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
});

export default function Team() {
  return (
    <VStack gap='64'>
      <SiteWrapper py='64' gap='64' alignItems='start' maxWidth='4xl'>
        <Heading as='h1'>Our Team</Heading>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: '1fr auto' }}
          gap='48'
          alignItems='center'
          justifyItems='center'
        >
          <Flex flexDir='column' gap='8'>
            <Heading className={eyebrow}>Executive Director</Heading>
            <Text as='span' textStyle='heading.sm'>
              Katie Fox
            </Text>
            <Text textStyle='body.lg'>
              Qui aliqua elit do exercitation voluptate mollit culpa ipsum dolor
              et nisi fugiat mollit excepteur aute. Consequat tempor duis do ut
              quis laborum nulla. Nostrud exercitation mollit culpa qui ullamco
              magna dolor culpa adipisicing sint exercitation non exercitation
              amet.
            </Text>
          </Flex>
          <Box className={imageWrapper}>
            <Box
              as='img'
              src='/assets/katie-fox-mockingbird.jpg'
              alt='Headshot of Katie Fox'
              className={image}
            />
            <Box className={imageOverlay} />
          </Box>
        </Grid>

        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'auto 1fr' }}
          gap='48'
          alignItems='center'
          justifyItems='center'
        >
          <Box className={imageWrapper}>
            <Box
              as='img'
              src='/assets/shaun-fox-mockingbird.jpg'
              alt='Headshot of Shaun Fox'
              className={image}
            />
            <Box className={imageOverlay} />
          </Box>
          <Flex flexDir='column' gap='8'>
            <Heading className={eyebrow}>Associate Director</Heading>
            <Text as='span' textStyle='heading.sm'>
              Shaun Fox
            </Text>
            <Text textStyle='body.lg'>
              Qui aliqua elit do exercitation voluptate mollit culpa ipsum dolor
              et nisi fugiat mollit excepteur aute. Consequat tempor duis do ut
              quis laborum nulla. Nostrud exercitation mollit culpa qui ullamco
              magna dolor culpa adipisicing sint exercitation non exercitation
              amet.
            </Text>
          </Flex>
        </Grid>
      </SiteWrapper>
      <Divider weight='thick' color='yellow.60' />
      <SiteWrapper py='64' gap='64' alignItems='start' maxWidth='4xl'>
        <Heading>Board of Directors</Heading>
        <Grid
          gap='32'
          gridTemplateColumns={{ base: '1fr', md: '1fr auto 1fr' }}
          // gridAutoRows='120px auto auto'
        >
          <Grid columnGap='48' rowGap='32' gridTemplateColumns='1fr 1fr'>
            <Flex flexDir='column'>
              <Text className={eyebrow}>Board Chair</Text>
              <Text textStyle='heading.sm'>Kevin Lloyd</Text>
            </Flex>
            <Flex flexDir='column'>
              <Text className={eyebrow}>Vice Chair</Text>
              <Text textStyle='heading.sm'>—</Text>
            </Flex>
            <Flex flexDir='column'>
              <Text className={eyebrow}>Secretary</Text>
              <Text textStyle='heading.sm'>—</Text>
            </Flex>
            <Flex flexDir='column'>
              <Text className={eyebrow}>Treasurer</Text>
              <Text textStyle='heading.sm'>—</Text>
            </Flex>
          </Grid>
          <Divider direction={{ base: 'horizontal', md: 'vertical' }} />
          <Flex flexDir='column'>
            <Text className={eyebrow}>Additional Members</Text>
            <Text textStyle='heading.sm'>—</Text>
          </Flex>
        </Grid>
      </SiteWrapper>
    </VStack>
  );
}
