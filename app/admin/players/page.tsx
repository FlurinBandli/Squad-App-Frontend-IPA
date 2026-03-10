import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NestFetch } from "@/lib/nest-api";
import { Pencil, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Player } from "@/types";

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
      <Button className="flex justify-center mb-4">Neuen Spieler erstellen</Button>

      {/* Table displaying the list of players with options to edit or delete each player */}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Vorname</TableHead>
            <TableHead>Nachname</TableHead>
            <TableHead>Geschlecht</TableHead>
            <TableHead className="text-center">Bearbeiten</TableHead>
            <TableHead className="text-center">Löschen</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                Keine Spieler gefunden.
              </TableCell>
            </TableRow>
          ) : (
            players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.firstName}</TableCell>
                <TableCell>{player.lastName}</TableCell>
                <TableCell>{player.gender}</TableCell>

                <TableCell>
                  <Pencil />
                </TableCell>
                <TableCell>
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
