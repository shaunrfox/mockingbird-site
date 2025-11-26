import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  html: { scrollBehavior: 'smooth' },
  body: {
    fontFamily: 'body',
    color: 'text.subtlest',
    bg: 'surface',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'heading',
    color: 'text',
    fontWeight: 'bold',
    lineHeight: 'calc(1em + 0.5rem)',
  },
});
