"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerType, FlowerColor, BouquetItem } from "../types";
import FlowerIcon from "./FlowerIcon";
import html2canvas from "html2canvas";

/**
 * More realistic stand flower (petals + long connected stem + leaves)
 * Stem extends downward so it can visually "plug" into the stand flower box.
 */
const StandFlowerIcon = ({
  type,
  color,
  size = 72,
}: {
  type: FlowerType;
  color: FlowerColor;
  size?: number;
}) => {
  const colorMap: Record<FlowerColor, string> = {
    red: "#e11d48",
    pink: "#fb7185",
    yellow: "#fbbf24",
    purple: "#a855f7",
    white: "#ffffff",
    orange: "#fb923c",
    blue: "#60a5fa",
  };

  const petal = colorMap[color];
  const petalStroke = color === "white" ? "#d1d5db" : "rgba(0,0,0,0.10)";
  const center = type === "sunflower" ? "#7c2d12" : "#fbbf24";
  const stem = "#16a34a";
  const stemDark = "#15803d";

  // Geometry
  const w = size;
  const h = Math.round(size * 1.55); // includes stem length
  const headY = Math.round(size * 0.25); // Position head higher up
  const headR = Math.round(size * 0.22); // Make head slightly larger
  const stemTopY = headY + headR + 2; // Stem starts below the head
  const stemBottomY = h;

  const PetalRing = ({ petals = 10 }: { petals?: number }) => (
    <>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        const rx = headR * 0.55;
        const ry = headR * 1.05;
        const cx = w / 2 + Math.cos(a) * headR * 0.92;
        const cy = headY + Math.sin(a) * headR * 0.92;
        const rotate = (a * 180) / Math.PI;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${rotate} ${cx} ${cy})`}
            fill={petal}
            stroke={petalStroke}
            strokeWidth={1}
          />
        );
      })}
    </>
  );

  const Leaves = () => (
    <>
      {/* left leaf */}
      <path
        d={`
          M ${w / 2 - 2} ${stemTopY + (stemBottomY - stemTopY) * 0.45}
          C ${w / 2 - 18} ${stemTopY + (stemBottomY - stemTopY) * 0.50},
            ${w / 2 - 22} ${stemTopY + (stemBottomY - stemTopY) * 0.60},
            ${w / 2 - 6} ${stemTopY + (stemBottomY - stemTopY) * 0.62}
          C ${w / 2 - 2} ${stemTopY + (stemBottomY - stemTopY) * 0.60},
            ${w / 2 - 1} ${stemTopY + (stemBottomY - stemTopY) * 0.52},
            ${w / 2 - 2} ${stemTopY + (stemBottomY - stemTopY) * 0.45}
          Z
        `}
        fill={stemDark}
        opacity={0.9}
      />
      {/* right leaf */}
      <path
        d={`
          M ${w / 2 + 2} ${stemTopY + (stemBottomY - stemTopY) * 0.55}
          C ${w / 2 + 18} ${stemTopY + (stemBottomY - stemTopY) * 0.58},
            ${w / 2 + 22} ${stemTopY + (stemBottomY - stemTopY) * 0.68},
            ${w / 2 + 6} ${stemTopY + (stemBottomY - stemTopY) * 0.70}
          C ${w / 2 + 2} ${stemTopY + (stemBottomY - stemTopY) * 0.68},
            ${w / 2 + 1} ${stemTopY + (stemBottomY - stemTopY) * 0.60},
            ${w / 2 + 2} ${stemTopY + (stemBottomY - stemTopY) * 0.55}
          Z
        `}
        fill={stemDark}
        opacity={0.9}
      />
    </>
  );

  const Stem = () => (
    <>
      {/* main stem (slightly curved) */}
      <path
        d={`
          M ${w / 2 - 2} ${stemTopY}
          C ${w / 2 - 6} ${(stemTopY + stemBottomY) / 2},
            ${w / 2 + 6} ${(stemTopY + stemBottomY) / 2},
            ${w / 2 + 2} ${stemBottomY}
          L ${w / 2 - 2} ${stemBottomY}
          C ${w / 2 - 6} ${(stemTopY + stemBottomY) / 2},
            ${w / 2 + 2} ${(stemTopY + stemBottomY) / 2},
            ${w / 2 + 2} ${stemTopY}
          Z
        `}
        fill={stem}
      />
      <Leaves />
    </>
  );

  const Head = () => {
    switch (type) {
      case "sunflower":
        return (
          <>
            <PetalRing petals={14} />
            <circle cx={w / 2} cy={headY} r={headR * 0.62} fill={center} />
            <circle cx={w / 2} cy={headY} r={headR * 0.52} fill="#92400e" opacity={0.55} />
          </>
        );

      case "daisy":
        return (
          <>
            <PetalRing petals={12} />
            <circle cx={w / 2} cy={headY} r={headR * 0.45} fill="#fbbf24" />
          </>
        );

      case "tulip":
        return (
          <>
            <path
              d={`
                M ${w / 2 - headR} ${headY}
                C ${w / 2 - headR * 0.9} ${headY - headR},
                  ${w / 2 - headR * 0.2} ${headY - headR * 1.15},
                  ${w / 2} ${headY - headR * 0.6}
                C ${w / 2 + headR * 0.2} ${headY - headR * 1.15},
                  ${w / 2 + headR * 0.9} ${headY - headR},
                  ${w / 2 + headR} ${headY}
                C ${w / 2 + headR * 0.8} ${headY + headR * 0.9},
                  ${w / 2 - headR * 0.8} ${headY + headR * 0.9},
                  ${w / 2 - headR} ${headY}
                Z
              `}
              fill={petal}
              stroke={petalStroke}
              strokeWidth={1}
            />
            <path
              d={`
                M ${w / 2 - headR * 0.55} ${headY + headR * 0.1}
                C ${w / 2 - headR * 0.35} ${headY - headR * 0.35},
                  ${w / 2 - headR * 0.05} ${headY - headR * 0.35},
                  ${w / 2} ${headY - headR * 0.15}
                C ${w / 2 + headR * 0.05} ${headY - headR * 0.35},
                  ${w / 2 + headR * 0.35} ${headY - headR * 0.35},
                  ${w / 2 + headR * 0.55} ${headY + headR * 0.1}
              `}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={2}
              fill="none"
            />
          </>
        );

      case "lavender":
        return (
          <>
            {Array.from({ length: 9 }).map((_, i) => {
              const yy = headY - headR * 0.9 + i * (headR * 0.22);
              const rr = headR * (0.28 - i * 0.012);
              return (
                <circle
                  key={i}
                  cx={w / 2 + (i % 2 === 0 ? -2 : 2)}
                  cy={yy}
                  r={Math.max(2, rr)}
                  fill={petal}
                  opacity={0.85 - i * 0.05}
                />
              );
            })}
          </>
        );

      case "lily":
      case "rose":
      default:
        return (
          <>
            <PetalRing petals={10} />
            <circle cx={w / 2} cy={headY} r={headR * 0.55} fill={petal} opacity={0.85} />
            <circle cx={w / 2} cy={headY} r={headR * 0.32} fill={center} opacity={0.75} />
          </>
        );
    }
  };

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" style={{ overflow: "visible" }}>
      <Stem />
      <Head />
    </svg>
  );
};

const MAX_BOUQUET_SIZE = 12;

const STAND_FLOWERS: Array<{
  type: FlowerType;
  color: FlowerColor;
  id: string;
  position: { x: number; y: number };
}> = [
  { type: "rose", color: "red", id: "stand-1", position: { x: 8, y: 62 } },
  { type: "rose", color: "pink", id: "stand-2", position: { x: 16, y: 60 } },
  { type: "tulip", color: "yellow", id: "stand-3", position: { x: 24, y: 63 } },
  { type: "daisy", color: "white", id: "stand-4", position: { x: 32, y: 60 } },
  { type: "sunflower", color: "yellow", id: "stand-5", position: { x: 40, y: 66 } },
  { type: "lily", color: "purple", id: "stand-6", position: { x: 48, y: 61 } },
  { type: "lavender", color: "purple", id: "stand-7", position: { x: 56, y: 64 } },
  { type: "rose", color: "red", id: "stand-8", position: { x: 64, y: 62 } },
  { type: "tulip", color: "pink", id: "stand-9", position: { x: 72, y: 60 } },
  { type: "daisy", color: "yellow", id: "stand-10", position: { x: 80, y: 63 } },
  { type: "lily", color: "pink", id: "stand-11", position: { x: 88, y: 61 } },

  { type: "tulip", color: "pink", id: "stand-12", position: { x: 12, y: 46 } },
  { type: "rose", color: "white", id: "stand-13", position: { x: 20, y: 44 } },
  { type: "daisy", color: "yellow", id: "stand-14", position: { x: 28, y: 45 } },
  { type: "sunflower", color: "yellow", id: "stand-15", position: { x: 36, y: 47 } },
  { type: "lavender", color: "purple", id: "stand-16", position: { x: 44, y: 46 } },
  { type: "rose", color: "red", id: "stand-17", position: { x: 52, y: 44 } },
  { type: "tulip", color: "white", id: "stand-18", position: { x: 60, y: 45 } },
  { type: "daisy", color: "pink", id: "stand-19", position: { x: 68, y: 46 } },
  { type: "lily", color: "white", id: "stand-20", position: { x: 76, y: 44 } },
  { type: "rose", color: "pink", id: "stand-21", position: { x: 84, y: 45 } },
];

export default function FlowerShopScreen() {
  const [bouquet, setBouquet] = useState<BouquetItem[]>([]);
  const [showFinish, setShowFinish] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const addFlower = (type: FlowerType, color: FlowerColor) => {
    if (bouquet.length >= MAX_BOUQUET_SIZE) {
      setToast("Bouquet is full!");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    const newItem: BouquetItem = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      color,
      position: {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
      },
    };

    setBouquet((prev) => [...prev, newItem]);
  };

  const removeFlower = (id: string) => {
    setBouquet((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFinish = () => {
    setShowFinish(true);
  };

  const handleSaveImage = async () => {
    if (!exportRef.current) return;

    try {
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "bouquet.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        background: "linear-gradient(135deg, #ffeef8 0%, #fff0f5 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Flower Stand in the middle */}
      <div className="relative w-full max-w-2xl flex items-center justify-center mb-32">
        <div className="relative w-full">
          {/* Stand Base (REMOVED pointer-events-none so flowers can be clicked) */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-32 bg-amber-700 rounded-t-3xl shadow-2xl">
            {/* Stand Counter */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-amber-800 rounded-t-lg pointer-events-none"></div>

            {/* Flower Box */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 rounded-2xl bg-amber-900/70 border-2 border-amber-950/30 shadow-inner overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 to-transparent pointer-events-none rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-amber-950/25 pointer-events-none rounded-b-2xl" />

              {/* Flowers (display only, not clickable) */}
              {STAND_FLOWERS.map((flower) => (
                <div
                  key={flower.id}
                  className="absolute z-50"
                  style={{
                    left: `${flower.position.x}%`,
                    bottom: `${flower.position.y - 15}%`,
                    transform: "translateX(-50%)",
                    width: "90px",
                    height: "110px",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${(flower.position.x % 7) - 3}deg)`,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <StandFlowerIcon type={flower.type} color={flower.color} size={74} />
                  </div>
                </div>
              ))}
              
              {/* "from Jason" text on the basket */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                <p className="text-xs font-semibold text-amber-950 text-center" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                  from Jason
                </p>
              </div>
            </div>

            {/* Stand Legs */}
            <div className="absolute bottom-0 left-1/4 w-4 h-24 bg-amber-900 rounded-t-lg pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-4 h-24 bg-amber-900 rounded-t-lg pointer-events-none"></div>

            {/* Stand Sign */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-8 py-2 rounded-lg shadow-lg border-2 border-pink-300 w-80 z-30 pointer-events-none">
              <p className="text-sm font-bold text-pink-600 text-center whitespace-nowrap" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                Flower Basket for Connie
              </p>
            </div>
          </div>

          {/* Spacer to hold the stand area visually */}
          <div className="relative w-full h-64" />
        </div>
      </div>

      {/* Message text below the basket */}
      <div className="mt-2 text-center px-4">
        <p className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          I am sorry for not being there with you during Valentines. I promise I will get a real one once I come back~
        </p>
        <p className="text-base text-navy-800 mt-3 max-w-2xl mx-auto" style={{ fontFamily: "'Courier New', Courier, monospace", color: '#1e3a8a' }}>
          from your love, Jason
        </p>
      </div>

      {/* Finish Modal */}
      <AnimatePresence>
        {showFinish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFinish(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={exportRef} className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                  Here's your bouquet 💐
                </h2>
                <div className="mb-6 flex flex-wrap gap-2 justify-center items-center min-h-32">
                  {bouquet.map((item) => (
                    <FlowerIcon key={item.id} type={item.type} color={item.color} size={48} />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveImage}
                  className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  Save Image
                </button>
                <button
                  onClick={() => setShowFinish(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
