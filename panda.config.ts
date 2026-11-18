import { defineConfig, defineTokens } from '@pandacss/dev';
import { okshaunPreset } from '@okshaun/components/preset';
import { globalCss, fonts, keyframes } from './src/styles';
import * as recipes from './src/recipes/';

const theme = {
  tokens: defineTokens({
    fonts,
  }),
  // semanticTokens: defineSemanticTokens({
  //   ...semantics,
  // }),
};

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  eject: true,
  include: [
    './src/**/*.{ts,tsx,js,jsx}',
    // React Router routes and layouts live in app/, outside src/.
    './app/**/*.{ts,tsx,js,jsx}',
    './node_modules/@okshaun/components/dist/panda.buildinfo.json',
    './node_modules/@okshaun/components/dist/**/*.js',
  ],
  exclude: [],
  // Both import roots: okshaun components, and this site's own generated
  // styled-system (imported as @styled-system/*). With only the first, Panda
  // skips css() and recipe calls imported from @styled-system, so variants
  // like link({ bold: true }) produced no CSS.
  importMap: ['@okshaun/components', '@styled-system'],
  outdir: 'styled-system',
  presets: ['@pandacss/preset-base', okshaunPreset],
  prefix: 'oks', // classnames weren't correct without this
  theme: {
    extend: {
      tokens: {
        ...theme.tokens,
      },
      keyframes: {
        ...keyframes,
      },
      recipes: {
        logo: recipes.logoRecipe,
      },
    },
  },
  // The `variant` values are picked at runtime (and can be responsive), so the
  // extractor can't see them. Emit every variant at every breakpoint instead.
  staticCss: {
    recipes: {
      logo: [{ variant: ['*'], responsive: true }],
    },
  },
  globalCss: {
    ...globalCss,
  },
  hooks: {
    'preset:resolved': ({ utils, preset, name }) => {
      if (name === '@pandacss/preset-base') {
        // Exclude specific patterns by name
        return utils.omit(preset, ['patterns.box', 'patterns.divider']);
      }
      return preset;
    },
  },
});
