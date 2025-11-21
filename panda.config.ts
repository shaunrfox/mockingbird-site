import { defineConfig, defineTokens } from "@pandacss/dev";
import { okshaunPreset } from "@okshaun/components/preset";

const mkbdTokens = {
  fonts: {
    heading: {
      value:
        "'auto-pro-new', 'auto-pro-1-new', Geneva, Tahoma, Verdana, sans-serif",
    },
    sans: {
      value:
        "'auto-pro-new', 'auto-pro-1-new', Geneva, Tahoma, Verdana, sans-serif",
    },
    body: {
      value: "'dolly-new', Georgia, 'Times New Roman', Times, serif",
    },
    serif: {
      value: "'dolly-new', Georgia, 'Times New Roman', Times, serif",
    },
    mono: {
      value:
        "'covik-sans-mono', Andale Mono, monaco, Consolas, Lucida Console, monospace",
    },
  },
};

const theme = {
  tokens: defineTokens({
    ...mkbdTokens,
  }),
  // semanticTokens: defineSemanticTokens({
  //   ...semantics,
  // }),
};

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: "react",
  jsxStyleProps: "all",
  eject: true,
  include: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@okshaun/components/dist/panda.buildinfo.json",
    "./node_modules/@okshaun/components/dist/**/*.js",
  ],
  exclude: [],
  importMap: "@okshaun/components",
  outdir: "styled-system",
  presets: ["@pandacss/preset-base", okshaunPreset],
  prefix: "oks", // classnames weren't correct without this
  theme: {
    extend: {
      tokens: {
        ...theme.tokens,
      },
    },
  },
  globalCss: {
    html: { scrollBehavior: "smooth" },
    body: {
      fontFamily: "body",
      color: "text.subtlest",
      bg: "surface",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      color: "text",
      fontWeight: "bold",
      lineHeight: "calc(1em + 0.5rem)",
    },
  },
});
