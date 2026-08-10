import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export { SESSION_COOKIE } from "./session-cookie";

const SECRET = process.env.AUTH_SECRET;
if (!SECRET) {
  // Fail loudly rather than silently signing tokens with "undefined".
  throw new Error("AUTH_SECRET is not set. Add it to your .env file.");
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export type SessionPayload = {
  sub: string; // admin user id
  email: string;
  name: string;
};

export function createSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, SECRET as string, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, SECRET as string) as SessionPayload;
  } catch {
    return null;
  }
}
