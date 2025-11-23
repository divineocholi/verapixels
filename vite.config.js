import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/verapixels/'
  
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    root: 'Verapixels',
    base: base,
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
  }
})
