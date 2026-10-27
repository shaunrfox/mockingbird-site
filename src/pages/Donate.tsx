import { Box, Divider, Text, Heading } from "@okshaun/components";
import { Grid, VStack } from "@styled-system/jsx";
import { SiteWrapper } from "../components/SiteWrapper";
import { GivebutterWidget } from "../components/forms";

export default function Donate() {
  return (
    <SiteWrapper py="64" gap="32" alignItems="start" maxWidth="4xl">
      <Heading as="h1">Help us make room for artists</Heading>
      <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="40">
        <VStack alignItems="flex-start" gap="16">
          <Text>
            So much of making art happens alone. At Mockingbird Arts, we want
            to change that for the artists of Austin. We gather them around a
            table and give them a safe place to share their work. Then we
            cheer them on as they grow in character and craft, and become who
            they were meant to be.
          </Text>
          <Text>
            Your gift helps pay for the simple things that make that possible:
            a room to meet in, a pot of coffee, materials for a workshop, and
            the people who keep it all running month after month. It also
            moves us toward a dream we hold close, a space of our own that can
            be a home for this community.
          </Text>
          <Text>
            If you&rsquo;re an artist, an art lover, or a lover of artists,
            we&rsquo;d love for you to be part of it. Thank you!
          </Text>
          <Divider />
          <Text size="12" color="text.subtlest">
            Mockingbird Arts has applied for 501(c)(3) status with the IRS. We
            will send you a receipt for every gift.
          </Text>
        </VStack>
        <Box>
          <GivebutterWidget />
        </Box>
      </Grid>
    </SiteWrapper>
  );
}
