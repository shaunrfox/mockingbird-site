import { Link } from 'react-router';
import { Text } from '@okshaun/components';
import { css } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { TagList } from '../Tag/Tag';
import type { ArtistCard as ArtistCardData } from '../../lib/sanity';

/**
 * Artist roster card. Figma: "Artist card" (2162:140), Mockingbird file.
 * A photo 248px tall (Figma says 250, which is off the size scale) over the
 * name (Heading/md) and the mediums as small display tags. The whole card is one link to the artist page, so the tags
 * are not links. Hover adds the elevated shadow.
 *
 * With no headshot, the photo area shows the initial of the artist's sort
 * name on the brand yellow, after the "Monogram" fallback in the Figma
 * component's description. Text stays dark on the yellow in both modes, the
 * same as the event date badge.
 */
const card = css({
  display: 'flex',
  flexDirection: 'column',
  height: 'full',
  overflow: 'hidden',
  bg: 'surface',
  borderWidth: '1',
  borderStyle: 'solid',
  borderColor: 'border',
  borderRadius: '8',
  color: 'text',
  textDecoration: 'none',
  transitionProperty: 'box-shadow',
  transitionDuration: 'fast',
  _hover: { boxShadow: 'elevated' },
  _focusVisible: {
    outlineStyle: 'solid',
    outlineWidth: '2',
    outlineColor: 'border.focused',
    outlineOffset: '2',
  },
});

const photo = css({
  display: 'block',
  width: 'full',
  height: '248',
  objectFit: 'cover',
});

const monogram = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'full',
  height: '248',
  bg: 'brand.yellow',
  color: 'neutral.100',
  textStyle: 'display.lg',
  lineHeight: 'tight',
});

/** The first letter of the family name: "Clarke, Marcus" gives "C". */
const initial = (a: ArtistCardData) => (a.sortName || a.name).trim().charAt(0).toUpperCase();

export function ArtistCard({ artist: a }: { artist: ArtistCardData }) {
  const h = a.headshot;
  return (
    <Link to={`/artists/${a.slug}`} className={card}>
      {h ? (
        <img
          src={`${h.url}?w=750&h=500&fit=crop&auto=format`}
          alt=""
          loading="lazy"
          width={750}
          height={500}
          className={photo}
          // The editor's focal point, so a crop never cuts off a face.
          style={h.hotspot ? { objectPosition: `${h.hotspot.x * 100}% ${h.hotspot.y * 100}%` } : undefined}
        />
      ) : (
        <span className={monogram} aria-hidden="true">
          {initial(a)}
        </span>
      )}
      <Flex direction="column" gap="8" p="20">
        <Text as="span" textStyle="heading.md" lineHeight="tight" color="text">
          {a.name}
        </Text>
        <TagList items={a.mediums.map((m) => ({ label: m.name }))} />
      </Flex>
    </Link>
  );
}
