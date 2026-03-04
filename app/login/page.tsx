/**
 * Login page component that checks for an existing session and redirects accordingly.
 * If a session exists, the user is redirected to the admin squads page.
 * If no session exists, the LoginForm component is rendered for user authentication.
 */

import LoginForm from "@/app/login/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/admin/squads");
  }
  return <LoginForm />;
}
