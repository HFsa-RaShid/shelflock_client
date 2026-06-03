"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { storeSetupMockData } from "../component/StoreSetup/storeSetupMockData";
import type { StoreSetupStatus } from "../component/StoreSetup/StoreSetup.type";

const SKIPPED_KEY = "dashboard_setup_skipped";

function readHasSkippedFromStorage(): boolean {
  if (typeof window === "undefined") {
    return storeSetupMockData.hasSkippedSetup;
  }
  return localStorage.getItem(SKIPPED_KEY) === "1";
}

function buildSetupStatus(hasSkippedSetup: boolean): StoreSetupStatus {
  const completedSteps = storeSetupMockData.steps.filter(
    (step) => step.status === "completed",
  ).length;
  const totalSteps = storeSetupMockData.steps.length;
  const completionPercentage = totalSteps
    ? Math.round((completedSteps / totalSteps) * 100)
    : 0;
  const isSetupComplete = completedSteps >= totalSteps;

  return {
    ...storeSetupMockData,
    hasSkippedSetup,
    completedSteps,
    totalSteps,
    completionPercentage,
    isSetupComplete,
    isFirstTimeUser: !isSetupComplete,
  };
}

export function useStoreSetup() {
  const [hasSkippedSetup, setHasSkippedSetup] = useState(
    readHasSkippedFromStorage,
  );
  const [showFullSetup, setShowFullSetup] = useState(
    () => !readHasSkippedFromStorage(),
  );

  useEffect(() => {
    const skipped = readHasSkippedFromStorage();
    setHasSkippedSetup(skipped);
    setShowFullSetup(!skipped);
  }, []);

  const setup = useMemo(
    () => buildSetupStatus(hasSkippedSetup),
    [hasSkippedSetup],
  );

  const isSetupIncomplete = !setup.isSetupComplete;
  const isFirstTimeEmptyOverview = isSetupIncomplete;

  const showFullSetupView =
    isSetupIncomplete && (!hasSkippedSetup || showFullSetup);
  const showSkippedBanner =
    isSetupIncomplete && hasSkippedSetup && !showFullSetup;

  const skipSetup = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SKIPPED_KEY, "1");
    }
    setHasSkippedSetup(true);
    setShowFullSetup(false);
  }, []);

  const reopenSetup = useCallback(() => {
    setShowFullSetup(true);
  }, []);

  return {
    setup,
    skipSetup,
    reopenSetup,
    showFullSetup: showFullSetupView,
    showSkippedBanner,
    isFirstTimeEmptyOverview,
  };
}


