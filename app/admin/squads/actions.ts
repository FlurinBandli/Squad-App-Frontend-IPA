"use server";

/**
 * Action functions for managing squads in the admin panel.
 * These functions handle creating, updating, and deleting squads by communicating with the NestJS backend API.
 * Each function checks for user authentication, performs the necessary API calls, and handles success or error responses accordingly.
 * The deleteSquadAction function also triggers a revalidation of the squads page to reflect changes immediately.
 */
import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { SquadPayload } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
/**
 * Action function to delete a squad.
 * @param id The ID of the squad to delete.
 */
export async function deleteSquadAction(id: number) {
  /**
   * Check whether the user is authenticated.
   * Unauthorized users are redirected to the login page.
   */
  const session = await auth();
  if (!session) redirect("/login");

  try {
    await NestFetch(`/api/squad/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/squads");
    return { success: true, message: "Team erfolgreich gelöscht" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Löschen des Teams" };
  }
}

export async function createSquadAction(payload: SquadPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users are redirected to the login page.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the squad creation request to the NestJS backend.
     */
    const data = await NestFetch("/api/squad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Team erfolgreich erstellt", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Erstellen des Teams" };
  }
}

export async function updateSquadAction(id: number, payload: SquadPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users are redirected to the login page.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the squad update request to the NestJS backend.
     */
    const data = await NestFetch(`/api/squad/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Team erfolgreich aktualisiert", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Aktualisieren des Teams" };
  }
}
