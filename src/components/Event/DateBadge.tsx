import { Text } from '@okshaun/components';
import { Flex } from '@styled-system/jsx';
import { badgeDate } from '../../lib/event-format';

/**
 * The yellow month/day block. Figma: "Site/Date badge / yellow" (2142:2337).
 * The month line overlaps the day by 10px in the design, so the pair reads
 * as one unit rather than two stacked labels.
 *
 * The text is neutral.100 (#292a2e), not the `text` token: `text` turns light
 * in dark mode, and the badge stays yellow, so its text must stay dark.
 */
export function DateBadge({ date }: { date: string }) {
  const { month, day } = badgeDate(date);
  return (
    <Flex
      direction="column"
      alignItems="center"
      flexShrink="0"
      width="56"
      py="6"
      bg="brand.yellow"
      color="neutral.100"
      textAlign="center"
      aria-hidden="true"
    >
      <Text as="span" textStyle="mono.sm" fontWeight="bold" color="neutral.100" lineHeight="default" mb="-10">
        {month}
      </Text>
      <Text as="span" textStyle="heading.md" color="neutral.100" lineHeight="tight">
        {day}
      </Text>
    </Flex>
  );
}
