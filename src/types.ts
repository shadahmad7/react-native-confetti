import type { ViewProps } from "react-native";

export interface ConfettiProps extends ViewProps {
  colors?: string[];
  intensity?: number;
  count?: number;
}

export type ShapeType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
