"use client";

import { useState, useEffect } from "react";
import { Step, ProgressState } from "../types";

const STORAGE_KEY = "vday-progress";

export function useLocalStorageProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    currentStep: 1,
    completedSteps: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } catch (e) {
        // Invalid storage, use default
      }
    }
  }, []);

  const updateProgress = (step: Step, completed: boolean) => {
    const newProgress: ProgressState = {
      currentStep: completed && step < 4 ? ((step + 1) as Step) : step,
      completedSteps: completed
        ? [...new Set([...progress.completedSteps, step])]
        : progress.completedSteps,
    };
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const resetProgress = () => {
    const defaultProgress: ProgressState = {
      currentStep: 1,
      completedSteps: [],
    };
    setProgress(defaultProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
  };

  return {
    currentStep: progress.currentStep,
    completedSteps: progress.completedSteps,
    updateProgress,
    resetProgress,
  };
}
