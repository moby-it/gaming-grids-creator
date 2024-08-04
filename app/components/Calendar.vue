<script setup lang="ts">
const _props = defineProps<{ month: number; year: number }>();
const month = toRef(_props, "month");
const year = toRef(_props, "year");
const daysOfMonth = computed(() => getDaysInMonth(year.value, month.value));
const supabase = useSupabaseClient();
const { data: puzzles, status } = await useAsyncData(
    async () => {
        const { data: puzzles } = await supabase
            .from("puzzle")
            .select("puzzle_name, date")
            .gte("date", getFirstDayOfMonth(month.value, year.value))
            .lte("date", getLastDayOfMonth(month.value, year.value));

        return puzzles;
    },
    { watch: [month, year] },
);
function getPuzzleNameByDay(day: number): string | undefined {
    if (!puzzles.value?.length) return;
    const date = new Date(year.value, month.value, day)
        .toISOString()
        .substring(0, 10);
    return puzzles.value.find((p) => p.date === date)?.puzzle_name;
}
function getGridArea(day: number, month: number, year: number) {
    // Calculate the day of the week (0-based, Sunday is 0)
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();

    // Calculate the day of the month, adjusted for the starting day of the week
    const adjustedDay = day + dayOfWeek - 1;

    // Calculate the week of the month (1-based)
    const weekOfMonth = Math.ceil(adjustedDay / 7);

    // Construct the grid area
    const dayOfWeekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        adjustedDay % 7
    ];
    const gridArea = `${dayOfWeekName}${weekOfMonth}`;
    return gridArea;
}
</script>
<template>
    <section>
        <section class="calendar">
            <DaysOfWeek />
            <CalendarDay
                v-if="status === 'success'"
                :style="{ 'grid-area': getGridArea(day, month, year) }"
                v-for="day in daysOfMonth"
                :day
                :month
                :year
                :puzzle-name="getPuzzleNameByDay(day)"
            />
        </section>
    </section>
</template>
<style scoped>
section {
    margin: auto;
    max-width: 1024px;
}
.calendar {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
