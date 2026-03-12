/**
 * Exposes the NextAuth API routes.
 * NextAuth automatically handles authentication endpoints such as:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 */
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
