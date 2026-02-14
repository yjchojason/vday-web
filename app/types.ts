export type Step = 1 | 2 | 3 | 4;

export type FlowerType = "rose" | "tulip" | "daisy" | "sunflower" | "lily" | "lavender";

export type FlowerColor = "red" | "pink" | "yellow" | "purple" | "white" | "orange" | "blue";

export interface BouquetItem {
  id: string;
  type: FlowerType;
  color: FlowerColor;
  position: { x: number; y: number };
}

export interface ProgressState {
  currentStep: Step;
  completedSteps: Step[];
}
