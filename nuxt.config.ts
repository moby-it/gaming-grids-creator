// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image", "@nuxtjs/supabase", "@nuxt/ui"],
  nitro: {
    storage: {
      db: {
        driver: "fs",
        base: "./.data/db",
      },
    },
  },
  runtimeConfig: {
    jwtSecret: "",
  },
  compatibilityDate: "2023-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  supabase: {
    redirect: false,
  },
});
