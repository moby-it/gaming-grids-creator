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
</script>
<template>
    <section
        class="day"
        :class="{ 'has-puzzle': !!puzzleName }"
        @click="navigateToPuzzle()"
    >
        <p>{{ props.day }}</p>
        <p class="puzzle-name" v-if="puzzleName">{{ puzzleName }}</p>
    </section>
</template>
<style>
.day {
    padding: 1rem 2rem;
    text-align: center;
    width: 60px;
    height: 60px;
    border: 1px solid black;
    border-radius: 1rem;
    & > p:first-child {
        font-size: 1.5rem;
    }
    & > p:nth-child(2) {
        font-size: 0.7rem;
    }
    transition: transform 0.2s;
}

.day:has(.puzzle-name) {
    background-color: var(--accent-400);
}

.day:hover {
    cursor: pointer;
    background-color: lightgray;
    transform: scale(1.1);
}
</style>
