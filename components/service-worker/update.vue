<script setup lang="ts">
import { ToastAction, useToast } from '~/components/ui/toast'

const { $pwa } = useNuxtApp();

const { toast } = useToast();
onMounted(() => {
  if ($pwa?.offlineReady) {
    toast({
      title: 'Die App ist offline verfügbar',
      variant: 'destructive',
      duration: 3000,
    });
  }

  if ($pwa?.needRefresh) {
    toast({
      title: 'Neuer Inhalt verfügbar',
      description: 'Klicken Sie auf die Schaltfläche zum Aktualisieren.',
      action: h(ToastAction, {
        altText: 'Aktualisieren',
      }, {
        default: $pwa?.updateServiceWorker(),
      }),
    });
  }
});
</script>

<template></template>
