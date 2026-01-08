import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { RequestCard } from './(components)/RequestCard/RequestCard';
import { useRequests } from './(hooks)/useRequests';
import { styles } from './styles';

export default function RequestsScreen() {
  const { requests, loading, error, approveRequest, rejectRequest } = useRequests();

  const handleApprove = async (id: string) => {
    const confirmed = window.confirm('このリクエストを承認しますか？');
    if (!confirmed) return;

    const success = await approveRequest(id);
    if (success) {
      window.alert('リクエストを承認しました');
    } else {
      window.alert('承認に失敗しました');
    }
  };

  const handleReject = async (id: string) => {
    const confirmed = window.confirm('このリクエストを拒否しますか？');
    if (!confirmed) return;

    const success = await rejectRequest(id);
    if (success) {
      window.alert('リクエストを拒否しました');
    } else {
      window.alert('拒否に失敗しました');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="接続リクエスト" />

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
          ) : requests.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inbox" size={64} color="#CCCCCC" />
              <Text style={styles.emptyTitle}>リクエストはありません</Text>
              <Text style={styles.emptyDescription}>
                被介助者からのリクエストが届くとここに表示されます
              </Text>
            </View>
          ) : (
            <View style={styles.requestsList}>
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
