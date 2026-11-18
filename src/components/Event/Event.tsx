import { Link } from 'react-router';
import { Box, Text } from '@okshaun/components';
import { link } from '@styled-system/recipes';
import { css, cx } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { eventHref, type ListEvent } from '../../lib/sanity';
import { shortDate, timeRange } from '../../lib/event-format';
import { DateBadge } from './DateBadge';

// Figma shows card links in the text color, not the blue link color.
const linkInText = css({ color: 'text', _hover: { textDecoration: 'underline' } });
const cardLink = cx(link({ underline: false }), linkInText);
// The link sets its own weight, so the Mini title asks for bold back. A utility,
// not link({ bold: true }): Panda emits no CSS for recipe variants passed as
// function arguments here (checked 2026-11-17: no .oks-link--bold_true rule).
const titleLink = cx(link({ underline: false }), linkInText, css({ fontWeight: 'bold' }));

type EventProps = {
  event: ListEvent;
  /**
   * full: Figma "Layout=Desktop" at md and up, "Layout=Mobile" below.
   * mini: Figma "Layout=Mini", badge + title + time, for home-page strips.
   */
  layout?: 'full' | 'mini';
  /** Hide the description, e.g. in a long archive. Figma "Show description". */
  showDescription?: boolean;
};

/**
 * Event listing. Figma: "Event" component set (2160:135), Mockingbird file.
 * Shared by /events and the home page.
 */
export function Event({ event: e, layout = 'full', showDescription = true }: EventProps) {
  const time = timeRange(e.startTime, e.endTime);
  const when = time ? `${shortDate(e.date)} · ${time}` : shortDate(e.date);
  const href = eventHref(e);

  if (layout === 'mini') {
    return (
      <Flex gap="16" alignItems="center">
        <DateBadge date={e.date} />
        <Flex direction="column" gap="4" minWidth="0">
          <Text textStyle="heading.xs" color="text" lineHeight="tight">
            <Link to={href} className={titleLink}>
              {e.title}
            </Link>
          </Text>
          <Text textStyle="mono.sm" color="text" lineHeight="tight">
            {when}
          </Text>
        </Flex>
      </Flex>
    );
  }

  // A venue with no published address is a private home: say so instead of
  // leaving the reader to guess.
  const venueLines = e.venueName
    ? [e.venueName, e.venueAddress?.trim() || 'Contact us for the location']
    : [];

  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap="16" alignItems="flex-start">
      <DateBadge date={e.date} />
      <Flex direction="column" gap="4" flex="1" minWidth="0" width="full">
        <Text textStyle="heading.xs" color="text" lineHeight="tight">
          {e.title}
        </Text>
        <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '16' }}>
          <Flex direction="column" gap="8" flex="1" minWidth="0">
            <Text textStyle="mono.sm" color="text" lineHeight="tight">
              {when}
            </Text>
            {venueLines.length > 0 && (
              <Text textStyle="mono.sm" color="text" lineHeight="tight" whiteSpace="pre-line">
                {venueLines.join('\n')}
              </Text>
            )}
          </Flex>
          {showDescription && e.description && (
            <Text textStyle="body.sm" color="text.subtlest" lineHeight="tight" flex="1" minWidth="0">
              {e.description}
            </Text>
          )}
        </Flex>
        {/* brand.yellow is a site token (panda.config.ts). okshaun's Box types ship a
            fixed color list that does not include site tokens, so it is passed by its
            CSS variable. Switch to bg="brand.yellow" once okshaun types read the
            consumer's tokens. */}
        <Box height="2" bg="var(--oks-colors-brand-yellow)" width="full" aria-hidden="true" />
        <Text textStyle="mono.sm" color="text" lineHeight="tight">
          <Link to={href} className={cardLink}>
            View event details →
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
