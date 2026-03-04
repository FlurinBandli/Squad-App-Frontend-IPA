import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

/**
 * Proxy function that runs before requests reach protected admin routes.
 * It checks if a valid NextAuth session exists.
 */

export async function proxy(request: NextRequest) {
  // Retrieve the current session using NextAuth's auth function
  const session = await auth();

  // If no session exists, the user is not redirected to the login page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a session exists, allow the request to continue
  return NextResponse.next();
}

// Define the matcher to check all routes under /admin
export const config = {
  matcher: ["/admin/:path*"],
};
