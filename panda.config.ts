import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  presets: ['@pandacss/preset-base'],
  include: ['src/**/*.{tsx,astro}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      recipes: {
        button: {
          className: 'button',
          variants: { size: { sm: { h: '8' }, lg: { h: '12' } } },
        },
      },
    },
  },
})
