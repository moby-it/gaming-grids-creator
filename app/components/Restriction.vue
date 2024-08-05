<script setup lang="ts">
import type { Restriction } from "#imports";
const selected = defineModel<Restriction>();
const restrictions = inject<Restriction[]>("restrictions");
</script>

<template>
    <UInputMenu
        v-model="selected"
        :options="restrictions"
        option-attribute="display_name"
        value-attribute="id"
        :search-attributes="['display_name', 'name']"
    />
</template>
