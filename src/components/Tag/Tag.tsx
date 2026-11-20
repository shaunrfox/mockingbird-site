import type { ReactNode } from 'react';
import { css, cx } from '@styled-system/css';

/**
 * A short label, such as an artist's medium. Figma: "Tag" (2289:2574),
 * Mockingbird file. Body-Sans/sm (sans.sm, 14px on 18px) on bg.neutral, 2px corners.
 * Not interactive: it is a label, not a filter or a link.
 */
const tag = css({
  display: 'inline-flex',
  alignItems: 'center',
  px: '8',
  py: '2',
  borderRadius: '2',
  bg: 'bg.neutral',
  color: 'text',
  textStyle: 'sans.sm',
  lineHeight: 'tight',
  whiteSpace: 'nowrap',
});

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx(tag, className)}>{children}</span>;
}

/**
 * Tags that wrap onto more lines when the row is full. Figma: "TagList"
 * (2289:2586), 6px between tags in both directions. A real list, so screen
 * readers announce how many tags there are.
 */
const list = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6',
  listStyle: 'none',
  m: '0',
  p: '0',
});

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cx(list, className)}>
      {tags.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}
