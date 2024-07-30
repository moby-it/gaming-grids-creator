<script setup lang="ts">
const email = defineModel<string>("email");
const password = defineModel<string>("password");

async function login() {
    const res = await $fetch<string>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email: email.value, password: password.value }),
    });
    console.log(res);
}
</script>
<template>
    <input v-model="email" />
    <input v-model="password" />
    <button @click="login">save</button>
</template>
