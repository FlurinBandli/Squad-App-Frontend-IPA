/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/**
 * Error component that displays a user-friendly message when an error occurs.
 * It provides a link to navigate back to the home page.
 * This component is used in the application to handle errors gracefully.
 */
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen</h1>
      <p>Diese Seite konnte nicht geladen werden.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
