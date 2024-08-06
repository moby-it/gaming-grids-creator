<script setup lang="ts">
const props = defineProps<{
    day: number;
    month: number;
    year: number;
    puzzleName?: string;
}>();
function navigateToPuzzle() {
    navigateTo(`/puzzle/` + formatDate(props.day, props.month, props.year));
}
const classes =
    "cursor-pointer pt-2 pb-6 w-24 h-20 text-center text-2xl border-2 rounded-lg justify-self-center hover:bg-primary-600 ease-in duration-300";
</script>
<template>
    <section
        :class="[classes, puzzleName ? 'bg-primary-700' : '']"
        @click="navigateToPuzzle()"
    >
        <p>{{ props.day }}</p>
        <p class="text-xs" v-if="puzzleName">{{ puzzleName }}</p>
    </section>
</template>
