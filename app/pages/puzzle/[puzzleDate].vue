<script setup lang="ts">
import { fetchPuzzle } from "~/utils/api";

const route = useRoute();
const puzzleDate = route.params["puzzleDate"];
if (!isValidDate(puzzleDate)) throw createError("invalid date on url params");
const supabase = useSupabaseClient();
const { data: puzzle, error } = await fetchPuzzle(supabase, puzzleDate);
const restrictions = await fetchRestrictions(supabase);
provide("restrictions", restrictions);
const prevUrl = "../" + puzzleDate.split("-").slice(0, 2).reverse().join("-");
</script>

<template>
    <Header :back-link="prevUrl" />
    <span v-if="error">{{ error }}</span>
    <section class="mt-3" v-else>
        <header class="text-4xl text-center mb-8">{{ puzzleDate }}</header>
        <Puzzle :puzzle />
    </section>
</template>
