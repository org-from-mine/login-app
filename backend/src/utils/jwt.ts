import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import dotenv from "dotenv";
import { CookieService } from "../config/cookieConfig";
import { Response } from "express";

dotenv.config();

type TimeUnit = "s" | "m" | "h" | "d";
type ExpiresIn = `${number}${TimeUnit}` | number;

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || ("15m" as StringValue);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

export function signJwt(payload: object, expiresIn?: ExpiresIn) {
  const options: SignOptions = {
    expiresIn: (expiresIn || JWT_EXPIRES_IN) as StringValue,
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    return null;
  }
}

export function createAuthToken(
  payload: { userId: string; email: string },
  res: Response,
  expiresIn?: ExpiresIn
): string {
  const token = signJwt(payload, expiresIn);
  CookieService.setAuthCookie(res, token);
  return token;
}
