"use client";

import { motion } from "framer-motion";
import { BouquetItem } from "../types";
import FlowerIcon from "./FlowerIcon";

interface BouquetPreviewProps {
  items: BouquetItem[];
  onRemove?: (id: string) => void;
}

export default function BouquetPreview({ items, onRemove }: BouquetPreviewProps) {
  if (items.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-pink-200 rounded-lg bg-pink-50">
        <p className="text-gray-400 text-sm">Your bouquet will appear here</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-gradient-to-b from-pink-50 to-white rounded-lg border-2 border-pink-200 overflow-hidden">
      <div className="relative w-full h-full">
        {items.map((item, index) => {
          // Arrange flowers in a circular pattern with slight randomness
          const angle = (index * (360 / items.length)) * (Math.PI / 180);
          const radius = 30 + (index % 3) * 5;
          const baseX = 50;
          const baseY = 40;
          const x = baseX + (item.position.x || Math.cos(angle) * radius);
          const y = baseY + (item.position.y || Math.sin(angle) * radius);

          return (
            <motion.div
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${index * 15}deg)`,
                zIndex: index,
              }}
              onClick={() => onRemove?.(item.id)}
            >
              <FlowerIcon type={item.type} color={item.color} size={32} />
            </motion.div>
          );
        })}
      </div>
      
      {/* Ribbon at bottom */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 flex items-center justify-center">
          <div className="absolute left-1/2 top-0 w-12 h-12 bg-pink-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm"></div>
        </div>
      )}
    </div>
  );
}
