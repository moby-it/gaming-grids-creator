export default defineNuxtRouteMiddleware((to, from) => {
  console.log(from.params, to.params);
  if (!to.params['date']) {
    return navigateTo(`${getCurrentMonth() + 1}-${getCurrentYear()}`);
  }
});