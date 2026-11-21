import { PortableText, type PortableTextComponents } from "@portabletext/react";
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
import type { BoardOffice, Person } from "../lib/sanity";

const imageWrapper = css({
  position: "relative",
  maxWidth: "xs",
  aspectRatio: "square",
  order: { base: "2", md: "unset" },
});

// The photo is resized, never cropped. CSS frames it in the square, centered
// on the focal point set in the studio.
const image = css({
  width: "full",
  height: "full",
  objectFit: "cover",
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

// Staff bios use the large body size, so they get their own block styles
// rather than the site-wide RichText.
const bioBlocks: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text textStyle="body.lg">{children}</Text>,
  },
};

const OFFICER_LABELS: Partial<Record<BoardOffice, string>> = {
  chair: "Board Chair",
  viceChair: "Vice Chair",
  secretary: "Secretary",
  treasurer: "Treasurer",
};
const OFFICER_ORDER: BoardOffice[] = ["chair", "viceChair", "secretary", "treasurer"];

function StaffMember({ person: p, imageFirst }: { person: Person; imageFirst: boolean }) {
  const text = (
    <Flex flexDir="column" gap="8">
      <Heading className={eyebrow}>{p.staffTitle}</Heading>
      <Text as="span" textStyle="heading.sm">
        {p.name}
      </Text>
      {p.bio ? <PortableText value={p.bio as never} components={bioBlocks} /> : null}
    </Flex>
  );
  const photo = p.photo ? (
    <Box className={imageWrapper}>
      <Box
        as="img"
        src={`${p.photo.url}?w=640&auto=format`}
        alt={`Headshot of ${p.name}`}
        className={image}
        style={
          p.photo.hotspot
            ? { objectPosition: `${p.photo.hotspot.x * 100}% ${p.photo.hotspot.y * 100}%` }
            : undefined
        }
      />
      <Box className={imageOverlay} />
    </Box>
  ) : null;

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: imageFirst ? "auto 1fr" : "1fr auto" }}
      gap="48"
      alignItems="center"
      justifyItems="center"
      mb="48"
    >
      {imageFirst ? (
        <>
          {photo}
          {text}
        </>
      ) : (
        <>
          {text}
          {photo}
        </>
      )}
    </Grid>
  );
}

/**
 * The About page: staff with photos and bios, then the board. Everyone comes
 * from person documents in Sanity, in the studio's sort order.
 *
 * Katie and Shaun are directors as well as staff. The board section lists
 * only the board members who are not already shown above as staff, as the
 * page did before it moved to Sanity.
 */
export default function Team({ people }: { people: Person[] }) {
  const isDesktop = useMediaQuery("md");
  const staff = people.filter((p) => p.staffTitle);
  const officers = OFFICER_ORDER.flatMap((office) =>
    people.filter((p) => p.boardOffice === office),
  );
  const members = people.filter((p) => p.boardOffice === "director" && !p.staffTitle);

  return (
    <VStack gap="64">
      <SiteWrapper py="64" gap="64" alignItems="start" maxWidth="4xl">
        <Heading as="h1">Our Team</Heading>
        {staff.map((p, i) => (
          // Photos alternate sides: right, left, right.
          <StaffMember key={p._id} person={p} imageFirst={i % 2 === 1} />
        ))}
      </SiteWrapper>
      <Divider weight="thick" color="yellow.60" />
      <SiteWrapper py="64" gap="64" alignItems="start" maxWidth="4xl">
        <Heading>Board of Directors</Heading>
        <Grid gap="32" gridTemplateColumns={{ base: "1fr", md: "auto auto 1fr" }}>
          <Flex flexDir="column" gap="16">
            {officers.map((p) => (
              <Flex key={p._id} flexDir="column">
                <Text className={eyebrow}>{OFFICER_LABELS[p.boardOffice!]}</Text>
                <Text textStyle="heading.sm">{p.name}</Text>
              </Flex>
            ))}
          </Flex>
          {members.length > 0 ? (
            <>
              <Divider direction={isDesktop ? "vertical" : "horizontal"} />
              <Flex flexDir="column" gap="4">
                <Text className={eyebrow}>Additional Members</Text>
                {members.map((p) => (
                  <Text key={p._id} textStyle="heading.sm">
                    {p.name}
                  </Text>
                ))}
              </Flex>
            </>
          ) : null}
        </Grid>
      </SiteWrapper>
    </VStack>
  );
}
