import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export interface WatchVitalData {
  heartRate: number | null;
  bloodPressureSystolic: number | null;
  bloodPressureDiastolic: number | null;
  bodyTemperature: number | null;
  spo2: number | null;
  lastUpdated: Date | null;
  isConnected: boolean;
}

const initialData: WatchVitalData = {
  heartRate: null,
  bloodPressureSystolic: null,
  bloodPressureDiastolic: null,
  bodyTemperature: null,
  spo2: null,
  lastUpdated: null,
  isConnected: false,
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
    let updateInterval: ReturnType<typeof setInterval> | null = null;

    const fetchWatchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let data: WatchVitalData;

        // プラットフォームに応じてデータ取得関数を切り替え
        if (Platform.OS === 'ios') {
          console.log('[useWatchData] iOS platform detected - Apple Watch integration');
          // TODO: iOS用のWatch連携実装
          // import { getWatchDataIOS } from '@/_util/watchConnector.ios';
          // data = await getWatchDataIOS();

          // 暫定的にモックデータ
          data = {
            heartRate: 72,
            bloodPressureSystolic: 120,
            bloodPressureDiastolic: 80,
            bodyTemperature: 36.5,
            spo2: 98,
            lastUpdated: new Date(),
            isConnected: false,
          };
        } else if (Platform.OS === 'android') {
          console.log('[useWatchData] Android platform detected - Wear OS integration');
          // TODO: Android用のWatch連携実装
          // import { getWatchDataAndroid } from '@/_util/watchConnector.android';
          // data = await getWatchDataAndroid();

          // 暫定的にモックデータ
          data = {
            heartRate: 75,
            bloodPressureSystolic: 118,
            bloodPressureDiastolic: 78,
            bodyTemperature: 36.6,
            spo2: 97,
            lastUpdated: new Date(),
            isConnected: false,
          };
        } else {
          // Web環境の場合はモックデータ
          console.log('[useWatchData] Web platform detected, using mock data');
          data = {
            heartRate: 72,
            bloodPressureSystolic: 120,
            bloodPressureDiastolic: 80,
            bodyTemperature: 36.5,
            spo2: 98,
            lastUpdated: new Date(),
            isConnected: false,
          };
        }

        if (isMounted) {
          setVitalData(data);
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

    // 30秒ごとにデータを更新
    updateInterval = setInterval(() => {
      fetchWatchData();
    }, 30000);

    return () => {
      isMounted = false;
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, []);

  return {
    vitalData,
    isLoading,
    error,
    refresh: () => {
      // 手動でデータをリフレッシュする関数（将来的に実装）
      setIsLoading(true);
    },
  };
}
