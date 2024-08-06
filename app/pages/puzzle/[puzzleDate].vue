<script setup lang="ts">
import { fetchPuzzle } from "~/utils/api";

const route = useRoute();
const supabase = useSupabaseClient();

const puzzleDate = route.params["puzzleDate"];
if (!isValidDate(puzzleDate)) throw createError("invalid date on url params");

const { data: puzzle, error: puzzleError } = await fetchPuzzle(supabase, puzzleDate);
const { data: restrictions, error: restrictionsError } = await fetchRestrictions(supabase);

provide("restrictions", restrictions);
const prevUrl = "../" + fromPuzzleDateToParamDate(puzzleDate);
</script>

<template>
    <Header :back-link="prevUrl" />
    <span v-if="puzzleError">{{ puzzleError }}</span>
    <span v-if="restrictionsError">{{ restrictionsError }}</span>
    <section class="mt-3 flex flex-col" v-else>
        <header class="text-4xl text-center mb-8">{{ puzzleDate }}</header>
        <Puzzle :puzzle />
    </section>
</template>
