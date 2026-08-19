import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env } from "./env";

/**
 * Spec 8.5: at least 32 bytes of cryptographic randomness, stored only as a
 * keyed hash, scoped to one file, one locale, one purpose, one expiry and
 * one use. base64url keeps the emailed link short without exposing entropy.
 */
export function createOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string, purpose: string): string {
  return createHmac("sha256", env.downloadTokenPepper())
    .update(`${purpose}:${token}`)
    .digest("hex");
}

export function expiresAt(hours: number): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/** Constant-time comparison for the worker's bearer secret (spec 8.4). */
export function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Deterministic, salted identifier for rate limiting — never a stored IP. */
export function rateLimitKey(kind: string, value: string): string {
  return createHmac("sha256", env.rateLimitSalt()).update(`${kind}:${value}`).digest("hex");
}
