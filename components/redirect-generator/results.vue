<script lang="ts" setup>
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { useClipboard } from '@vueuse/core';
import { useToast } from '~/components/ui/toast';

const props = defineProps<{
  redirect: string;
}>();
const { t } = useI18n();

const { copy, copied } = useClipboard({ source: props.redirect });
const { toast } = useToast();

watch(copied, () => {
  if (copied.value) {
    toast({
      title: t('passwordGenerator.copied'),
      duration: 3000,
    });
  }
});
</script>

<template>
  <div class="grid w-full gap-4">
    <Textarea :defaultValue="redirect" readonly rows="4" />
    <Button @click="copy()">{{ $t('passwordGenerator.copy') }}</Button>
  </div>
</template>
