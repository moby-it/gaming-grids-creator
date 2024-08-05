<script setup lang="ts">
const props = withDefaults(defineProps<{ backLink: string }>(), {
    backLink: "",
});
</script>
<template>
    <h1 class="text-2xl mb-4">Gaming Grids Creator</h1>
    <NuxtLink
        class="text-xl text-gray-400 border-b hover:text-gray-300"
        v-if="$props.backLink"
        :to="backLink"
        ><UIcon name="i-iconoir-arrow-left" class="w-5 h-4" /> back</NuxtLink
    >
</template>
