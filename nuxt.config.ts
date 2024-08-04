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
    url: "https://hermeldb.moby-it.com",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzIyMjAwNDAwLAogICJleHAiOiAxODc5OTY2ODAwCn0.A2CnJ1KEJcEtb_01pC9WVKoadTXwGBT8yC3SSFGKZZA",
    redirect: false,
  },
});
