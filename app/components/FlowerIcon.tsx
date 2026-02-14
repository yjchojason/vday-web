"use client";

import { FlowerType, FlowerColor } from "../types";

interface FlowerIconProps {
  type: FlowerType;
  color: FlowerColor;
  size?: number;
}

const colorMap: Record<FlowerColor, string> = {
  red: "#ef4444",
  pink: "#ec4899",
  yellow: "#eab308",
  purple: "#a855f7",
  white: "#ffffff",
  orange: "#f97316",
  blue: "#3b82f6",
};

export default function FlowerIcon({ type, color, size = 40 }: FlowerIconProps) {
  const fillColor = colorMap[color];
  const strokeColor = color === "white" ? "#e5e7eb" : "#00000020";

  switch (type) {
    case "rose":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="12" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <circle cx="16" cy="16" r="6" fill={fillColor} opacity="0.8" />
          <circle cx="24" cy="16" r="6" fill={fillColor} opacity="0.8" />
          <circle cx="20" cy="12" r="5" fill={fillColor} opacity="0.7" />
          <ellipse cx="20" cy="28" rx="4" ry="8" fill="#22c55e" />
        </svg>
      );
    case "tulip":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx="20" cy="18" rx="8" ry="10" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 12 18 Q 20 10 28 18" fill={fillColor} opacity="0.9" />
          <ellipse cx="20" cy="30" rx="3" ry="8" fill="#22c55e" />
        </svg>
      );
    case "daisy":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="10" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <circle cx="20" cy="20" r="4" fill="#fbbf24" />
          <ellipse cx="20" cy="20" rx="2" ry="8" fill={fillColor} opacity="0.6" />
          <ellipse cx="20" cy="20" rx="8" ry="2" fill={fillColor} opacity="0.6" />
          <ellipse cx="20" cy="20" rx="5.66" ry="5.66" transform="rotate(45 20 20)" fill={fillColor} opacity="0.4" />
          <ellipse cx="20" cy="20" rx="5.66" ry="5.66" transform="rotate(-45 20 20)" fill={fillColor} opacity="0.4" />
          <ellipse cx="20" cy="32" rx="2" ry="6" fill="#22c55e" />
        </svg>
      );
    case "sunflower":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="12" fill="#fbbf24" />
          <circle cx="20" cy="20" r="6" fill="#92400e" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 20 + 6 * Math.cos(angle);
            const y1 = 20 + 6 * Math.sin(angle);
            const x2 = 20 + 12 * Math.cos(angle);
            const y2 = 20 + 12 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
          <ellipse cx="20" cy="32" rx="2" ry="6" fill="#22c55e" />
        </svg>
      );
    case "lily":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx="20" cy="16" rx="6" ry="10" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="14" cy="14" rx="4" ry="8" fill={fillColor} opacity="0.8" />
          <ellipse cx="26" cy="14" rx="4" ry="8" fill={fillColor} opacity="0.8" />
          <ellipse cx="20" cy="10" rx="3" ry="6" fill={fillColor} opacity="0.7" />
          <ellipse cx="20" cy="30" rx="2" ry="8" fill="#22c55e" />
        </svg>
      );
    case "lavender":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx="20" cy="20" rx="4" ry="12" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          {[...Array(8)].map((_, i) => {
            const y = 12 + i * 2;
            return (
              <circle key={i} cx="20" cy={y} r={3 - i * 0.2} fill={fillColor} opacity={0.8 - i * 0.1} />
            );
          })}
          <ellipse cx="20" cy="32" rx="2" ry="6" fill="#22c55e" />
        </svg>
      );
    default:
      return null;
  }
}
