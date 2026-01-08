import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

export default function RoleSelectScreen() {
  const router = useRouter();

  const handleUserSelect = () => {
    router.push('/register');
  };

  const handleHelperSelect = () => {
    router.push('/register-helper');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>アカウントの種類を選択</Text>
        <Text style={styles.subtitle}>登録するアカウントのタイプを選んでください</Text>
      </View>

      {/* Role Cards */}
      <View style={styles.cardsContainer}>
        {/* User Card */}
        <TouchableOpacity style={styles.roleCard} onPress={handleUserSelect}>
          <View style={[styles.iconContainer, styles.userIconContainer]}>
            <MaterialIcons name="person" size={48} color="#FF6B6B" />
          </View>
          <Text style={styles.roleTitle}>被介助者</Text>
          <Text style={styles.roleDescription}>介護を受ける方のアカウント</Text>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        {/* Helper Card */}
        <TouchableOpacity style={styles.roleCard} onPress={handleHelperSelect}>
          <View style={[styles.iconContainer, styles.helperIconContainer]}>
            <MaterialIcons name="favorite" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.roleTitle}>介助者</Text>
          <Text style={styles.roleDescription}>介護をサポートする方のアカウント</Text>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#666666" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Back to Login */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={20} color="#666666" />
        <Text style={styles.backButtonText}>ログイン画面に戻る</Text>
      </TouchableOpacity>
    </View>
  );
}
