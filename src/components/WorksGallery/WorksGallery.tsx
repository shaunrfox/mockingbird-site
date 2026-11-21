import { useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { css } from '@styled-system/css';
import type { ArtistWork } from '../../lib/sanity';

// A masonry grid: each image keeps its own shape, so nothing is cropped.
// CSS columns fill top to bottom, then left to right.
const grid = css({
  columnCount: { base: 2, md: 3 },
  columnGap: '16',
  listStyle: 'none',
  p: '0',
  m: '0',
  width: 'full',
});

const item = css({
  breakInside: 'avoid',
  mb: '16',
});

const button = css({
  display: 'block',
  width: 'full',
  p: '0',
  border: 'none',
  bg: 'transparent',
  cursor: 'zoom-in',
  borderRadius: '8',
  overflow: 'hidden',
  _focusVisible: { outlineWidth: '2', outlineStyle: 'solid', outlineColor: 'border.focused', outlineOffset: '2' },
});

const image = css({
  display: 'block',
  width: 'full',
  height: 'auto',
  transition: 'transform',
  transitionDuration: 'normal',
  _hover: { transform: 'scale(1.02)' },
});

/** Sizes Sanity is asked for in the lightbox. None is wider than the original. */
const LIGHTBOX_WIDTHS = [800, 1200, 1600, 2400];

type Props = {
  works: ArtistWork[];
  /** Names the images for screen readers when a work has no title. */
  artistName: string;
};

/**
 * An artist's works, as a grid of thumbnails that opens a full-screen
 * lightbox, like the old faithandarts.org artist pages. The lightbox fades,
 * has arrows and a close button, swipes on a phone, and has a thumbnail strip
 * that starts hidden behind a toggle.
 */
export function WorksGallery({ works, artistName }: Props) {
  const [index, setIndex] = useState(-1);
  // Closing the lightbox returns focus to the thumbnail that opened it.
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef(-1);
  const shown = works.filter((w) => w.image);

  const alt = (w: ArtistWork, i: number) =>
    w.title ? `${w.title}, by ${artistName}` : `Work ${i + 1} by ${artistName}`;

  const slides = shown.map((w, i) => {
    const img = w.image!;
    const widths = LIGHTBOX_WIDTHS.filter((x) => x < img.width).concat(img.width);
    return {
      src: `${img.url}?w=${widths[widths.length - 1]}&auto=format`,
      alt: alt(w, i),
      width: img.width,
      height: img.height,
      srcSet: widths.map((x) => ({
        src: `${img.url}?w=${x}&auto=format`,
        width: x,
        height: Math.round((img.height * x) / img.width),
      })),
    };
  });

  return (
    <>
      <ul className={grid}>
        {shown.map((w, i) => (
          <li key={w._key} className={item}>
            <button
              type="button"
              ref={(el) => {
                buttons.current[i] = el;
              }}
              className={button}
              onClick={() => {
                opener.current = i;
                setIndex(i);
              }}
            >
              <img
                src={`${w.image!.url}?w=800&auto=format`}
                alt={alt(w, i)}
                width={w.image!.width}
                height={w.image!.height}
                loading="lazy"
                className={image}
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Thumbnails]}
        thumbnails={{ hidden: true, showToggle: true }}
        animation={{ fade: 500 }}
        carousel={{ finite: shown.length <= 1 }}
        controller={{ closeOnBackdropClick: true }}
        on={{ exited: () => buttons.current[opener.current]?.focus() }}
      />
    </>
  );
}
