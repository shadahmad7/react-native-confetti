import React from "react";
import Svg, { Circle, Polygon, Rect } from "react-native-svg";
import { ShapeType } from "./types";

interface ShapeProps {
  type: ShapeType;
  size: number;
  color: string;
  opacity: number;
}

const scalePoints = (points: string, size: number) =>
  points
    .split(" ")
    .map((p) => {
      const [x, y] = p.split(",").map(Number);
      return `${(x / 100) * size},${(y / 100) * size}`;
    })
    .join(" ");

export const ConfettiShape: React.FC<ShapeProps> = ({
  type,
  size,
  color,
  opacity,
}) => {
  switch (type) {
    case 0:
      return (
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 1:
      return (
        <Svg width={size} height={size}>
          <Rect width={size} height={size} fill={color} opacity={opacity} />
        </Svg>
      );
    case 2:
      return (
        <Svg width={size} height={size}>
          <Rect
            width={size * 2.8}
            height={size * 0.8}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 3:
      return (
        <Svg width={size} height={size}>
          <Polygon
            points={`0,${size} ${size / 2},0 ${size},${size}`}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 4:
      return (
        <Svg width={size} height={size}>
          <Polygon
            points={scalePoints("50,8 92,35 80,80 20,80 8,35", size)}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 5:
      return (
        <Svg width={size} height={size}>
          <Polygon
            points={scalePoints("50,0 95,25 95,75 50,100 5,75 5,25", size)}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 6:
      return (
        <Svg width={size} height={size}>
          <Polygon
            points={scalePoints(
              "50,0 65,35 98,40 70,60 80,95 50,75 20,95 30,60 2,40 35,35",
              size
            )}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    case 7:
      return (
        <Svg width={size} height={size}>
          <Polygon
            points={scalePoints(
              "50,0 65,30 95,35 70,60 80,95 50,75 20,95 30,60 5,35 35,30",
              size
            )}
            fill={color}
            opacity={opacity}
          />
        </Svg>
      );
    default:
      return null;
  }
};
