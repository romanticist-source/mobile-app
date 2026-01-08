import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { getConnections, deleteHelperConnect } from '@/api/helper-connect';
import type { HelperConnectWithDetails } from '@/_schema';
import { styles } from './styles';

export default function ConnectedHelpersScreen() {
  const [connections, setConnections] = useState<HelperConnectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[ConnectedHelpers] 接続取得中...');
      const data = await getConnections();
      console.log('[ConnectedHelpers] 接続取得完了:', data.length);
      setConnections(data);
    } catch (err: any) {
      console.error('[ConnectedHelpers] 接続取得エラー:', err);
      setError(err.message || '接続の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleDelete = (connection: HelperConnectWithDetails) => {
    Alert.alert(
      '接続を解除',
      `${connection.helper?.name || connection.helper?.email} との接続を解除しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '解除',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHelperConnect(connection.id);
              Alert.alert('解除完了', '接続を解除しました');
              await fetchConnections();
            } catch (err: any) {
              Alert.alert('エラー', err.message || '接続の解除に失敗しました');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="紐づき済み介助者" />

        {/* Content */}
        <ScrollView style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>読み込み中...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#FF3366" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : connections.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="people-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyTitle}>紐づいている介助者がいません</Text>
              <Text style={styles.emptyDescription}>
                介助者を追加して情報を共有しましょう
              </Text>
            </View>
          ) : (
            <View style={styles.connectionsList}>
              {connections.map((connection) => (
                <View key={connection.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.avatar}>
                      <MaterialIcons name="person" size={32} color="#4CAF50" />
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.name}>
                        {connection.helper?.name || '不明な介助者'}
                      </Text>
                      <Text style={styles.email}>{connection.helper?.email || connection.helperId}</Text>
                    </View>
                  </View>

                  <View style={styles.dateContainer}>
                    <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                    <Text style={styles.dateText}>
                      承認日: {formatDate(connection.updatedAt)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(connection)}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#FF3366" />
                    <Text style={styles.deleteButtonText}>接続を解除</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
