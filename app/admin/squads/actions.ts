"use server";

/**
 * Action function to delete a squad.
 * @param id The ID of the squad to delete.
 * @returns A promise resolving to the result of the deletion operation.
 */
import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
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
