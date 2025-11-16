import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'Verapixels',
  base: '/verapixels/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
