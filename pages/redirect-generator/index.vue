<script lang="ts" setup>
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { $fetch } from 'ofetch';
import Results from '~/components/redirect-generator/results.vue';

const rows = ref([0]);
const redirectStrings = ref<string[]>([]);

const { t } = useI18n();

useSeoMeta({
  title: t('redirectGenerator.title'),
  description: t('redirectGenerator.seoDescription'),
});

function createFormSchema(rows: number) {
  let fields: Record<string, z.ZodType<any, any>> = {};

  for (let i = 0; i < rows; i++) {
    fields[`oldUrl_${i}`] = z.string().url();
    fields[`newUrl_${i}`] = z.string().url();
  }

  return z.object(fields);
}

const formSchema = ref(toTypedSchema(createFormSchema(rows.value.length)));

watchArray(
  rows,
  () => {
    formSchema.value = toTypedSchema(createFormSchema(rows.value.length));
  },
  { deep: true },
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async values => {
  const { redirects } = await $fetch<Record<'redirects', string[]>>('api/generate-redirects', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  redirectStrings.value = redirects;
});

const addRow = (index: number) => {
  rows.value.splice(index + 1, 0, index + 1);
};

const removeRow = (index: number) => {
  rows.value.splice(index, 1);
};
</script>

<template>
  <h1>{{ $t('redirectGenerator.title') }}</h1>
  <form @submit="onSubmit">
    <Table>
      <TableHeader>
        <TableHead>{{ $t('redirectGenerator.tableHead.from') }}</TableHead>
        <TableHead>{{ $t('redirectGenerator.tableHead.to') }}</TableHead>
        <TableHead><span class="sr-only">Actions</span></TableHead>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(_, index) in rows" :key="index">
          <TableCell>
            <FormField v-slot="{ componentField }" :name="`oldUrl_${index}`">
              <FormItem>
                <FormControl :aria-label="$t('redirectGenerator.tableHead.from')">
                  <Input
                    :placeholder="$t('redirectGenerator.form.placeholder.from')"
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </TableCell>
          <TableCell>
            <FormField v-slot="{ componentField }" :name="`newUrl_${index}`">
              <FormItem>
                <FormControl :aria-label="$t('redirectGenerator.tableHead.to')">
                  <Input
                    :placeholder="$t('redirectGenerator.form.placeholder.to')"
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </TableCell>
          <TableCell>
            <div class="flex gap-2">
              <Button type="button" variant="outline" @click="addRow(index)">+</Button>
              <Button :disabled="rows.length === 1" type="button" variant="outline" @click="removeRow(index)">-</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Button type="submit">{{ $t('redirectGenerator.form.submit') }}</Button>
  </form>
  <hr v-if="redirectStrings.length" class="my-4" />
  <div v-if="redirectStrings.length" class="mt-4">
    <ul class="grid gap-y-2">
      <li v-for="redirect in redirectStrings" :key="redirect">
        <Results :redirect="redirect" />
      </li>
    </ul>
  </div>
</template>
