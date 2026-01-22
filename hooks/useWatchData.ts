import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

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
  platform: 'web',
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
          // const watchData = await getWatchDataIOS();
          // if (watchData.isConnected) { data = watchData; }

          // 暫定的にWatch未接続状態（実装後は実際の接続状態を返す）
          const isWatchConnected = false; // TODO: 実際のWatch接続状態を取得
          data = {
            heartRate: isWatchConnected ? 72 : null,
            spo2: isWatchConnected ? 98 : null,
            hrv: isWatchConnected ? 45 : null,
            steps: isWatchConnected ? 5432 : null,
            lastUpdated: isWatchConnected ? new Date() : null,
            isConnected: isWatchConnected,
            platform: 'ios',
          };
        } else if (Platform.OS === 'android') {
          console.log('[useWatchData] Android platform detected - Wear OS integration');
          // TODO: Android用のWatch連携実装
          // import { getWatchDataAndroid } from '@/_util/watchConnector.android';
          // const watchData = await getWatchDataAndroid();
          // if (watchData.isConnected) { data = watchData; }

          // 暫定的にWatch未接続状態（実装後は実際の接続状態を返す）
          const isWatchConnected = false; // TODO: 実際のWatch接続状態を取得
          data = {
            heartRate: isWatchConnected ? 75 : null,
            spo2: isWatchConnected ? 97 : null,
            hrv: isWatchConnected ? 42 : null,
            steps: isWatchConnected ? 6128 : null,
            lastUpdated: isWatchConnected ? new Date() : null,
            isConnected: isWatchConnected,
            platform: 'android',
          };
        } else {
          // Web環境ではWatch連携不可
          console.log('[useWatchData] Web platform detected - Watch integration not available');
          data = {
            heartRate: null,
            spo2: null,
            hrv: null,
            steps: null,
            lastUpdated: null,
            isConnected: false,
            platform: 'web',
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
