export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', '@vite-pwa/nuxt', '@nuxtjs/i18n'],
  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
      },
    },
  },
  i18n: {
    langDir: 'lang',
    baseUrl: 'https://tool-box.netlify.app',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.ts',
      },
      {
        code: 'de',
        iso: 'de',
        name: 'Deutsch',
        file: 'de.ts',
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: false,
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    injectRegister: 'auto',
    includeAssets: ['favicon.ico', 'robots.txt', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Toolbox',
      short_name: 'Toolbox',
      theme_color: '#101014',
      background_color: '#101014',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: 'android-chrome-512x512.png',
          type: 'image/png',
          sizes: '512x512',
        },
        {
          src: 'android-chrome-512x512.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any maskable',
        },
      ],
    },
  },
});
