export type AnimalType = "bovine" | "porcine" | "avian";

export const ANIMAL_TYPES: readonly AnimalType[] = [
  "bovine",
  "porcine",
  "avian",
] as const;
