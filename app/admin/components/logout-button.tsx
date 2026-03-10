"use client";
/**
 * Client-side logout button component that uses NextAuth's signOut function.
 * When clicked, it logs the user out and redirects them to the login page.
 */

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
  );
}
