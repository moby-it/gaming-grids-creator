<script setup>
useHead({
    link: [
        {
            rel: "stylesheet",
            href: "/scrollbar.css",
        },
    ],
});
</script>
<template>
    <main>
        <UContainer class="max-w-screen-lg px-12 py-6 m-auto">
            <NuxtPage />
        </UContainer>
        <UNotifications />
    </main>
</template>
