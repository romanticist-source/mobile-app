import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WatchConnectivity, { type HealthData } from '@/services/WatchConnectivity';

export default function TestWatchScreen() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Wear OSからのリアルタイムデータ受信
    const unsubscribe = WatchConnectivity.onHealthDataReceived((data) => {
      console.log('📱 Received from Wear OS:', data);
      setHealthData(data);
      setLastUpdate(new Date().toLocaleTimeString('ja-JP'));
    });

    return () => unsubscribe();
  }, []);

  const fetchHealthData = async () => {
    try {
      setError('');
      console.log('🔍 Fetching health data from Wear OS...');

      const data = await WatchConnectivity.getLatestHealthData();

      if (data) {
        setHealthData(data);
        setLastUpdate(new Date().toLocaleTimeString('ja-JP'));
        console.log('✅ Data received:', data);
      } else {
        setError('Wear OSからデータが取得できませんでした');
        console.log('❌ No data from Wear OS');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`エラー: ${errorMessage}`);
      console.error('❌ Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wear OS 連携テスト</Text>

      <Button
        title="Wear OSからデータ取得"
        onPress={fetchHealthData}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {healthData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>心拍数:</Text>
          <Text style={styles.value}>{healthData.heartRate.toFixed(0)} bpm</Text>

          <Text style={styles.label}>HRV:</Text>
          <Text style={styles.value}>{healthData.hrv.toFixed(0)} ms</Text>

          <Text style={styles.label}>最終更新:</Text>
          <Text style={styles.value}>{lastUpdate}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>
          データがありません。{'\n'}
          Wear OSアプリで心拍数測定を開始してください。
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    marginBottom: 10,
  },
  noData: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 14,
  },
});
