# unplugin-fonts-ext-ordering

The `transform` field allows to sort the order of the font extensions. [vite.config.ts](./vite.config.ts)

```ts
// This is the order in which the font extensions are sorted.
const FONT_ORDER = ['woff2', 'woff', 'otf', 'ttf', 'svg', 'eot'].map(ext => `.${ext}`)

export default defineConfig({
  plugins: [
    UnFonts({
      custom: {
        display: 'swap',
        families: [
          {
            name: 'Noto Sans',
            src: './src/fonts/*',

            // Logic to sort the order of font extensions.
            transform(font) {
              const orderedFiles = font.files.sort((a, b) =>
                FONT_ORDER.indexOf(a.ext) - FONT_ORDER.indexOf(b.ext))
              font.files = orderedFiles
              return font
            },
          },
        ],
      },
    }),
  ],
})
```

Previously, `otf` was loaded first and `woff2` was loaded later, resulting in an `@font-face` like the one below:

```css
@font-face {
  font-family: 'Noto Sans';
  src: url('/src/fonts/NotoSans-Regular.otf') format('opentype')
    url('/src/fonts/NotoSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Changing the settings to load `woff2` first and `otf` later looks like this:

```css
@font-face {
  font-family: 'Noto Sans';
  src: url('/src/fonts/NotoSans-Regular.woff2') format('woff2')
    url('/src/fonts/NotoSans-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Check out the [vite.config.ts](./vite.config.ts) file for the full setup.
