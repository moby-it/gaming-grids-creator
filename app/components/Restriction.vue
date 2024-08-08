<script setup lang="ts">
import type { Restriction } from "#imports";
const selected = defineModel<Restriction>();
const restrictions = inject<Ref<Restriction[]>>("restrictions");
</script>

<template>
    <USelectMenu size="lg" :searchable="true" v-model="selected" :options="restrictions" option-attribute="name"
        :search-attributes="['name']" />
</template>
