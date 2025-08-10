import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/pegelspirale/',       // wichtig für GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        anleitung: resolve(__dirname, 'anleitung.html'),
        spiel:     resolve(__dirname, 'spiel.html'),
      },
    },
  },
})
