import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Platform } from 'react-native';
import { Pedometer, Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendFatigueAlertPush } from '@/_util/pushNotificationHelper';
import { getUserWeight, getUserAge, getWakeUpTime, getFatigueWarningThreshold } from '@/_util/userSettingsHelper';
import { createUserFatigue } from '@/api/user-fatigue';
import { useAuth } from '@/contexts/AuthContext';

// AsyncStorage keys
const STORAGE_KEYS = {
  DAILY_STEPS: '@daily_steps',
  DAILY_CALORIES: '@daily_calories',
  LAST_RESET_DATE: '@last_reset_date',
  // DB同期用
  FATIGUE_SAMPLES: '@fatigue_samples',
  LAST_SAMPLE_TIME: '@fatigue_last_sample_time',
  LAST_SYNC_TIME: '@fatigue_last_sync_time',
  LAST_SYNC_VALUE: '@fatigue_last_sync_value',
};

const CONFIG = {
  DEFAULT_WEIGHT: 60,
  DEFAULT_AGE: 30,
  MIN_METS: 1.0,
  LIGHT_ACTIVITY_METS: 3.0,
  MODERATE_ACTIVITY_METS: 4.5,
  VIGOROUS_ACTIVITY_METS: 7.0,
  ACTIVITY_THRESHOLD_LIGHT: 0.1,
  ACTIVITY_THRESHOLD_MODERATE: 0.3,
  ACTIVITY_THRESHOLD_VIGOROUS: 0.6,
  ACCELEROMETER_INTERVAL: 1000,
  WAKE_UP_TIME: 7,
  FATIGUE_WARNING_THRESHOLD: 70,
  FATIGUE_CRITICAL_THRESHOLD: 80,
  // DB同期設定
  SYNC_INTERVAL_MS: 30 * 60 * 1000, // 30分
  SAMPLE_INTERVAL_MS: 5 * 60 * 1000, // 5分
  MAX_SAMPLES: 6, // 30分 / 5分 = 6サンプル
  EMERGENCY_THRESHOLD: 80, // 緊急送信の閾値
  RAPID_CHANGE_THRESHOLD: 20, // 急激な変化の閾値
};

interface FatigueSample {
  fatigueLevel: number;
  timestamp: number;
}

interface FatigueContextType {
  hp: number;
  fatigueLevel: number;
  steps: number;
  currentMETs: number;
  caloriesBurned: number;
  isAvailable: boolean;
  error: string | null;
  isLoading: boolean;
}

const FatigueContext = createContext<FatigueContextType | undefined>(undefined);

function estimateMETsFromAcceleration(magnitude: number): number {
  if (magnitude < CONFIG.ACTIVITY_THRESHOLD_LIGHT) {
    return CONFIG.MIN_METS;
  } else if (magnitude < CONFIG.ACTIVITY_THRESHOLD_MODERATE) {
    return CONFIG.LIGHT_ACTIVITY_METS;
  } else if (magnitude < CONFIG.ACTIVITY_THRESHOLD_VIGOROUS) {
    return CONFIG.MODERATE_ACTIVITY_METS;
  } else {
    return CONFIG.VIGOROUS_ACTIVITY_METS;
  }
}

function calculateBMR(weight: number, age: number): number {
  return 13.397 * weight + 4.799 * 170 - 5.677 * age + 88.362;
}

function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

async function loadTodayData(): Promise<{ steps: number; calories: number }> {
  try {
    const today = getTodayString();
    const [lastResetDate, stepsStr, caloriesStr] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE),
      AsyncStorage.getItem(STORAGE_KEYS.DAILY_STEPS),
      AsyncStorage.getItem(STORAGE_KEYS.DAILY_CALORIES),
    ]);

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
    console.error('[FatigueContext] Failed to load today data:', error);
    return { steps: 0, calories: 0 };
  }
}

async function saveTodayData(steps: number, calories: number): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_STEPS, steps.toString()),
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_CALORIES, calories.toString()),
    ]);
  } catch (error) {
    console.error('[FatigueContext] Failed to save today data:', error);
  }
}

export function FatigueProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [steps, setSteps] = useState(0);
  const [currentMETs, setCurrentMETs] = useState(CONFIG.MIN_METS);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userWeight, setUserWeight] = useState(CONFIG.DEFAULT_WEIGHT);
  const [userAge, setUserAge] = useState(CONFIG.DEFAULT_AGE);
  const [wakeUpTime, setWakeUpTime] = useState(CONFIG.WAKE_UP_TIME);
  const [fatigueWarningThreshold, setFatigueWarningThreshold] = useState(CONFIG.FATIGUE_WARNING_THRESHOLD);

  const baseStepsRef = useRef<number | null>(null);
  const lastNotificationDate = useRef<string | null>(null);
  const lastSyncValueRef = useRef<number | null>(null);

  // ユーザー設定を読み込み
  useEffect(() => {
    const loadUserSettings = async () => {
      const [weight, age, wakeUp, warningThreshold] = await Promise.all([
        getUserWeight(),
        getUserAge(),
        getWakeUpTime(),
        getFatigueWarningThreshold(),
      ]);
      setUserWeight(weight);
      setUserAge(age);
      setWakeUpTime(wakeUp);
      setFatigueWarningThreshold(warningThreshold);
      console.log('[FatigueContext] User settings loaded:', { weight, age, wakeUp, warningThreshold });
    };

    loadUserSettings();
  }, []);

  // 初期データをAsyncStorageから読み込み
  useEffect(() => {
    const initData = async () => {
      const data = await loadTodayData();
      setSteps(data.steps);
      setCaloriesBurned(data.calories);
      setIsLoading(false);
      console.log('[FatigueContext] Loaded today data:', data);
    };

    initData();
  }, []);

  // データをAsyncStorageに定期的に保存
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveTodayData(steps, caloriesBurned);
    }, 10000);

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
          const { x, y, z } = accelerometerData;
          const magnitude = Math.sqrt(x * x + y * y + z * z) - 1.0;

          accelerationHistory.push(Math.abs(magnitude));
          if (accelerationHistory.length > 10) {
            accelerationHistory.shift();
          }

          const avgMagnitude = accelerationHistory.reduce((a, b) => a + b, 0) / accelerationHistory.length;
          const estimatedMETs = estimateMETsFromAcceleration(avgMagnitude);
          setCurrentMETs(estimatedMETs);
        });
      } catch (err) {
        console.error('[FatigueContext] Error initializing accelerometer:', err);
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
    if (Platform.OS === 'web') {
      console.log('[FatigueContext] Pedometer is not available on web');
      setIsAvailable(false);
      setError('Webでは歩数計測は利用できません');
      return;
    }

    let pedometerSubscription: { remove: () => void } | null = null;

    const initPedometer = async () => {
      try {
        const available = await Pedometer.isAvailableAsync();
        console.log('[FatigueContext] Pedometer available:', available);

        if (!available) {
          setIsAvailable(false);
          setError('このデバイスでは歩数計測がサポートされていません');
          return;
        }

        const { status } = await Pedometer.requestPermissionsAsync();
        console.log('[FatigueContext] Permission status:', status);

        if (status !== 'granted') {
          setIsAvailable(false);
          setError('歩数計測の権限が許可されていません');
          return;
        }

        setIsAvailable(true);
        setError(null);

        const savedData = await loadTodayData();

        if (Platform.OS === 'ios') {
          try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const result = await Pedometer.getStepCountAsync(today, new Date());
            if (result) {
              console.log('[FatigueContext] Initial steps (iOS):', result.steps);
              setSteps(result.steps);
              baseStepsRef.current = result.steps;
            }
          } catch (err) {
            console.log('[FatigueContext] Could not get initial step count:', err);
            setSteps(savedData.steps);
            baseStepsRef.current = savedData.steps;
          }
        } else {
          console.log('[FatigueContext] Android: Starting from saved steps:', savedData.steps);
          setSteps(savedData.steps);
          baseStepsRef.current = savedData.steps;
        }

        pedometerSubscription = Pedometer.watchStepCount((result) => {
          console.log('[FatigueContext] Step count delta:', result.steps);
          if (baseStepsRef.current === null) {
            baseStepsRef.current = savedData.steps;
          }
          setSteps((prevSteps) => {
            const newSteps = prevSteps + result.steps;
            console.log('[FatigueContext] Total steps:', newSteps);
            return newSteps;
          });
        });
      } catch (err) {
        console.error('[FatigueContext] Error initializing pedometer:', err);
        setIsAvailable(false);
        setError('歩数計測の初期化に失敗しました');
      }
    };

    initPedometer();

    return () => {
      if (pedometerSubscription) {
        console.log('[FatigueContext] Cleaning up pedometer subscription');
        pedometerSubscription.remove();
      }
    };
  }, []);

  // 歩数から消費カロリーを推定
  useEffect(() => {
    const distanceKm = (steps * 0.7) / 1000;
    const calories = userWeight * distanceKm * 1.05;
    setCaloriesBurned(calories);
  }, [steps, userWeight]);

  // METsベースで疲労度を計算
  const calculateFatigue = (): { hp: number; fatigueLevel: number } => {
    const bmr = calculateBMR(userWeight, userAge);
    const estimatedDailyCalories = bmr * 1.5;
    const calorieRatio = Math.min(caloriesBurned / estimatedDailyCalories, 1);

    const now = new Date();
    const userWakeUpTime = new Date(now);
    userWakeUpTime.setHours(wakeUpTime, 0, 0, 0);
    const elapsedHours = Math.max((now.getTime() - userWakeUpTime.getTime()) / (1000 * 60 * 60), 0);
    const timeRatio = Math.min(elapsedHours / 16, 1);

    const fatigueLevel = Math.round((calorieRatio * 70 + timeRatio * 30));
    const hp = Math.max(100 - fatigueLevel, 0);

    return { hp, fatigueLevel };
  };

  const { hp, fatigueLevel } = calculateFatigue();

  // 疲労度の監視と通知
  useEffect(() => {
    const checkFatigueLevel = async () => {
      if (Platform.OS === 'web' || !isAvailable) {
        return;
      }

      const today = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem('lastFatigueNotificationDate');
      if (storedDate === today) {
        return;
      }

      if (fatigueLevel >= fatigueWarningThreshold) {
        console.log('[FatigueContext] Fatigue level high, sending notification:', fatigueLevel);
        await sendFatigueAlertPush(fatigueLevel, hp);
        await AsyncStorage.setItem('lastFatigueNotificationDate', today);
        lastNotificationDate.current = today;
      }
    };

    checkFatigueLevel();
  }, [fatigueLevel, hp, isAvailable, fatigueWarningThreshold]);

  // DB同期: 5分ごとにサンプリング
  useEffect(() => {
    if (Platform.OS === 'web' || !user?.id) {
      return;
    }

    const sampleFatigue = async () => {
      try {
        const now = Date.now();
        const lastSampleTimeStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SAMPLE_TIME);
        const lastSampleTime = lastSampleTimeStr ? parseInt(lastSampleTimeStr, 10) : 0;

        // 5分経過していない場合はスキップ
        if (now - lastSampleTime < CONFIG.SAMPLE_INTERVAL_MS) {
          return;
        }

        // 現在のサンプルを取得
        const samplesStr = await AsyncStorage.getItem(STORAGE_KEYS.FATIGUE_SAMPLES);
        const samples: FatigueSample[] = samplesStr ? JSON.parse(samplesStr) : [];

        // 新しいサンプルを追加
        samples.push({ fatigueLevel, timestamp: now });

        // 最大6サンプル（30分分）を保持
        while (samples.length > CONFIG.MAX_SAMPLES) {
          samples.shift();
        }

        await AsyncStorage.setItem(STORAGE_KEYS.FATIGUE_SAMPLES, JSON.stringify(samples));
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SAMPLE_TIME, now.toString());

        console.log('[FatigueContext] Sampled fatigue:', { fatigueLevel, samplesCount: samples.length });
      } catch (error) {
        console.error('[FatigueContext] Failed to sample fatigue:', error);
      }
    };

    // 初回実行
    sampleFatigue();

    // 5分ごとに実行
    const interval = setInterval(sampleFatigue, CONFIG.SAMPLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fatigueLevel, user?.id]);

  // DB同期: 30分ごとに平均を送信 + 緊急送信
  useEffect(() => {
    if (Platform.OS === 'web' || !user?.id) {
      return;
    }

    const syncToDatabase = async (isEmergency: boolean = false) => {
      try {
        const now = Date.now();

        if (!isEmergency) {
          // 通常同期: 30分経過チェック
          const lastSyncTimeStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC_TIME);
          const lastSyncTime = lastSyncTimeStr ? parseInt(lastSyncTimeStr, 10) : 0;

          if (now - lastSyncTime < CONFIG.SYNC_INTERVAL_MS) {
            return;
          }
        }

        // サンプルから平均を計算
        const samplesStr = await AsyncStorage.getItem(STORAGE_KEYS.FATIGUE_SAMPLES);
        const samples: FatigueSample[] = samplesStr ? JSON.parse(samplesStr) : [];

        let fatigueToSync: number;

        if (samples.length > 0) {
          // サンプルの平均を計算
          const sum = samples.reduce((acc, sample) => acc + sample.fatigueLevel, 0);
          fatigueToSync = Math.round(sum / samples.length);
        } else {
          // サンプルがない場合は現在値を使用
          fatigueToSync = fatigueLevel;
        }

        // DBに送信
        await createUserFatigue({
          userId: user.id,
          fatigueLevel: fatigueToSync,
        });

        console.log('[FatigueContext] Synced to DB:', {
          fatigueLevel: fatigueToSync,
          isEmergency,
          samplesCount: samples.length,
        });

        // 同期後にサンプルをクリア
        await AsyncStorage.setItem(STORAGE_KEYS.FATIGUE_SAMPLES, JSON.stringify([]));
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC_TIME, now.toString());
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC_VALUE, fatigueToSync.toString());
        lastSyncValueRef.current = fatigueToSync;
      } catch (error) {
        console.error('[FatigueContext] Failed to sync to database:', error);
      }
    };

    // 緊急送信チェック
    const checkEmergencySync = async () => {
      // 閾値超え
      if (fatigueLevel >= CONFIG.EMERGENCY_THRESHOLD) {
        console.log('[FatigueContext] Emergency sync: threshold exceeded', fatigueLevel);
        await syncToDatabase(true);
        return;
      }

      // 急激な変化チェック
      if (lastSyncValueRef.current !== null) {
        const change = Math.abs(fatigueLevel - lastSyncValueRef.current);
        if (change >= CONFIG.RAPID_CHANGE_THRESHOLD) {
          console.log('[FatigueContext] Emergency sync: rapid change', {
            current: fatigueLevel,
            lastSync: lastSyncValueRef.current,
            change,
          });
          await syncToDatabase(true);
          return;
        }
      }
    };

    // 前回の同期値を読み込み
    const loadLastSyncValue = async () => {
      const lastSyncValueStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC_VALUE);
      if (lastSyncValueStr) {
        lastSyncValueRef.current = parseInt(lastSyncValueStr, 10);
      }
    };

    loadLastSyncValue();

    // 緊急チェックは疲労度が変わるたびに実行
    checkEmergencySync();

    // 30分ごとに通常同期
    const interval = setInterval(() => syncToDatabase(false), CONFIG.SYNC_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fatigueLevel, user?.id]);

  return (
    <FatigueContext.Provider
      value={{
        hp,
        fatigueLevel,
        steps,
        currentMETs,
        caloriesBurned,
        isAvailable,
        error,
        isLoading,
      }}
    >
      {children}
    </FatigueContext.Provider>
  );
}

export function useFatigueContext() {
  const context = useContext(FatigueContext);
  if (context === undefined) {
    throw new Error('useFatigueContext must be used within a FatigueProvider');
  }
  return context;
}
