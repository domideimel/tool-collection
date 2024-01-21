<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { Slider } from '~/components/ui/slider';
import { Checkbox } from '~/components/ui/checkbox';
import type { PasswordMap } from '~/types/password-generator.model';
import { useStorage } from '@vueuse/core';
import { generatePassword } from '~/lib/password-generator/utils';

useSeoMeta({
  title: 'Passwort Generator',
  description: 'Hier können custom Passwörter in beliebiger Länge generiert werden lassen.',
});

const generatedPassword = ref<string>('');
const sliderNumber = ref<number[]>([6]);
const uppercase = ref<boolean>(true);
const lowercase = ref<boolean>(true);
const symbols = ref<boolean>(true);
const numbers = ref<boolean>(true);

const checkboxItems = computed(() => [
  {
    id: 'uppercase',
    label: 'Großbuchstaben',
  },
  {
    id: 'lowercase',
    label: 'Kleinbuchstaben',
  },
  {
    id: 'symbol',
    label: 'Sonderzeichen',
  },
  {
    id: 'number',
    label: 'Zahlen',
  },
]);

const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), window?.localStorage);
const { copy } = useClipboard({ legacy: true });

const formSchema = toTypedSchema(
  z.object({
    password: z.string().optional(),
    passwordLength: z.number().min(6).array().optional(),
    uppercase: z.boolean().optional(),
    lowercase: z.boolean().optional(),
    symbols: z.boolean().optional(),
    numbers: z.boolean().optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    password: '',
    passwordLength: sliderNumber.value,
    uppercase: uppercase.value,
    lowercase: lowercase.value,
    symbols: symbols.value,
    numbers: numbers.value,
  },
});

const onSubmit = form.handleSubmit(values => {
  generatedPassword.value = generatePassword({
    lower: !!values.lowercase,
    upper: !!values.uppercase,
    number: !!values.numbers,
    symbol: !!values.symbols,
    length: values.passwordLength?.[0] ?? 6,
  });
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
          <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-8">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <div class="flex gap-1">
                      <Input
                        disabled
                        type="text"
                        :value="generatedPassword"
                        placeholder="Password"
                        v-bind="componentField"
                      />
                      <Button type="button">Kopieren</Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="passwordLength">
                <FormItem>
                  <FormLabel>Passwortlänge</FormLabel>
                  <FormControl>
                    <div class="flex gap-4">
                      <Slider :default-value="[6]" :max="100" :model-value="value" @update:modelValue="handleChange" />
                      <div>{{ value[0] }}</div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-for="item in checkboxItems" v-slot="{ value, handleChange }" type="checkbox" :name="item.id">
                <FormItem>
                  <FormControl>
                    <div class="flex items-center space-x-2">
                      <Checkbox :id="item.id" :checked="value" @update:checked="handleChange" />
                      <label
                        :for="item.id"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {{ item.label }}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button type="submit" size="sm" class="w-full">Passwort generieren</Button>
            </div>
          </form>
        </ClientOnly>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle> Zuletzt generiere Passwörter</CardTitle>
        <CardDescription> Hier werden die zuletzt generierten Passwörter angezeigt.</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly> </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>
