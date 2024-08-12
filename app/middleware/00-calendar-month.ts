export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.params['date']) {
    return navigateTo(`${getCurrentMonth() + 1}-${getCurrentYear()}`);
  }
});