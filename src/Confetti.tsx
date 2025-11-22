// Confetti.tsx
import React, { useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ConfettiPiece } from "./ConfettiPiece";
import type { ConfettiProps } from "./types";

export interface ConfettiHandle {
  trigger: () => void;
}

export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(({
  count = 200,
  colors = ["#1b70de", "#32af4b", "#ff0000", "#ffff00"],
  intensity = 1,
  spread = 15,
  minSize = 6,
  maxSize = 12,
  fallDuration = 5500,
  upDuration = [1000, 1600],
  opacityRange = [25, 90],
  autoPlay = true,
  loop = false,
  onComplete,
  style,
}, ref) => {
  const [key, setKey] = useState(0);

  // Expose trigger method to parent
  useImperativeHandle(ref, () => ({
    trigger: () => setKey(prev => prev + 1),
  }));

  // Auto-play
  useEffect(() => {
    if (autoPlay) setKey(prev => prev + 1);
  }, []);

  // Track when all pieces finish
  const handleComplete = () => {
    if (loop) {
      setKey(prev => prev + 1);
    }
    if (onComplete) onComplete();
  };

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <ConfettiPiece
          key={`${key}-${i}`}
          delay={i * 4}
          colors={colors}
          intensity={intensity}
          spread={spread}
          minSize={minSize}
          maxSize={maxSize}
          opacityRange={opacityRange}
          fallDuration={fallDuration}
          upDuration={upDuration}
          isLast={i === count - 1}        // to detect last piece
          onComplete={handleComplete}     // call when last piece finishes
        />
      ))}
    </View>
  );
});
