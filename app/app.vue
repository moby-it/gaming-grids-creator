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
    <NuxtLoadingIndicator />

    <NuxtErrorBoundary>
        <template #error="{ error, clearError }">
            <section class="flex flex-col gap-12 p-24">
                <h1 class="text-2xl">UI Error</h1>
                <p class="text-orange-400">{{ error }}</p>
                <UButton class="self-center" @click="clearError" icon="i-iconoir-arrow-left">
                    Back to home</UButton>
            </section>
        </template>
        <UContainer class="max-w-screen-lg px-12 py-6">
            <NuxtPage />
        </UContainer>
        <UNotifications />
    </NuxtErrorBoundary>
</template>
<style lang="css">
#__nuxt,
body {
    width: 100%;
    min-height: 100vh;
}
</style>
