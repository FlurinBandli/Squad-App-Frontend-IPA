"use client";

/**
 * SquadBuilder component for building a football squad with players and trainers.
 *
 * allows the admin to add players to different positions (striker, midfielder, defender, goalkeeper, backup) and also add trainers.
 *
 * Players can be added via a combobox that lists all players
 * Trainers can be added via a combobox that lists all trainers
 *
 */

import { Player, Trainer } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlayerCombobox from "./player-combobox";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from "lucide-react";
import { useState } from "react";
import TrainerCombobox from "./trainer-combobox";

export default function SquadBuilder({
  players,
  trainers,
  squad,
  setSquad,
}: {
  players: Player[];
  trainers: Trainer[];
  squad: SquadState;
  setSquad: SquadState;
}) {
  /**
   * State variables to track whether the combobox for adding a player/trainer is open for each position.
   * When true, the corresponding combobox will be displayed to allow selection.
   */
  const [addingStriker, setAddingStriker] = useState(false);
  const [addingMidfielder, setAddingMidfielder] = useState(false);
  const [addingDefender, setAddingDefender] = useState(false);
  const [addingGoalkeeper, setAddingGoalkeeper] = useState(false);
  const [addingBackup, setAddingBackup] = useState(false);
  const [addingTrainer, setAddingTrainer] = useState(false);

  const selectedPlayerIds = squad.players.map((p) => p.id);

  const playersByPosition = (position: Position) =>
    squad.players.filter((sp) => sp.position === position).map((sp) => sp.player);

  const addPlayerToPosition = (player: Player, position: Position) => {
    setSquad((prev) => {
      if (prev.players.some((sp) => sp.player.id === player.id)) return prev;
      return {
        ...prev,
        players: [...prev.players, { player, position }],
      };
    });
  };

  const removePlayer = (playerId: number) => {
    setSquad((prev) => ({
      ...prev,
      players: prev.players.filter((sp) => sp.player.id !== playerId),
    }));
  };

  const addTrainer = (trainer: Trainer) => {
    setSquad((prev) => {
      if (prev.trainers.some((t) => t.id === trainer.id)) return prev;
      return {
        ...prev,
        trainers: [...prev.trainers, trainer],
      };
    });
  };

  const removeTrainer = (trainerId: number) => {
    setSquad((prev) => ({
      ...prev,
      trainers: prev.trainers.filter((t) => t.id !== trainerId),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufstellung</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
          {/* left side: the lineup */}

          <div className="flex flex-col gap-4 border-2 w-2/3">
            {/* striker section */}

            <div className="flex items-center justify-center gap-2">
              <span>Sturm</span>
              <Button type="button" onClick={() => setAddingStriker(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {playersByPosition("striker").map((player) => (
                <div key={player.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removePlayer(player.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {player.firstName} {player.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingStriker && (
                <PlayerCombobox
                  players={players.filter((p) => !selectedPlayerIds.includes(p.id))}
                  onSelect={(player) => {
                    addPlayerToPosition(player, "striker");
                    setAddingStriker(false);
                  }}
                />
              )}
            </div>

            {/* midfielder section */}

            <div className="flex items-center justify-center gap-2">
              <span>Mittelfeld</span>
              <Button type="button" onClick={() => setAddingMidfielder(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {playersByPosition("midfielder").map((player) => (
                <div key={player.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removePlayer(player.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {player.firstName} {player.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingMidfielder && (
                <PlayerCombobox
                  players={players.filter((p) => !selectedPlayerIds.includes(p.id))}
                  onSelect={(player) => {
                    addPlayerToPosition(player, "midfielder");
                    setAddingMidfielder(false);
                  }}
                />
              )}
            </div>

            {/* defender section */}

            <div className="flex items-center justify-center gap-2">
              <span>Verteidigung</span>
              <Button type="button" onClick={() => setAddingDefender(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {playersByPosition("defender").map((player) => (
                <div key={player.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removePlayer(player.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {player.firstName} {player.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingDefender && (
                <PlayerCombobox
                  players={players.filter((p) => !selectedPlayerIds.includes(p.id))}
                  onSelect={(player) => {
                    addPlayerToPosition(player, "defender");
                    setAddingDefender(false);
                  }}
                />
              )}
            </div>

            {/* goalkeeper section */}

            <div className="flex items-center justify-center gap-2">
              <span>Torwart</span>
              <Button type="button" onClick={() => setAddingGoalkeeper(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {playersByPosition("goalkeeper").map((player) => (
                <div key={player.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removePlayer(player.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {player.firstName} {player.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingGoalkeeper && (
                <PlayerCombobox
                  players={players.filter((p) => !selectedPlayerIds.includes(p.id))}
                  onSelect={(player) => {
                    addPlayerToPosition(player, "goalkeeper");
                    setAddingGoalkeeper(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* right side the trainers and backups */}

          <div className="flex flex-col gap-4 border-2 w-1/3">
            {/* trainer section */}

            <div className="flex items-center justify-center gap-2">
              <span>Trainer</span>
              <Button type="button" onClick={() => setAddingTrainer(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {squad.trainers.map((trainer) => (
                <div key={trainer.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removeTrainer(trainer.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {trainer.firstName} {trainer.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingTrainer && (
                <TrainerCombobox
                  trainers={trainers.filter((p) => !squad.trainers.some((b) => b.id === p.id))}
                  onSelect={(trainer) => {
                    addTrainer(trainer);
                    setAddingTrainer(false);
                  }}
                />
              )}
            </div>

            {/* backup section */}

            <div className="flex items-center justify-center gap-2">
              <span>Ersatz</span>
              <Button type="button" onClick={() => setAddingBackup(true)}>
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              {playersByPosition("backup").map((player) => (
                <div key={player.id} className="flex flex-col w-32 items-center text-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removePlayer(player.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                  {player.firstName} {player.lastName}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {addingBackup && (
                <PlayerCombobox
                  players={players.filter((p) => !selectedPlayerIds.includes(p.id))}
                  onSelect={(player) => {
                    addPlayerToPosition(player, "backup");
                    setAddingBackup(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
