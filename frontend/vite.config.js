import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
      }),
    ],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  }
})
