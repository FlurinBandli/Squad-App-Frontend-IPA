/**
 * API route handler for updating a squad in the admin panel.
 *
 * This route handles PATCH requests to update an existing squad's information.
 */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    /**
     * Check whether the user is authenticated.
     * Unauthorized users receive a 401 response.
     */
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const data = await NestFetch(`/api/squad/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return NextResponse.json(data ?? {}, { status: 200 });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Teams:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
