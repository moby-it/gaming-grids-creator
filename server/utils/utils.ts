import jwt from "jsonwebtoken";
export function createAccessToken(username: string): string {
  const { jwtSecret } = useRuntimeConfig();
  return jwt.sign({ username }, jwtSecret, { expiresIn: "4h" });
}
export function createRefreshToken(username: string): string {
  const { jwtSecret } = useRuntimeConfig();
  return jwt.sign({ username }, jwtSecret, { expiresIn: "7d" });
}
export function verifyToken(
  token: string | undefined,
): { username: string } | null {
  if (!token) return null;
  try {
    const { jwtSecret } = useRuntimeConfig();
    const payload = jwt.verify(token, jwtSecret);
    return payload as { username: string };
  } catch (e) {
    return null;
  }
}
