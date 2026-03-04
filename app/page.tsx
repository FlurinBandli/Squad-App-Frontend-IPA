/**
 * Home page component that checks for user authentication and redirects accordingly.
 * If a session exists, the user is redirected to the admin squads page.
 * If no session exists, the user is redirected to the login page.
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  redirect(session ? "/admin/squads" : "/login");
}
