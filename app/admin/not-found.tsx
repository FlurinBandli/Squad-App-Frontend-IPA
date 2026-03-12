"use client";

/**
 * NotFound component that displays a user-friendly message when a page is not found.
 * It provides a link to navigate back to the home page.
 * This component is used in the application to handle 404 errors gracefully.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Diese Seite existiert nicht</h1>
      <p>Die gewünschte Seite konnte nicht geladen werden.</p>
      <Link href="/admin/squads" className="text-blue-500 hover:underline">
        Zurück zur Admin Startseite
      </Link>
    </div>
  );
}
