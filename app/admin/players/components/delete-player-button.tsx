"use client";

/**
 * Component for rendering a button to delete a player, with a confirmation dialog.
 * When the delete button is clicked, an AlertDialog is shown to confirm the action.
 * If the user confirms, the deletePlayerAction is called to perform the deletion,
 * and a toast notification is displayed based on the result.
 */

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePlayerAction } from "@/app/admin/players/actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeletePlayerButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const result = await deletePlayerAction(id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          title="Spieler löschen"
          className="cursor-pointer"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Spieler wirklich löschen?</AlertDialogTitle>
          <AlertDialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
