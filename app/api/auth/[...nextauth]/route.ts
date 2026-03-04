import { handlers } from "@/auth";

/**
 * Exposes the NextAuth API routes.
 * NextAuth automatically handles authentication endpoints such as:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 */
export const { GET, POST } = handlers;
