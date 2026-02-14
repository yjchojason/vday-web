"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import for confetti to avoid SSR issues
let confetti: any;
if (typeof window !== "undefined") {
  import("canvas-confetti").then((mod) => {
    confetti = mod.default || mod;
  });
}

interface RevealScreenProps {
  onContinue: () => void;
}

export default function RevealScreen({ onContinue }: RevealScreenProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSmileClick = async () => {
    // Trigger confetti
    if (typeof window !== "undefined" && !confetti) {
      const mod = await import("canvas-confetti");
      confetti = mod.default || mod;
    }

    if (confetti) {
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    setTimeout(() => {
      onContinue();
    }, 900);
  };

  const handleSadClick = () => {
    setIsShaking(true);
    setError("try again");
    setTimeout(() => {
      setIsShaking(false);
      setError("");
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #fff5e6 0%, #ffe6f0 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-semibold text-gray-800 leading-relaxed text-center"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
        onAnimationComplete={() => {
          setTimeout(() => setShowQuestion(true), 500);
        }}
      >
        You have now unlocked access to Jason's secret flower shop!
      </motion.p>

      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mt-16"
          >
            <p
              className="text-2xl font-semibold text-gray-800 text-center"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              Are you happy?
            </p>
            <motion.div
              animate={
                isShaking
                  ? {
                      x: [0, -10, 10, -10, 10, -5, 5, 0],
                      transition: { duration: 0.5 },
                    }
                  : {}
              }
              className="flex gap-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSmileClick}
                className="text-6xl cursor-pointer transition-transform"
                aria-label="Happy"
              >
                😊
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSadClick}
                className="text-6xl cursor-pointer transition-transform"
                aria-label="Sad"
              >
                😢
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-red-500 text-sm"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
