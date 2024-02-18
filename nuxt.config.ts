// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', '@vite-pwa/nuxt'],
  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
      },
    },
  },
});
