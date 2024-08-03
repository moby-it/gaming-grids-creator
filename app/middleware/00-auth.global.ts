export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath === "login") return;
  const accessToken = useCookie("access-token");
});
