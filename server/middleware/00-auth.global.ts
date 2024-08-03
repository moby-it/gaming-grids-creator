import { verifyToken } from "../utils/utils";
export default defineEventHandler(async (event) => {
  if (event.path.includes("api") || event.path === "/login") return;
  try {
    const accessToken = getCookie(event, "access-token");
    const res = verifyToken(accessToken);
    if (!res) {
      const refreshToken = getCookie(event, "refresh-token");
      const res = verifyToken(refreshToken);
      if (res) {
        const newAccessToken = createAccessToken(res.username);
        setCookie(event, "access-token", newAccessToken);
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
