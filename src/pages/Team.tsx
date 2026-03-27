import {
  Box,
  Text,
  Heading,
  Divider,
  useMediaQuery,
} from "@okshaun/components";
import { Grid, Flex, VStack } from "@styled-system/jsx";
import { SiteWrapper } from "../components/SiteWrapper";
import { css } from "@styled-system/css";

const imageWrapper = css({
  position: "relative",
  maxWidth: "xs",
  aspectRatio: "square",
  order: { base: "2", md: "unset" },
});

const image = css({
  width: "full",
  filter: "[grayscale(100%)]",
  position: "relative",
  zIndex: "-1",
});

const imageOverlay = css({
  display: "block",
  position: "absolute",
  top: "16",
  left: "16",
  bg: { base: "yellow.60/20", _dark: "yellow.60/10" },
  width: "full",
  height: "full",
  zIndex: "10",
  mixBlendMode: { base: "multiply", _dark: "plus-lighter" },
});

const eyebrow = css({
  textStyle: "mono.md",
  textTransform: "uppercase",
  letterSpacing: "widest",
});

export default function Team() {
  const isDesktop = useMediaQuery("md");
  return (
    <VStack gap="64">
      <SiteWrapper py="64" gap="64" alignItems="start" maxWidth="4xl">
        <Heading as="h1">Our Team</Heading>
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "1fr auto" }}
          gap="48"
          alignItems="center"
          justifyItems="center"
          mb="48"
        >
          <Flex flexDir="column" gap="8">
            <Heading className={eyebrow}>Executive Director</Heading>
            <Text as="span" textStyle="heading.sm">
              Katie Fox
            </Text>
            <Text textStyle="body.lg">
              Katie Fox serves as the Executive Director of Mockingbird Arts.
              She has been involved in the arts throughout her entire life, most
              recently as leader of the Faith+Arts ministry at Christ Church
              Austin since 2015. Katie&rsquo;s undergraduate degree is in music,
              and she has a Master's degree from Fuller Seminary, with a focus
              in theology and the arts. Her background also includes study
              and/or experience in writing, theater, and art history. Katie is
              passionate about equipping artists, and believes that beauty will
              save the world.
            </Text>
          </Flex>
          <Box className={imageWrapper}>
            <Box
              as="img"
              src="/assets/katie-fox-mockingbird.jpg"
              alt="Headshot of Katie Fox"
              className={image}
            />
            <Box className={imageOverlay} />
          </Box>
        </Grid>

        <Grid
          gridTemplateColumns={{ base: "1fr", md: "auto 1fr" }}
          gap="48"
          alignItems="center"
          justifyItems="center"
          mb="48"
        >
          <Box className={imageWrapper}>
            <Box
              as="img"
              src="/assets/shaun-fox-mockingbird.jpg"
              alt="Headshot of Shaun Fox"
              className={image}
            />
            <Box className={imageOverlay} />
          </Box>
          <Flex flexDir="column" gap="8">
            <Heading className={eyebrow}>Associate Director</Heading>
            <Text as="span" textStyle="heading.sm">
              Shaun Fox
            </Text>
            <Text textStyle="body.lg">
              Shaun Fox serves as the Associate Director of Mockingbird Arts.
              With a BFA in Communication Design from Texas State University and
              nearly twenty years in design and technology, he brings both
              strategic insight and hands-on experience to his work. He is also
              a woodworker and photographer, driven by an enduring curiosity for
              craft and a commitment to building thoughtful structures that
              support artists and creative practice.
            </Text>
          </Flex>
        </Grid>
      </SiteWrapper>
      <Divider weight="thick" color="yellow.60" />
      <SiteWrapper py="64" gap="64" alignItems="start" maxWidth="4xl">
        <Heading>Board of Directors</Heading>
        <Grid
          gap="32"
          gridTemplateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
          // gridAutoRows='120px auto auto'
        >
          <Grid columnGap="48" rowGap="32" gridTemplateColumns="1fr 1fr">
            <Flex flexDir="column">
              <Text className={eyebrow}>Board Chair</Text>
              <Text textStyle="heading.sm">Kevin Lloyd</Text>
            </Flex>
            {/*<Flex flexDir="column">
              <Text className={eyebrow}>Vice Chair</Text>
              <Text textStyle="heading.sm">—</Text>
            </Flex>*/}
            <Flex flexDir="column">
              <Text className={eyebrow}>Secretary</Text>
              <Text textStyle="heading.sm">Akiko Scott</Text>
            </Flex>
            <Flex flexDir="column">
              <Text className={eyebrow}>Treasurer</Text>
              <Text textStyle="heading.sm">—</Text>
            </Flex>
          </Grid>
          <Divider direction={isDesktop ? "vertical" : "horizontal"} />
          <Flex flexDir="column">
            <Text className={eyebrow}>Additional Members</Text>
            <Text textStyle="heading.sm">Camille Sales</Text>
            <Text textStyle="heading.sm">Bryson Owen</Text>
            <Text textStyle="heading.sm">Phaedra Taylor</Text>
            <Text textStyle="heading.sm">W. David O. Taylor</Text>
          </Flex>
        </Grid>
      </SiteWrapper>
    </VStack>
  );
}
