import { verifyToken } from "../utils/utils";
const publicAPIEndpoints = ["/api/refresh", "/api/login", "/api/health"];
export default defineEventHandler(async (event) => {
  // protect api endpoints with auth
  const accessToken = getCookie(event, "access-token");

  const res = verifyToken(accessToken);
  if (res) return;
  if (
    publicAPIEndpoints.includes(event.path) ||
    (event.path === "/login" && !res)
  )
    return;
  try {
    if (event.path === "/login" && res) {
      return await sendRedirect(event, "/");
    } else {
      const refreshToken = getCookie(event, "refresh-token");
      const res = verifyToken(refreshToken);
      if (res) {
        console.log('token refreshed');
        const newAccessToken = createAccessToken(res.username);
        setCookie(event, "access-token", newAccessToken);
        return;
      } else {
        throw new Error("failed to renew token");
      }
    }
  } catch (e) {
    deleteCookie(event, "access-token");
    deleteCookie(event, "refresh-token");
    await sendRedirect(event, "/login");
  }
});
