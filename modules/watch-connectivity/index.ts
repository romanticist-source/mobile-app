/**
 * Watch Connectivity Module
 * Apple Watch からのヘルスデータを受信するためのモジュール
 */

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

export interface HealthData {
  heartRate: number;
  oxygenLevel: number;
  steps: number;
  timestamp: number;
}

const { WatchConnectivityModule } = NativeModules;

// iOS のみで利用可能
const isAvailable = Platform.OS === 'ios' && WatchConnectivityModule != null;

// イベントエミッター
const eventEmitter = isAvailable ? new NativeEventEmitter(WatchConnectivityModule) : null;

/**
 * 最新のヘルスデータを取得
 */
export async function getLatestHealthData(): Promise<HealthData | null> {
  if (!isAvailable) {
    console.warn('WatchConnectivity is only available on iOS');
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
    console.warn('WatchConnectivity is only available on iOS');
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
