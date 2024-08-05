<script setup lang="ts">
import { Restriction as RestrictionT, type Puzzle } from "#imports";
import { _0 } from "#tailwind-config/theme/zIndex";
const props = defineProps<{
    puzzle: Puzzle;
}>();

const emits = defineEmits<{
    save: [puzzle: Puzzle];
}>();

const form = reactive({
    name: props.puzzle.puzzle_name,
    colRestrictions: props.puzzle.col_restrictions,
    rowRestrictions: props.puzzle.row_restrictions,
});
const restrictions = inject<RestrictionT[]>("restrictions");
if (!restrictions) throw createError("restrictios not found");

const results = computed(() => {
    const results = new Array(9).fill(0);
    form.rowRestrictions.forEach((rr, idx) => {
        form.colRestrictions.forEach((cr, idy) => {
            if (rr && cr)
                results[idy + idx * 3] = calculateResults(restrictions, rr, cr);
        });
    });
    return results;
});
function save() {
    console.log(toRaw(form));
}
</script>
<template>
    <form
        class="puzzle-grid grid grid-rows-4 grid-cols-4 gap-2 m-auto w-fit"
        @submit.prevent="() => $emit('save', puzzle)"
    >
        <input placeholder="Enter a name" v-model="form.name" />
        <section
            v-for="index of 3"
            class="h-100"
            :style="{ 'grid-area': 'row-restriction-' + index }"
        >
            <Restriction v-model="form.rowRestrictions[index - 1]" />
        </section>
        <section
            v-for="index of 3"
            class="h-100"
            :style="{ 'grid-area': 'col-restriction-' + index }"
        >
            <Restriction v-model="form.colRestrictions[index - 1]" />
        </section>
        <section class="text-center p-3 rounded m-auto" v-for="index in 9">
            <UPopover mode="hover">
                Answers: {{ results[index - 1]?.length || 0 }}
                <template #panel>
                    <section v-if="results[index - 1]" class="p-3">
                        {{ results[index - 1].join(", ") }}
                    </section>
                </template>
            </UPopover>
        </section>
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
