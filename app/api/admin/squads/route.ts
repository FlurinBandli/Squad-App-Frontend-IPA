/**
 * API route responsible for creating a new squad.
 *
 * Responsibilities:
 * - Verifies that the user is authenticated.
 * - Receives the squad payload from the frontend form.
 * - Forwards the request to the NestJS backend API.
 * - Returns the backend response to the client.
 */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    /**
     * Check whether the user is authenticated.
     * Unauthorized users receive a 401 response.
     */
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    /**
     * Forward the squad creation request to the NestJS backend.
     */
    const data = await NestFetch("/api/squad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data ?? {}, { status: 201 });
  } catch (error) {
    console.error("Error creating squad:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
