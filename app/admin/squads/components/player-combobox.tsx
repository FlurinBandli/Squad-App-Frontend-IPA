"use client";

/**
 * PlayerCombobox component used for selecting a player.
 *
 * Displays a searchable combobox listing all available players.
 * When a player is selected, the selected player object
 * is returned to the parent component via the onSelect callback.
 */
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxList,
  ComboboxInput,
} from "@/components/ui/combobox";
import { Player } from "@/types";

export default function PlayerCombobox({
  players,
  onSelect,
}: {
  players: Player[];
  onSelect: (player: Player) => void;
}) {
  return (
    <div className="w-40">
      <Combobox
        items={players}
        /**
         * Defines how trainers are displayed as text in the combobox input.
         */
        itemToStringValue={(player: Player) => `${player.firstName} ${player.lastName}`}
      >
        <ComboboxInput placeholder="Spieler auswählen" />
        <ComboboxContent>
          <ComboboxEmpty>Keine Spieler gefunden</ComboboxEmpty>
          <ComboboxList>
            {(player: Player) => (
              <ComboboxItem
                key={player.id}
                value={`${player.firstName} ${player.lastName}`}
                /**
                 * When a trainer is clicked, pass the trainer object
                 * to the parent component.
                 */
                onClick={() => onSelect(player)}
              >
                {player.firstName} {player.lastName}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
