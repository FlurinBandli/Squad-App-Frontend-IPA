"use server";

/**
 * Action function to delete a squad.
 * @param id The ID of the squad to delete.
 * @returns A promise resolving to the result of the deletion operation.
 */
import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { SquadPayload } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSquadAction(id: number) {
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
     * Unauthorized users receive a 401 response.
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
     * Unauthorized users receive a 401 response.
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
