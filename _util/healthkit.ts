/**
 * HealthKit Service
 * HealthKitからのデータ取得とアクセス権限管理
 */

import {
  requestAuthorization,
  getMostRecentQuantitySample,
  queryQuantitySamples,
  isHealthDataAvailable,
  QuantitySample,
} from '@kingstinct/react-native-healthkit';
import type { QuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';

// 読み取り権限を要求するデータタイプ
export const HEALTH_DATA_TYPES = {
  heartRate: 'HKQuantityTypeIdentifierHeartRate' as QuantityTypeIdentifier,
  stepCount: 'HKQuantityTypeIdentifierStepCount' as QuantityTypeIdentifier,
  activeEnergyBurned: 'HKQuantityTypeIdentifierActiveEnergyBurned' as QuantityTypeIdentifier,
  distanceWalkingRunning: 'HKQuantityTypeIdentifierDistanceWalkingRunning' as QuantityTypeIdentifier,
  bodyTemperature: 'HKQuantityTypeIdentifierBodyTemperature' as QuantityTypeIdentifier,
  bloodPressureSystolic: 'HKQuantityTypeIdentifierBloodPressureSystolic' as QuantityTypeIdentifier,
  bloodPressureDiastolic: 'HKQuantityTypeIdentifierBloodPressureDiastolic' as QuantityTypeIdentifier,
  oxygenSaturation: 'HKQuantityTypeIdentifierOxygenSaturation' as QuantityTypeIdentifier,
  respiratoryRate: 'HKQuantityTypeIdentifierRespiratoryRate' as QuantityTypeIdentifier,
  bloodGlucose: 'HKQuantityTypeIdentifierBloodGlucose' as QuantityTypeIdentifier,
  bodyMass: 'HKQuantityTypeIdentifierBodyMass' as QuantityTypeIdentifier,
  height: 'HKQuantityTypeIdentifierHeight' as QuantityTypeIdentifier,
} as const;

export type HealthDataType = keyof typeof HEALTH_DATA_TYPES;

export interface HealthSample {
  value: number;
  unit: string;
  startDate: Date;
  endDate: Date;
}

export interface HeartRateData {
  current: number | null;
  min: number | null;
  max: number | null;
  average: number | null;
  unit: string;
  lastUpdated: Date | null;
}

export interface VitalSignsData {
  heartRate: HeartRateData;
  stepCount: number | null;
  activeCalories: number | null;
  distance: number | null;
  oxygenSaturation: number | null;
  respiratoryRate: number | null;
  bodyTemperature: number | null;
}

/**
 * HealthKitが利用可能かチェック
 */
export const checkHealthKitAvailability = async (): Promise<boolean> => {
  try {
    return await isHealthDataAvailable();
  } catch {
    return false;
  }
};

/**
 * HealthKitの読み取り権限をリクエスト
 */
export const requestHealthKitAuthorization = async (): Promise<boolean> => {
  try {
    const isAvailable = await checkHealthKitAvailability();
    if (!isAvailable) {
      console.warn('HealthKit is not available on this device');
      return false;
    }

    await requestAuthorization({
      toRead: [
        HEALTH_DATA_TYPES.heartRate,
        HEALTH_DATA_TYPES.stepCount,
        HEALTH_DATA_TYPES.activeEnergyBurned,
        HEALTH_DATA_TYPES.distanceWalkingRunning,
        HEALTH_DATA_TYPES.oxygenSaturation,
        HEALTH_DATA_TYPES.respiratoryRate,
        HEALTH_DATA_TYPES.bodyTemperature,
        HEALTH_DATA_TYPES.bloodPressureSystolic,
        HEALTH_DATA_TYPES.bloodPressureDiastolic,
        HEALTH_DATA_TYPES.bloodGlucose,
        HEALTH_DATA_TYPES.bodyMass,
        HEALTH_DATA_TYPES.height,
      ],
    });

    return true;
  } catch (error) {
    console.error('Failed to request HealthKit authorization:', error);
    return false;
  }
};

/**
 * 最新の心拍数を取得
 */
export const getLatestHeartRate = async (): Promise<HealthSample | null> => {
  try {
    const sample = await getMostRecentQuantitySample(HEALTH_DATA_TYPES.heartRate);
    if (!sample) return null;

    return {
      value: sample.quantity,
      unit: sample.unit || 'count/min',
      startDate: new Date(sample.startDate),
      endDate: new Date(sample.endDate),
    };
  } catch (error) {
    console.error('Failed to get heart rate:', error);
    return null;
  }
};

/**
 * 期間内の心拍数データを取得
 */
export const getHeartRateSamples = async (
  startDate: Date,
  endDate: Date = new Date()
): Promise<HeartRateData> => {
  try {
    const samples = await queryQuantitySamples(HEALTH_DATA_TYPES.heartRate, {
      filter: {
        startDate: startDate,
        endDate: endDate,
      },
    });

    if (!samples || samples.length === 0) {
      return {
        current: null,
        min: null,
        max: null,
        average: null,
        unit: 'bpm',
        lastUpdated: null,
      };
    }

    const values = samples.map((s: QuantitySample) => s.quantity);
    const current = values[values.length - 1];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const average = values.reduce((a: number, b: number) => a + b, 0) / values.length;
    const lastUpdated = new Date(samples[samples.length - 1].endDate);

    return {
      current: Math.round(current),
      min: Math.round(min),
      max: Math.round(max),
      average: Math.round(average),
      unit: 'bpm',
      lastUpdated,
    };
  } catch (error) {
    console.error('Failed to get heart rate samples:', error);
    return {
      current: null,
      min: null,
      max: null,
      average: null,
      unit: 'bpm',
      lastUpdated: null,
    };
  }
};

/**
 * 今日の歩数を取得
 */
export const getTodayStepCount = async (): Promise<number | null> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const samples = await queryQuantitySamples(HEALTH_DATA_TYPES.stepCount, {
      filter: {
        startDate: today,
        endDate: new Date(),
      },
    });

    if (!samples || samples.length === 0) return null;

    return samples.reduce((total: number, sample: QuantitySample) => total + sample.quantity, 0);
  } catch (error) {
    console.error('Failed to get step count:', error);
    return null;
  }
};

/**
 * 今日の消費カロリーを取得
 */
export const getTodayActiveCalories = async (): Promise<number | null> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const samples = await queryQuantitySamples(HEALTH_DATA_TYPES.activeEnergyBurned, {
      filter: {
        startDate: today,
        endDate: new Date(),
      },
    });

    if (!samples || samples.length === 0) return null;

    const total = samples.reduce((sum: number, sample: QuantitySample) => sum + sample.quantity, 0);
    return Math.round(total);
  } catch (error) {
    console.error('Failed to get active calories:', error);
    return null;
  }
};

/**
 * 今日の移動距離を取得（メートル）
 */
export const getTodayDistance = async (): Promise<number | null> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const samples = await queryQuantitySamples(HEALTH_DATA_TYPES.distanceWalkingRunning, {
      filter: {
        startDate: today,
        endDate: new Date(),
      },
    });

    if (!samples || samples.length === 0) return null;

    const total = samples.reduce((sum: number, sample: QuantitySample) => sum + sample.quantity, 0);
    return Math.round(total);
  } catch (error) {
    console.error('Failed to get distance:', error);
    return null;
  }
};

/**
 * 最新の血中酸素濃度を取得
 */
export const getLatestOxygenSaturation = async (): Promise<number | null> => {
  try {
    const sample = await getMostRecentQuantitySample(HEALTH_DATA_TYPES.oxygenSaturation);
    if (!sample) return null;

    // パーセンテージに変換（0-1 → 0-100）
    return Math.round(sample.quantity * 100);
  } catch (error) {
    console.error('Failed to get oxygen saturation:', error);
    return null;
  }
};

/**
 * 最新の呼吸数を取得
 */
export const getLatestRespiratoryRate = async (): Promise<number | null> => {
  try {
    const sample = await getMostRecentQuantitySample(HEALTH_DATA_TYPES.respiratoryRate);
    if (!sample) return null;

    return Math.round(sample.quantity);
  } catch (error) {
    console.error('Failed to get respiratory rate:', error);
    return null;
  }
};

/**
 * 最新の体温を取得（摂氏）
 */
export const getLatestBodyTemperature = async (): Promise<number | null> => {
  try {
    const sample = await getMostRecentQuantitySample(HEALTH_DATA_TYPES.bodyTemperature);
    if (!sample) return null;

    return sample.quantity;
  } catch (error) {
    console.error('Failed to get body temperature:', error);
    return null;
  }
};

/**
 * すべてのバイタルサインデータを一括取得
 */
export const getAllVitalSigns = async (): Promise<VitalSignsData> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [heartRate, stepCount, activeCalories, distance, oxygenSaturation, respiratoryRate, bodyTemperature] =
    await Promise.all([
      getHeartRateSamples(today),
      getTodayStepCount(),
      getTodayActiveCalories(),
      getTodayDistance(),
      getLatestOxygenSaturation(),
      getLatestRespiratoryRate(),
      getLatestBodyTemperature(),
    ]);

  return {
    heartRate,
    stepCount,
    activeCalories,
    distance,
    oxygenSaturation,
    respiratoryRate,
    bodyTemperature,
  };
};
