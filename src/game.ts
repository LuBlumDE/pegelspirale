import type { DrawInput, Outcome } from "./types";

export function clampSuper(s: number): number {
  if (Number.isNaN(s)) return 50;
  return Math.min(101, Math.max(0, Math.floor(s)));
}

export function drawNumber(): number {
  // Ganzzahl in [0..101]
  return Math.floor(Math.random() * 102);
}

export function isOver(n: number): boolean {
  return n >= 51;
}

export function inSuperRange(n: number, superNumber: number): boolean {
  const s = clampSuper(superNumber);
  const lo = Math.max(0, s - 2);
  const hi = Math.min(101, s + 2);
  return n >= lo && n <= hi;
}

/** Reihenfolge: super → correct → wrong  */
export function evaluate(input: DrawInput, n: number): Outcome {
  if (inSuperRange(n, input.superNumber)) return { kind: "super", n };

  const over = isOver(n);
  const correct =
    (input.guess === "over" && over) || (input.guess === "under" && !over);

  if (correct) return { kind: "correct", n };
  return { kind: "wrong", n };
}
