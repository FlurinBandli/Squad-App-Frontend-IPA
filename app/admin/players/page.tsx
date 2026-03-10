/**
 * This is the main page for managing players in the admin panel.
 *  It checks for user authentication, fetches all players from the backend API,
 *  and renders the PlayersClient component to display the list of players.
 * If the backend is unreachable, it shows an error message.
 */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { redirect } from "next/navigation";
import { Player } from "@/types";
import PlayersClient from "@/app/admin/players/components/players-client";

export default async function Players() {
  // Check if the user is authenticated, if not redirect to login page
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch all players from the NestJS backend API
  let players: Player[] = [];
  try {
    players = await NestFetch<Player[]>("/api/player");
  } catch {
    return <div className="p-4 text-destructive">Backend nicht erreichbar</div>;
  }

  return (
    <div className="p-4">
      <PlayersClient players={players} />
    </div>
  );
}
