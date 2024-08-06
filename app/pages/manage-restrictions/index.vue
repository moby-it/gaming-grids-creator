<script setup lang="ts">

const supabase = useSupabaseClient();
const { data: restrictions } = await fetchRestrictions(supabase);
provide('restrictions', restrictions);
const columns = [{
  key: 'display_name',
  label: 'Name',
  sortable: true
},
{ key: 'champion_list', label: 'Champions' }, {
  key: 'actions', label: 'Actions'
}];
const page = ref(1);
const pageCount = 5;
const tableTerm = ref('');
watch(tableTerm, () => {
  page.value = 1;
});
const filteredResults = computed(() => filterRestrictions(tableTerm.value, restrictions.value));
const rows = computed(() => {
  return filteredResults.value.slice((page.value - 1) * pageCount, (page.value) * pageCount);
});



</script>
<template>
  <Header />

  <section class="flex justify-between">
    <NuxtLink to="/manage-restrictions/edit">
      <UButton icon="i-iconoir-plus-circle">Add restriction </UButton>
    </NuxtLink>
    <UInput placeholder="Search..." v-model="tableTerm" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-show="tableTerm !== ''" color="gray" variant="link" :padded="false" class="cursor-pointer"
          icon="i-iconoir-xmark" @click="tableTerm = ''" />
      </template>
    </UInput>
  </section>

  <UTable class="mb-6" :columns :rows>
    <template #champion_list-data="{ row }">
      <p class="text-wrap truncate">{{ row.champion_list.join(', ') }}</p>
    </template>
    <template #actions-data="{ row }">
      <section class="flex justify-center">
        <NuxtLink :to="`/manage-restrictions/edit/${row.id}`">
          <UIcon name="i-iconoir-edit-pencil" />
        </NuxtLink>
      </section>
    </template>
  </UTable>
  <UPagination v-model="page" :page-count="pageCount" :total="filteredResults.length" />
</template>