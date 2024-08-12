<script setup lang="ts">
import { Restriction as RestrictionT, type Puzzle } from "#imports";
import * as v from "valibot";


const props = defineProps<{
    puzzle: Puzzle;
}>();

const emits = defineEmits<{
    save: [puzzle: Puzzle];
}>();

const toast = useToast();
const restrictions = inject<Ref<RestrictionT[]>>("restrictions");
if (!restrictions) throw createError("restrictios not found");

const form = reactive({
    name: props.puzzle.name,
    colRestrictions: props.puzzle.col_restrictions,
    rowRestrictions: props.puzzle.row_restrictions
});

const FormSchema = v.object({
    name: v.pipe(v.string(), v.minLength(3)),
    colRestrictions: v.array(RestrictionT),
    rowRestrictions: v.array(RestrictionT),
});

const isOld = computed(() => {
    return false;
    // return new Date(props.puzzle.date).getTime() < new Date().getTime();
});

const submitDisabled = computed(() => {
    if (isOld.value) return true;
    if (results.value.some(v => v === 0)) return true;
    const { success } = v.safeParse(FormSchema, form);
    return !success;
});



const results = computed(() => {
    const results = new Array(9).fill(0);
    form.rowRestrictions.forEach((rr, idx) => {
        form.colRestrictions.forEach((cr, idy) => {
            if (rr && cr)
                results[idy + idx * 3] = getRestrictionPossibleAnswers(rr, cr);
        });
    });
    return results;
});
async function save() {
    const { output, success } = v.safeParse(FormSchema, form);
    if (!success) {
        throw createError("failed to validate form");
    } else {
        const body: Puzzle = {
            id: props.puzzle.id,
            date: props.puzzle.date,
            row_restrictions: output.rowRestrictions,
            col_restrictions: output.colRestrictions,
            name: output.name,
        };
        (body);
        await $fetch("/api/puzzle", {
            method: "POST",
            body,
        });
        toast.add({ title: "Puzzle saved." });
        navigateTo("../" + fromPuzzleDateToParamDate(props.puzzle.date));
    }
}
</script>
<template>
    <h2 v-if="isOld" class="text-orange-400 text-center m-6">cannot edit an older puzzle</h2>
    <form class="puzzle-grid grid gap-2 m-auto w-fit" @submit.prevent="() => $emit('save', puzzle)">
        <UInput :disabled="isOld" size="lg" style="grid-area: title" placeholder="Enter a name" v-model="form.name" />
        <section v-for="index of 3" :style="{ 'grid-area': 'row-restriction-' + index }">
            <Restriction :disabled="isOld" v-model="form.rowRestrictions[index - 1]" />
        </section>
        <section v-for="index of 3" :style="{ 'grid-area': 'col-restriction-' + index }">
            <Restriction :disabled="isOld" v-model="form.colRestrictions[index - 1]" />
        </section>
        <section class="text-center p-3 rounded m-auto" v-for="index in 9">
            <UPopover mode="hover">
                Answers: {{ results[index - 1]?.length || 0 }}
                <template #panel>
                    <section v-if="results[index - 1]?.length" class="p-3">
                        {{ results[index - 1].join(", ") }}
                    </section>
                </template>
            </UPopover>
        </section>
    </form>
    <UButton :disabled="submitDisabled" class="mt-8 self-center" size="lg" @click="save">
        save
    </UButton>
</template>
<style scoped>
.puzzle-grid {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
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
