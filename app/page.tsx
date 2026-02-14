"use client";

import { AnimatePresence } from "framer-motion";
import { useLocalStorageProgress } from "./hooks/useLocalStorageProgress";
import PasskeyScreen from "./components/PasskeyScreen";
import DayCounterScreen from "./components/DayCounterScreen";
import RevealScreen from "./components/RevealScreen";
import FlowerShopScreen from "./components/FlowerShopScreen";

export default function Home() {
  const { currentStep, updateProgress, resetProgress } = useLocalStorageProgress();

  const handleStep1Success = () => {
    updateProgress(1, true);
  };

  const handleDayCounterContinue = () => {
    updateProgress(2, true);
  };

  const handleRevealContinue = () => {
    updateProgress(3, true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Reset Button */}
      <button
        onClick={resetProgress}
        className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-all"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        Reset
      </button>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <PasskeyScreen
            key="step1"
            question="what is the date we started dating?"
            correctAnswer="06/30/25"
            onSuccess={handleStep1Success}
          />
        )}
        {currentStep === 2 && (
          <DayCounterScreen key="step2" onContinue={handleDayCounterContinue} />
        )}
        {currentStep === 3 && (
          <RevealScreen key="step3" onContinue={handleRevealContinue} />
        )}
        {currentStep === 4 && <FlowerShopScreen key="step4" />}
      </AnimatePresence>
    </div>
  );
}
