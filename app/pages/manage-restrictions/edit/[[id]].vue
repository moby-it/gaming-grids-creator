<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient();
const { data: restrictions } = await fetchRestrictions(supabase);

const selectedRestriction = route.params.id ? restrictions.value.find(r => r.id === route.params.id) : undefined;

</script>
<template>
  <Header back-link="/manage-restrictions" />
  <EditRestriction :restriction="selectedRestriction" />
</template>