import { getUsers } from '@/api/users';
import { getHelpers } from '@/api/helpers';
import type { User, Helper } from '@/_schema';
import { useUser } from '@/contexts/UserContext';
import { useHelper } from '@/contexts/HelperContext';
import { usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { styles } from './styles';

// Common interface for dropdown items
interface DropdownItem {
  id: string;
  name: string;
}

export function AppHeader() {
  const pathname = usePathname();
  const isHelperMode = pathname.startsWith('/helper');

  // User mode hooks
  const userContext = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Helper mode hooks
  const helperContext = useHelper();
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // User mode effect
  useEffect(() => {
    if (isHelperMode || userContext.isLoading) return;

    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);

        if (userContext.selectedUserId) {
          const savedUser = userList.find(u => u.id === userContext.selectedUserId);
          if (savedUser) {
            setSelectedUser(savedUser);
          } else if (userList.length > 0) {
            setSelectedUser(userList[0]);
            userContext.setSelectedUserId(userList[0].id);
          }
        } else if (userList.length > 0) {
          setSelectedUser(userList[0]);
          userContext.setSelectedUserId(userList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [isHelperMode, userContext.isLoading]);

  // Helper mode effect
  useEffect(() => {
    if (!isHelperMode || helperContext.isLoading) return;

    const fetchHelpers = async () => {
      try {
        const helperList = await getHelpers();
        setHelpers(helperList);

        if (helperContext.selectedHelperId) {
          const savedHelper = helperList.find(h => h.id === helperContext.selectedHelperId);
          if (savedHelper) {
            setSelectedHelper(savedHelper);
          } else if (helperList.length > 1) {
            setSelectedHelper(helperList[1]);
            helperContext.setSelectedHelperId(helperList[1].id);
          }
        } else if (helperList.length > 1) {
          setSelectedHelper(helperList[1]);
          helperContext.setSelectedHelperId(helperList[1].id);
        }
      } catch (error) {
        console.error('Failed to fetch helpers:', error);
      }
    };
    fetchHelpers();
  }, [isHelperMode, helperContext.isLoading]);

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    await userContext.setSelectedUserId(user.id);
    setIsDropdownOpen(false);
  };

  const handleSelectHelper = async (helper: Helper) => {
    setSelectedHelper(helper);
    await helperContext.setSelectedHelperId(helper.id);
    setIsDropdownOpen(false);
  };

  // Determine UI content based on mode
  const icon = isHelperMode ? '🤝' : '❤️';
  const title = isHelperMode ? '介助者アプリ' : 'みまもりケア';
  const subtitle = isHelperMode ? 'みまもりをサポート' : 'あなたの健康をサポート';
  const userIcon = isHelperMode ? '👨‍⚕️' : '👤';
  const displayName = isHelperMode
    ? (selectedHelper?.name ?? '介助者名')
    : (selectedUser?.name ?? 'ユーザー名');
  const dropdownTitle = isHelperMode ? '介助者を選択' : 'ユーザーを選択';
  const listData: DropdownItem[] = isHelperMode ? helpers : users;
  const selectedId = isHelperMode ? selectedHelper?.id : selectedUser?.id;

  const handleSelect = (item: DropdownItem) => {
    if (isHelperMode) {
      handleSelectHelper(item as Helper);
    } else {
      handleSelectUser(item as User);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>{icon}</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>{title}</Text>
          <Text style={styles.appSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => setIsDropdownOpen(true)}
      >
        <View style={styles.userIconContainer}>
          <Text style={styles.userIcon}>{userIcon}</Text>
        </View>
        <Text style={styles.userName}>{displayName}</Text>
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
            <Text style={styles.dropdownTitle}>{dropdownTitle}</Text>
            <FlatList
              data={listData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedId === item.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedId === item.id && styles.dropdownItemTextSelected,
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
