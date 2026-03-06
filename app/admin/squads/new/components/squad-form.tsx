"use client";

import { Player, SquadState, Trainer, SquadPlayerInput } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SquadBuilder from "@/app/admin/squads/new/components/squad-builder";
import { useRouter } from "next/navigation";

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
}: {
  players: Player[];
  trainers: Trainer[];
}) {
  /**
   * Initializes React Hook Form with Zod validation.
   * Default values are empty for all input fields.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
    },
  });

  const [squad, setSquad] = useState<SquadState>({
    players: [],
    trainers: [],
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const squadPlayers: SquadPlayerInput[] = squad.players.map((sp) => ({
      player: {
        id: sp.player.id,
      },
      position: sp.position,
    }));

    const payload = {
      trainers: squad.trainers.map((t) => ({ id: t.id })),
      name: data.name,
      description: data.description,
      date: new Date(data.date).toISOString(),
      squadPlayers,
    };
    const response = await fetch("/api/admin/squads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Fehler beim Erstellen des Teams");
    }

    router.push("/admin/squads");
    router.refresh();
  }

  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-200">
        <SquadBuilder players={players} trainers={trainers} squad={squad} setSquad={setSquad} />
      </div>
      <Card className="w-60 max-w-md bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Team Infos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Field className="mb-2">
              <FieldLabel>Teamname</FieldLabel>
              <Input autoFocus {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </Field>

            <Field className="mb-4">
              <FieldLabel>Beschreibung</FieldLabel>
              <Input {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </Field>

            <Field className="mb-4">
              <FieldLabel>Datum</FieldLabel>
              <Input type="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>
              )}
            </Field>

            <Button type="submit">Team erstellen</Button>
            <Button type="button" variant="outline">
              Abbrechen
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
