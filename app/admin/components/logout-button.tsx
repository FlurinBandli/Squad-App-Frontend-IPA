"use client";
/**
 * Client-side logout button component that uses NextAuth's signOut function.
 * When clicked, it logs the user out and redirects them to the login page.
 */

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      className="cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
