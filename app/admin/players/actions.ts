"use server";

/** Action functions for managing players in the admin panel.
 * These functions handle creating, updating, and deleting players by communicating with the NestJS backend API.
 * Each function checks for user authentication, performs the necessary API calls, and handles success or error responses accordingly.
 * The deletePlayerAction function also triggers a revalidation of the players page to reflect changes immediately.
 */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { PlayerPayload } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Action function to delete a player.
 * @param id The ID of the player to delete.
 */
export async function deletePlayerAction(id: number) {
  /**
   * Check whether the user is authenticated.
   * Unauthorized users are redirected to the login page.
   */
  const session = await auth();
  if (!session) redirect("/login");

  try {
    await NestFetch(`/api/player/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/players");
    return { success: true, message: "Spieler erfolgreich gelöscht" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Löschen des Spielers" };
  }
}

export async function createPlayerAction(payload: PlayerPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users are redirected to the login page.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the player creation request to the NestJS backend.
     */
    const data = await NestFetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Spieler erfolgreich erstellt", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Erstellen des Spielers" };
  }
}

export async function updatePlayerAction(id: number, payload: PlayerPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users are redirected to the login page.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the player update request to the NestJS backend.
     */
    const data = await NestFetch(`/api/player/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Spieler erfolgreich aktualisiert", data };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Fehler beim Aktualisieren des Spielers",
    };
  }
}
