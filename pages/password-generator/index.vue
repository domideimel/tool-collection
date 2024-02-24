<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import PasswordGeneratorForm from '~/components/password-generator/PasswordGeneratorForm.vue';
import LastGeneratedPasswords from '~/components/password-generator/LastGeneratedPasswords.vue';

const { t } = useI18n();
useSeoMeta({
  title: t('passwordGenerator.title'),
  description: t('passwordGenerator.seoDescription'),
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('passwordGenerator.title') }}</CardTitle>
        <CardDescription>{{ $t('passwordGenerator.description') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <template #fallback>
            <div class="flex flex-col gap-4">
              <Skeleton class="h-8 w-full" v-for="_ in 9" />
            </div>
          </template>
          <PasswordGeneratorForm />
        </ClientOnly>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('passwordGenerator.last_passwords') }}</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <template #fallback>
            <div class="flex flex-col gap-4">
              <Skeleton class="h-8 w-full" v-for="_ in 9" />
            </div>
          </template>
          <LastGeneratedPasswords />
        </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>
