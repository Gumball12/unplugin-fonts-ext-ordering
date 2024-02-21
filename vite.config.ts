import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnFonts from 'unplugin-fonts/vite'

const FONT_ORDER = ['woff2', 'woff', 'otf', 'ttf', 'svg', 'eot'].map(ext => `.${ext}`)

export default defineConfig({
  plugins: [react(), UnFonts({
    custom: {
      display: 'swap',
      families: [
        {
          name: 'Noto Sans',
          src: './src/fonts/*',
          transform(font) {
            const orderedFiles = font.files.sort((a, b) => FONT_ORDER.indexOf(a.ext) - FONT_ORDER.indexOf(b.ext))
            font.files = orderedFiles
            return font
          },
        },
      ],
    },
  })],
})
