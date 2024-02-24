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
    strategy: 'no_prefix',
    lazy: true,
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.ts',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts',
      },
    ],
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    },
    devOptions: {
      enabled: true,
    },
    registerWebManifestInRouteRules: true,
    includeAssets: ['favicon.ico', 'robots.txt', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Toolbox',
      short_name: 'Toolbox',
      description:
        'Discover our extensive collection of tools designed to make your everyday life easier. From productivity to organization - find exactly what you need to work more efficiently and achieve more.',
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
