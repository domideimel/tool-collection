<script setup lang="ts">
import Header from '~/components/general/Header.vue';
import { Toaster } from '~/components/ui/toast';

const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: ['foo'],
  },
});

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - 'Tool Collection'` : 'Tool Collection';
  },
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
});
</script>
<template>
  <div class="flex min-h-screen flex-col bg-background">
    <Header />
    <div class="flex-1 bg-background">
      <div class="container py-8">
        <slot />
      </div>
    </div>
  </div>
  <Toaster />
</template>
