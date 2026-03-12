/**
 * This is the main entry point for the admin section of the FC Zürich-Leutschenbach Squad App.
 * When users navigate to /admin, they will be automatically redirected to the /admin/squads page,
 * which serves as the dashboard for managing squads. This redirection is handled using Next.js's
 * server-side redirect function, ensuring a seamless user experience.
 */

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/admin/squads");
}
