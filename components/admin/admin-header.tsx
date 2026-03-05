/**
 * Header component for the admin section of the application.
 * Displays the title of the current admin page based on the URL path.
 * The title is determined using pathname.startsWith() so nested routes
 * such as /admin/squads/4/edit still show the correct section title.
 * Includes a logo on the right side of the header.
 * Uses the SidebarTrigger component to toggle the sidebar.
 */

"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminHeader() {
  const pathname = usePathname();

  let title = "Admin Bereich";
  if (pathname.startsWith("/admin/squads")) {
    title = "Teams Bereich";
  } else if (pathname.startsWith("/admin/players")) {
    title = "Spieler Bereich";
  } else if (pathname.startsWith("/admin/trainers")) {
    title = "Trainer Bereich";
  }

  return (
    <header className="flex items-center border-b gap-5 p-3">
      <SidebarTrigger />
      <h1 className="text-2xl font-bold">{title}</h1>
      <Image
        src="/fc-zh-leutschenbach-logo.png"
        alt="Logo"
        width={50}
        height={50}
        className="ml-auto"
      />
    </header>
  );
}
