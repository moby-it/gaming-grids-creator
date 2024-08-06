<script setup lang="ts">
type LoginResponse = { accessToken: string; refreshToken: string; };
const username = defineModel<string>("username");
const password = defineModel<string>("password");
const error = ref(false);

async function refresh() {
    const refreshToken = useCookie("refresh-token");
    if (refreshToken.value) await $fetch<string>("/api/refresh");
}
async function login() {
    const res = await $fetch<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    }).catch((e) => {
        error.value = true;
        return null;
    });

    if (res) navigateTo("/");
}
</script>
<template>
    <form class="mt-40 flex flex-col gap-4 items-center m-auto" @submit.prevent="login">
        <UInput class="w-30" type="text" v-model="username" autocomplete="username" />
        <UInput class="w-30" type="password" autocomplete="current-password" v-model="password" />
        <span class="error" v-show="error">wrong credentials</span>
        <UButton type="submit">login</UButton>
    </form>
</template>
