import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * NextAuth configuration using a Credentials provider.
 * Authentication is performed by comparing the entered credentials
 * with environment variables stored on the server.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      /**
       * Called when a user attempts to sign in. It checks if the provided credentials are valid.
       * If the credentials are valid, a user object is returned.
       * Otherwise authentication fails and null is returned.
       */
      async authorize(credentials) {
        const username = process.env.AUTH_USERNAME;
        const password = process.env.AUTH_PASSWORD;

        if (!username || !password) return null;

        if (
          username === credentials?.username &&
          password === credentials?.password
        ) {
          return { id: "Admin" };
        }
        return null;
      },
    }),
  ],

  /**
   * Session configuration.
   * A JWT-based session is used so no database is required.
   */
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // session expires after 1 hour
  },
});
