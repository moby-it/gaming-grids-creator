<script setup lang="ts">
const route = useRoute();
const date = route.params["date"];
if (!date) await navigateTo(`${getCurrentMonth() + 1}-${getCurrentYear()}`);
const monthIdx = Number((date as string).split("-")[0]) - 1;
const year = Number((date as string).split("-")[1]);
function incrementMonth() {
    if (monthIdx < 11) navigateTo(`${monthIdx + 2}-${year}`);
    else navigateTo(`/1-${year + 1}`);
}
function decrementMonth() {
    if (monthIdx !== 0) navigateTo(`/${monthIdx}-${year}`);
    else navigateTo(`/12-${year - 1}`);
}
</script>
<template>
    <Header />
    <section class="text-2xl text-center my-6">
        <span class="cursor-pointer text-4xl" @click="decrementMonth"
            >&larr;</span
        >
        <span class="select-none">{{
            formatDateAsMonthYear(monthIdx, year)
        }}</span>
        <span class="cursor-pointer text-4xl" @click="incrementMonth"
            >&rarr;</span
        >
    </section>
    <section>
        <Calendar :month="monthIdx" :year />
    </section>
</template>
