import type { ViewProps } from "react-native";

export type ShapeType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ConfettiProps extends ViewProps {
  count?: number;                     // Total confetti pieces
  colors?: string[];                  // Array of colors
  intensity?: number;                 // Multiplier for speed / distance
  minSize?: number;                   // Minimum size of confetti
  maxSize?: number;                   // Maximum size of confetti
  spread?: number;                    // Cone angle in degrees
  fallDuration?: number;              // Falling duration in ms
  upDuration?: [number, number];      // Upward duration min/max in ms
  opacityRange?: [number, number];    // Min/max opacity for each piece
  autoPlay?: boolean;                 // Should confetti play immediately on mount
  loop?: boolean;                     // Should confetti repeat continuously
  onComplete?: () => void;            // Callback after animation finishes
}

export interface ConfettiHandle {
  trigger: () => void;                // Method to manually trigger confetti
  reset: () => void;                  // Method to reset animation
}
