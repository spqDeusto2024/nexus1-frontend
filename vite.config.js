import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  server: {
      host: '0.0.0.0', // Esto es esencial para que Docker lo exponga
      port: 5173,      // Garantiza que falle si el puerto está ocupad
  },
  resolve: {
   alias: {
     '@': fileURLToPath(new URL('./src', import.meta.url)),
   }
  }
})