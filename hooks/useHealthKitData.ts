/**
 * HealthKit Data Hook
 * HealthKitからバイタルデータを取得し、リアルタイムで監視するカスタムフック
 */

import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  requestHealthKitAuthorization,
  getAllVitalSigns,
  checkHealthKitAvailability,
  VitalSignsData,
  HeartRateData,
} from '@/_util/healthkit';

export interface HealthKitDataState {
  isLoading: boolean;
  isAuthorized: boolean;
  isAvailable: boolean;
  error: string | null;
  data: VitalSignsData | null;
}

export interface UseHealthKitDataOptions {
  autoFetch?: boolean;
  refreshInterval?: number; // ミリ秒
}

const defaultState: HealthKitDataState = {
  isLoading: true,
  isAuthorized: false,
  isAvailable: false,
  error: null,
  data: null,
};

const defaultHeartRate: HeartRateData = {
  current: null,
  min: null,
  max: null,
  average: null,
  unit: 'bpm',
  lastUpdated: null,
};

const defaultVitalSigns: VitalSignsData = {
  heartRate: defaultHeartRate,
  stepCount: null,
  activeCalories: null,
  distance: null,
  oxygenSaturation: null,
  respiratoryRate: null,
  bodyTemperature: null,
};

/**
 * HealthKitからバイタルデータを取得するカスタムフック
 */
export function useHealthKitData(options: UseHealthKitDataOptions = {}) {
  const { autoFetch = true, refreshInterval = 60000 } = options;

  const [state, setState] = useState<HealthKitDataState>(defaultState);

  const initialize = useCallback(async () => {
    // iOSのみサポート
    if (Platform.OS !== 'ios') {
      setState({
        isLoading: false,
        isAuthorized: false,
        isAvailable: false,
        error: 'HealthKitはiOSでのみ利用可能です',
        data: defaultVitalSigns,
      });
      return;
    }

    try {
      // HealthKitの利用可能性をチェック
      const isAvailable = await checkHealthKitAvailability();
      if (!isAvailable) {
        setState({
          isLoading: false,
          isAuthorized: false,
          isAvailable: false,
          error: 'HealthKitはこのデバイスで利用できません',
          data: defaultVitalSigns,
        });
        return;
      }

      // 権限をリクエスト
      const isAuthorized = await requestHealthKitAuthorization();
      if (!isAuthorized) {
        setState({
          isLoading: false,
          isAuthorized: false,
          isAvailable: true,
          error: 'HealthKitへのアクセスが許可されていません',
          data: defaultVitalSigns,
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        isAuthorized: true,
        isAvailable: true,
        error: null,
      }));

      // データを取得
      if (autoFetch) {
        await fetchData();
      }
    } catch (error) {
      setState({
        isLoading: false,
        isAuthorized: false,
        isAvailable: false,
        error: error instanceof Error ? error.message : 'HealthKitの初期化に失敗しました',
        data: defaultVitalSigns,
      });
    }
  }, [autoFetch]);

  const fetchData = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const vitalSigns = await getAllVitalSigns();
      setState((prev) => ({
        ...prev,
        isLoading: false,
        data: vitalSigns,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'データの取得に失敗しました',
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // 初期化
  useEffect(() => {
    initialize();
  }, [initialize]);

  // 自動更新
  useEffect(() => {
    if (!state.isAuthorized || !autoFetch || refreshInterval <= 0) {
      return;
    }

    const intervalId = setInterval(fetchData, refreshInterval);

    return () => clearInterval(intervalId);
  }, [state.isAuthorized, autoFetch, refreshInterval, fetchData]);

  return {
    ...state,
    refresh,
    requestAuthorization: initialize,
  };
}

/**
 * バイタルデータをVitalDataSectionのprops形式に変換するヘルパー
 */
export function formatVitalDataForSection(data: VitalSignsData | null) {
  if (!data) {
    return [];
  }

  const vitals = [];

  // 心拍数
  if (data.heartRate.current !== null) {
    vitals.push({
      icon: '❤️',
      label: '心拍数',
      value: String(data.heartRate.current),
      unit: 'bpm',
      barColor: '#FFE0E0',
      barFillColor: '#FF6B6B',
      fillPercentage: `${Math.min((data.heartRate.current / 200) * 100, 100)}%`,
      status: getHeartRateStatus(data.heartRate.current),
    });
  }

  // 歩数
  if (data.stepCount !== null) {
    vitals.push({
      icon: '🚶',
      label: '歩数',
      value: data.stepCount.toLocaleString(),
      unit: '歩',
      barColor: '#E0F0FF',
      barFillColor: '#4DABF7',
      fillPercentage: `${Math.min((data.stepCount / 10000) * 100, 100)}%`,
      status: getStepCountStatus(data.stepCount),
    });
  }

  // 消費カロリー
  if (data.activeCalories !== null) {
    vitals.push({
      icon: '🔥',
      label: 'アクティブカロリー',
      value: String(data.activeCalories),
      unit: 'kcal',
      barColor: '#FFF3E0',
      barFillColor: '#FF9800',
      fillPercentage: `${Math.min((data.activeCalories / 500) * 100, 100)}%`,
      status: getCaloriesStatus(data.activeCalories),
    });
  }

  // 血中酸素濃度
  if (data.oxygenSaturation !== null) {
    vitals.push({
      icon: '💨',
      label: '血中酸素濃度',
      value: String(data.oxygenSaturation),
      unit: '%',
      barColor: '#E8F5E9',
      barFillColor: '#4CAF50',
      fillPercentage: `${data.oxygenSaturation}%`,
      status: getOxygenStatus(data.oxygenSaturation),
    });
  }

  return vitals;
}

function getHeartRateStatus(bpm: number): string {
  if (bpm < 60) return '低い';
  if (bpm <= 100) return '正常';
  return '高い';
}

function getStepCountStatus(steps: number): string {
  if (steps < 3000) return 'もう少し歩きましょう';
  if (steps < 7000) return '順調です';
  if (steps < 10000) return '良い調子!';
  return '目標達成!';
}

function getCaloriesStatus(calories: number): string {
  if (calories < 100) return '活動開始';
  if (calories < 300) return '順調';
  return '活発に活動中';
}

function getOxygenStatus(percentage: number): string {
  if (percentage < 90) return '要注意';
  if (percentage < 95) return 'やや低め';
  return '正常';
}
