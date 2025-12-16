/**
 * useWatchHealthData Hook
 * Apple Watch からのヘルスデータをリアルタイムで取得するフック
 */

import { useState, useEffect, useCallback } from 'react';
import { addHealthDataListener, getLatestHealthData, HealthData } from './index';

export interface WatchHealthDataState {
  data: HealthData | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useWatchHealthData(): WatchHealthDataState {
  const [data, setData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 最新データを取得
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const healthData = await getLatestHealthData();
      setData(healthData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 初回ロード
    refresh();

    // リアルタイム更新をリッスン
    const unsubscribe = addHealthDataListener((newData) => {
      setData(newData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [refresh]);

  return { data, isLoading, error, refresh };
}

export default useWatchHealthData;
