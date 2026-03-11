"use client";

/**
 * SquadForm component responsible for rendering the squad creation/editing form.
 * It includes input fields for squad information and integrates the SquadBuilder component for managing players and trainers.
 * The form uses React Hook Form with Zod for validation and submits the data to the backend API.
 */

import {
  Player,
  SquadState,
  Trainer,
  SquadPlayerInput,
  Squad,
  SquadPayload,
} from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SquadBuilder from "@/app/admin/squads/components/squad-builder";
import { useRouter } from "next/navigation";
import {
  createSquadAction,
  updateSquadAction,
} from "@/app/admin/squads/actions";

/**
 * Zod schema for validating the squad form inputs.
 * It ensures that all required fields are provided.
 */

const formSchema = z.object({
  name: z.string().min(1, "Teamname ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  date: z.string().min(1, "Datum ist erforderlich"),
});

export default function SquadForm({
  players,
  trainers,
  mode = "create",
  initialSquad,
}: {
  players: Player[];
  trainers: Trainer[];
  mode?: "create" | "edit";
  initialSquad?: Squad;
}) {
  /**
   * Initializes React Hook Form with Zod validation.
   * Default values are empty for all input fields.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mode === "edit" && initialSquad ? initialSquad.name : "",
      description:
        mode === "edit" && initialSquad ? initialSquad.description : "",
      date:
        mode === "edit" && initialSquad ? initialSquad.date.split("T")[0] : "",
    },
  });
  /**
   * Prefill the form and squad state in edit mode.
   */
  const mappedInitialPlayers =
    mode === "edit" && initialSquad
      ? initialSquad.squadPlayers
          .map((sp) => {
            const fullPlayer = players.find((p) => p.id === sp.player.id);
            if (!fullPlayer) return null;

            return {
              player: fullPlayer,
              position: sp.position,
            };
          })
          .filter((v): v is NonNullable<typeof v> => !!v)
      : [];

  const mappedInitialTrainers =
    mode === "edit" && initialSquad
      ? trainers.filter((t) =>
          initialSquad.trainers.some((st) => st.id === t.id)
        )
      : [];

  const [squad, setSquad] = useState<SquadState>({
    players: mappedInitialPlayers,
    trainers: mappedInitialTrainers,
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const squadPlayers: SquadPlayerInput[] = squad.players.map((sp) => ({
      player: {
        id: sp.player.id,
      },
      position: sp.position,
    }));

    const payload: SquadPayload = {
      trainers: squad.trainers.map((t) => ({ id: t.id })),
      name: data.name,
      description: data.description,
      date: new Date(data.date).toISOString(),
      squadPlayers,
    };

    const response =
      mode === "edit" && initialSquad
        ? await updateSquadAction(initialSquad.id, payload)
        : await createSquadAction(payload);

    if (!response.success) {
      throw new Error(
        "Fehler beim " +
          (mode === "edit" ? "Aktualisieren" : "Erstellen") +
          " des Teams"
      );
    }
    router.push("/admin/squads");
  }

  return (
    <div className="w-full min-h-screen bg-slate-100 flex  gap-5 p-4">
      <div className="w-3/4">
        <SquadBuilder
          players={players}
          trainers={trainers}
          squad={squad}
          setSquad={setSquad}
        />
      </div>
      <Card className="w-1/4 bg-white shadow-lg ">
        <CardHeader className="flex flex-row items-center justify-center p-4">
          <CardTitle>Team Infos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Field className="mb-2">
              <FieldLabel>Teamname</FieldLabel>
              <Input autoFocus {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </Field>

            <Field className="mb-4">
              <FieldLabel>Beschreibung</FieldLabel>
              <Input {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </Field>

            <Field className="mb-4">
              <FieldLabel>Datum</FieldLabel>
              <Input type="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.date.message}
                </p>
              )}
            </Field>
            <div className="flex gap-2">
              <Button type="submit">
                {mode === "edit" ? "Team aktualisieren" : "Team erstellen"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/squads")}
              >
                Abbrechen
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
