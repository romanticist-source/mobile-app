import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { WatchConnectivityModule } = NativeModules;

export interface HealthData {
  heartRate: number;
  hrv: number;
  timestamp: number;
}

class WatchConnectivityService {
  private eventEmitter: NativeEventEmitter | null = null;

  constructor() {
    if (Platform.OS === 'android' && WatchConnectivityModule) {
      this.eventEmitter = new NativeEventEmitter(WatchConnectivityModule);
    }
  }

  /**
   * Wear OSから最新のヘルスデータを取得
   */
  async getLatestHealthData(): Promise<HealthData | null> {
    if (Platform.OS !== 'android' || !WatchConnectivityModule) {
      console.warn('WatchConnectivity is only available on Android');
      return null;
    }

    try {
      const data = await WatchConnectivityModule.getLatestHealthData();
      return data;
    } catch (error) {
      console.error('Failed to get health data from Wear OS:', error);
      throw error;
    }
  }

  /**
   * Wear OSからデータを受信したときのイベントリスナー
   */
  onHealthDataReceived(callback: (data: HealthData) => void): () => void {
    if (!this.eventEmitter) {
      console.warn('Event emitter not available');
      return () => {};
    }

    const subscription = this.eventEmitter.addListener(
      'onHealthDataReceived',
      callback
    );

    return () => subscription.remove();
  }
}

export default new WatchConnectivityService();
