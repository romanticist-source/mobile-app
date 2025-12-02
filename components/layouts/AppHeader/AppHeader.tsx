import { getUsers } from '@/api/users';
import type { User } from '@/_schema';
import { useUser } from '@/contexts/UserContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { styles } from './styles';

export function AppHeader() {
  const { selectedUserId, setSelectedUserId, isLoading } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // AsyncStorageの読み込みが完了するまで待つ
    if (isLoading) return;

    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);

        // 保存されたユーザーIDがあればそのユーザーを選択、なければ最初のユーザー
        if (selectedUserId) {
          const savedUser = userList.find(u => u.id === selectedUserId);
          if (savedUser) {
            setSelectedUser(savedUser);
          } else if (userList.length > 0) {
            // 保存されたユーザーが見つからない場合のみ最初のユーザーを設定
            setSelectedUser(userList[0]);
            setSelectedUserId(userList[0].id);
          }
        } else if (userList.length > 0) {
          // 保存されたユーザーIDがない場合のみ最初のユーザーを設定
          setSelectedUser(userList[0]);
          setSelectedUserId(userList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [isLoading]);

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    await setSelectedUserId(user.id);
    setIsDropdownOpen(false);
  };

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
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => setIsDropdownOpen(true)}
      >
        <View style={styles.userIconContainer}>
          <Text style={styles.userIcon}>👤</Text>
        </View>
        <Text style={styles.userName}>{selectedUser?.name ?? 'ユーザー名'}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>ユーザーを選択</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedUser?.id === item.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelectUser(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedUser?.id === item.id && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

