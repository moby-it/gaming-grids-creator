<script setup lang="ts">
import type { Restriction } from '#imports';
import { v4 as uuid } from 'uuid';
const props = defineProps<{
  restriction?: Restriction;
}>();
const supabase = useSupabaseClient();
const toast = useToast();

const { data: champions } = await fetchChampions(supabase);
const name = ref(props.restriction?.name ?? '');
const selectedChampion = ref<string>();
const query = ref('');

const options = computed(() => {
  if (query.value.length === 0) return [];
  return champions.value?.filter(c => c.name.toLowerCase().startsWith(query.value.toLowerCase()));
});

const _selectedChampions = ref(new Set<string>(props.restriction?.champion_list));
const selectedChampions = computed(() => Array.from(_selectedChampions.value).sort());

watchEffect(() => {
  if (selectedChampion.value) {
    _selectedChampions.value.add(selectedChampion.value);
  }
});

function deleteChampion(championName: string) {
  _selectedChampions.value.delete(championName);
  selectedChampion.value = undefined;
}

async function saveRestriction() {
  const restriction: Partial<Restriction> = {
    name: transformDisplayName(name.value),
    display_name: name.value,
    hash: uuid(),
    champion_list: selectedChampions.value
  };
  if (props.restriction) restriction.id = props.restriction.id;
  const res = await $fetch("/api/restriction", {
    method: "POST",
    body: restriction,
  });
  console.log(res);
  toast.add({ title: 'Restriction saved.' });
  navigateTo('/manage-restrictions');
}

</script>
<template>
  <section class="w-fit m-auto flex flex-col gap-6 mt-12">

    <h2 class="text-xl text-center">{{ restriction ? restriction.name : 'Create new restriction' }}</h2>
    <UInput placeholder="Name... " size="lg" v-model="name" />
    <UInputMenu size="lg" v-model:query="query" v-model="selectedChampion" placeholder="Start typing to add a champion"
      searchable :options value-attribute="id" option-attribute="name" :popper="{}" />
    <UButton :disabled="!selectedChampions.length" class="self-center" @click="saveRestriction">save</UButton>

    <UDivider />
  </section>
  <h2 class="text-xl text-center my-6">Restriction champion results</h2>
  <section class="flex flex-col flex-wrap gap-2 max-h-80 overflow-auto">
    <p class="italic text-center text-sm text-gray-600" v-if="!selectedChampions.length">Select a champion
    </p>
    <section class="flex gap-2 items-center px-1 py-2 rounded" v-for="champion of selectedChampions">
      <span>{{ champion }}</span>
      <UIcon class="w-4 h-4 cursor-pointer" name="i-iconoir-trash" @click="deleteChampion(champion)" />
    </section>
  </section>
</template>