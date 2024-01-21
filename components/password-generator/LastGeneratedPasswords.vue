<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import type { PasswordMap } from '~/types/password-generator.model';
import { useToast } from '~/components/ui/toast';
import { Button } from '~/components/ui/button';
import { ClipboardIcon, TrashIcon } from '@heroicons/vue/24/outline';

const state = useStorage<PasswordMap>('lastGeneratedPasswords', new Map(), window?.localStorage);
const { copy } = useClipboard({ legacy: true });
const { toast } = useToast();

const getLastGeneratedPassword = async (password: string) => {
  try {
    await copy(password);
    toast({
      title: 'Passwort kopiert',
      description: 'Das Passwort wurde in die Zwischenablage kopiert.',
      duration: 3000,
    });
  } catch (e) {
    toast({
      title: 'Es ist ein Fehler aufgetreten',
      description: 'Das Passwort konnte nicht in die Zwischenablage kopiert werden.',
      variant: 'destructive',
      duration: 3000,
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="[key, password] in state" :key="key" class="flex w-full items-center justify-between gap-2">
      <span class="truncate text-sm font-semibold">{{ password }}</span>
      <div class="flex gap-2">
        <Button size="icon" @click="() => getLastGeneratedPassword(password)"><ClipboardIcon class="h-4 w-4" /></Button>
        <Button size="icon" @click="() => state.delete(key)"><TrashIcon class="h-4 w-4" /></Button>
      </div>
    </div>
  </div>
</template>
