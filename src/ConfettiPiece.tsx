// ConfettiPiece.tsx
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSequence, withTiming, Easing, runOnJS } from "react-native-reanimated";
import * as R from "remeda";
import { ConfettiShape } from "./ConfettiShape";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ConfettiPieceProps {
  delay: number;
  colors: string[];
  intensity: number;
  spread: number;
  minSize: number;
  maxSize: number;
  opacityRange: [number, number];
  fallDuration: number;
  upDuration: [number, number];
  isLast?: boolean;
  onComplete?: () => void;
}

export const ConfettiPiece: React.FC<ConfettiPieceProps> = ({
  delay,
  colors,
  intensity,
  spread,
  minSize,
  maxSize,
  opacityRange,
  fallDuration,
  upDuration,
  isLast,
  onComplete,
}) => {
  const y = useSharedValue(SCREEN_HEIGHT + 100);
  const x = useSharedValue(SCREEN_WIDTH / 2);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  const size = R.randomInteger(minSize, maxSize);
  const color = colors[R.randomInteger(0, colors.length - 1)];
  const op = R.randomInteger(opacityRange[0], opacityRange[1]) / 100;
  const type = R.randomInteger(0, 7);

  const angleDeg = R.randomInteger(-spread, spread);
  const angleRad = (angleDeg * Math.PI) / 180;
  const velocity = R.randomInteger(1400, 2200) * intensity;
  const velX = velocity * Math.sin(angleRad);
  const peakY = R.randomInteger(SCREEN_HEIGHT * 0.05, SCREEN_HEIGHT * 0.65);
  const peakX = SCREEN_WIDTH / 2 + velX * 0.5;
  const fallDriftX = R.randomInteger(-30, 30);
  const upDurationMs = R.randomInteger(upDuration[0], upDuration[1]);

  useEffect(() => {
    opacity.value = withTiming(op, { duration: 80 });

    y.value = withDelay(
      delay,
      withSequence(
        withTiming(peakY, { duration: upDurationMs, easing: Easing.out(Easing.cubic) }),
        withTiming(SCREEN_HEIGHT + 500, { duration: fallDuration, easing: Easing.in(Easing.quad) }, () => {
          if (isLast && onComplete) runOnJS(onComplete)();
        })
      )
    );

    x.value = withDelay(
      delay,
      withSequence(
        withTiming(peakX, { duration: upDurationMs, easing: Easing.out(Easing.cubic) }),
        withTiming(peakX + fallDriftX, { duration: fallDuration, easing: Easing.linear })
      )
    );

    rotate.value = withDelay(
      delay,
      withTiming(R.randomInteger(-2200, 2200), { duration: upDurationMs + fallDuration, easing: Easing.linear })
    );
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotate: `${rotate.value}deg` },
    ],
    position: "absolute",
  }));

  return (
    <Animated.View style={style}>
      <ConfettiShape type={type} size={size} color={color} opacity={op} />
    </Animated.View>
  );
};
