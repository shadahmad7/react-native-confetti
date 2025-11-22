import React from "react";
import { StyleSheet, View } from "react-native";
import { ConfettiPiece } from "./ConfettiPiece";

interface ConfettiProps {
  count?: number;
  colors?: string[];
}

export const Confetti: React.FC<ConfettiProps> = ({ count = 250, colors }) => (
  <View pointerEvents="none" style={{ ...StyleSheet.absoluteFillObject }}>
    {Array.from({ length: count }).map((_, i) => (
      <ConfettiPiece key={i} delay={i * 4} colors={colors} />
    ))}
  </View>
);
