import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getLatestHealthData, addHealthDataListener, type HealthData } from '@/modules/watch-connectivity';

export interface WatchVitalData {
  heartRate: number | null;
  spo2: number | null;
  hrv: number | null;
  steps: number | null;
  lastUpdated: Date | null;
  isConnected: boolean;
  platform: 'ios' | 'android' | 'web';
}

const initialData: WatchVitalData = {
  heartRate: null,
  spo2: null,
  hrv: null,
  steps: null,
  lastUpdated: null,
  isConnected: false,
  platform: Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web',
};

/**
 * Watch連携でバイタルデータを取得するカスタムフック
 * iOS: Apple Watch (HealthKit)
 * Android: Wear OS (Health Services API)
 */
export function useWatchData() {
  const [vitalData, setVitalData] = useState<WatchVitalData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const convertHealthData = (healthData: HealthData | null): WatchVitalData => {
      if (!healthData) {
        return {
          ...initialData,
          isConnected: false,
        };
      }

      return {
        heartRate: healthData.heartRate ?? null,
        spo2: healthData.oxygenLevel ?? null,
        hrv: healthData.hrv ?? null,
        steps: healthData.steps ?? null,
        lastUpdated: healthData.timestamp ? new Date(healthData.timestamp * 1000) : null,
        isConnected: true,
        platform: Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web',
      };
    };

    const fetchWatchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log(`[useWatchData] ${Platform.OS} platform detected - Fetching watch data`);

        const healthData = await getLatestHealthData();
        const convertedData = convertHealthData(healthData);

        if (isMounted) {
          setVitalData(convertedData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[useWatchData] Failed to fetch watch data:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'データ取得に失敗しました');
          setIsLoading(false);
        }
      }
    };

    // 初回データ取得
    fetchWatchData();

    // リアルタイムデータ受信のリスナーをセットアップ
    const unsubscribe = addHealthDataListener((healthData) => {
      console.log('[useWatchData] Received health data from watch:', healthData);
      if (isMounted) {
        const convertedData = convertHealthData(healthData);
        setVitalData(convertedData);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const refresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const healthData = await getLatestHealthData();
      const convertedData = healthData
        ? {
            heartRate: healthData.heartRate ?? null,
            spo2: healthData.oxygenLevel ?? null,
            hrv: healthData.hrv ?? null,
            steps: healthData.steps ?? null,
            lastUpdated: healthData.timestamp ? new Date(healthData.timestamp * 1000) : null,
            isConnected: true,
            platform: (Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web') as 'ios' | 'android' | 'web',
          }
        : initialData;
      setVitalData(convertedData);
    } catch (err) {
      console.error('[useWatchData] Failed to refresh watch data:', err);
      setError(err instanceof Error ? err.message : 'データ取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    vitalData,
    isLoading,
    error,
    refresh,
  };
}
