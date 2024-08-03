<script setup lang="ts">
type LoginResponse = { accessToken: string; refreshToken: string };
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
    <form @submit.prevent="login">
        <input type="text" v-model="username" />
        <input type="password" v-model="password" />
        <span class="error" v-show="error">wrong credentials</span>
        <button type="submit">login</button>
    </form>
</template>
<style scoped>
form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    & input {
        width: 300px;
    }
}
</style>
