import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['parthui'],
    force: true
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/parthui/**']
    }
  }
})