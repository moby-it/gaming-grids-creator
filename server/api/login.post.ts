import { compare, hash } from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/utils";

function getAllowedUsers(): string[] {
  const { allowedUsers } = useRuntimeConfig();
  if (!allowedUsers) return [];
  return allowedUsers.split(',');
}

export default defineEventHandler(async (event) => {
  const storage = useStorage("db");
  const { username, password } = await readBody(event);
  const allowedUsers = getAllowedUsers();
  if (!allowedUsers.includes(username)) {
    setResponseStatus(event, 403);
    return "Forbidden";
  }

  const encPassword = await storage.getItem<string>(username);
  if (!encPassword || !encPassword.trim()) {
    storage.setItem(username, await hash(password, 10));
  } else {
    const match = await compare(password, encPassword);
    if (!match) return setResponseStatus(event, 401);
  }
  const accessToken = createAccessToken(username);
  const refreshToken = createRefreshToken(username);
  setCookie(event, "access-token", accessToken);
  setCookie(event, "refresh-token", refreshToken);
  return {
    accessToken,
    refreshToken,
  };
});
