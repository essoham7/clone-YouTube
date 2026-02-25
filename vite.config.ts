import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permet le déploiement sur n'importe quel sous-chemin (ex: GitHub Pages)
})
