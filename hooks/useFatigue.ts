import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Pedometer, Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendFatigueAlertPush } from '@/_util/pushNotificationHelper';
import { getUserWeight, getUserAge, getWakeUpTime, getFatigueWarningThreshold, getFatigueCriticalThreshold } from '@/_util/userSettingsHelper';

// AsyncStorage keys
const STORAGE_KEYS = {
  DAILY_STEPS: '@daily_steps',
  DAILY_CALORIES: '@daily_calories',
  LAST_RESET_DATE: '@last_reset_date',
};

/**
 * 疲労度計算の設定（METs基準）
 */
const CONFIG = {
  // ユーザー情報（後でプロフィールから取得）
  DEFAULT_WEIGHT: 60, // デフォルト体重(kg)
  DEFAULT_AGE: 30, // デフォルト年齢

  // METs値の範囲
  MIN_METS: 1.0, // 安静時
  LIGHT_ACTIVITY_METS: 3.0, // ゆっくり歩く
  MODERATE_ACTIVITY_METS: 4.5, // 普通に歩く
  VIGOROUS_ACTIVITY_METS: 7.0, // 走る・階段

  // 加速度センサーの閾値（活動強度判定用）
  ACTIVITY_THRESHOLD_LIGHT: 0.1, // 軽い活動
  ACTIVITY_THRESHOLD_MODERATE: 0.3, // 中強度活動
  ACTIVITY_THRESHOLD_VIGOROUS: 0.6, // 高強度活動

  // 疲労計算
  ACCELEROMETER_INTERVAL: 1000, // 加速度計測間隔(ms)
  WAKE_UP_TIME: 7, // 起床時間（固定値）

  // 疲労度通知の閾値
  FATIGUE_WARNING_THRESHOLD: 70, // 警告レベル
  FATIGUE_CRITICAL_THRESHOLD: 80, // 危険レベル
};

interface UseFatigueReturn {
  hp: number; // 現在の体力 (0-100)
  fatigueLevel: number; // 疲労度 (0-100)
  steps: number; // 今日の合計歩数
  currentMETs: number; // 現在のMETs値
  caloriesBurned: number; // 消費カロリー(kcal)
  isAvailable: boolean; // センサー利用可否
  error: string | null; // エラーメッセージ
}

/**
 * 加速度から活動強度(METs)を推定
 */
function estimateMETsFromAcceleration(magnitude: number): number {
  if (magnitude < CONFIG.ACTIVITY_THRESHOLD_LIGHT) {
    return CONFIG.MIN_METS; // 安静時
  } else if (magnitude < CONFIG.ACTIVITY_THRESHOLD_MODERATE) {
    return CONFIG.LIGHT_ACTIVITY_METS; // 軽い活動
  } else if (magnitude < CONFIG.ACTIVITY_THRESHOLD_VIGOROUS) {
    return CONFIG.MODERATE_ACTIVITY_METS; // 中強度活動
  } else {
    return CONFIG.VIGOROUS_ACTIVITY_METS; // 高強度活動
  }
}

/**
 * 基礎代謝量(BMR)を計算（Harris-Benedict式）
 */
function calculateBMR(weight: number, age: number): number {
  // 簡易版: 男女平均を使用
  return 13.397 * weight + 4.799 * 170 - 5.677 * age + 88.362;
}

/**
 * 今日の日付文字列を取得（YYYY-MM-DD形式）
 */
function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * AsyncStorageから今日のデータを読み込み
 */
async function loadTodayData(): Promise<{ steps: number; calories: number }> {
  try {
    const today = getTodayString();
    const [lastResetDate, stepsStr, caloriesStr] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE),
      AsyncStorage.getItem(STORAGE_KEYS.DAILY_STEPS),
      AsyncStorage.getItem(STORAGE_KEYS.DAILY_CALORIES),
    ]);

    // 日付が変わっていたらリセット
    if (lastResetDate !== today) {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_STEPS, '0');
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_CALORIES, '0');
      return { steps: 0, calories: 0 };
    }

    return {
      steps: stepsStr ? parseInt(stepsStr, 10) : 0,
      calories: caloriesStr ? parseFloat(caloriesStr) : 0,
    };
  } catch (error) {
    console.error('[useFatigue] Failed to load today data:', error);
    return { steps: 0, calories: 0 };
  }
}

/**
 * AsyncStorageに今日のデータを保存
 */
async function saveTodayData(steps: number, calories: number): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_STEPS, steps.toString()),
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_CALORIES, calories.toString()),
    ]);
  } catch (error) {
    console.error('[useFatigue] Failed to save today data:', error);
  }
}

/**
 * expo-sensors (Pedometer + Accelerometer) を使用してMETsベースで疲労度を算出するフック
 */
export function useFatigue(): UseFatigueReturn {
  const [steps, setSteps] = useState(0);
  const [currentMETs, setCurrentMETs] = useState(CONFIG.MIN_METS);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ユーザー設定（体重、年齢、起床時間、疲労度閾値）
  const [userWeight, setUserWeight] = useState(CONFIG.DEFAULT_WEIGHT);
  const [userAge, setUserAge] = useState(CONFIG.DEFAULT_AGE);
  const [wakeUpTime, setWakeUpTime] = useState(CONFIG.WAKE_UP_TIME);
  const [fatigueWarningThreshold, setFatigueWarningThreshold] = useState(CONFIG.FATIGUE_WARNING_THRESHOLD);
  const [fatigueCriticalThreshold, setFatigueCriticalThreshold] = useState(CONFIG.FATIGUE_CRITICAL_THRESHOLD);

  // 初期化時のベース歩数を保持（リアルタイムカウントの差分計算用）
  const baseStepsRef = useRef<number | null>(null);

  // ユーザー設定を読み込み
  useEffect(() => {
    const loadUserSettings = async () => {
      const [weight, age, wakeUp, warningThreshold, criticalThreshold] = await Promise.all([
        getUserWeight(),
        getUserAge(),
        getWakeUpTime(),
        getFatigueWarningThreshold(),
        getFatigueCriticalThreshold(),
      ]);
      setUserWeight(weight);
      setUserAge(age);
      setWakeUpTime(wakeUp);
      setFatigueWarningThreshold(warningThreshold);
      setFatigueCriticalThreshold(criticalThreshold);
      console.log('[useFatigue] User settings loaded:', { weight, age, wakeUp, warningThreshold, criticalThreshold });
    };

    loadUserSettings();
  }, []);

  // 初期データをAsyncStorageから読み込み
  useEffect(() => {
    const initData = async () => {
      const data = await loadTodayData();
      setSteps(data.steps);
      setCaloriesBurned(data.calories);
      console.log('[useFatigue] Loaded today data:', data);
    };

    initData();
  }, []);

  // データをAsyncStorageに定期的に保存
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveTodayData(steps, caloriesBurned);
    }, 10000); // 10秒ごとに保存

    return () => clearInterval(saveInterval);
  }, [steps, caloriesBurned]);

  // 加速度センサーの監視
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    let accelerometerSubscription: { remove: () => void } | null = null;
    const accelerationHistory: number[] = [];

    const initAccelerometer = async () => {
      try {
        Accelerometer.setUpdateInterval(CONFIG.ACCELEROMETER_INTERVAL);

        accelerometerSubscription = Accelerometer.addListener((accelerometerData) => {
          // 加速度の大きさ（マグニチュード）を計算
          const { x, y, z } = accelerometerData;
          const magnitude = Math.sqrt(x * x + y * y + z * z) - 1.0; // 重力を除去

          // 履歴に追加（最大10個まで保持）
          accelerationHistory.push(Math.abs(magnitude));
          if (accelerationHistory.length > 10) {
            accelerationHistory.shift();
          }

          // 平均加速度からMETsを推定
          const avgMagnitude = accelerationHistory.reduce((a, b) => a + b, 0) / accelerationHistory.length;
          const estimatedMETs = estimateMETsFromAcceleration(avgMagnitude);
          setCurrentMETs(estimatedMETs);
        });
      } catch (err) {
        console.error('[useFatigue] Error initializing accelerometer:', err);
      }
    };

    initAccelerometer();

    return () => {
      if (accelerometerSubscription) {
        accelerometerSubscription.remove();
      }
    };
  }, []);

  // Pedometerの監視
  useEffect(() => {
    // Web環境では動作しない
    if (Platform.OS === 'web') {
      console.log('[useFatigue] Pedometer is not available on web');
      setIsAvailable(false);
      setError('Webでは歩数計測は利用できません');
      return;
    }

    let pedometerSubscription: { remove: () => void } | null = null;

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

        // 今日のデータを読み込み
        const savedData = await loadTodayData();

        // iOS: 今日の0:00からの累計歩数を取得可能
        if (Platform.OS === 'ios') {
          try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const result = await Pedometer.getStepCountAsync(today, new Date());
            if (result) {
              console.log('[useFatigue] Initial steps (iOS):', result.steps);
              setSteps(result.steps);
              baseStepsRef.current = result.steps;
            }
          } catch (err) {
            console.log('[useFatigue] Could not get initial step count:', err);
            // 保存済みデータを使用
            setSteps(savedData.steps);
            baseStepsRef.current = savedData.steps;
          }
        } else {
          // Android: 保存済みデータから開始
          console.log('[useFatigue] Android: Starting from saved steps:', savedData.steps);
          setSteps(savedData.steps);
          baseStepsRef.current = savedData.steps;
        }

        // リアルタイムで歩数を監視（差分のみ）
        pedometerSubscription = Pedometer.watchStepCount((result) => {
          console.log('[useFatigue] Step count delta:', result.steps);
          // baseStepsRef が設定されていない場合は初回として設定
          if (baseStepsRef.current === null) {
            baseStepsRef.current = savedData.steps;
          }
          // 差分を加算（result.stepsは前回からの増分）
          setSteps((prevSteps) => {
            const newSteps = prevSteps + result.steps;
            console.log('[useFatigue] Total steps:', newSteps);
            return newSteps;
          });
        });
      } catch (err) {
        console.error('[useFatigue] Error initializing pedometer:', err);
        setIsAvailable(false);
        setError('歩数計測の初期化に失敗しました');
      }
    };

    initPedometer();

    return () => {
      if (pedometerSubscription) {
        console.log('[useFatigue] Cleaning up pedometer subscription');
        pedometerSubscription.remove();
      }
    };
  }, []);

  // 歩数から消費カロリーを推定（簡易版）
  useEffect(() => {
    // 1歩あたりの消費カロリー = 体重(kg) × 距離(km) × 1.05
    // 平均歩幅を0.7mと仮定: 1000歩 = 0.7km
    const distanceKm = (steps * 0.7) / 1000;
    const calories = userWeight * distanceKm * 1.05;
    setCaloriesBurned(calories);
  }, [steps, userWeight]);

  // METsベースで疲労度を計算
  const calculateFatigue = (): { hp: number; fatigueLevel: number } => {
    // 基礎代謝量(BMR)を計算（ユーザーの体重と年齢を使用）
    const bmr = calculateBMR(userWeight, userAge);

    // 1日の推定総消費カロリー（活動代謝 × 1.2 〜 1.9）
    // 中程度の活動レベルを仮定: BMR × 1.5
    const estimatedDailyCalories = bmr * 1.5;

    // 現在の消費カロリーが1日の総消費に占める割合
    const calorieRatio = Math.min(caloriesBurned / estimatedDailyCalories, 1);

    // 時間負荷（起床からの経過時間）- ユーザーの起床時間を使用
    const now = new Date();
    const userWakeUpTime = new Date(now);
    userWakeUpTime.setHours(wakeUpTime, 0, 0, 0);
    const elapsedHours = Math.max((now.getTime() - userWakeUpTime.getTime()) / (1000 * 60 * 60), 0);
    const timeRatio = Math.min(elapsedHours / 16, 1); // 16時間で100%

    // 疲労度 = カロリー負荷(70%) + 時間負荷(30%)
    const fatigueLevel = Math.round((calorieRatio * 70 + timeRatio * 30));
    const hp = Math.max(100 - fatigueLevel, 0);

    return { hp, fatigueLevel };
  };

  const { hp, fatigueLevel } = calculateFatigue();

  // 疲労度の監視と通知（1日1回のみ）
  const lastNotificationDate = useRef<string | null>(null);

  useEffect(() => {
    const checkFatigueLevel = async () => {
      if (Platform.OS === 'web' || !isAvailable) {
        return;
      }

      // 今日の日付を取得
      const today = new Date().toDateString();

      // 今日すでに通知済みかチェック
      const storedDate = await AsyncStorage.getItem('lastFatigueNotificationDate');
      if (storedDate === today) {
        return; // 今日はすでに通知済み
      }

      // ユーザー設定の警告レベルまたは危険レベルを超えたら通知
      if (fatigueLevel >= fatigueWarningThreshold) {
        console.log('[useFatigue] Fatigue level high, sending notification:', fatigueLevel, 'threshold:', fatigueWarningThreshold);

        // プッシュ通知を送信
        await sendFatigueAlertPush(fatigueLevel, hp);

        // 通知済みフラグを保存
        await AsyncStorage.setItem('lastFatigueNotificationDate', today);
        lastNotificationDate.current = today;
      }
    };

    checkFatigueLevel();
  }, [fatigueLevel, hp, isAvailable, fatigueWarningThreshold, fatigueCriticalThreshold]);

  return {
    hp,
    fatigueLevel,
    steps,
    currentMETs,
    caloriesBurned,
    isAvailable,
    error,
  };
}
