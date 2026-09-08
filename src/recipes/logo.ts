import { defineRecipe, type SystemStyleObject } from '@pandacss/dev';

/**
 * Aspect ratio of each `<symbol>` in `src/assets/logos-sprite.svg`.
 * The outer `<svg>` deliberately carries no `viewBox` — a `viewBox` is a DOM
 * attribute and so can't respond to breakpoints. The ratio lives here instead,
 * as a recipe variant, which makes it conditional like any other Panda style.
 */
export const LOGO_RATIOS = {
  'mockingbird-logo': '165/106',
  'mockingbird-logo-badge': '186/126',
  'mockingbird-arts-logotype': '194/32',
  'mkbd-arts-logotype': '112/32',
  'mkbd-arts-logo': '126/83',
  'mkbd-arts-logo-2': '155/32',
  'mkbd-logo': '71/58',
  'mkbd-logo-2': '104/32',
  'mkbd-sm-bird': '39/32',
} as const;

export type LogoName = keyof typeof LOGO_RATIOS;

export const LOGO_NAMES = Object.keys(LOGO_RATIOS) as LogoName[];

// Built rather than written out: the reveal selector has to be keyed off the
// variant name, and a computed key would widen the style object's type.
const logoVariants = Object.fromEntries(
  Object.entries(LOGO_RATIOS).map(([name, ratio]) => [
    name,
    {
      aspectRatio: `[${ratio}]`,
      // Re-hide every lockup before revealing this one: at a breakpoint the
      // wider media query must be able to switch the previous variant back off.
      '& > [data-logo]': { display: 'none' },
      [`& > [data-logo='${name}']`]: { display: 'inline' },
    } as SystemStyleObject,
  ])
) as Record<LogoName, SystemStyleObject>;

export const logoRecipe = defineRecipe({
  className: 'logo',
  description: 'Mockingbird logo lockups, switchable per breakpoint',
  base: {
    color: 'icon',
    display: 'block',
    // Both `auto` so an author can set either dimension and let the variant's
    // aspect-ratio derive the other. Without this the SVG's absent width/height
    // presentation attributes resolve to 100%.
    width: 'auto',
    height: 'auto',
    // Every lockup is rendered as a <use>; the variant re-shows just one, so
    // the visible lockup can change per breakpoint without swapping the DOM.
    '& > [data-logo]': { display: 'none' },
  },
  variants: {
    variant: logoVariants,
  },
  defaultVariants: {
    variant: 'mockingbird-logo',
  },
});
