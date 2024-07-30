// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    storage: {
      db: {
        driver: "fs",
        base: "./.data/db",
      },
    },
  },
  compatibilityDate: "2023-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
});
