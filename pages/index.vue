<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { MENU_ITEMS } from '~/lib/base.constants';
import { Button } from '~/components/ui/button';
import { NuxtLinkLocale } from '#components';

const { t } = useI18n();

useSeoMeta({
  description: t('description'),
});

const menuItems = computed(() => MENU_ITEMS.filter(item => item.link !== '/'));
</script>

<template>
  <h1 class="mb-4 text-2xl lg:mb-8 lg:text-4xl">{{ t('home.h1') }}</h1>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card v-for="page in menuItems">
      <CardHeader>
        <h2 class="text-2xl font-semibold leading-none tracking-tighter">{{ t(page.name) }}</h2>
      </CardHeader>
      <CardContent>
        <p v-if="page?.description">{{ t(page.description) }}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" class="w-full" :as="NuxtLinkLocale" :to="page.link">Zum Tool</Button>
      </CardFooter>
    </Card>
  </div>
</template>
