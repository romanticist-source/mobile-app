import { getUserById } from '@/api/users';
import { MOCK_USER_ID } from '@/constants/mockUser';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export function AppHeader() {
  const [userName, setUserName] = useState('ユーザー名');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(MOCK_USER_ID);
        setUserName(user.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
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
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
}

