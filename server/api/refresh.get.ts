import jwt from "jsonwebtoken";
import { createAccessToken } from "../utils/utils";
export default defineEventHandler((event) => {
  const refreshToken = getCookie(event, "refresh-token");
  if (!refreshToken) return setResponseStatus(event, 204);
  const { jwtSecret } = useRuntimeConfig();
  try {
    const payload: any = jwt.verify(refreshToken, jwtSecret);
    setCookie(event, "access-token", createAccessToken(payload.username));
  } catch (err) {
    console.log(err);
    deleteCookie(event, "refresh-token");
    setResponseStatus(event, 204);
  }
});
