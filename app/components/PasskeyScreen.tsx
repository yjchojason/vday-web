"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateInput, normalizeDateInput } from "../utils/dateMask";

// Dynamic import for confetti to avoid SSR issues
let confetti: any;
if (typeof window !== "undefined") {
  import("canvas-confetti").then((mod) => {
    confetti = mod.default || mod;
  });
}

interface PasskeyScreenProps {
  question: string;
  correctAnswer: string;
  onSuccess: () => void;
}

export default function PasskeyScreen({
  question,
  correctAnswer,
  onSuccess,
}: PasskeyScreenProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setValue(formatted);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const normalized = normalizeDateInput(value);
    
    if (normalized === correctAnswer) {
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
        onSuccess();
      }, 900);
    } else {
      // Wrong answer - shake
      setIsShaking(true);
      setError("try again");
      setTimeout(() => {
        setIsShaking(false);
        setValue("");
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 500);
    }
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
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
        {question}
      </h2>
      
      <motion.div
        animate={
          isShaking
            ? {
                x: [0, -10, 10, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        className="flex flex-col items-center gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="mm/dd/yy"
          maxLength={8}
          className="px-3 py-2 text-center text-sm border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
          aria-label="Date input"
        />

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

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Submit
        </button>
      </motion.div>
    </motion.div>
  );
}
