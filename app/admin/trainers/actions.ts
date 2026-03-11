"use server";

/** Action functions for managing trainers in the admin panel. */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { TrainerPayload } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Action function to delete a trainer.
 * @param id The ID of the trainer to delete.
 */
export async function deleteTrainerAction(id: number) {
  const session = await auth();
  if (!session) redirect("/login");

  try {
    await NestFetch(`/api/trainer/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/trainers");
    return { success: true, message: "Trainer erfolgreich gelöscht" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Löschen des Trainers" };
  }
}

export async function createTrainerAction(payload: TrainerPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users receive a 401 response.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the trainer creation request to the NestJS backend.
     */
    const data = await NestFetch("/api/trainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Trainer erfolgreich erstellt", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Erstellen des Trainers" };
  }
}

export async function updateTrainerAction(id: number, payload: TrainerPayload) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users receive a 401 response.
     */
    const session = await auth();
    if (!session) redirect("/login");

    /**
     * Forward the trainer update request to the NestJS backend.
     */
    const data = await NestFetch(`/api/trainer/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: "Trainer erfolgreich aktualisiert", data };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Fehler beim Aktualisieren des Trainers",
    };
  }
}
