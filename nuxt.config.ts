// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt'],
  app: {
    head: {
      title: 'Tool Collection',
      titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} - 'Tool Collection'` : "'Tool Collection'";
      },
    },
  },
});
