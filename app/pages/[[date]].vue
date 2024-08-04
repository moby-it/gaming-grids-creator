<script setup lang="ts">
const route = useRoute();
const date = route.params["date"];
if (!date) navigateTo(`${getCurrentMonth() + 1}-${getCurrentYear()}`);
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
    <section class="container">
        <span class="icon" @click="decrementMonth">&larr;</span>
        <span class="date">{{ formatDateAsMonthYear(monthIdx, year) }}</span>
        <span class="icon" @click="incrementMonth">&rarr;</span>
    </section>
    <section>
        <Calendar :month="monthIdx" :year />
    </section>
</template>
<style scoped>
.date {
    font-size: 1.5rem;
    font-weight: bold;
}
.container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: baseline;
}
.icon {
    user-select: none;
    cursor: pointer;
    font-size: 2.5rem;
    &:hover {
        color: gray;
    }
}
</style>
