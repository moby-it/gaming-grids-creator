<script setup lang="ts">
import { type Puzzle } from "#imports";
const props = defineProps<{
    puzzle: Puzzle;
}>();
const form = reactive({
    name: props.puzzle.puzzle_name,
    colRestrictions: props.puzzle.col_restrictions,
    rowRestrictions: props.puzzle.row_restrictions,
});

const emits = defineEmits<{
    save: [puzzle: Puzzle];
}>();
function save() {
    console.log(toRaw(form));
}
</script>
<template>
    <form
        class="puzzle-grid grid grid-rows-[repeat(4,_120px)] grid-cols-[repeat(4,_120px)] gap-2 m-auto w-fit"
        @submit.prevent="() => $emit('save', puzzle)"
    >
        <input placeholder="Enter a name" v-model="form.name" />
        <input
            placeholder="Row Restriction 1"
            style="grid-area: row-restriction-1"
            v-model="form.rowRestrictions[0]"
        />
        <input
            placeholder="Row Restriction 2"
            style="grid-area: row-restriction-2"
            v-model="form.rowRestrictions[1]"
        />
        <input
            placeholder="Row Restriction 3"
            style="grid-area: row-restriction-3"
            v-model="form.rowRestrictions[2]"
        />
        <input
            placeholder="Column Restriction 1"
            style="grid-area: col-restriction-1"
            v-model="form.colRestrictions[0]"
        />
        <input
            placeholder="Column Restriction 2"
            style="grid-area: col-restriction-2"
            v-model="form.colRestrictions[1]"
        />
        <input
            placeholder="Column Restriction 3"
            style="grid-area: col-restriction-3"
            v-model="form.colRestrictions[2]"
        />
        <section class="cell" v-for="index in 9"></section>
        <button
            class="bg-primary-800 hover:bg-primary-700 w-20 h-10 py-6 px-10 text-center flex justify-center items-center rounded-xl"
            @click="save"
        >
            save
        </button>
    </form>
</template>
<style scoped>
.puzzle-grid {
    grid-template-areas:
        "title col-restriction-1 col-restriction-2 col-restriction-3"
        "row-restriction-1 cell cell cell"
        "row-restriction-2 cell cell cell"
        "row-restriction-3 cell cell cell"
        "button button button button";
}
button {
    grid-area: button;
    justify-self: center;
}
input {
    border: 1px solid theme("colors.gray.500");
    border-radius: theme("borderRadius.lg");
    padding: theme("padding.3");
}
</style>
