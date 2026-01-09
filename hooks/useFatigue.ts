import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

/**
 * 疲労度計算の設定
 */
const CONFIG = {
  MAX_STEPS: 5000, // 疲労MAXになる歩数
  WAKE_UP_TIME: 7, // 起床時間（固定値）
  ACTIVE_LIMIT_HOURS: 16, // 活動限界時間
  MAX_EXERCISE_LOAD: 70, // 運動負荷の最大値（%）
  MAX_TIME_LOAD: 30, // 時間負荷の最大値（%）
};

interface UseFatigueReturn {
  hp: number; // 現在の体力 (0-100)
  fatigueLevel: number; // 疲労度 (0-100)
  steps: number; // 今日の合計歩数
  isAvailable: boolean; // センサー利用可否
  error: string | null; // エラーメッセージ
}

/**
 * expo-sensors (Pedometer) を使用して歩数と経過時間から疲労度を算出するフック
 */
export function useFatigue(): UseFatigueReturn {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Web環境では動作しない
    if (Platform.OS === 'web') {
      console.log('[useFatigue] Pedometer is not available on web');
      setIsAvailable(false);
      setError('Webでは歩数計測は利用できません');
      return;
    }

    let subscription: { remove: () => void } | null = null;

    const initPedometer = async () => {
      try {
        // センサーの利用可否を確認
        const available = await Pedometer.isAvailableAsync();
        console.log('[useFatigue] Pedometer available:', available);

        if (!available) {
          setIsAvailable(false);
          setError('このデバイスでは歩数計測がサポートされていません');
          return;
        }

        // 権限をリクエスト
        const { status } = await Pedometer.requestPermissionsAsync();
        console.log('[useFatigue] Permission status:', status);

        if (status !== 'granted') {
          setIsAvailable(false);
          setError('歩数計測の権限が許可されていません');
          return;
        }

        setIsAvailable(true);
        setError(null);

        // 今日の0:00からの累計歩数を取得
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const result = await Pedometer.getStepCountAsync(today, new Date());
        if (result) {
          console.log('[useFatigue] Initial steps:', result.steps);
          setSteps(result.steps);
        }

        // リアルタイムで歩数を監視
        subscription = Pedometer.watchStepCount((result) => {
          console.log('[useFatigue] Step count updated:', result.steps);
          setSteps((prevSteps) => prevSteps + result.steps);
        });
      } catch (err) {
        console.error('[useFatigue] Error initializing pedometer:', err);
        setIsAvailable(false);
        setError('歩数計測の初期化に失敗しました');
      }
    };

    initPedometer();

    return () => {
      if (subscription) {
        console.log('[useFatigue] Cleaning up pedometer subscription');
        subscription.remove();
      }
    };
  }, []);

  // 疲労度を計算
  const calculateFatigue = (): { hp: number; fatigueLevel: number } => {
    // 運動負荷（歩数ベース）
    const stepRatio = Math.min(steps / CONFIG.MAX_STEPS, 1); // 0-1の範囲
    const exerciseLoad = stepRatio * CONFIG.MAX_EXERCISE_LOAD;

    // 時間負荷（起床からの経過時間ベース）
    const now = new Date();
    const wakeUpTime = new Date(now);
    wakeUpTime.setHours(CONFIG.WAKE_UP_TIME, 0, 0, 0);

    const elapsedHours = (now.getTime() - wakeUpTime.getTime()) / (1000 * 60 * 60);
    const timeRatio = Math.min(Math.max(elapsedHours, 0) / CONFIG.ACTIVE_LIMIT_HOURS, 1); // 0-1の範囲
    const timeLoad = timeRatio * CONFIG.MAX_TIME_LOAD;

    // HP計算（100から減算）
    const hp = Math.max(100 - exerciseLoad - timeLoad, 0);
    const fatigueLevel = 100 - hp;

    return { hp: Math.round(hp), fatigueLevel: Math.round(fatigueLevel) };
  };

  const { hp, fatigueLevel } = calculateFatigue();

  return {
    hp,
    fatigueLevel,
    steps,
    isAvailable,
    error,
  };
}
