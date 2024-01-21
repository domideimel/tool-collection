<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import PasswordGeneratorForm from '~/components/password-generator/PasswordGeneratorForm.vue';

useSeoMeta({
  title: 'Passwort Generator',
  description: 'Hier können custom Passwörter in beliebiger Länge generiert werden lassen.',
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
    <Card>
      <CardHeader>
        <CardTitle> Password Generator</CardTitle>
        <CardDescription> Hier können custom Passwörter in beliebiger Länge generiert werden lassen.</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <template #fallback>
            <div class="flex flex-col gap-1">
              <Skeleton class="h-8 w-full" v-for="_ in 10" />
            </div>
          </template>
          <PasswordGeneratorForm />
        </ClientOnly>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle> Zuletzt generiere Passwörter</CardTitle>
        <CardDescription> Hier werden die zuletzt generierten Passwörter angezeigt.</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly></ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>
