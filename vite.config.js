import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/JobSculpt',
  server: {
    host: true, // This will allow you to access the server from your phone
    port: 5173, // You can change the port if needed
  },

})
