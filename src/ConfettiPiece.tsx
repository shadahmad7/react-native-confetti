import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSequence, withTiming, Easing } from "react-native-reanimated";
import * as R from "remeda";
import { ConfettiShape } from "./ConfettiShape";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ConfettiPieceProps {
  delay: number;
  colors?: string[];
}

export const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ delay, colors = ["#1b70de", "#32af4b"] }) => {
  const y = useSharedValue(SCREEN_HEIGHT + 100);
  const x = useSharedValue(SCREEN_WIDTH / 2);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  const size = R.randomInteger(6, 12);
  const color = colors[R.randomInteger(0, colors.length - 1)];
  const op = R.randomInteger(25, 90) / 100;
  const type = R.randomInteger(0, 7);

  const angleDeg = R.randomInteger(-15, 15);
  const angleRad = (angleDeg * Math.PI) / 180;
  const velocity = R.randomInteger(1400, 2200);
  const velX = velocity * Math.sin(angleRad);
  const peakY = R.randomInteger(SCREEN_HEIGHT * 0.05, SCREEN_HEIGHT * 0.65);
  const peakX = SCREEN_WIDTH / 2 + velX * 0.5;
  const fallDriftX = R.randomInteger(-30, 30);
  const upDuration = R.randomInteger(1000, 1600);

  useEffect(() => {
    opacity.value = withTiming(op, { duration: 80 });
    y.value = withDelay(delay, withSequence(
      withTiming(peakY, { duration: upDuration, easing: Easing.out(Easing.cubic) }),
      withTiming(SCREEN_HEIGHT + 500, { duration: 5500, easing: Easing.in(Easing.quad) }),
    ));
    x.value = withDelay(delay, withSequence(
      withTiming(peakX, { duration: upDuration, easing: Easing.out(Easing.cubic) }),
      withTiming(peakX + fallDriftX, { duration: 5500, easing: Easing.linear }),
    ));
    rotate.value = withDelay(delay, withTiming(R.randomInteger(-2200, 2200), { duration: upDuration + 5500, easing: Easing.linear }));
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
