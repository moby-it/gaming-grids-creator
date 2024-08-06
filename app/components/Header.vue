<script setup lang="ts">
const route = useRoute();

withDefaults(defineProps<{ backLink?: string; }>(), {
    backLink: "",
});

</script>
<template>
    <section class="flex justify-between">
        <h1 class="text-2xl mb-4">Gaming Grids Creator</h1>
        <section class="flex gap-2 mb-10">
            <NuxtLink class="text-primary-400 hover:bg-gray-800 p-2 rounded" active-class="active"
                :class="{ 'active': 'date' in route.params }" to="/">Calendar
            </NuxtLink>
            <NuxtLink class="text-primary-400 hover:bg-gray-800 p-2 rounded" active-class="active"
                to="/manage-restrictions">Manage restrictions
            </NuxtLink>
        </section>
    </section>
    <NuxtLink class="text-xl text-gray-400 hover:text-gray-300" v-if="$props.backLink" :to="backLink">
        <UIcon name="i-iconoir-arrow-left" class="w-5 h-4" /> back
    </NuxtLink>
</template>
<style lang="css">
.active {
    background-color: theme("colors.gray.700");
}
</style>
