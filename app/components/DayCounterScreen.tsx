"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayCounterScreenProps {
  onContinue: () => void;
}

export default function DayCounterScreen({ onContinue }: DayCounterScreenProps) {
  const [count, setCount] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (count < 200) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 30); // Adjust speed here (30ms = ~6.6 seconds total)

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      // Show buttons after reaching 200
      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    }
  }, [count]);

  const handleYay = () => {
    onContinue();
  };

  const handleNay = () => {
    // Reset the animation
    setCount(1);
    setIsComplete(false);
    setShowButtons(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #ffeef8 0%, #fff0f5 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <div className="text-center">
        <motion.div
          key={count}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
          }}
          exit={{ 
            scale: 0, 
            rotate: 180, 
            opacity: 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.3
          }}
          className="text-8xl md:text-9xl font-bold text-pink-600 mb-6"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          {count}
        </motion.div>
        
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isComplete ? 1 : 0.7, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            It is Valentines' Day today!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isComplete ? 1 : 0.7, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed mt-2"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            It is also our {count}th day together!
          </motion.p>
        </div>

        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-6 justify-center mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYay}
                className="px-8 py-3 bg-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-600 transition-colors"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                YAY
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNay}
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold text-lg hover:bg-gray-500 transition-colors"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                NAY
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
