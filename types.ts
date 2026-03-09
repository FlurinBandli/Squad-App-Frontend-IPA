/**
 * Defines the TypeScript types used across the application
 * This file centralizes type definitions for better maintainability and type safety.
 */

type Gender = "Male" | "Female" | "Other";

type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Striker" | "Backup";

type Squad = {
  id: number;
  name: string;
  description: string;
  date: string;
  trainers: SquadTrainerInput[];
  squadPlayers: SquadPlayerInput[];
};

type Player = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
};

type Trainer = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
};

type SquadResponse = {
  id: number;
  name: string;
  description: string;
  date: string;
  trainers: Trainer[];
  squadPlayers: {
    id: number;
    position: Position;
    player: Player;
  }[];
};

/**
 * Frontend state for a selected player inside the squad builder.
 * Stores the full player object plus the assigned position.
 */

type SquadPlayer = {
  player: Player;
  position: Position;
};

/**
 * Frontend state for the full squad builder.
 */
type SquadState = {
  players: SquadPlayer[];
  trainers: Trainer[];
};

/**
 * Backend payload shape for squad players.
 */
type SquadPlayerInput = {
  player: {
    id: number;
  };
  position: Position;
};

/**
 * Backend payload shape for squad trainers.
 */
type SquadTrainerInput = {
  id: number;
};

type SquadPayload = {
  name: string;
  description: string;
  date: string;
  trainers: SquadTrainerInput[];
  squadPlayers: SquadPlayerInput[];
};

export type {
  Gender,
  Position,
  Squad,
  Player,
  Trainer,
  SquadPlayer,
  SquadState,
  SquadPlayerInput,
  SquadTrainerInput,
  SquadResponse,
  SquadPayload,
};
