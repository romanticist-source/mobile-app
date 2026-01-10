/**
 * User Settings Helper
 * AsyncStorageを使用してユーザー設定を管理
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_WEIGHT: '@user_weight',
  USER_AGE: '@user_age',
  USER_HEIGHT: '@user_height',
  WAKE_UP_TIME: '@wake_up_time',
  FATIGUE_WARNING_THRESHOLD: '@fatigue_warning_threshold',
  FATIGUE_CRITICAL_THRESHOLD: '@fatigue_critical_threshold',
};

export interface UserPhysicalSettings {
  weight: number; // 体重(kg)
  age: number; // 年齢
  height?: number; // 身長(cm) - オプション
  wakeUpTime?: number; // 起床時間(時) - オプション
}

/**
 * ユーザーの体重を取得
 */
export async function getUserWeight(): Promise<number> {
  try {
    const weight = await AsyncStorage.getItem(STORAGE_KEYS.USER_WEIGHT);
    return weight ? parseFloat(weight) : 60; // デフォルト60kg
  } catch (error) {
    console.error('[UserSettings] Failed to get weight:', error);
    return 60;
  }
}

/**
 * ユーザーの体重を設定
 */
export async function setUserWeight(weight: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_WEIGHT, weight.toString());
    console.log('[UserSettings] Weight saved:', weight);
  } catch (error) {
    console.error('[UserSettings] Failed to save weight:', error);
  }
}

/**
 * ユーザーの年齢を取得
 */
export async function getUserAge(): Promise<number> {
  try {
    const age = await AsyncStorage.getItem(STORAGE_KEYS.USER_AGE);
    return age ? parseInt(age, 10) : 30; // デフォルト30歳
  } catch (error) {
    console.error('[UserSettings] Failed to get age:', error);
    return 30;
  }
}

/**
 * ユーザーの年齢を設定
 */
export async function setUserAge(age: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_AGE, age.toString());
    console.log('[UserSettings] Age saved:', age);
  } catch (error) {
    console.error('[UserSettings] Failed to save age:', error);
  }
}

/**
 * ユーザーの身長を取得
 */
export async function getUserHeight(): Promise<number | null> {
  try {
    const height = await AsyncStorage.getItem(STORAGE_KEYS.USER_HEIGHT);
    return height ? parseInt(height, 10) : null;
  } catch (error) {
    console.error('[UserSettings] Failed to get height:', error);
    return null;
  }
}

/**
 * ユーザーの身長を設定
 */
export async function setUserHeight(height: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_HEIGHT, height.toString());
    console.log('[UserSettings] Height saved:', height);
  } catch (error) {
    console.error('[UserSettings] Failed to save height:', error);
  }
}

/**
 * 起床時間を取得
 */
export async function getWakeUpTime(): Promise<number> {
  try {
    const time = await AsyncStorage.getItem(STORAGE_KEYS.WAKE_UP_TIME);
    return time ? parseInt(time, 10) : 7; // デフォルト7時
  } catch (error) {
    console.error('[UserSettings] Failed to get wake up time:', error);
    return 7;
  }
}

/**
 * 起床時間を設定
 */
export async function setWakeUpTime(hour: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.WAKE_UP_TIME, hour.toString());
    console.log('[UserSettings] Wake up time saved:', hour);
  } catch (error) {
    console.error('[UserSettings] Failed to save wake up time:', error);
  }
}

/**
 * すべてのユーザー設定を取得
 */
export async function getUserPhysicalSettings(): Promise<UserPhysicalSettings> {
  const [weight, age, height, wakeUpTime] = await Promise.all([
    getUserWeight(),
    getUserAge(),
    getUserHeight(),
    getWakeUpTime(),
  ]);

  return {
    weight,
    age,
    height: height || undefined,
    wakeUpTime,
  };
}

/**
 * すべてのユーザー設定を保存
 */
export async function saveUserPhysicalSettings(settings: UserPhysicalSettings): Promise<void> {
  await Promise.all([
    setUserWeight(settings.weight),
    setUserAge(settings.age),
    settings.height ? setUserHeight(settings.height) : Promise.resolve(),
    settings.wakeUpTime ? setWakeUpTime(settings.wakeUpTime) : Promise.resolve(),
  ]);
  console.log('[UserSettings] All settings saved:', settings);
}

/**
 * 疲労度警告閾値を取得
 */
export async function getFatigueWarningThreshold(): Promise<number> {
  try {
    const threshold = await AsyncStorage.getItem(STORAGE_KEYS.FATIGUE_WARNING_THRESHOLD);
    return threshold ? parseInt(threshold, 10) : 70; // デフォルト70%
  } catch (error) {
    console.error('[UserSettings] Failed to get fatigue warning threshold:', error);
    return 70;
  }
}

/**
 * 疲労度警告閾値を設定
 */
export async function setFatigueWarningThreshold(threshold: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FATIGUE_WARNING_THRESHOLD, threshold.toString());
    console.log('[UserSettings] Fatigue warning threshold saved:', threshold);
  } catch (error) {
    console.error('[UserSettings] Failed to save fatigue warning threshold:', error);
  }
}

/**
 * 疲労度危険閾値を取得
 */
export async function getFatigueCriticalThreshold(): Promise<number> {
  try {
    const threshold = await AsyncStorage.getItem(STORAGE_KEYS.FATIGUE_CRITICAL_THRESHOLD);
    return threshold ? parseInt(threshold, 10) : 80; // デフォルト80%
  } catch (error) {
    console.error('[UserSettings] Failed to get fatigue critical threshold:', error);
    return 80;
  }
}

/**
 * 疲労度危険閾値を設定
 */
export async function setFatigueCriticalThreshold(threshold: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FATIGUE_CRITICAL_THRESHOLD, threshold.toString());
    console.log('[UserSettings] Fatigue critical threshold saved:', threshold);
  } catch (error) {
    console.error('[UserSettings] Failed to save fatigue critical threshold:', error);
  }
}
