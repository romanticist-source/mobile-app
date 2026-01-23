/**
 * Watch Connectivity Module
 * Apple Watch / Wear OS からのヘルスデータを受信するためのモジュール
 */

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

export interface HealthData {
  heartRate: number;
  hrv?: number;
  oxygenLevel?: number;
  steps?: number;
  timestamp: number;
}

const { WatchConnectivityModule } = NativeModules;

// iOS と Android の両方で利用可能
const isAvailable = WatchConnectivityModule != null;

// イベントエミッター
const eventEmitter = isAvailable ? new NativeEventEmitter(WatchConnectivityModule) : null;

/**
 * 最新のヘルスデータを取得
 */
export async function getLatestHealthData(): Promise<HealthData | null> {
  if (!isAvailable) {
    console.warn(`WatchConnectivity is not available on ${Platform.OS}`);
    return null;
  }

  try {
    return await WatchConnectivityModule.getLatestHealthData();
  } catch (error) {
    console.error('Failed to get health data:', error);
    return null;
  }
}

/**
 * ヘルスデータ受信イベントをリッスン
 */
export function addHealthDataListener(
  callback: (data: HealthData) => void
): () => void {
  if (!isAvailable || !eventEmitter) {
    console.warn(`WatchConnectivity is not available on ${Platform.OS}`);
    return () => {};
  }

  const subscription = eventEmitter.addListener('onHealthDataReceived', callback);

  // クリーンアップ関数を返す
  return () => {
    subscription.remove();
  };
}

export default {
  isAvailable,
  getLatestHealthData,
  addHealthDataListener,
};
