import { cva } from '@styled-system/css';

/**
 * A Sanity image shown whole, at its own shape. It fills the column up to a
 * maximum width and never wider than the screen, so a phone gets no sideways
 * scroll. The height follows the photo's own ratio.
 *
 * The request asks Sanity for a width only, never a crop. Each size asks for
 * about twice its maximum width, for high-density screens.
 */
const image = cva({
  base: { display: 'block', width: 'full', height: 'auto' },
  variants: {
    size: {
      portrait: { maxWidth: 'lg' }, // artist photo, 512px
      work: { maxWidth: '2xl' }, // a piece of work, 672px
      hero: { maxWidth: '4xl' }, // exhibition image, 896px
    },
  },
});

const REQUEST_WIDTH = { portrait: 1024, work: 1344, hero: 1792 } as const;

type Props = {
  url: string;
  alt: string;
  size: keyof typeof REQUEST_WIDTH;
};

export function ContentImage({ url, alt, size }: Props) {
  return (
    <img
      src={`${url}?w=${REQUEST_WIDTH[size]}&auto=format`}
      alt={alt}
      loading="lazy"
      className={image({ size })}
    />
  );
}
