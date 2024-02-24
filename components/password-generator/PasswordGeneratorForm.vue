<script setup lang="ts">
import { useToast } from '~/components/ui/toast';
import { useStorage } from '@vueuse/core';
import type { PasswordMap } from '~/types/password-generator.model';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { generatePassword } from '~/lib/password-generator/utils';
import { PASSWORD_CACHE_LENGTH } from '~/lib/password-generator/pw-gen.constants';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Slider } from '~/components/ui/slider';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';

const { t } = useI18n();

const generatedPassword = ref<string>('');

const sliderNumber = ref<number[]>([6]);
const uppercase = ref<boolean>(true);
const lowercase = ref<boolean>(true);
const symbols = ref<boolean>(true);
const numbers = ref<boolean>(true);
const hasCopied = ref<boolean>(false);
const checkboxItems = computed(() => [
  {
    id: 'uppercase',
    label: t('passwordGenerator.uppercase'),
  },
  {
    id: 'lowercase',
    label: t('passwordGenerator.lowercase'),
  },
  {
    id: 'symbols',
    label: t('passwordGenerator.symbols'),
  },
  {
    id: 'numbers',
    label: t('passwordGenerator.numbers'),
  },
]);

const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), window?.localStorage);
const { copy } = useClipboard({ legacy: true });
const { toast } = useToast();

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
  hasCopied.value = false;
  generatedPassword.value = generatePassword({
    lower: !!values.lowercase,
    upper: !!values.uppercase,
    number: !!values.numbers,
    symbol: !!values.symbols,
    length: values.passwordLength?.[0] ?? 6,
  });
});

const getGeneratedPassword = async () => {
  try {
    if (!generatedPassword.value.length) {
      new Error(t('passwordGenerator.notgenerated'));
    }
    if (hasCopied.value) {
      new Error(t('passwordGenerator.copied_error'));
    }
    if (state.value.size >= PASSWORD_CACHE_LENGTH) {
      state.value.delete(state.value.keys().next().value);
    }
    await copy(generatedPassword.value);
    state.value.set(generatedPassword.value, generatedPassword.value);
    toast({
      title: t('passwordGenerator.copied'),
      description: t('passwordGenerator.copied_success'),
      duration: 3000,
    });
    hasCopied.value = true;
  } catch (e: any) {
    toast({
      title: t('error'),
      description: e.message,
      variant: 'destructive',
      duration: 3000,
    });
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-8">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>{{ $t('passwordGenerator.placeholder') }}</FormLabel>
          <FormControl>
            <div class="flex gap-1">
              <Input disabled type="text" :value="generatedPassword" placeholder="Password" v-bind="componentField" />
              <Button type="button" @click="getGeneratedPassword" :disabled="!generatedPassword.length || hasCopied">
                {{ $t('passwordGenerator.copy') }}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="passwordLength">
        <FormItem>
          <FormLabel>{{ $t('passwordGenerator.pw_length') }}</FormLabel>
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
      <Button class="w-full" size="sm" type="submit">{{ $t('passwordGenerator.generate') }}</Button>
    </div>
  </form>
</template>
