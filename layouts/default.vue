<script setup lang="ts">
import Header from '~/components/general/Header.vue';
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
</template>
