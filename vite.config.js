import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'Verapixels',
  base: '/verapixels/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './Verapixels/src')
    }
  }
})
