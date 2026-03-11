/**
 * This is the main page for managing trainers in the admin panel.
 *  It checks for user authentication, fetches all trainers from the backend API,
 *  and renders the TrainersClient component to display the list of trainers.
 * If the backend is unreachable, it shows an error message.
 */

import { auth } from "@/auth";
import { NestFetch } from "@/lib/nest-api";
import { redirect } from "next/navigation";
import { Trainer } from "@/types";
import TrainersClient from "@/app/admin/trainers/components/trainers-client";

export default async function Trainers() {
  // Check if the user is authenticated, if not redirect to login page
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch all trainers from the NestJS backend API
  let trainers: Trainer[] = [];
  try {
    trainers = await NestFetch<Trainer[]>("/api/trainer");
  } catch {
    return <div className="p-4 text-destructive">Backend nicht erreichbar</div>;
  }

  return (
    <div className="p-4">
      <TrainersClient trainers={trainers} />
    </div>
  );
}
