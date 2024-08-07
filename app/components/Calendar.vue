<script setup lang="ts">
const _props = defineProps<{ month: number; year: number; }>();
const month = toRef(_props, "month");
const year = toRef(_props, "year");
const daysOfMonth = computed(() => getDaysInMonth(year.value, month.value));
const supabase = useSupabaseClient();
const { data: puzzles, status } = await useAsyncData(
    async () => {
        const { data: puzzles } = await supabase
            .from("puzzle")
            .select("name, date")
            .gte("date", getFirstDayOfMonth(month.value, year.value))
            .lte("date", getLastDayOfMonth(month.value, year.value));

        return puzzles;
    },
    { watch: [month, year] },
);
function getPuzzleNameByDay(day: number): string | undefined {
    if (!puzzles.value?.length) return;
    const date = formatDate(day, month.value, year.value);
    return puzzles.value.find((p) => p.date === date)?.name;
}

</script>
<template>
    <section>
        <section class="grid gap-6 grid-cols-7 calendar">
            <DaysOfWeek />
            <CalendarDay v-if="status === 'success'" :style="{ 'grid-area': getGridArea(day, month, year) }"
                v-for="day in daysOfMonth" :day :month :year :puzzle-name="getPuzzleNameByDay(day)" />
        </section>
    </section>
</template>
<style scoped>
.calendar {
    grid-template-rows: 50px repeat(6, 1fr);
    grid-template-areas:
        "mon tue wed thu fri sat sun"
        "mon1 tue1 wed1 thu1 fri1 sat1 sun1"
        "mon2 tue2 wed2 thu2 fri2 sat2 sun2"
        "mon3 tue3 wed3 thu3 fri3 sat3 sun3"
        "mon4 tue4 wed4 thu4 fri4 sat4 sun4"
        "mon5 tue5 wed5 thu5 fri5 sat5 sun5"
        "mon6 tue6 wed6 thu6 fri6 sat6 sun6";
}
</style>
