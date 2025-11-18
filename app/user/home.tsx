import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';

export default function UserHomeScreen() {
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

          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>田中</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>田中 太郎さん</Text>
                <Text style={styles.profileStatus}>状態: 良好</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsButtonText}>設定</Text>
            </TouchableOpacity>
          </View>

          {/* Help Request Button */}
          <TouchableOpacity style={styles.helpButton}>
            <View style={styles.helpButtonContent}>
              <View style={styles.helpIcon}>
                <Text style={styles.helpIconText}>⚠</Text>
              </View>
              <Text style={styles.helpButtonText}>ヘルプ要請</Text>
            </View>
          </TouchableOpacity>

          {/* Vital Data Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>バイタルデータ</Text>
            <View style={styles.vitalGrid}>
              {/* Heart Rate */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>❤️</Text>
                  <Text style={styles.vitalLabel}>心拍数</Text>
                </View>
                <Text style={styles.vitalValue}>72 <Text style={styles.vitalUnit}>bpm</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#FFE5E5' }]}>
                  <View style={[styles.vitalBarFill, { width: '70%', backgroundColor: '#FF6B6B' }]} />
                </View>
                <Text style={styles.vitalStatus}>正常</Text>
              </View>

              {/* Health Index */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>📈</Text>
                  <Text style={styles.vitalLabel}>健康指標</Text>
                </View>
                <Text style={styles.vitalValue}>85 <Text style={styles.vitalUnit}>%</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#E0F7F7' }]}>
                  <View style={[styles.vitalBarFill, { width: '85%', backgroundColor: '#20C9A6' }]} />
                </View>
                <Text style={styles.vitalStatus}>良好</Text>
              </View>

              {/* Activity Level */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>⚡</Text>
                  <Text style={styles.vitalLabel}>活動レベル</Text>
                </View>
                <Text style={styles.vitalValue}>320 <Text style={styles.vitalUnit}>kcal</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#F0E6FF' }]}>
                  <View style={[styles.vitalBarFill, { width: '60%', backgroundColor: '#9B6CFF' }]} />
                </View>
                <Text style={styles.vitalStatus}>中程度</Text>
              </View>

              {/* Water Intake */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>💧</Text>
                  <Text style={styles.vitalLabel}>水分補給</Text>
                </View>
                <Text style={styles.vitalValue}>1.2 <Text style={styles.vitalUnit}>L</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#E3F2FD' }]}>
                  <View style={[styles.vitalBarFill, { width: '60%', backgroundColor: '#2196F3' }]} />
                </View>
                <Text style={styles.vitalStatus}>目標の60%</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>最近の活動</Text>
            <View style={styles.activityList}>
              {/* Activity items would go here */}
            </View>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>ホーム</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>❓</Text>
            <Text style={styles.navLabel}>サポート</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔗</Text>
            <Text style={styles.navLabel}>共有</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navLabel}>通知</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>⚙️</Text>
            <Text style={styles.navLabel}>設定</Text>
          </TouchableOpacity>
        </View>
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
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileStatus: {
    fontSize: 13,
    color: '#666666',
  },
  settingsButton: {
    backgroundColor: '#D4F4E7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  settingsButtonText: {
    fontSize: 14,
    color: '#20C9A6',
    fontWeight: '600',
  },
  helpButton: {
    backgroundColor: '#C84F2A',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  helpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  helpIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIconText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  helpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  vitalIcon: {
    fontSize: 16,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#666666',
  },
  vitalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  vitalUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999999',
  },
  vitalBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  vitalBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  vitalStatus: {
    fontSize: 12,
    color: '#666666',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#999999',
  },
  navLabelActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
