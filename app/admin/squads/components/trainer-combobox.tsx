"use client";

/**
 * TrainerCombobox component used for selecting a trainer.
 *
 * Displays a searchable combobox listing all available trainers.
 * When a trainer is selected, the selected trainer object
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
import { Trainer } from "@/types";

export default function TrainerCombobox({
  trainers,
  onSelect,
}: {
  trainers: Trainer[];
  onSelect: (trainer: Trainer) => void;
}) {
  return (
    <div className="w-40">
      <Combobox
        items={trainers}
        /**
         * Defines how trainers are displayed as text in the combobox input.
         */
        itemToStringValue={(trainer: Trainer) => `${trainer.firstName} ${trainer.lastName}`}
      >
        <ComboboxInput placeholder="Trainer auswählen" />
        <ComboboxContent>
          <ComboboxEmpty>Keine Trainer gefunden</ComboboxEmpty>
          <ComboboxList>
            {(trainer: Trainer) => (
              <ComboboxItem
                key={trainer.id}
                value={`${trainer.firstName} ${trainer.lastName}`}
                /**
                 * When a trainer is clicked, pass the trainer object
                 * to the parent component.
                 */
                onClick={() => onSelect(trainer)}
              >
                {trainer.firstName} {trainer.lastName}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
