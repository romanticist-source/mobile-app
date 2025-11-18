import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation';

type TabType = 'health' | 'emergency';

export default function ShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');

  const healthConditions = ['高血圧', '糖尿病', '軽度の身体障害', '心臓病'];

  const caregivers = [
    {
      id: '1',
      name: '山田花子',
      relation: 'はなちゃん',
      role: '娘',
      phone: '090-XXXX-XXXX',
      email: 'hanako@example.com',
      avatar: '山',
      avatarColor: '#FFE4E4',
      status: 'online',
    },
    {
      id: '2',
      name: '佐藤健太',
      relation: 'けんちゃん',
      role: '息子',
      phone: '090-YYYY-YYYY',
      email: '',
      avatar: '佐',
      avatarColor: '#FFE4E4',
      status: 'online',
    },
    {
      id: '3',
      name: '田中看護師',
      relation: '田中さん',
      role: '訪問看護師',
      phone: '090-ZZZZ-ZZZZ',
      email: 'tanaka@nursing.com',
      avatar: '田',
      avatarColor: '#FFE4E4',
      status: 'offline',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.appIcon}>
                <Text style={styles.appIconText}>❤️</Text>
              </View>
              <View>
                <Text style={styles.appTitle}>みまもりケア</Text>
                <Text style={styles.appSubtitle}>あなたの健康をサポート</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.userIconContainer}>
                <Text style={styles.userIcon}>👤</Text>
              </View>
              <Text style={styles.userName}>ユーザー名</Text>
            </View>
          </View>

          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>共有</Text>
          </View>

          {/* Share Items */}
          <View style={styles.shareList}>
            {shareItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.shareItem}
                onPress={() => console.log('Share item pressed:', item.id)}
              >
                <View style={styles.shareItemIcon}>
                  <Text style={styles.shareItemIconText}>{item.icon}</Text>
                </View>
                <View style={styles.shareItemContent}>
                  <Text style={styles.shareItemTitle}>{item.title}</Text>
                  <Text style={styles.shareItemDescription}>{item.description}</Text>
                </View>
                <Text style={styles.shareItemArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>ℹ️</Text>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>共有について</Text>
              <Text style={styles.infoCardText}>
                あなたの健康データを家族や医師と安全に共有できます。共有されたデータは暗号化され、プライバシーが保護されます。
              </Text>
            </View>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="share" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  userName: {
    fontSize: 14,
    color: '#333333',
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  shareList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  shareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 12,
  },
  shareItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareItemIconText: {
    fontSize: 24,
  },
  shareItemContent: {
    flex: 1,
  },
  shareItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  shareItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  shareItemArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  infoCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    gap: 12,
  },
  infoCardIcon: {
    fontSize: 24,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
});
