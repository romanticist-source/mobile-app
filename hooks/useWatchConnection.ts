import { useState } from "react";

/**
 * Watch連携機能は現在無効化されています
 * Development Buildを使用する場合は、WatchConnectivityContextを有効化してください
 */

export const useWatchHrv = () => {
  // Watch連携が無効なので、ダミー値を返す
  const [hrv] = useState<number | null>(null);
  return hrv;
};

export const useWatchHeartRate = () => {
  const [heartRate] = useState<number | null>(null);
  return heartRate;
};

export const useWatchOxygenLevel = () => {
  const [oxygenLevel] = useState<number | null>(null);
  return oxygenLevel;
};

export const useWatchSteps = () => {
  const [steps] = useState<number | null>(null);
  return steps;
};
