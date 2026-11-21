import { Link } from 'react-router';
import { Button, Heading, Text } from '@okshaun/components';
import { Flex, VStack } from '@styled-system/jsx';
import { css } from '@styled-system/css';
import { SiteWrapper } from '../../src/components/SiteWrapper';
import { getPrograms, type ProgramCard } from '../../src/lib/sanity';
import type { Route } from './+types/programs';

export async function loader() {
  const today = new Date().toISOString().slice(0, 10);
  return { programs: await getPrograms(today) };
}

export function meta() {
  return [
    { title: 'Programs · Mockingbird Arts' },
    {
      name: 'description',
      content:
        'Ongoing and limited-run programs for artists in Austin — writing, songwriting, making, and time together.',
    },
  ];
}

// Figma: "Programs — alternate / photography" (2125:1357), Mockingbird file.

// The opening photo is framed by CSS, never cropped at the source.
const openingPhoto = css({
  display: 'block',
  width: 'full',
  height: { base: '[280px]', md: '[500px]' },
  objectFit: 'cover',
});

// The program photo: 616 × 470 in Figma, at most 384 wide, with the
// "Yellow offset" shadow (yellow.60 at 20%, 12px down and right, no blur).
const programPhoto = css({
  display: 'block',
  width: 'full',
  maxWidth: '[384px]',
  aspectRatio: '[616 / 470]',
  objectFit: 'cover',
  // Shows only when a program has no photo. Follows light and dark mode.
  bg: 'bg.neutral',
  boxShadow: '[12px 12px 0 0 {colors.yellow.60/20}]',
});

const status = css({
  textStyle: 'mono.xs',
  textTransform: 'uppercase',
  color: 'text',
});

function statusLine(p: ProgramCard) {
  if (p.status === 'paused') return 'On pause';
  const kind = p.kind === 'limited' ? 'Limited run' : 'Ongoing';
  const dates =
    p.upcomingCount > 0
      ? `${p.upcomingCount} upcoming date${p.upcomingCount === 1 ? '' : 's'}`
      : 'No dates yet';
  return `${kind} / ${dates}`;
}

/**
 * One program: the photo on one side and the text on the other. The sides
 * alternate down the page. On a phone the photo sits above the text.
 */
function ProgramRow({ program: p, photoFirst }: { program: ProgramCard; photoFirst: boolean }) {
  const photo = p.heroImage ? (
    <img
      src={`${p.heroImage.url}?w=800&auto=format`}
      alt=""
      loading="lazy"
      className={programPhoto}
      style={
        p.heroImage.hotspot
          ? { objectPosition: `${p.heroImage.hotspot.x * 100}% ${p.heroImage.hotspot.y * 100}%` }
          : undefined
      }
    />
  ) : (
    <div aria-hidden="true" className={programPhoto} />
  );

  return (
    <Flex
      direction={{ base: 'column', md: photoFirst ? 'row' : 'row-reverse' }}
      gap={{ base: '32', md: '64' }}
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent="center"
      width="full"
    >
      <Flex
        flex="1"
        justifyContent={{ base: 'flex-start', md: photoFirst ? 'flex-end' : 'flex-start' }}
        width="full"
        maxWidth="[384px]"
      >
        {photo}
      </Flex>
      <VStack flex="1" alignItems="flex-start" gap="16" maxWidth="[448px]">
        <Heading as="h3" textStyle="heading.md">
          {p.name}
        </Heading>
        <Text textStyle="body.lg" color="text.subtlest">
          {p.shortDescription}
        </Text>
        <Button as={Link} to={`/programs/${p.slug}`} variant="primary" iconAfter="arrow-right">
          {`Explore ${p.name}`}
        </Button>
        <Text className={status}>{statusLine(p)}</Text>
      </VStack>
    </Flex>
  );
}

export default function Programs({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData;

  return (
    <VStack gap="64" pt="48" width="full">
      <SiteWrapper gap="24" alignItems="flex-start">
        <Heading as="h1" textStyle="display.md">
          Good work. Better together.
        </Heading>
        <img
          src="/assets/programs-together.jpg"
          alt="Artists working together around a long table covered in paint and paper."
          className={openingPhoto}
        />
      </SiteWrapper>

      <SiteWrapper gap="80" alignItems="flex-start" py="64">
        <Heading as="h2" textStyle="heading.lg">
          Find your practice. Find your people.
        </Heading>
        {programs.length === 0 ? (
          <Text>Nothing listed yet.</Text>
        ) : (
          programs.map((p, i) => <ProgramRow key={p._id} program={p} photoFirst={i % 2 === 0} />)
        )}
      </SiteWrapper>

      <Flex bg="brand.yellow" width="full">
        <SiteWrapper py="40" gap="12" alignItems="flex-start">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap="16"
            alignItems={{ base: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            width="full"
          >
            {/* Dark text on the brand yellow in both modes, like the date badge. */}
            <Heading as="h2" textStyle="heading.lg" color="neutral.100">
              You don’t have to make it alone.
            </Heading>
            <Button as={Link} to="/contact" variant="primary" size="lg" iconAfter="arrow-right">
              First time here?
            </Button>
          </Flex>
          <Text textStyle="body.lg" color="neutral.100">
            Not sure where to start? We can help you find a gathering.
          </Text>
        </SiteWrapper>
      </Flex>
    </VStack>
  );
}
