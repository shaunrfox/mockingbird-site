import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cva, cx } from '@styled-system/css';

/**
 * A short label, such as an artist's medium. Two sizes, after the
 * faithandarts.org pattern:
 *
 * - sm: display only. Figma "Tag" (2289:2574): Body-Sans/sm (sans.sm, 14px on
 *   18px), 2px by 8px padding. Used inside a card, where the card itself is
 *   the link.
 * - md: 16px, 4px by 12px padding. Not in Figma yet. Used where each tag is its
 *   own link: the medium filter on /artists and the mediums on an artist page.
 *
 * With `href`, the tag renders a Link with hover, pressed, and focus states.
 * `selected` marks the filter that matches the current page.
 */
const tag = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '2',
    bg: 'bg.neutral',
    color: 'text',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
  variants: {
    size: {
      sm: { textStyle: 'sans.sm', lineHeight: 'tight', px: '8', py: '2' },
      md: { textStyle: 'sans.md', lineHeight: 'tight', px: '12', py: '4' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        _hover: { bg: 'bg.neutral.hovered' },
        _active: { bg: 'bg.neutral.pressed' },
        _focusVisible: {
          outlineStyle: 'solid',
          outlineWidth: '2',
          outlineColor: 'border.focused',
          outlineOffset: '2',
        },
      },
    },
    selected: {
      true: {
        bg: 'bg.neutral.bold',
        color: 'text.inverse',
        _hover: { bg: 'bg.neutral.bold' },
        _active: { bg: 'bg.neutral.bold' },
      },
    },
  },
  defaultVariants: { size: 'sm' },
});

export type TagSize = 'sm' | 'md';

type TagProps = {
  children: ReactNode;
  size?: TagSize;
  href?: string;
  selected?: boolean;
  className?: string;
};

export function Tag({ children, size = 'sm', href, selected = false, className }: TagProps) {
  const classes = cx(tag({ size, interactive: Boolean(href), selected }), className);
  if (href) {
    return (
      <Link to={href} className={classes} aria-current={selected ? 'page' : undefined}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}

/**
 * Tags that wrap onto more lines when the row is full. Figma: "TagList"
 * (2289:2586), 6px between tags in both directions. A real list, so screen
 * readers announce how many tags there are.
 */
const list = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6',
    listStyle: 'none',
    m: '0',
    p: '0',
  },
});

export type TagItem = { label: string; href?: string; selected?: boolean };

type TagListProps = {
  items: TagItem[];
  size?: TagSize;
  /** Names the list for screen readers, e.g. "Filter by medium". */
  'aria-label'?: string;
  className?: string;
};

export function TagList({ items, size = 'sm', className, ...rest }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul className={cx(list(), className)} aria-label={rest['aria-label']}>
      {items.map((t) => (
        <li key={t.href ?? t.label}>
          <Tag size={size} href={t.href} selected={t.selected}>
            {t.label}
          </Tag>
        </li>
      ))}
    </ul>
  );
}
