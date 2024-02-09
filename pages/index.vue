<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { MENU_ITEMS } from '~/lib/base.constants';
import { Button } from '~/components/ui/button';
import { NuxtLink } from '#components';

useSeoMeta({
  description: 'Eine Sammlung an Tools, die dir den Alltag erleichtern.',
});

const menuItems = computed(() => MENU_ITEMS.filter(item => item.link !== '/'));
</script>

<template>
  <h1 class="mb-4 text-2xl lg:mb-8 lg:text-4xl">Alle Tools im Überblick</h1>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card v-for="page in menuItems">
      <CardHeader>
        <h2 class="text-2xl font-semibold leading-none tracking-tighter">{{ page.name }}</h2>
      </CardHeader>
      <CardContent>
        <p v-if="page?.description">{{ page.description }}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" class="w-full" :as="NuxtLink" :to="page.link">Zum Tool</Button>
      </CardFooter>
    </Card>
  </div>
</template>
