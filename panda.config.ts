import { defineConfig, defineTokens } from '@pandacss/dev';
import { okshaunPreset } from '@okshaun/components/preset';
import { globalCss, fonts, keyframes } from './src/styles';

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
    './node_modules/@okshaun/components/dist/panda.buildinfo.json',
    './node_modules/@okshaun/components/dist/**/*.js',
  ],
  exclude: [],
  importMap: '@okshaun/components',
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
