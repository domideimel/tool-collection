// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    injectRegister: 'auto',
    includeAssets: ['favicon.ico', 'robots.txt', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
    },
    manifest: {
      'name': 'Toolbox',
      'short_name': 'Toolbox',
      'theme_color': '#101014',
      'background_color': '#101014',
      'display': 'standalone',
      'orientation': 'portrait',
      'scope': '/',
      'start_url': '/',
      'icons': [{
        'src': 'android-chrome-192x192.png',
        'type': 'image/png',
        'sizes': '192x192'
      }, {
        'src': 'android-chrome-512x512.png',
        'type': 'image/png',
        'sizes': '512x512'
      }]
    }
},
  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
      },
    },
  },
});
