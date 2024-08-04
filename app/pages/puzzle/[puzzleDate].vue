<script setup lang="ts">
import { fetchPuzzle } from "~/utils/api";

const route = useRoute();
const puzzleDate = route.params["puzzleDate"];
if (!isValidDate(puzzleDate)) throw createError("invalid date on url params");
const supabase = useSupabaseClient();
const { data: puzzle, error } = await fetchPuzzle(supabase, puzzleDate);
const restrictions = await fetchRestrictions(supabase);
</script>

<template>
    <Header />
    <span v-if="error">{{ error }}</span>
    <section v-else>
        <header>{{ puzzleDate }}</header>
        <Puzzle :puzzle />
    </section>
</template>

<style scoped>
section {
    margin-top: 3rem;
}
section header {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.5rem;
}
</style>
