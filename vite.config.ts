import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    rollupOptions: {
      // 404.html is a standalone static page served by the host for unknown URLs.
      input: { main: root('./index.html'), notFound: root('./404.html') },
    },
  },
})
