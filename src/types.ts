// src/types.ts
export type Guess = "over" | "under";

export interface DrawInput {
  guess: Guess;
  superNumber: number; // 0..101
}

export type Outcome =
  | { kind: "super"; n: number }   // Gegner EX
  | { kind: "correct"; n: number } // Gegner 1 Schluck
  | { kind: "wrong"; n: number };  // Angreifer 1 Schluck, bleibt am Zug
