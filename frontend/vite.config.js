import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  server: {
    port: 5173,
    host: true, // Listen on all addresses
    open: true, // Auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Optional: rewrite path if needed
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 1000,
  },

  preview: {
    port: 4173,
    host: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})